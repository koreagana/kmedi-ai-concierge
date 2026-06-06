require('dotenv').config();
const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_TTS_API_KEY;
const OUTPUT_DIR = './audio';

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const INTRO_SHEET = '🎬 인트로 스크립트';
const MASTER_SHEET = '📋 스크립트 마스터';

function readIntroScript(filePath) {
    const wb = xlsx.readFile(filePath);
    const ws = wb.Sheets[INTRO_SHEET] || wb.Sheets[wb.SheetNames[0]];
    if (!ws) {
        throw new Error(`인트로 시트(${INTRO_SHEET})를 찾을 수 없습니다.`);
    }

    const data = xlsx.utils.sheet_to_json(ws, {header:1, blankrows:false});
    const introRow = data.slice(1).find(row => row && row[0] && row[0].toString().trim());
    return introRow ? introRow[0].toString().trim() : '';
}

function readMasterScripts(filePath) {
    const wb = xlsx.readFile(filePath);
    const ws = wb.Sheets[MASTER_SHEET] || wb.Sheets[wb.SheetNames[1]] || wb.Sheets[wb.SheetNames[0]];
    if (!ws) {
        throw new Error(`마스터 시트(${MASTER_SHEET})를 찾을 수 없습니다.`);
    }

    const data = xlsx.utils.sheet_to_json(ws, {header:1, blankrows:false});
    let headerIdx = -1;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (Array.isArray(row) && row.some(cell => typeof cell === 'string' && cell.includes('번호'))) {
            headerIdx = i;
            break;
        }
    }

    if (headerIdx < 0) {
        throw new Error('마스터 시트에서 번호 헤더를 찾을 수 없습니다.');
    }

    const headers = data[headerIdx].map(cell => (cell || '').toString().trim());
    const numCol = headers.indexOf('번호');
    const scriptCol = headers.indexOf('나레이션 스크립트');

    if (numCol < 0 || scriptCol < 0) {
        throw new Error('마스터 시트에 "번호" 또는 "나레이션 스크립트" 열이 없습니다.');
    }

    const results = [];
    for (let i = headerIdx + 1; i < data.length; i++) {
        const row = data[i];
        if (!row) continue;

        const rawNum = row[numCol];
        const rawScript = row[scriptCol];
        if (!rawNum || !rawScript) continue;

        const numText = rawNum.toString().trim();
        const scriptText = rawScript.toString().trim();
        if (!/^[0-9]+$/.test(numText)) continue;

        const numeric = Number(numText);
        if (numeric < 1 || numeric > 100) continue;

        const padded = numText.padStart(3, '0');
        results.push({번호: padded, 스크립트: scriptText});
    }
    return results;
}

async function textToSpeech(text, outputFile) {
    const url = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${API_KEY}`;
    
    const response = await axios.post(url, {
        input: { text },
        voice: {
            languageCode: 'ko-KR',
            name: 'ko-KR-Neural2-C'  // Chirp3-HD-Enceladus 는 "음~" 등 필러를 자동 삽입함
        },
        audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.95
        }
    });

    const audioContent = response.data.audioContent;
    fs.writeFileSync(outputFile, Buffer.from(audioContent, 'base64'));
    console.log(`✅ 생성완료: ${outputFile}`);
}

async function main() {
    const excelPath = './주식용어_100선_v4.xlsx';
    
    if (!fs.existsSync(excelPath)) {
        console.log('❌ 엑셀 파일을 주식남-자동화 폴더에 넣어주세요!');
        return;
    }

    const introText = readIntroScript(excelPath);
    const masterScripts = readMasterScripts(excelPath);

    const scripts = [];
    if (introText) {
        scripts.push({번호: '000', 스크립트: introText});
    } else {
        console.log('⚠️ 인트로 스크립트를 찾지 못했습니다. 000번은 생성되지 않습니다.');
    }
    scripts.push(...masterScripts);

    console.log(`📋 인트로 스크립트: ${introText ? '1개 발견' : '0개 발견'}`);
    console.log(`📋 스크립트 마스터: ${masterScripts.length}개 발견`);
    console.log(`📋 총 ${scripts.length}개 MP3 생성 대상`);

    for (const row of scripts) {
        const num = row['번호'];
        const script = row['스크립트'];
        
        if (!num || !script) continue;
        console.log(`🔄 처리중: ${num}`);
        
        const outputFile = path.join(OUTPUT_DIR, `${num}.mp3`);
        
        if (fs.existsSync(outputFile)) {
            console.log(`⏭️ 스킵 (이미 존재): ${num}.mp3`);
            continue;
        }

        try {
            await textToSpeech(script, outputFile);
            await new Promise(r => setTimeout(r, 500));
        } catch (err) {
            console.log(`❌ 오류 (${num}): ${err.message}`);
            console.log(err.response?.data);
        }
    }
    
    console.log('🎉 모든 음성 생성 완료!');
}

main();