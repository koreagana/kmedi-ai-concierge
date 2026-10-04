/**
 * kmedispring.com 명조 제목 글꼴(public/fonts/kms-serif-sc-900.woff2) 생성기.
 *
 * Noto Serif CJK SC Black(= 思源宋体 Heavy, SIL OFL 1.1)에서 사이트 소스(src·public·index.html)에
 * 실제로 쓰인 한자·문장부호·ASCII만 남겨 woff2로 만든다. 제목에 새 한자가 들어갔는데 그 글자만
 * 다른 글꼴로 보이면 이걸 다시 돌리면 된다:
 *   node scripts/build-serif-font.mjs
 * 원본 OTF(약 11MB)는 처음 한 번 GitHub(notofonts/noto-cjk)에서 받아 node_modules/.cache에 둔다.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import subsetFont from 'subset-font'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OTF_URL = 'https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/SC/NotoSerifSC-Black.otf'
const cacheDir = join(root, 'node_modules', '.cache', 'serif-font')
const otfPath = join(cacheDir, 'NotoSerifSC-Black.otf')
const outPath = join(root, 'public', 'fonts', 'kms-serif-sc-900.woff2')

const SKIP = /node_modules|dist|\.git|docs|admin|price/
const EXTRA = new Set([0xb7, 0x2013, 0x2014, 0x2018, 0x2019, 0x201c, 0x201d, 0x2026, 0xae, 0xd7, 0x2192, 0x203a])
const chars = new Set()
for (let c = 0x20; c < 0x7f; c++) chars.add(String.fromCharCode(c))

function collect(file) {
  for (const ch of readFileSync(file, 'utf8')) {
    const cp = ch.codePointAt(0)
    if ((cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0x3000 && cp <= 0x303f) || (cp >= 0xff00 && cp <= 0xffef) || EXTRA.has(cp)) chars.add(ch)
  }
}
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (SKIP.test(relative(root, p))) continue
    const st = statSync(p)
    if (st.isDirectory()) walk(p)
    else if (/\.(ts|tsx|json|html)$/.test(name) && st.size < 3e6) collect(p)
  }
}
walk(join(root, 'src'))
walk(join(root, 'public'))
collect(join(root, 'index.html'))

if (!existsSync(otfPath)) {
  mkdirSync(cacheDir, { recursive: true })
  console.log('원본 글꼴 내려받는 중…')
  const res = await fetch(OTF_URL)
  if (!res.ok) throw new Error(`download failed: ${res.status}`)
  writeFileSync(otfPath, Buffer.from(await res.arrayBuffer()))
}

const out = await subsetFont(readFileSync(otfPath), [...chars].join(''), { targetFormat: 'woff2' })
writeFileSync(outPath, out)
console.log(`${chars.size}자 → ${relative(root, outPath)} (${(out.length / 1024).toFixed(0)}KB)`)
