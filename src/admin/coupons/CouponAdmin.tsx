import { useEffect, useState } from "react";

/**
 * 打卡 보상 쿠폰 확인·사용 처리 (관리자 전용, 2026-11-02 사장님)
 * ------------------------------------------------------------
 * 미니프로그램에서 연속 30·60일 출석하면 위챗 클라우드가 쿠폰을 발급한다(cloudfunctions/checkin).
 * 고객이 보여 준 쿠폰 번호를 넣으면 진짜인지·쓸 수 있는지 보여 주고, 픽업·샌딩을 해 준 뒤 「사용 완료」를 누른다.
 * 서버: netlify/functions/coupon-admin.mjs → 위챗 클라우드 함수 couponAdmin
 * 관리 키(COUPON_ADMIN_KEY)는 이 기기에만 저장된다. 관리 페이지 비밀번호(0707)와 다르다.
 */

interface Coupon {
  code: string;
  days: number;
  issued: string;
  expires: string;
  used: boolean;
  usedAt: string;
  usedBy: string;
  expired: boolean;
  who: string;
}

const KEY_STORE = "hgab-coupon-admin-key";
const BY_STORE = "hgab-coupon-admin-by";

const ERRORS: Record<string, string> = {
  "not configured": "서버 설정이 아직 안 됐습니다 (Netlify 환경변수 COUPON_ADMIN_KEY·WX_APPID·WX_APPSECRET).",
  "wrong key": "관리 키가 틀립니다. 아래 「관리 키 바꾸기」에서 다시 넣어 주세요.",
  "not found": "없는 쿠폰 번호입니다. 번호를 다시 확인해 주세요.",
  "already used": "이미 사용한 쿠폰입니다.",
  expired: "유효기간이 지난 쿠폰입니다.",
  "no code": "쿠폰 번호를 넣어 주세요.",
};

const KIND: Record<number, string> = {
  30: "연속 30일 · 공항 픽업 또는 샌딩 1회",
  60: "연속 60일 · 공항 픽업 + 샌딩 각 1회",
};

const read = (k: string) => {
  try {
    return localStorage.getItem(k) || "";
  } catch {
    return "";
  }
};
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* 저장 불가 — 이번만 사용 */
  }
};

async function api(key: string, body: Record<string, unknown>) {
  const r = await fetch("/.netlify/functions/coupon-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, ...body }),
  });
  return r.json().catch(() => ({ ok: false, error: "서버 응답 오류 " + r.status }));
}

const errText = (e: string) => ERRORS[e] || "오류: " + e;

function Status({ c }: { c: Coupon }) {
  const s = c.used
    ? { t: "이미 사용", bg: "#F1F3F5", fg: "#5E6B7A" }
    : c.expired
      ? { t: "기한 지남", bg: "#FDF0EF", fg: "#B23A2E" }
      : { t: "사용 가능", bg: "#E6F4EC", fg: "#0F6E56" };
  return (
    <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: 999, background: s.bg, color: s.fg, fontWeight: 700, fontSize: 18 }}>
      {s.t}
    </span>
  );
}

