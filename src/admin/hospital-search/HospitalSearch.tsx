import { useState, useMemo } from "react";
import hospitalData from "./hospitalData.json";

/**
 * 한강애봄 병원찾기 (Hospital Finder)
 * ------------------------------------------------------------
 * Self-contained admin component — no Tailwind dependency required.
 * Same visual language as PartnerRegistry (admin/partners) so the
 * two internal tools read as one system.
 *
 * Flow: 시술/질환명 검색 → 매칭되는 시술 그룹과 병원 카드 노출 →
 * 병원 선택 → 상세 팝업(담당의/연락처/지역) → 전화 연결 또는
 * 환자배정 메모 복사.
 *
 * Data schema (see hospitalData.json):
 *  { procedure, category, hospitals: [{ name, doctor, phone, city }] }
 */

interface Hospital {
  name: string;
  doctor: string;
  phone: string;
  city: string;
}
interface ProcedureEntry {
  procedure: string;
  category: string;
  hospitals: Hospital[];
}

const DATA = hospitalData as ProcedureEntry[];

const CAT_COLORS: Record<string, { bg: string; fg: string }> = {
  "눈": { bg: "rgba(28,63,102,0.09)", fg: "#1C3F66" },
  "코": { bg: "rgba(178,58,46,0.09)", fg: "#B23A2E" },
  "리프팅": { bg: "rgba(15,110,86,0.09)", fg: "#0F6E56" },
  "윤곽": { bg: "rgba(184,147,76,0.14)", fg: "#8A6C33" },
  "가슴": { bg: "rgba(140,84,163,0.1)", fg: "#7A4B8F" },
  "산부인과": { bg: "rgba(198,120,60,0.1)", fg: "#B0611E" },
  "암": { bg: "rgba(90,90,90,0.1)", fg: "#4E4E4E" },
  "심장": { bg: "rgba(178,58,46,0.09)", fg: "#B23A2E" },
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.3 1.79.54 2.65a2 2 0 01-.45 2.11L8.09 9.59a16 16 0 006.32 6.32l1.11-1.11a2 2 0 012.11-.45c.86.24 1.75.42 2.65.54A2 2 0 0122 16.92z" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CategoryTabs({
  categories,
  counts,
  cat,
  onChange,
}: {
  categories: string[];
  counts: Record<string, number>;
  cat: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="hsr-tabs">
      {categories.map((c) => (
        <div
          key={c}
          className={`hsr-tab${cat === c ? " active" : ""}`}
          onClick={() => onChange(c)}
        >
          {c} <span className="hsr-count">{counts[c] || 0}</span>
        </div>
      ))}
    </div>
  );
}

