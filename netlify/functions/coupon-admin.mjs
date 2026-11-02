// 打卡 보상 쿠폰 확인·사용 처리 (관리 페이지 /admin/coupons/ 전용, 2026-11-02 사장님)
// 관리 페이지 → 이 함수 → 위챗 서버 API(tcb/invokecloudfunction) → 미니프로그램 클라우드 함수 couponAdmin
// 비밀값은 코드에 두지 않고 Netlify 환경변수로만:
//   COUPON_ADMIN_KEY  관리 화면에서 입력하는 관리 키 (관리 페이지 비밀번호 0707과 다른 긴 값)
//   WX_APPID / WX_APPSECRET  미니프로그램 AppID·AppSecret (公众平台 → 开发管理 → 开发设置)
// 환경변수가 없으면 아무것도 하지 않는다.
import { timingSafeEqual } from 'node:crypto'

const ENV = 'cloud1-0gg9whtvd4dd4b85'
const ACTIONS = ['find', 'use', 'unuse', 'recent']

const json = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) })

function sameKey(a, b) {
  const x = Buffer.from(String(a || '')), y = Buffer.from(String(b || ''))
  return x.length === y.length && timingSafeEqual(x, y)
}

// stable_token: 다른 곳에서 쓰는 access_token을 무효로 만들지 않는 방식
async function token() {
  const r = await fetch('https://api.weixin.qq.com/cgi-bin/stable_token', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'client_credential', appid: process.env.WX_APPID, secret: process.env.WX_APPSECRET }),
  })
  const d = await r.json()
  if (!d.access_token) throw new Error('token ' + (d.errcode || '') + ' ' + (d.errmsg || ''))
  return d.access_token
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'POST only' })
  const { COUPON_ADMIN_KEY, WX_APPID, WX_APPSECRET } = process.env
  if (!COUPON_ADMIN_KEY || !WX_APPID || !WX_APPSECRET) return json(503, { ok: false, error: 'not configured' })

  let body = {}
  try { body = JSON.parse(event.body || '{}') } catch { return json(400, { ok: false, error: 'bad json' }) }
  if (!sameKey(body.key, COUPON_ADMIN_KEY)) return json(401, { ok: false, error: 'wrong key' })
  if (!ACTIONS.includes(body.action)) return json(400, { ok: false, error: 'bad action' })

  const data = { action: body.action, code: String(body.code || '').slice(0, 40), by: String(body.by || '').slice(0, 20), limit: Number(body.limit) || 30 }
  try {
    const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${await token()}&env=${ENV}&name=couponAdmin`
    const r = await (await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })).json()
    if (r.errcode) return json(502, { ok: false, error: 'wechat ' + r.errcode + ' ' + (r.errmsg || '') })
    return json(200, JSON.parse(r.resp_data || '{}'))
  } catch (e) {
    return json(502, { ok: false, error: String(e.message || e).slice(0, 200) })
  }
}
