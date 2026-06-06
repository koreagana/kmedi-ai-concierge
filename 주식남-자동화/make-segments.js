/**
 * seg_000~100.mp4 생성 + 최종 합치기
 * - images/주식용어 100선_이미지/ + audio/ → _tmp_video_segments/seg_XXX.mp4
 * - 이미 존재하는 seg 파일은 건너뜀
 * - 전체 생성 후 하나의 롱폼 영상으로 concat
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FFMPEG_BIN = path.join(
  process.env.LOCALAPPDATA,
  'Microsoft', 'WinGet', 'Packages',
  'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe',
  'ffmpeg-8.1.1-full_build', 'bin', 'ffmpeg.exe'
);

const IMAGES_DIR = path.resolve('./images/주식용어 100선_이미지');
const AUDIO_DIR  = path.resolve('./audio');
const SEG_DIR    = path.join(IMAGES_DIR, '_tmp_video_segments');
const FINAL_OUT  = path.resolve('./최종_유튜브영상.mp4');

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp'];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function findImage(dir, num) {
  const base = String(num).padStart(3, '0');
  for (const ext of IMAGE_EXTS) {
    const p = path.join(dir, `${base}${ext}`);
    if (fs.existsSync(p)) return p;
  }
  // 이름이 000_인트로.png 같은 패턴도 허용
  const entries = fs.readdirSync(dir);
  for (const name of entries) {
    if (new RegExp(`^${base}[^\\d]`).test(name)) {
      const ext = path.extname(name).toLowerCase();
      if (IMAGE_EXTS.includes(ext)) return path.join(dir, name);
    }
  }
  return null;
}

function createSegment(imgPath, audioPath, outPath) {
  const args = [
    '-y',
    '-loop', '1',
    '-i', imgPath,
    '-i', audioPath,
    '-vf', 'scale=ceil(iw/2)*2:ceil(ih/2)*2',
    '-c:v', 'libx264',
    '-tune', 'stillimage',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-pix_fmt', 'yuv420p',
    '-shortest',
    outPath
  ];
  execFileSync(FFMPEG_BIN, args, { stdio: 'inherit' });
}

function concatSegments(segFiles, outPath) {
  const listFile = path.join(SEG_DIR, 'ffmpeg_concat_list.txt');
  const content = segFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(listFile, content, 'utf8');

  const args = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', listFile,
    '-c', 'copy',
    outPath
  ];
  execFileSync(FFMPEG_BIN, args, { stdio: 'inherit' });
  console.log(`\n✅ 최종 영상 저장: ${outPath}`);
  console.log(`   크기: ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(1)} MB`);
}

async function main() {
  if (!fs.existsSync(FFMPEG_BIN)) {
    console.error('❌ ffmpeg 를 찾을 수 없습니다:', FFMPEG_BIN);
    process.exit(1);
  }

  ensureDir(SEG_DIR);

  const segFiles = [];
  let skipped = 0;
  let created = 0;
  let missing = 0;

  for (let i = 0; i <= 100; i++) {
    const num = String(i).padStart(3, '0');
    const segPath = path.join(SEG_DIR, `seg_${num}.mp4`);

    if (fs.existsSync(segPath)) {
      console.log(`⏭  건너뜀 (이미 존재): seg_${num}.mp4`);
      segFiles.push(segPath);
      skipped++;
      continue;
    }

    const imgPath   = findImage(IMAGES_DIR, i);
    const audioPath = path.join(AUDIO_DIR, `${num}.mp3`);

    if (!imgPath) {
      console.warn(`⚠️  이미지 없음, 건너뜀: ${num}`);
      missing++;
      continue;
    }
    if (!fs.existsSync(audioPath)) {
      console.warn(`⚠️  오디오 없음, 건너뜀: ${num}.mp3`);
      missing++;
      continue;
    }

    console.log(`🎬 생성중: seg_${num}.mp4  (img: ${path.basename(imgPath)})`);
    try {
      createSegment(imgPath, audioPath, segPath);
      console.log(`✅ 완료: seg_${num}.mp4`);
      segFiles.push(segPath);
      created++;
    } catch (err) {
      console.error(`❌ 실패: seg_${num}.mp4 -`, err.message);
      process.exit(1);
    }
  }

  console.log(`\n📊 결과: 생성 ${created}개 / 건너뜀 ${skipped}개 / 누락 ${missing}개`);

  if (segFiles.length === 0) {
    console.error('❌ 합칠 세그먼트가 없습니다.');
    process.exit(1);
  }

  console.log(`\n🔗 ${segFiles.length}개 세그먼트 합치는 중 → ${FINAL_OUT}`);
  concatSegments(segFiles, FINAL_OUT);
}

main().catch(err => {
  console.error('예상치 못한 오류:', err.message);
  process.exit(1);
});
