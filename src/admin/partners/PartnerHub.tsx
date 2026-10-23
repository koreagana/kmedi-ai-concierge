import { useMemo, useState } from "react";
import partnersData from "./partners.json";
import hospitalData from "../병원찾기/hospitalData.json";
import { HOSPITAL_PRICES } from "../prices/priceSheets";
import doctorsData from "../doctors/doctors.json";

/**
 * 협력의료기관 (관리자 전용) — /admin/partners/
 * ------------------------------------------------------------
 * 예전 「병원찾기」(시술로 찾기)와 「협력의료기관 대장」(병원 명부)을 한 페이지로 합쳤다 (사용자 2026-10-23).
 * 데이터 파일은 그대로 둔다:
 *  - partners.json        병원 명부(주소·협약 상태·메모). 홈페이지 고객 화면 「合作医疗机构」의 원본이기도 함
 *  - hospitalData.json    시술별 병원·담당의·가격 — 이름이 맞는 병원 카드에 붙인다. 명부에 없는 병원은 「협약 없음」 카드로
 * 병원 정보를 고칠 때: 주소·상태·메모는 partners.json, 시술·담당의·가격은 hospitalData.json
 */

type Lang = "ko" | "zh" | "en";
interface Partner {
  id: string;
  category: string;
  name: Record<Lang, string>;
  address: Record<Lang, string>;
  phone: string | null;
  note: string | null;
  contact?: { manager: string | null; email: string | null; phone_direct: string | null };
  website: string | null;
  status: string;
  mou_date: string | null;
  show_on_site?: boolean;
  hide_reason?: string;
}
interface ProcHospital {
  name: string;
  doctor: string;
  phone: string;
  city: string;
  price?: string;
  priceNote?: string;
}
interface ProcEntry {
  procedure: string;
  category: string;
  hospitals: ProcHospital[];
}
interface Procedure {
  procedure: string;
  category: string;
  doctor: string;
  phone: string;
  city: string;
  price?: string;
  priceNote?: string;
}
type State = "active" | "pending" | "none" | "hidden";
interface Hub {
  key: string;
  nameKo: string;
  nameAlt: string;
  kind: string;
  state: State;
  partner: Partner | null;
  city: string;
  phone: string | null;
  procedures: Procedure[];
  hasPrices: boolean;
  doctors: { zh: string; ko: string }[];
}

const STATE: Record<State, { label: string; bg: string; fg: string; order: number }> = {
  active: { label: "협약 완료", bg: "rgba(15,110,86,0.10)", fg: "#0F6E56", order: 0 },
  pending: { label: "협약 대기", bg: "rgba(184,147,76,0.16)", fg: "#8A6C33", order: 1 },
  none: { label: "협약 없음", bg: "rgba(124,139,156,0.14)", fg: "#5E6B7A", order: 2 },
  hidden: { label: "사이트 비노출", bg: "rgba(178,58,46,0.09)", fg: "#B23A2E", order: 3 },
};

// 이름 맞추기: 띄어쓰기만 무시하고 비교. 괄호 속 다른 이름도 인정 ("차병원 서울 (강남차병원)" = "강남차병원").
// 한쪽이 다른 쪽을 품는 경우는 6글자 이상일 때만 ("세브란스병원" ⊂ "연세대학교세브란스병원") —
// 짧으면 「바노바기피부과/성형외과」, 「강남차/분당차」처럼 다른 병원이 붙어 버린다
const forms = (s: string) => {
  const flat = (t: string) => t.replace(/\s/g, "").toLowerCase();
  const alias = s.match(/\((.*?)\)/)?.[1];
  return [flat(s.replace(/\(.*?\)/g, "")), ...(alias ? [flat(alias)] : [])].filter(Boolean);
};
const same = (a: string, b: string) =>
  forms(a).some((x) =>
    forms(b).some((y) => x === y || (Math.min(x.length, y.length) >= 6 && (x.includes(y) || y.includes(x))))
  );