export default function HospitalSearch({ data = DATA }: { data?: ProcedureEntry[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("전체");
  const [selected, setSelected] = useState<{ procedure: string; hospital: Hospital } | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(data.map((d) => d.category));
    return ["전체", ...Array.from(set)];
  }, [data]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { "전체": data.length };
    data.forEach((d) => { c[d.category] = (c[d.category] || 0) + 1; });
    return c;
  }, [data]);

  const totalHospitalRows = useMemo(
    () => data.reduce((sum, d) => sum + d.hospitals.length, 0),
    [data]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((item) => {
      const matchCat = cat === "전체" || item.category === cat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.procedure.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.hospitals.some(
          (h) => h.name.toLowerCase().includes(q) || h.doctor.toLowerCase().includes(q)
        )
      );
    });
  }, [data, cat, query]);

  const handleCopyAssignment = (procedure: string, h: Hospital) => {
    const text = `[한강애봄 환자배정]\n시술/질환: ${procedure}\n병원: ${h.name}\n담당의: ${h.doctor}\n연락처: ${h.phone}\n지역: ${h.city}`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="hsr-root">
      <style>{CSS}</style>

      <div className="hsr-masthead">
        <div className="hsr-masthead-row">
          <div className="hsr-masthead-title">
            <div className="hsr-seal">韩江<br />爱春</div>
            <div>
              <h1>한강애봄 병원찾기</h1>
              <div className="hsr-sub">K-MEDI SPRING HOSPITAL FINDER · 시술·질환 매칭 검색</div>
            </div>
          </div>
          <div className="hsr-masthead-stats">
            <div className="hsr-num">{totalHospitalRows}</div>
            <div className="hsr-label">등록 병원 연결 · MATCHED LISTINGS</div>
          </div>
        </div>
      </div>

      <div className="hsr-toolbar">
        <div className="hsr-search-wrap">
          <SearchIcon />
          <input
            type="text"
            placeholder="예: 쌍꺼풀, 울쎄라, 난임, 코재수술, 거상, 암치료..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="hsr-tip">시술명·장비명·질환명·병원명 모두 검색 가능합니다</p>
      </div>

      <CategoryTabs categories={categories} counts={counts} cat={cat} onChange={setCat} />

      <div className="hsr-body">
        {results.length === 0 ? (
          <div className="hsr-empty">
            {query.trim() === "" ? (
              <p>검색창에 원하는 시술이나 질환을 입력해주세요.</p>
            ) : (
              <>
                <p>"{query}"에 해당하는 병원이 없습니다.</p>
                <p className="hsr-empty-sub">다른 검색어를 시도해주세요.</p>
              </>
            )}
          </div>
        ) : (
          <div className="hsr-groups">
            {results.map((item) => {
              const catColor = CAT_COLORS[item.category] || { bg: "#eee", fg: "#555" };
              return (
                <div className="hsr-group" key={item.procedure}>
                  <div className="hsr-group-head">
                    <h3>{item.procedure}</h3>
                    <span className="hsr-cat-pill" style={{ background: catColor.bg, color: catColor.fg }}>
                      {item.category}
                    </span>
                  </div>
                  <div className="hsr-hospital-list">
                    {item.hospitals.map((h, idx) => (
                      <div
                        className="hsr-hospital-row"
                        key={`${h.name}-${idx}`}
                        onClick={() => setSelected({ procedure: item.procedure, hospital: h })}
                      >
                        <div className="hsr-hospital-info">
                          <p className="hsr-hospital-name">{h.name}</p>
                          <p className="hsr-hospital-doctor">의료진: {h.doctor}</p>
                          <div className="hsr-row">
                            <PhoneIcon />
                            <span className="hsr-mono">{h.phone}</span>
                            <LocationIcon />
                            <span>{h.city}</span>
                          </div>
                        </div>
                        <button type="button" className="hsr-select-btn">선택</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <div className="hsr-modal-overlay" onClick={() => setSelected(null)}>
          <div className="hsr-modal" onClick={(e) => e.stopPropagation()}>
            <p className="hsr-modal-eyebrow">{selected.procedure}</p>
            <h2>{selected.hospital.name}</h2>

            <div className="hsr-modal-detail">
              <div className="hsr-modal-field">
                <span className="hsr-modal-label">담당 의료진</span>
                <span className="hsr-modal-value">{selected.hospital.doctor}</span>
              </div>
              <div className="hsr-modal-field">
                <span className="hsr-modal-label">연락처</span>
                <span className="hsr-modal-value hsr-mono">{selected.hospital.phone}</span>
              </div>
              <div className="hsr-modal-field">
                <span className="hsr-modal-label">지역</span>
                <span className="hsr-modal-value">{selected.hospital.city}</span>
              </div>
            </div>

            <div className="hsr-modal-actions">
              <a href={`tel:${selected.hospital.phone}`} className="hsr-btn hsr-btn-call">
                <PhoneIcon /> 병원에 전화하기
              </a>
              <button
                type="button"
                className="hsr-btn hsr-btn-assign"
                onClick={() => handleCopyAssignment(selected.procedure, selected.hospital)}
              >
                {copied ? "복사됨 ✓" : "환자배정 메모 복사"}
              </button>
              <button type="button" className="hsr-btn hsr-btn-close" onClick={() => setSelected(null)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hsr-footer-bar">
        <span>※ 전화번호가 "xxx"로 표시된 병원은 확인 후 갱신이 필요합니다.</span>
        <span className="hsr-mono">{results.length} / {data.length} 시술 표시 중</span>
      </div>
    </div>
  );
}

const CSS = `
.hsr-root{ --navy:#14243D; --ink:#1C3F66; --paper:#FAF7F0; --paper2:#F3EEE3; --seal:#B23A2E; --slate:#7C8B9C; --slate-d:#4E5B6B; --line:rgba(20,36,61,0.12); --white:#FFFFFF; --green:#0F6E56;
  background:var(--paper); font-family:'Noto Sans KR',sans-serif; color:var(--navy); min-height:100vh; }
.hsr-masthead{ background:var(--navy); color:var(--paper); padding:34px 40px 28px; position:relative; }
.hsr-masthead::after{ content:""; position:absolute; left:0; right:0; bottom:0; height:1px; background:rgba(250,247,240,0.25); }
.hsr-masthead-row{ display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
.hsr-masthead-title{ display:flex; align-items:center; gap:16px; }
.hsr-seal{ width:52px; height:52px; border-radius:50%; border:2px solid var(--seal); color:var(--seal); display:flex; align-items:center; justify-content:center; font-family:'Noto Serif KR',serif; font-weight:700; font-size:12px; line-height:1.15; text-align:center; background:rgba(178,58,46,0.08); transform:rotate(-8deg); flex-shrink:0; }
.hsr-masthead h1{ font-family:'Noto Serif KR',serif; font-weight:700; font-size:24px; margin:0 0 4px; letter-spacing:-0.3px; }
.hsr-sub{ font-size:12.5px; color:rgba(250,247,240,0.6); letter-spacing:0.5px; font-family:'IBM Plex Mono',monospace; }
.hsr-masthead-stats{ text-align:right; font-family:'IBM Plex Mono',monospace; }
.hsr-num{ font-size:30px; font-weight:500; line-height:1; }
.hsr-label{ font-size:11px; color:rgba(250,247,240,0.55); margin-top:4px; letter-spacing:0.5px; }
.hsr-toolbar{ padding:20px 40px 0; }
.hsr-search-wrap{ position:relative; max-width:520px; display:flex; align-items:center; }
.hsr-search-wrap svg{ position:absolute; left:11px; color:var(--slate); }
.hsr-search-wrap input{ width:100%; padding:12px 14px 12px 34px; border:1px solid var(--line); border-radius:6px; background:var(--white); font-family:'Noto Sans KR',sans-serif; font-size:14.5px; color:var(--navy); outline:none; }
.hsr-search-wrap input:focus{ border-color:var(--ink); }
.hsr-tip{ font-size:12px; color:var(--slate); margin:8px 0 0; }
.hsr-tabs{ display:flex; gap:6px; padding:18px 40px 0; flex-wrap:wrap; border-bottom:1px solid var(--line); margin-bottom:24px; }
.hsr-tab{ padding:10px 16px 12px; font-size:13.5px; font-weight:500; color:var(--slate-d); cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-1px; display:flex; align-items:center; gap:7px; white-space:nowrap; }
.hsr-count{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--slate); background:var(--paper2); padding:1px 6px; border-radius:10px; }
.hsr-tab.active{ color:var(--navy); border-bottom-color:var(--seal); }
.hsr-tab.active .hsr-count{ background:rgba(178,58,46,0.12); color:var(--seal); }
.hsr-body{ padding:0 40px 40px; }
.hsr-empty{ text-align:center; padding:64px 20px; color:var(--slate); font-size:14.5px; }
.hsr-empty-sub{ font-size:12.5px; margin-top:6px; }
.hsr-groups{ display:flex; flex-direction:column; gap:28px; }
.hsr-group{ border-left:3px solid var(--ink); padding-left:20px; }
.hsr-group-head{ display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.hsr-group-head h3{ font-family:'Noto Serif KR',serif; font-weight:600; font-size:17px; margin:0; color:var(--navy); }
.hsr-cat-pill{ display:inline-block; font-size:11px; font-weight:500; padding:3px 9px; border-radius:4px; letter-spacing:0.2px; }
.hsr-hospital-list{ display:flex; flex-direction:column; gap:10px; }
.hsr-hospital-row{ display:flex; justify-content:space-between; align-items:center; gap:14px; background:var(--white); border:1px solid var(--line); border-radius:8px; padding:14px 16px; cursor:pointer; transition:border-color .15s ease; }
.hsr-hospital-row:hover{ border-color:var(--ink); }
.hsr-hospital-name{ font-weight:600; font-size:14.5px; color:var(--navy); margin:0 0 3px; }
.hsr-hospital-doctor{ font-size:12.5px; color:var(--slate-d); margin:0 0 6px; }
.hsr-row{ display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--slate-d); }
.hsr-row svg{ flex-shrink:0; color:var(--slate); }
.hsr-row svg + span{ margin-right:10px; }
.hsr-mono{ font-family:'IBM Plex Mono',monospace; color:var(--navy); }
.hsr-select-btn{ flex-shrink:0; border:1px solid var(--ink); background:var(--ink); color:var(--paper); font-size:12.5px; font-weight:600; padding:8px 18px; border-radius:6px; cursor:pointer; white-space:nowrap; }
.hsr-select-btn:hover{ background:var(--navy); }
.hsr-modal-overlay{ position:fixed; inset:0; background:rgba(20,36,61,0.55); display:flex; align-items:center; justify-content:center; padding:20px; z-index:50; }
.hsr-modal{ background:var(--white); border-radius:10px; padding:28px; max-width:400px; width:100%; box-shadow:0 20px 60px rgba(0,0,0,0.3); }
.hsr-modal-eyebrow{ font-size:11.5px; color:var(--slate); letter-spacing:0.4px; margin:0 0 4px; font-family:'IBM Plex Mono',monospace; }
.hsr-modal h2{ font-family:'Noto Serif KR',serif; font-weight:700; font-size:20px; margin:0 0 16px; color:var(--navy); }
.hsr-modal-detail{ background:var(--paper2); border-radius:8px; padding:14px 16px; margin-bottom:20px; display:flex; flex-direction:column; gap:10px; }
.hsr-modal-field{ display:flex; flex-direction:column; gap:2px; }
.hsr-modal-label{ font-size:11px; color:var(--slate); }
.hsr-modal-value{ font-size:14px; font-weight:600; color:var(--navy); }
.hsr-modal-actions{ display:flex; flex-direction:column; gap:9px; }
.hsr-btn{ display:flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:12px; border-radius:6px; font-size:14px; font-weight:600; cursor:pointer; border:none; text-decoration:none; }
.hsr-btn-call{ background:var(--green); color:var(--white); }
.hsr-btn-call:hover{ background:#0B5744; }
.hsr-btn-assign{ background:var(--paper2); color:var(--navy); border:1px solid var(--line); }
.hsr-btn-assign:hover{ background:#EAE3D3; }
.hsr-btn-close{ background:transparent; color:var(--slate-d); }
.hsr-btn-close:hover{ color:var(--navy); }
.hsr-footer-bar{ padding:16px 40px 40px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--slate); border-top:1px solid var(--line); flex-wrap:wrap; gap:8px; }
`;
