import { useState, useMemo } from "react";
import partnersData from "./partners.json";

/**
 * 한강애봄 협력의료기관 대장 (Partner Hospital Registry)
 * ------------------------------------------------------------
 * Self-contained admin component — no Tailwind dependency required.
 * Drop into the admin route (e.g. /admin/partners) and pass data via
 * the `data` prop, or it will load partners.json by default.
 *
 * Data schema (see partners.json):
 *  { id, category, name:{ko,zh,en}, address:{ko,zh,en}, phone, note,
 *    contact:{manager,email,phone_direct}, website,
 *    description:{ko,zh,en}, intro_page_url, logo_url, status, mou_date }
 *
 * Fields left as null (contact, website, description, intro_page_url)
 * render as dashed "추가 예정" placeholders until filled — populate
 * them in partners.json (or swap in a CMS/DB fetch) and the UI
 * activates automatically; no markup changes needed.
 * ------------------------------------------------------------
 * Fonts (added once in admin/partners/index.html <head>):
 * <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&family=Noto+Sans+KR:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
 */

const CATEGORIES = ["전체", "대학병원", "성형외과", "피부과·의원", "복합의원"];

const CAT_COLORS: Record<string, { bg: string; fg: string }> = {
  "대학병원": { bg: "rgba(28,63,102,0.09)", fg: "#1C3F66" },
  "성형외과": { bg: "rgba(178,58,46,0.09)", fg: "#B23A2E" },
  "피부과·의원": { bg: "rgba(15,110,86,0.09)", fg: "#0F6E56" },
  "복합의원": { bg: "rgba(184,147,76,0.14)", fg: "#8A6C33" },
};

interface PartnerContact {
  manager: string | null;
  email: string | null;
  phone_direct: string | null;
}
interface Partner {
  id: string;
  category: string;
  name: { ko: string; zh: string; en: string };
  address: { ko: string; zh: string; en: string };
  phone: string | null;
  note: string | null;
  contact: PartnerContact;
  website: string | null;
  description: { ko: string | null; zh: string | null; en: string | null };
  intro_page_url: string | null;
  logo_url: string | null;
  status: string;
  mou_date: string | null;
}

type Lang = "ko" | "zh" | "en";

function FutureRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="phr-future-row">
      {icon}
      <span className="phr-dash" />
      <span className="phr-tag">{label}</span>
    </div>
  );
}