// 의사 명단의 소속 글(「분당차병원 난임센터」)이 병원 이름으로 시작하면 그 병원 의사로 본다
const atHospital = (where: string, name: string) => {
  const w = where.split(/[(（·,]/)[0].replace(/\s/g, "");
  return same(w, name) || forms(name).some((n) => n.length >= 4 && w.startsWith(n));
};

function buildHubs(): Hub[] {
  const partners = partnersData as Partner[];
  const procs = hospitalData as ProcEntry[];
  const priceNames = HOSPITAL_PRICES.filter((p) => !p.referenceOnly).map((p) => p.name);
  const roster = (doctorsData.rows as { zh: string | null; ko: string; hospital: string; status: string }[]).filter(
    (r) => r.zh && (r.status === "app" || r.status === "cloud")
  );

  const hubs: Hub[] = partners.map((p) => ({
    key: p.id,
    nameKo: p.name.ko,
    nameAlt: [p.name.zh, p.name.en].filter(Boolean).join(" · "),
    kind: p.category,
    state: p.hide_reason ? "hidden" : p.status === "active" ? "active" : "pending",
    partner: p,
    city: (p.address.ko || "").split(" ").slice(0, 2).join(" "),
    phone: p.phone,
    procedures: [],
    hasPrices: priceNames.some((n) => same(n, p.name.ko)),
    doctors: roster.filter((r) => atHospital(r.hospital, p.name.ko)).map((r) => ({ zh: r.zh as string, ko: r.ko })),
  }));

  procs.forEach((entry) =>
    entry.hospitals.forEach((h) => {
      let hub = hubs.find((x) => same(x.nameKo, h.name));
      if (!hub) {
        hub = {
          key: "X-" + h.name,
          nameKo: h.name,
          nameAlt: "",
          kind: "협약 없음",
          state: "none",
          partner: null,
          city: h.city,
          phone: h.phone,
          procedures: [],
          hasPrices: priceNames.some((n) => same(n, h.name)),
          doctors: roster.filter((r) => atHospital(r.hospital, h.name)).map((r) => ({ zh: r.zh as string, ko: r.ko })),
        };
        hubs.push(hub);
      }
      hub.procedures.push({ procedure: entry.procedure, category: entry.category, ...h });
    })
  );
  return hubs.sort((a, b) => STATE[a.state].order - STATE[b.state].order || a.nameKo.localeCompare(b.nameKo, "ko"));
}

const HUBS = buildHubs();
const PROC_CATS = Array.from(new Set((hospitalData as ProcEntry[]).map((d) => d.category)));
const STATE_FILTERS: { key: "all" | State; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "active", label: "협약 완료" },
  { key: "pending", label: "협약 대기" },
  { key: "none", label: "협약 없음" },
];

const CSS = `
.ph { --ink:#1C2733; --sub:#5F6F80; --line:#DCE4EC; --bg:#F5F7FA; --navy:#1C3F66; --accent:#0A6FAE;
  background:var(--bg); min-height:100vh; color:var(--ink); font-family:"Noto Sans KR",-apple-system,sans-serif; }
.ph-wrap { max-width:1040px; margin:0 auto; padding:32px max(16px, env(safe-area-inset-right,0px)) 40px max(16px, env(safe-area-inset-left,0px)); }
.ph-h1 { font-family:"Noto Serif KR",serif; font-size:26px; color:var(--navy); margin:0; }
.ph-lead { color:var(--sub); font-size:14px; margin:8px 0 0; line-height:1.7; max-width:64ch; }
.ph-bar { position:sticky; top:0; z-index:5; background:var(--bg); padding:16px 0 10px; display:grid; gap:10px; }
.ph-q { width:100%; box-sizing:border-box; font:inherit; font-size:15px; padding:11px 14px; border:1px solid var(--line); border-radius:10px; background:#fff; color:var(--ink); }
.ph-q:focus-visible, .ph-chip:focus-visible, .ph-card:focus-visible, .ph-btn:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.ph-chips { display:flex; flex-wrap:wrap; gap:6px; }
.ph-chip { font:inherit; font-size:13px; border:1px solid var(--line); background:#fff; color:var(--ink); border-radius:999px; padding:5px 12px; cursor:pointer; }
.ph-chip[aria-pressed="true"] { background:var(--navy); border-color:var(--navy); color:#fff; }
.ph-chip.small { font-size:12px; padding:4px 10px; }
.ph-count { font-size:13px; color:var(--sub); font-variant-numeric:tabular-nums; }
.ph-list { display:grid; gap:8px; }
.ph-card { background:#fff; border:1px solid var(--line); border-radius:12px; padding:14px 16px; cursor:pointer; text-align:left; }
.ph-card.dim { opacity:.78; }
.ph-top { display:flex; gap:10px; align-items:flex-start; justify-content:space-between; }
.ph-name { font-weight:700; font-size:16px; }
.ph-alt { font-size:12px; color:var(--sub); margin-top:2px; }
.ph-badge { font-size:12px; border-radius:999px; padding:3px 10px; white-space:nowrap; }
.ph-meta { display:flex; flex-wrap:wrap; gap:6px 12px; font-size:13px; color:var(--sub); margin-top:8px; }
.ph-procs { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
.ph-proc { font-size:12px; background:#EEF3F8; color:var(--navy); border-radius:6px; padding:2px 8px; }
.ph-docs { font-size:13px; margin-top:8px; color:var(--accent); }
.ph-docs a { color:inherit; }
.ph-detail { margin-top:12px; padding-top:12px; border-top:1px solid var(--line); display:grid; gap:10px; font-size:14px; cursor:default; }
.ph-row { display:grid; grid-template-columns:72px minmax(0,1fr); gap:8px; line-height:1.6; }
.ph-k { color:var(--sub); font-size:13px; }
.ph-v { min-width:0; word-break:break-word; }
.ph-tel { color:var(--accent); font-weight:600; text-decoration:none; }
.ph-ptable { display:grid; gap:6px; }
.ph-pitem { border:1px solid var(--line); border-radius:10px; padding:10px 12px; display:grid; gap:4px; }
.ph-pitem b { font-size:14px; }
.ph-pline { font-size:13px; color:var(--sub); }
.ph-btns { display:flex; flex-wrap:wrap; gap:8px; }
.ph-btn { font:inherit; font-size:13px; border:1px solid var(--accent); color:var(--accent); background:#fff; border-radius:8px; padding:6px 12px; cursor:pointer; text-decoration:none; }
.ph-btn.solid { background:var(--accent); color:#fff; }
.ph-empty { text-align:center; color:var(--sub); padding:28px 0; }
`;

