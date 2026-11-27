// 관리자 페이지 PIN 확인 (2026-11-27 사장님: 예전 코드에 박힌 PIN을 서버 확인으로 바꿈, check.kmedispring.com과 같은 값)
// PIN은 코드·화면에 두지 않고 Netlify 환경변수 ADMIN_PIN 에만 둔다 (이 저장소는 공개라서).
// 4자리라서 같은 접속 주소(IP)에서 15분 안에 5번 틀리면 15분 동안 잠근다 (Netlify Blobs "admin-pin-guard").
// 쓰는 곳: src/components/AdminPinGate.tsx, public/docs/{pricing,meituan-ads,meituan-auth}.html
import { connectLambda, getStore } from '@netlify/blobs'
import { createHash, timingSafeEqual } from 'node:crypto'

const MAX_FAILS = 5
const WINDOW_MS = 15 * 60 * 1000
const LOCK_MS = 15 * 60 * 1000

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body),
})

function samePin(a, b) {
  const x = Buffer.from(String(a ?? '')), y = Buffer.from(String(b ?? ''))
  return x.length === y.length && timingSafeEqual(x, y)
}

const kst = (ms) => new Date(ms).toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit' })
const lockedMsg = (until) => `여러 번 틀려서 잠겼습니다. ${kst(until)} 이후에 다시 시도해주세요.`

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, message: 'POST only' })
  const PIN = process.env.ADMIN_PIN
  if (!PIN) return json(503, { ok: false, message: '관리자 설정이 필요합니다.' })

  let pin = ''
  try { pin = String(JSON.parse(event.body || '{}').pin ?? '').slice(0, 20) } catch { return json(400, { ok: false, message: '잘못된 요청입니다.' }) }

  const ip = event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown'
  const key = 'ip/' + createHash('sha256').update('admin-pin:' + ip).digest('hex').slice(0, 32)
  const now = Date.now()

  let store, rec
  try {
    if (globalThis.__adminPinStore) store = globalThis.__adminPinStore // 테스트용
    else {
      connectLambda(event)
      store = getStore('admin-pin-guard')
    }
    rec = await store.get(key, { type: 'json' })
  } catch (e) {
    // 잠금 기록을 못 읽으면 받지 않는다 (4자리라서 잠금 없이 열어 두지 않기)
    console.error('admin-pin guard', e)
    return json(503, { ok: false, message: '잠시 후 다시 시도해주세요.' })
  }
  if (rec?.lockedUntil > now) return json(429, { ok: false, message: lockedMsg(rec.lockedUntil) })

  if (samePin(pin, PIN)) {
    await store.delete(key).catch(() => {})
    return json(200, { ok: true })
  }

  await new Promise((r) => setTimeout(r, 800))
  const fresh = !rec || now - (rec.firstAt ?? now) > WINDOW_MS
  const fails = (fresh ? 0 : rec.fails ?? 0) + 1
  if (fails >= MAX_FAILS) {
    await store.setJSON(key, { fails: 0, firstAt: now, lockedUntil: now + LOCK_MS }).catch(() => {})
    return json(429, { ok: false, message: lockedMsg(now + LOCK_MS) })
  }
  await store.setJSON(key, { fails, firstAt: fresh ? now : rec.firstAt, lockedUntil: 0 }).catch(() => {})
  return json(401, { ok: false, message: '비밀번호가 올바르지 않습니다.' })
}