export default function CouponAdmin() {
  const [key, setKey] = useState(() => read(KEY_STORE));
  const [keyInput, setKeyInput] = useState("");
  const [by, setBy] = useState(() => read(BY_STORE));
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [recent, setRecent] = useState<Coupon[]>([]);

  const loadRecent = async (k = key) => {
    if (!k) return;
    const r = await api(k, { action: "recent", limit: 30 });
    if (r.ok) setRecent(r.list || []);
    else if (r.error) setMsg(errText(r.error));
  };

  useEffect(() => {
    loadRecent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const run = async (action: "find" | "use" | "unuse", c = code) => {
    const clean = c.trim().toUpperCase();
    if (!clean) return setMsg(errText("no code"));
    setBusy(true);
    setMsg("");
    const r = await api(key, { action, code: clean, by });
    setBusy(false);
    if (r.coupon) setCoupon(r.coupon);
    else setCoupon(null);
    if (!r.ok) setMsg(errText(r.error));
    else if (action === "use") setMsg("✅ 사용 완료로 처리했습니다.");
    else if (action === "unuse") setMsg("되돌렸습니다. 다시 사용 가능 상태입니다.");
    if (action !== "find") loadRecent();
  };

  const saveKey = () => {
    const k = keyInput.trim();
    if (!k) return;
    write(KEY_STORE, k);
    setKey(k);
    setKeyInput("");
    setMsg("");
  };

  const box: React.CSSProperties = { background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 4px 16px rgba(0,119,182,0.08)", marginBottom: 20 };
  const input: React.CSSProperties = { width: "100%", boxSizing: "border-box", fontSize: 22, padding: "14px 16px", borderRadius: 12, border: "2px solid #C8DCEC", outline: "none" };
  const btn = (bg: string): React.CSSProperties => ({ whiteSpace: "nowrap", flexShrink: 0, border: "none", borderRadius: 12, padding: "14px 22px", fontSize: 18, fontWeight: 700, color: "#fff", background: bg, cursor: "pointer" });

  return (
    <div style={{ background: "#EEF5FB", minHeight: "100vh", padding: "32px 16px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, margin: "0 0 4px", color: "#1F2A37" }}>打卡 쿠폰 확인·사용 처리</h1>
        <p style={{ margin: "0 0 24px", color: "#5E6B7A", fontSize: 15, lineHeight: 1.6 }}>
          고객이 미니프로그램 「我的奖励券」에서 보여 준 <b>쿠폰 번호</b>를 넣고 확인하세요.
          <br />
          픽업·샌딩을 해 드린 뒤 <b>「사용 완료」</b>를 누릅니다.
        </p>

        {!key ? (
          <div style={box}>
            <p style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 700 }}>관리 키 넣기 (처음 한 번)</p>
            <p style={{ margin: "0 0 12px", fontSize: 14, color: "#5E6B7A" }}>Netlify에 넣어 둔 COUPON_ADMIN_KEY 값입니다. 이 기기에만 저장됩니다.</p>
            <input style={input} type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveKey()} />
            <button style={{ ...btn("#0077B6"), marginTop: 12 }} onClick={saveKey}>
              저장
            </button>
          </div>
        ) : (
          <>
            <div style={box}>
              <p style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 700 }}>쿠폰 번호</p>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  style={{ ...input, fontFamily: "Menlo, Consolas, monospace", letterSpacing: 1, textTransform: "uppercase" }}
                  placeholder="HJ30-261102-ABCD"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run("find")}
                />
                <button style={btn("#0077B6")} disabled={busy} onClick={() => run("find")}>
                  확인
                </button>
              </div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#5E6B7A" }}>
                처리자
                <input
                  style={{ fontSize: 15, padding: "6px 10px", borderRadius: 8, border: "1px solid #C8DCEC", width: 140 }}
                  placeholder="예: 이가나"
                  value={by}
                  onChange={(e) => {
                    setBy(e.target.value);
                    write(BY_STORE, e.target.value);
                  }}
                />
              </div>
            </div>

            {msg && (
              <div style={{ ...box, padding: "16px 24px", fontSize: 17, fontWeight: 600, color: msg.startsWith("✅") ? "#0F6E56" : "#B23A2E" }}>{msg}</div>
            )}

            {coupon && (
              <div style={{ ...box, borderTop: "6px solid #0077B6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <span style={{ fontFamily: "Menlo, Consolas, monospace", fontSize: 22, fontWeight: 700 }}>{coupon.code}</span>
                  <Status c={coupon} />
                </div>
                <table style={{ width: "100%", marginTop: 16, fontSize: 17, borderCollapse: "collapse" }}>
                  <tbody>
                    {[
                      ["종류", KIND[coupon.days] || coupon.days + "일"],
                      ["발급일", coupon.issued],
                      ["유효기간", coupon.expires + " 까지"],
                      ["동행인", "최대 2명"],
                      ["고객 구분", "…" + coupon.who + " (같은 사람인지 확인용)"],
                      ...(coupon.used ? [["사용", coupon.usedAt + (coupon.usedBy ? " · " + coupon.usedBy : "")]] : []),
                    ].map(([k, v]) => (
                      <tr key={k}>
                        <td style={{ padding: "8px 0", color: "#5E6B7A", width: 110 }}>{k}</td>
                        <td style={{ padding: "8px 0", fontWeight: 600 }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {!coupon.used && !coupon.expired && (
                    <button
                      style={btn("#0F6E56")}
                      disabled={busy}
                      onClick={() => window.confirm(coupon.code + "\n사용 완료로 처리할까요? (픽업·샌딩을 해 드린 뒤에 누르세요)") && run("use", coupon.code)}
                    >
                      사용 완료 처리
                    </button>
                  )}
                  {coupon.used && (
                    <button
                      style={btn("#7C8B9C")}
                      disabled={busy}
                      onClick={() => window.confirm("잘못 누른 경우에만 되돌리세요. 다시 사용 가능 상태로 바꿀까요?") && run("unuse", coupon.code)}
                    >
                      사용 취소 (잘못 누른 경우)
                    </button>
                  )}
                </div>
              </div>
            )}

            <div style={box}>
              <p style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 700 }}>최근 발급된 쿠폰</p>
              {!recent.length ? (
                <p style={{ margin: 0, color: "#7C8B9C", fontSize: 15 }}>아직 발급된 쿠폰이 없습니다.</p>
              ) : (
                <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ color: "#7C8B9C", textAlign: "left" }}>
                      <th style={{ padding: "6px 4px" }}>번호</th>
                      <th style={{ padding: "6px 4px" }}>종류</th>
                      <th style={{ padding: "6px 4px" }}>발급</th>
                      <th style={{ padding: "6px 4px" }}>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((c) => (
                      <tr key={c.code} style={{ borderTop: "1px solid #EEF2F5", cursor: "pointer" }} onClick={() => { setCode(c.code); run("find", c.code); }}>
                        <td style={{ padding: "8px 4px", fontFamily: "Menlo, Consolas, monospace" }}>{c.code}</td>
                        <td style={{ padding: "8px 4px" }}>{c.days}일</td>
                        <td style={{ padding: "8px 4px" }}>{c.issued}</td>
                        <td style={{ padding: "8px 4px", fontWeight: 600, color: c.used ? "#7C8B9C" : c.expired ? "#B23A2E" : "#0F6E56" }}>
                          {c.used ? "사용" : c.expired ? "만료" : "가능"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <p style={{ textAlign: "center" }}>
              <button
                style={{ background: "none", border: "none", color: "#7C8B9C", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
                onClick={() => {
                  write(KEY_STORE, "");
                  setKey("");
                  setRecent([]);
                  setCoupon(null);
                }}
              >
                관리 키 바꾸기
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
