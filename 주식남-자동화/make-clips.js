const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const FFMPEG_BIN = path.join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Packages', 'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe', 'ffmpeg-8.1.1-full_build', 'bin', 'ffmpeg.exe');
const FFPROBE_BIN = path.join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Packages', 'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe', 'ffmpeg-8.1.1-full_build', 'bin', 'ffprobe.exe');

if (fs.existsSync(FFMPEG_BIN)) {
  ffmpeg.setFfmpegPath(FFMPEG_BIN);
}
if (fs.existsSync(FFPROBE_BIN)) {
  ffmpeg.setFfprobePath(FFPROBE_BIN);
}

const IMAGE_DIR = './images';
const AUDIO_DIR = './audio';
const OUTPUT_DIR = './clips';

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
const AUDIO_EXTS = ['.mp3', '.wav', '.m4a', '.aac'];

function readFiles(dir, exts) {
  if (!fs.existsSync(dir)) return [];

  const results = [];

  function walk(currentDir) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const item of items) {
      const itemPath = path.join(currentDir, item.name);
      if (item.isDirectory()) {
        walk(itemPath);
        continue;
      }

      const ext = path.extname(item.name).toLowerCase();
      if (!exts.includes(ext)) continue;

      const num = Number((item.name.match(/^(\d{1,3})/) || [])[1] || -1);
      if (num < 0) continue;

      const formatted = num.toString().padStart(3, '0');
      const isExact = new RegExp(`^${formatted.replace(/([.*+?^${}()|[\]\\])/g, '\\$1')}\\${ext}$`, 'i').test(item.name);

      results.push({
        file: path.relative(process.cwd(), itemPath),
        num,
        isExact
      });
    }
  }

  walk(dir);

  return results
    .sort((a, b) => a.num - b.num || Number(b.isExact) - Number(a.isExact) || a.file.localeCompare(b.file));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildMap(entries) {
  return entries.reduce((map, entry) => {
    const existing = map[entry.num];
    if (!existing || (entry.isExact && !existing.isExact)) {
      map[entry.num] = entry;
    }
    return map;
  }, {});
}

function formatNumber(num) {
  return num.toString().padStart(3, '0');
}

async function createClip(imageFile, audioFile, outputFile) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(imageFile)
      .loop(1)
      .input(audioFile)
      .outputOptions([
        '-c:v libx264',
        '-tune stillimage',
        '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
        '-c:a aac',
        '-b:a 192k',
        '-pix_fmt yuv420p',
        '-shortest'
      ])
      .save(outputFile)
      .on('end', () => resolve())
      .on('error', err => reject(err));
  });
}

async function main() {
  ensureDir(OUTPUT_DIR);

  const imageEntries = readFiles(IMAGE_DIR, IMAGE_EXTS);
  const audioEntries = readFiles(AUDIO_DIR, AUDIO_EXTS);

  if (!imageEntries.length) {
    console.error(`이미지 폴더에 파일이 없습니다: ${IMAGE_DIR}`);
    return;
  }
  if (!audioEntries.length) {
    console.error(`오디오 폴더에 파일이 없습니다: ${AUDIO_DIR}`);
    return;
  }

  const images = buildMap(imageEntries);
  const audios = buildMap(audioEntries);

  const nums = Object.keys(images)
    .map(Number)
    .filter(num => audios[num] !== undefined)
    .sort((a, b) => a - b);

  if (!nums.length) {
    console.error('매칭되는 번호의 이미지와 오디오가 없습니다. 파일명 형식을 확인하세요.');
    return;
  }

  console.log(`생성 대상: ${nums.length}개 클립`);

  for (const num of nums) {
    const formatted = formatNumber(num);
    const imagePath = images[num].file;
    const audioPath = audios[num].file;
    const outputPath = path.join(OUTPUT_DIR, `${formatted}.mp4`);

    if (fs.existsSync(outputPath)) {
      console.log(`이미 있음, 건너뜀: ${formatted}.mp4`);
      continue;
    }

    console.log(`생성중: ${formatted}.mp4`);
    try {
      await createClip(imagePath, audioPath, outputPath);
      console.log(`✅ 완료: ${formatted}.mp4`);
    } catch (err) {
      console.error(`❌ 실패: ${formatted}.mp4`, err.message);
      break;
    }
  }

  console.log('모든 작업 완료');
}

main().catch(err => {
  console.error('예상치 못한 오류:', err.message);
});
