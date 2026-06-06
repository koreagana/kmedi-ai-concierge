"""
간단한 이미지+오디오 -> 영상 병합 스크립트
Usage:
  python make_video_from_images.py --images_dir <images_folder> --audio_dir <audio_folder> --start 1 --end 100 --output combined.mp4

동작:
 - 이미지 파일 이름은 001,002,... 형태(확장자 jpg/png 등) 가정
 - 각 이미지에 대응하는 오디오(예: 001.mp3)를 재생 길이만큼 이미지 고정 비디오 생성
 - 임시 mp4들을 ffmpeg concat으로 병합해 최종 비디오 생성

Requires: ffmpeg on PATH
"""

import argparse
import os
import subprocess
from pathlib import Path
from pydub import AudioSegment

COMMON_EXT = ["png", "jpg", "jpeg", "webp"]

def find_image(images_dir: Path, idx: int) -> Path | None:
    base = f"{idx:03d}"
    for ext in COMMON_EXT:
        p = images_dir / f"{base}.{ext}"
        if p.exists():
            return p
    # try any file starting with base
    for p in images_dir.glob(f"{base}.*"):
        if p.is_file():
            return p
    return None


def get_audio_duration_seconds(audio_path: Path) -> float:
    seg = AudioSegment.from_file(audio_path)
    return len(seg) / 1000.0


def create_segment(image_path: Path, audio_path: Path, tmp_out: Path) -> bool:
    # ffmpeg -loop 1 -y -i image -i audio -c:v libx264 -t duration -pix_fmt yuv420p -c:a aac -b:a 192k -shortest out
    # ensure video dimensions are even numbers (required by many encoders)
    cmd = [
        "ffmpeg",
        "-y",
        "-loop", "1",
        "-i", str(image_path),
        "-i", str(audio_path),
        "-vf", "scale=ceil(iw/2)*2:ceil(ih/2)*2",
        "-c:v", "libx264",
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-shortest",
        str(tmp_out)
    ]
    print("RUN:", " ".join(cmd))
    # capture and decode as utf-8 with replacement to avoid encoding errors on Windows
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if res.returncode != 0:
        stderr = res.stderr if res.stderr is not None else ''
        print("ffmpeg failed:", stderr[:1000])
        return False
    return True


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--images_dir", required=True)
    p.add_argument("--audio_dir", required=True)
    p.add_argument("--start", type=int, default=1)
    p.add_argument("--end", type=int, default=100)
    p.add_argument("--output", required=True)
    args = p.parse_args()

    images_dir = Path(args.images_dir)
    audio_dir = Path(args.audio_dir)
    out_path = Path(args.output)

    if not images_dir.exists():
        print("Images dir not found:", images_dir)
        raise SystemExit(1)
    if not audio_dir.exists():
        print("Audio dir not found:", audio_dir)
        raise SystemExit(1)

    tmp_dir = images_dir / "_tmp_video_segments"
    tmp_dir.mkdir(exist_ok=True)

    tmp_files = []
    for i in range(args.start, args.end + 1):
        img = find_image(images_dir, i)
        audio = audio_dir / f"{i:03d}.mp3"
        if img is None:
            print(f"Missing image for {i:03d}, skipping")
            continue
        if not audio.exists():
            print(f"Missing audio for {i:03d}, skipping")
            continue
        tmp_out = tmp_dir / f"seg_{i:03d}.mp4"
        print(f"Creating segment {i:03d}: image={img.name} audio={audio.name} -> {tmp_out.name}")
        ok = create_segment(img, audio, tmp_out)
        if not ok:
            print("Failed to create segment", tmp_out)
            raise SystemExit(1)
        tmp_files.append(tmp_out)

    if not tmp_files:
        print("No segments created. Exiting.")
        raise SystemExit(1)

    list_file = tmp_dir / "ffmpeg_concat_list.txt"
    with open(list_file, "w", encoding="utf-8") as f:
        for t in tmp_files:
            f.write(f"file '{t.as_posix()}'\n")

    # concat
    cmd = [
        "ffmpeg",
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(list_file),
        "-c", "copy",
        str(out_path)
    ]
    print("Merging segments ->", out_path)
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("Concat failed:", res.stderr[:1000])
        raise SystemExit(1)

    print("Merged video saved:", out_path, "size:", out_path.stat().st_size)
    # cleanup tmp
    for t in tmp_files:
        try:
            t.unlink()
        except Exception:
            pass
    try:
        list_file.unlink()
    except Exception:
        pass
    try:
        tmp_dir.rmdir()
    except Exception:
        pass

if __name__ == '__main__':
    main()