function Card({
  d,
  lang,
  expanded,
  onToggle,
}: {
  d: Partner;
  lang: Lang;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  const cat = CAT_COLORS[d.category] || { bg: "#eee", fg: "#555" };
  return (
    <div
      className={`phr-card${expanded ? " expanded" : ""}`}
      onClick={() => onToggle(d.id)}
    >
      <div className="phr-card-top">
        <span
          className="phr-cat-pill"
          style={{ background: cat.bg, color: cat.fg }}
        >
          {d.category}
        </span>
        <span className="phr-mou" title="협력 인증">MOU</span>
      </div>

      <p className="phr-name-ko">{d.name.ko}</p>
      <p className="phr-name-alt">{d.name.zh} · {d.name.en}</p>

      {!expanded && (
        <div className="phr-row">
          <LocationIcon />
          <span>{d.address[lang]}</span>
        </div>
      )}
      <div className="phr-row">
        <PhoneIcon />
        <span className="phr-mono">{d.phone || "문의 필요"}</span>
      </div>
      {d.note && <span className="phr-note-tag">{d.note}</span>}

      {expanded && (
        <div className="phr-addr-all">
          <hr className="phr-divider" />
          <div className="phr-row"><span className="phr-lang-mark">KO</span><span>{d.address.ko}</span></div>
          <div className="phr-row"><span className="phr-lang-mark">中文</span><span>{d.address.zh}</span></div>
          <div className="phr-row"><span className="phr-lang-mark">EN</span><span>{d.address.en}</span></div>
        </div>
      )}

      {expanded && (
        <div className="phr-future-block">
          {d.contact?.email ? (
            <div className="phr-row"><MailIcon /><span>{d.contact.email}</span></div>
          ) : (
            <FutureRow icon={<MailIcon muted />} label="담당자 이메일 · 추가 예정" />
          )}
          {d.contact?.phone_direct ? (
            <div className="phr-row"><PhoneIcon /><span className="phr-mono">{d.contact.phone_direct}</span></div>
          ) : (
            <FutureRow icon={<PhoneIcon muted />} label="담당자 직통번호 · 추가 예정" />
          )}
          {d.website ? (
            <div className="phr-row"><GlobeIcon /><a href={d.website} target="_blank" rel="noreferrer">{d.website}</a></div>
          ) : (
            <FutureRow icon={<GlobeIcon muted />} label="홈페이지 · 추가 예정" />
          )}
          {d.intro_page_url ? (
            <div className="phr-row"><FileIcon /><a href={d.intro_page_url}>기관 소개페이지 보기</a></div>
          ) : (
            <FutureRow icon={<FileIcon muted />} label="기관 소개페이지 · 준비 중" />
          )}
        </div>
      )}
    </div>
  );
}

export default function PartnerRegistry({ data = partnersData as Partner[] }: { data?: Partner[] }) {
  const [lang, setLang] = useState<Lang>("ko");
  const [cat, setCat] = useState("전체");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { "전체": data.length };
    data.forEach((d) => { c[d.category] = (c[d.category] || 0) + 1; });
    return c;
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((d) => {
      const matchCat = cat === "전체" || d.category === cat;
      const matchQ =
        !q ||
        [d.name.ko, d.name.zh, d.name.en, d.address.ko, d.address.zh, d.address.en]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchCat && matchQ;
    });
  }, [data, cat, query]);

  return (
    <div className="phr-root">
      <style>{CSS}</style>

      <div className="phr-masthead">
        <div className="phr-masthead-row">
          <div className="phr-masthead-title">
            <div className="phr-seal">韩江<br />爱春</div>
            <div>
              <h1>한강애봄 협력의료기관 대장</h1>
              <div className="phr-sub">K-MEDI SPRING PARTNER REGISTRY · 韩江爱春 医疗合作机构名录</div>
            </div>
          </div>
          <div className="phr-masthead-stats">
            <div className="phr-num">{data.length}</div>
            <div className="phr-label">등록 기관 · REGISTERED INSTITUTIONS</div>
          </div>
        </div>
      </div>

      <div className="phr-toolbar">
        <div className="phr-search-wrap">
          <SearchIcon />
          <input
            type="text"
            placeholder="기관명·주소로 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="phr-lang-toggle">
          {(["ko", "zh", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              className={lang === l ? "active" : ""}
              onClick={() => setLang(l)}
            >
              {l === "ko" ? "KO" : l === "zh" ? "中文" : "EN"}
            </button>
          ))}
        </div>
      </div>

      <div className="phr-tabs">
        {CATEGORIES.map((c) => (
          <div
            key={c}
            className={`phr-tab${cat === c ? " active" : ""}`}
            onClick={() => { setCat(c); setExpandedId(null); }}
          >
            {c} <span className="phr-count">{counts[c] || 0}</span>
          </div>
        ))}
      </div>

      <div className="phr-grid">
        {filtered.map((d) => (
          <Card
            key={d.id}
            d={d}
            lang={lang}
            expanded={expandedId === d.id}
            onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
          />
        ))}
      </div>

      <div className="phr-footer-bar">
        <span>※ '문의 필요' 항목은 공식 홈페이지 미확인 정보이며 방문 시 재확인이 필요합니다.</span>
        <span className="phr-mono">{filtered.length} / {data.length} 표시 중</span>
      </div>
    </div>
  );
}

