/**
 * 관리자용 협력기관 명부(src/admin/partners/partners.json)에서 공개 사이트에 보여줄 것만 뽑는다.
 *   - 대학병원은 날인(active)한 곳만, 그 외는 show_on_site: true 인 곳만(아래 공개 기준)
 *   - 이름·분류·도시·로고 경로만 — 담당자 연락처·내부 메모가 공개 번들에 섞이지 않게
 * 결과: src/data/partnersPublic.generated.json (커밋함 — 개발 서버에서도 바로 쓰도록)
 * 빌드 때마다 다시 만든다(package.json build). 명부를 고친 뒤 개발 중엔: node scripts/gen-public-partners.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const all = JSON.parse(readFileSync(resolve(root, 'src/admin/partners/partners.json'), 'utf-8'))

/** 주소 앞부분에서 도시만: "首尔特别市江南区…" → 首尔 / "京畿道城南市…" → 城南 / "济州…" → 济州 */
function cityOf(address) {
  const zh = address?.zh ?? ''
  const en = address?.en ?? ''
  const zhCity = zh.match(/^(首尔|釜山|大邱|仁川|光州|大田|蔚山|济州)/)?.[1]
    ?? zh.match(/^京畿道(\S+?)市/)?.[1]
    ?? zh.slice(0, 2)
  const enCity = en.match(/(Seoul|Busan|Daegu|Incheon|Jeju|Seongnam|Suwon|Goyang)/)?.[1] ?? ''
  return { zh: zhCity, en: enCity }
}

// 공개 기준(사용자 결정 2026-10-01):
//   - 대학병원(상급종합·3차 포함): 협약 날인(active)한 곳 전부
//   - 성형·피부·의원 등: 명부에 "show_on_site": true 로 직접 표시한 곳 — 날인 전(pending)이라도
//     이미 실제로 환자를 보내고 있는 곳은 사용자가 노출을 허락함. (status는 실제 날인 여부 그대로 둔다.
//     그래서 페이지 문구는 "正式签约"이 아니라 "合作医疗机构"로 쓴다.)
const isHospital = (p) => p.category === '대학병원'
const out = all
  .filter((p) => (isHospital(p) && p.status === 'active') || p.show_on_site === true)
  .map((p) => ({
    id: p.id,
    category: p.category,
    name: { zh: p.name?.zh ?? p.name?.ko, en: p.name?.en ?? p.name?.ko, ko: p.name?.ko },
    city: cityOf(p.address),
    // 손님에게 도움이 되는 위치 한 줄(예: 더클리닉 "首尔新罗酒店内") — 명부의 place 필드
    place: p.place ? { zh: p.place.zh ?? null, en: p.place.en ?? null } : null,
    logo: p.logo_url || null,
  }))

writeFileSync(resolve(root, 'src/data/partnersPublic.generated.json'), JSON.stringify(out, null, 2) + '\n', 'utf-8')
console.log(`[partners] ${out.length} public partners → src/data/partnersPublic.generated.json`)