function memoText(h: Hub, p?: Procedure) {
  const lines = ["[한강애봄 환자배정]"];
  if (p) lines.push(`시술/질환: ${p.procedure}`);
  lines.push(`병원: ${h.nameKo}`);
  if (p) lines.push(`담당의: ${p.doctor}`);
  lines.push(`연락처: ${(p && p.phone) || h.phone || "문의 필요"}`);
  lines.push(`지역: ${(p && p.city) || h.city}`);
  if (p && p.price) lines.push(`가격: ${p.price}${p.priceNote ? ` (${p.priceNote})` : ""}`);
  lines.push(`협약: ${STATE[h.state].label}`);
  return lines.join("\n");
}

export default function PartnerHub() {
  const [q, setQ] = useState("");
  const [stateF, setStateF] = useState<"all" | State>("all");
  const [procF, setProcF] = useState<string>("");
  const [open, setOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const list = useMemo(() => {
    const w = q.trim().toLowerCase();
    return HUBS.filter((h) => {
      if (stateF !== "all" && h.state !== stateF) return false;
      if (procF && !h.procedures.some((p) => p.category === procF)) return false;
      if (!w) return true;
      const p = h.partner;
      const text = [
        h.nameKo, h.nameAlt, h.kind, h.city,
        p?.address.ko, p?.address.zh, p?.note,
        ...h.procedures.flatMap((x) => [x.procedure, x.category, x.doctor]),
        ...h.doctors.flatMap((d) => [d.zh, d.ko]),
      ].join(" ").toLowerCase();
      return text.includes(w);
    });
  }, [q, stateF, procF]);

  const copy = (key: string, text: string) => {
    const done = () => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    };
    navigator.clipboard?.writeText(text).then(done, () => window.prompt("복사해서 쓰세요", text));
  };

  return (
    <div className="ph">
      <style>{CSS}</style>
      <div className="ph-wrap">
        <h1 className="ph-h1">협력의료기관</h1>
        <p className="ph-lead">시술 이름, 병원 이름, 지역, 담당 의사로 찾을 수 있습니다. 협약 완료 → 협약 대기 → 협약 없음 순서로 보입니다.</p>

        <div className="ph-bar">
          <input
            id="ph-q"
            className="ph-q"
            type="search"
            placeholder="예: 쌍꺼풀, 울쎄라, 난임, 바노바기, 강남, 梁桐准"
            aria-label="협력의료기관 검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="ph-chips" role="group" aria-label="협약 상태">
            {STATE_FILTERS.map((f) => (
              <button key={f.key} className="ph-chip" aria-pressed={stateF === f.key} onClick={() => setStateF(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="ph-chips" role="group" aria-label="시술 분야">
            {PROC_CATS.map((c) => (
              <button key={c} className="ph-chip small" aria-pressed={procF === c} onClick={() => setProcF(procF === c ? "" : c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="ph-count">
            {list.length}곳 표시 · 협약 완료 {HUBS.filter((h) => h.state === "active").length} · 협약 대기{" "}
            {HUBS.filter((h) => h.state === "pending").length} · 협약 없음 {HUBS.filter((h) => h.state === "none").length}
          </div>
        </div>

        <div className="ph-list">
          {list.length === 0 && <div className="ph-empty">찾는 병원이 없습니다. 검색어를 줄여 보세요.</div>}
          {list.map((h) => {
            const s = STATE[h.state];
            const isOpen = open === h.key;
            const p = h.partner;
            return (
              <div
                key={h.key}
                className={`ph-card${h.state === "none" || h.state === "hidden" ? " dim" : ""}`}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : h.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setOpen(isOpen ? null : h.key);
                }}
              >
                <div className="ph-top">
                  <div>
                    <div className="ph-name">{h.nameKo}</div>
                    {h.nameAlt && <div className="ph-alt">{h.nameAlt}</div>}
                  </div>
                  <span className="ph-badge" style={{ background: s.bg, color: s.fg }}>
                    {s.label}
                  </span>
                </div>
                <div className="ph-meta">
                  <span>{h.kind}</span>
                  {h.city && <span>{h.city}</span>}
                  {p?.note && !isOpen && <span>{p.note.length > 40 ? p.note.slice(0, 40) + "…" : p.note}</span>}
                </div>
                {h.procedures.length > 0 && (
                  <div className="ph-procs">
                    {Array.from(new Set(h.procedures.map((x) => x.procedure))).map((x) => (
                      <span key={x} className="ph-proc">{x}</span>
                    ))}
                  </div>
                )}
                {h.doctors.length > 0 && (
                  <div className="ph-docs">
                    百名百医: {h.doctors.map((d) => `${d.zh}(${d.ko})`).join(", ")}
                  </div>
                )}

                {isOpen && (
                  <div className="ph-detail" onClick={(e) => e.stopPropagation()}>
                    {p && (
                      <>
                        <div className="ph-row"><span className="ph-k">주소</span><span className="ph-v">{p.address.ko}</span></div>
                        <div className="ph-row"><span className="ph-k">中文</span><span className="ph-v">{p.address.zh}</span></div>
                        <div className="ph-row"><span className="ph-k">EN</span><span className="ph-v">{p.address.en}</span></div>
                      </>
                    )}
                    <div className="ph-row">
                      <span className="ph-k">전화</span>
                      <span className="ph-v">
                        {h.phone && /\d/.test(h.phone) ? <a className="ph-tel" href={`tel:${h.phone.replace(/[^\d+]/g, "")}`}>{h.phone}</a> : h.phone || "문의 필요"}
                      </span>
                    </div>
                    {p?.contact?.manager && <div className="ph-row"><span className="ph-k">담당자</span><span className="ph-v">{p.contact.manager}</span></div>}
                    {p?.contact?.phone_direct && <div className="ph-row"><span className="ph-k">직통</span><span className="ph-v">{p.contact.phone_direct}</span></div>}
                    {p?.contact?.email && <div className="ph-row"><span className="ph-k">이메일</span><span className="ph-v">{p.contact.email}</span></div>}
                    {p?.mou_date && <div className="ph-row"><span className="ph-k">협약일</span><span className="ph-v">{p.mou_date}</span></div>}
                    {p?.note && <div className="ph-row"><span className="ph-k">메모</span><span className="ph-v">{p.note}</span></div>}
                    {p?.hide_reason && <div className="ph-row"><span className="ph-k">비노출</span><span className="ph-v">{p.hide_reason}</span></div>}
                    {p?.website && (
                      <div className="ph-row"><span className="ph-k">홈페이지</span><span className="ph-v"><a href={p.website} target="_blank" rel="noreferrer">{p.website}</a></span></div>
                    )}

                    {h.procedures.length > 0 && (
                      <div className="ph-ptable">
                        {h.procedures.map((x, i) => (
                          <div className="ph-pitem" key={x.procedure + i}>
                            <b>{x.procedure} <span className="ph-pline">· {x.category}</span></b>
                            <span className="ph-pline">담당의 {x.doctor}{x.phone && x.phone !== h.phone ? ` · ${x.phone}` : ""}</span>
                            {x.price && <span className="ph-pline">가격 {x.price}{x.priceNote ? ` (${x.priceNote})` : ""}</span>}
                            <div className="ph-btns">
                              <button className="ph-btn" onClick={() => copy(h.key + i, memoText(h, x))}>
                                {copied === h.key + i ? "복사됨 ✓" : "환자배정 메모 복사"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="ph-btns">
                      {h.procedures.length === 0 && (
                        <button className="ph-btn" onClick={() => copy(h.key, memoText(h))}>
                          {copied === h.key ? "복사됨 ✓" : "환자배정 메모 복사"}
                        </button>
                      )}
                      {h.hasPrices && <a className="ph-btn" href="/admin/prices/" target="_blank" rel="noopener">수가표 보기 →</a>}
                      {h.doctors.length > 0 && <a className="ph-btn" href="/admin/doctors/" target="_blank" rel="noopener">百名百医 의사 명단 →</a>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