/* ---- inline icon components (no external icon lib required) ---- */
const iconProps = (muted?: boolean) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: muted ? "#D3D1C7" : "currentColor",
  strokeWidth: 2,
  width: 13,
  height: 13,
});
function LocationIcon(p: { muted?: boolean }) { return <svg {...iconProps(p.muted)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" /><circle cx="12" cy="10" r="3" /></svg>; }
function PhoneIcon(p: { muted?: boolean }) { return <svg {...iconProps(p.muted)}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.3 1.79.54 2.65a2 2 0 01-.45 2.11L8.09 9.59a16 16 0 006.32 6.32l1.11-1.11a2 2 0 012.11-.45c.86.24 1.75.42 2.65.54A2 2 0 0122 16.92z" /></svg>; }
function MailIcon(p: { muted?: boolean }) { return <svg {...iconProps(p.muted)}><path d="M22 6l-10 7L2 6" /><path d="M2 6h20v12H2z" /></svg>; }
function GlobeIcon(p: { muted?: boolean }) { return <svg {...iconProps(p.muted)}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>; }
function FileIcon(p: { muted?: boolean }) { return <svg {...iconProps(p.muted)}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>; }

const CSS = `
.phr-root{ --navy:#14243D; --ink:#1C3F66; --paper:#FAF7F0; --paper2:#F3EEE3; --seal:#B23A2E; --slate:#7C8B9C; --slate-d:#4E5B6B; --line:rgba(20,36,61,0.12); --white:#FFFFFF;
  background:var(--paper); font-family:'Noto Sans KR',sans-serif; color:var(--navy); }
.phr-masthead{ background:var(--navy); color:var(--paper); padding:34px 40px 28px; position:relative; }
.phr-masthead::after{ content:""; position:absolute; left:0; right:0; bottom:0; height:1px; background:rgba(250,247,240,0.25); }
.phr-masthead-row{ display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
.phr-masthead-title{ display:flex; align-items:center; gap:16px; }
.phr-seal{ width:52px; height:52px; border-radius:50%; border:2px solid var(--seal); color:var(--seal); display:flex; align-items:center; justify-content:center; font-family:'Noto Serif KR',serif; font-weight:700; font-size:12px; line-height:1.15; text-align:center; background:rgba(178,58,46,0.08); transform:rotate(-8deg); flex-shrink:0; }
.phr-masthead h1{ font-family:'Noto Serif KR',serif; font-weight:700; font-size:24px; margin:0 0 4px; letter-spacing:-0.3px; }
.phr-sub{ font-size:12.5px; color:rgba(250,247,240,0.6); letter-spacing:0.5px; font-family:'IBM Plex Mono',monospace; }
.phr-masthead-stats{ text-align:right; font-family:'IBM Plex Mono',monospace; }
.phr-num{ font-size:30px; font-weight:500; line-height:1; }
.phr-label{ font-size:11px; color:rgba(250,247,240,0.55); margin-top:4px; letter-spacing:0.5px; }
.phr-toolbar{ padding:20px 40px 0; display:flex; gap:24px; align-items:center; flex-wrap:wrap; justify-content:space-between; }
.phr-search-wrap{ position:relative; flex:1; min-width:220px; max-width:340px; display:flex; align-items:center; }
.phr-search-wrap svg{ position:absolute; left:11px; color:var(--slate); }
.phr-search-wrap input{ width:100%; padding:10px 14px 10px 34px; border:1px solid var(--line); border-radius:6px; background:var(--white); font-family:'Noto Sans KR',sans-serif; font-size:13.5px; color:var(--navy); outline:none; }
.phr-search-wrap input:focus{ border-color:var(--ink); }
.phr-lang-toggle{ display:flex; border:1px solid var(--line); border-radius:6px; overflow:hidden; background:var(--white); }
.phr-lang-toggle button{ border:none; background:transparent; padding:9px 14px; font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--slate-d); cursor:pointer; border-right:1px solid var(--line); }
.phr-lang-toggle button:last-child{ border-right:none; }
.phr-lang-toggle button.active{ background:var(--ink); color:var(--paper); }
.phr-tabs{ display:flex; gap:6px; padding:18px 40px 0; flex-wrap:wrap; border-bottom:1px solid var(--line); margin-bottom:24px; }
.phr-tab{ padding:10px 16px 12px; font-size:13.5px; font-weight:500; color:var(--slate-d); cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-1px; display:flex; align-items:center; gap:7px; white-space:nowrap; }
.phr-count{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--slate); background:var(--paper2); padding:1px 6px; border-radius:10px; }
.phr-tab.active{ color:var(--navy); border-bottom-color:var(--seal); }
.phr-tab.active .phr-count{ background:rgba(178,58,46,0.12); color:var(--seal); }
.phr-grid{ padding:0 40px 48px; display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:16px; }
.phr-card{ background:var(--white); border:1px solid var(--line); border-radius:8px; padding:18px 18px 16px; position:relative; transition:border-color .15s ease; cursor:pointer; }
.phr-card:hover{ border-color:var(--ink); }
.phr-card-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:10px; }
.phr-cat-pill{ display:inline-block; font-size:11px; font-weight:500; padding:3px 9px; border-radius:4px; letter-spacing:0.2px; }
.phr-mou{ width:30px; height:30px; border-radius:50%; border:1.3px solid var(--seal); color:var(--seal); font-family:'Noto Serif KR',serif; font-size:9px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; opacity:0.85; }
.phr-name-ko{ font-family:'Noto Serif KR',serif; font-weight:600; font-size:17px; color:var(--navy); margin:0 0 2px; letter-spacing:-0.2px; }
.phr-name-alt{ font-size:12.5px; color:var(--slate); margin:0 0 12px; }
.phr-divider{ border:none; border-top:1px dashed var(--line); margin:12px 0; }
.phr-row{ display:flex; gap:8px; font-size:12.5px; color:var(--slate-d); margin-bottom:7px; align-items:flex-start; line-height:1.5; }
.phr-row svg{ flex-shrink:0; margin-top:2px; color:var(--slate); }
.phr-mono{ font-family:'IBM Plex Mono',monospace; color:var(--navy); }
.phr-note-tag{ display:inline-block; margin-top:8px; font-size:11px; color:var(--slate-d); background:var(--paper2); padding:3px 8px; border-radius:4px; }
.phr-lang-mark{ width:34px; flex-shrink:0; color:#B4B2A9; font-size:11px; }
.phr-future-block{ margin-top:12px; padding-top:12px; border-top:1px dashed var(--line); }
.phr-future-row{ display:flex; align-items:center; gap:7px; font-size:11.5px; color:#B4B2A9; margin-bottom:6px; }
.phr-future-row svg{ flex-shrink:0; }
.phr-dash{ border-bottom:1px dashed #D3D1C7; flex:1; padding-bottom:1px; }
.phr-tag{ font-size:10px; color:#B4B2A9; background:var(--paper2); padding:1px 6px; border-radius:3px; }
.phr-footer-bar{ padding:16px 40px 40px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--slate); border-top:1px solid var(--line); flex-wrap:wrap; gap:8px; }
`;
