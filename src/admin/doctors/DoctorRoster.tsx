import { useMemo, useState } from "react";
import data from "./doctors.json";

/**
 * 百名百医 의사 명단 (관리자 전용)
 * ------------------------------------------------------------
 * 미니프로그램 「百名百医」에 실린 의사의 실제 소속 병원·중국어 이름·상태.
 * 미니프로그램 화면에는 병원 이름이 나오지 않으므로, 고객이 의사를 물으면 여기서 확인한다.
 * 원본: kmedi-miniprogram 저장소 01百名名医/의사_내부메모.md (의사를 추가·변경하면 doctors.json도 같이 고친다)
 */

type Status = "app" | "cloud" | "wait" | "cand" | "out";
interface Row {
  id: string;
  zh: string | null;
  en: string | null;
  zhDept: string | null;
  ko: string;
  hospital: string;
  field: string;
  title: string;
  status: Status;
  note: string;
}

const ROWS = data.rows as Row[];

const STATUS: Record<Status, { label: string; bg: string; fg: string }> = {
  app: { label: "앱", bg: "rgba(15,110,86,0.10)", fg: "#0F6E56" },
  cloud: { label: "클라우드", bg: "rgba(28,63,102,0.09)", fg: "#1C3F66" },
  wait: { label: "할 일", bg: "rgba(184,147,76,0.16)", fg: "#8A6C33" },
  cand: { label: "후보", bg: "rgba(178,58,46,0.09)", fg: "#B23A2E" },
  out: { label: "뺌", bg: "rgba(124,139,156,0.14)", fg: "#5E6B7A" },
};

const FILTERS: { key: "all" | "live" | Status; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "live", label: "앱에 보이는 의사" },
  { key: "cand", label: "추가 후보" },
  { key: "out", label: "뺀 의사" },
];

const CSS = `
.dr { --ink:#1C2733; --sub:#5F6F80; --line:#DCE4EC; --bg:#F5F7FA; --navy:#1C3F66; --accent:#0A6FAE;
  background:var(--bg); min-height:100vh; color:var(--ink); font-family:"Noto Sans KR",-apple-system,sans-serif; }
.dr-wrap { max-width:1040px; margin:0 auto; padding:32px max(16px, env(safe-area-inset-right,0px)) 48px max(16px, env(safe-area-inset-left,0px)); }
.dr-h1 { font-family:"Noto Serif KR",serif; font-size:26px; color:var(--navy); margin:0; }
.dr-h1 span { font-family:"Noto Serif SC","Noto Serif KR",serif; color:var(--accent); }
.dr-lead { color:var(--sub); font-size:14px; margin:8px 0 0; max-width:62ch; line-height:1.7; }
.dr-bar { position:sticky; top:0; z-index:5; background:var(--bg); padding:16px 0 10px; display:grid; gap:10px; }
.dr-q { width:100%; box-sizing:border-box; font:inherit; font-size:15px; padding:11px 14px; border:1px solid var(--line); border-radius:10px; background:#fff; color:var(--ink); }
.dr-q:focus-visible, .dr-chip:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.dr-chips { display:flex; flex-wrap:wrap; gap:8px; }
.dr-chip { font:inherit; font-size:13px; border:1px solid var(--line); background:#fff; color:var(--ink); border-radius:999px; padding:5px 12px; cursor:pointer; }
.dr-chip[aria-pressed="true"] { background:var(--navy); border-color:var(--navy); color:#fff; }
.dr-count { font-size:13px; color:var(--sub); font-variant-numeric:tabular-nums; }
.dr-list { display:grid; gap:8px; }
.dr-row { display:grid; grid-template-columns:40px minmax(0,1.2fr) minmax(0,1.4fr) minmax(0,1.6fr) auto; gap:14px; align-items:start;
  background:#fff; border:1px solid var(--line); border-radius:12px; padding:14px 16px; }
.dr-no { font-size:13px; color:var(--sub); font-variant-numeric:tabular-nums; padding-top:3px; }
.dr-zh { font-family:"Noto Serif SC","Noto Serif KR",serif; font-size:18px; font-weight:600; }
.dr-en { font-size:12px; color:var(--sub); }
.dr-zdept { font-family:"Noto Serif SC",serif; font-size:13px; color:var(--accent); }
.dr-ko { font-size:13px; color:var(--sub); margin-top:2px; }
.dr-muted { font-size:13px; color:var(--sub); }
.dr-hosp { font-weight:600; }
.dr-title { font-size:13px; color:var(--accent); }
.dr-field { font-size:14px; min-width:0; line-height:1.6; }
.dr-note { font-size:12px; color:var(--sub); margin-top:4px; }
.dr-tag { font-size:12px; border-radius:999px; padding:3px 10px; white-space:nowrap; justify-self:end; }
.dr-empty { text-align:center; color:var(--sub); padding:28px 0; }
.dr-foot { margin-top:24px; font-size:13px; color:var(--sub); display:grid; gap:4px; line-height:1.7; }
@media (max-width:720px) {
  .dr-row { grid-template-columns:30px minmax(0,1fr) auto; }
  .dr-row .dr-hcell, .dr-row .dr-field { grid-column:2 / 4; }
}
`;

export default function DoctorRoster() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("live");

  const rows = useMemo(() => {
    const word = q.trim().toLowerCase();
    return ROWS.filter((r) => {
      const inFilter =
        filter === "all" ||
        (filter === "live" ? r.status === "app" || r.status === "cloud" || r.status === "wait" : r.status === filter);
      const text = [r.zh, r.en, r.zhDept, r.ko, r.hospital, r.field, r.title, r.note].join(" ").toLowerCase();
      return inFilter && (!word || text.includes(word));
    });
  }, [q, filter]);

  const live = ROWS.filter((r) => r.status === "app" || r.status === "cloud" || r.status === "wait").length;

  return (
    <div className="dr">
      <style>{CSS}</style>
      <div className="dr-wrap">
        <h1 className="dr-h1">
          <span>百名百医</span> 의사 명단
        </h1>
        <p className="dr-lead">
          미니프로그램 화면에는 병원 이름이 나오지 않습니다. 고객이 의사를 물어보면 중국어 이름을 붙여 넣어 실제 소속을 확인하세요.
        </p>

        <div className="dr-bar">
          <input
            id="dr-q"
            className="dr-q"
            type="search"
            placeholder="중국어·한국어 이름, 병원, 분야로 찾기 (예: 梁桐准, 서울대, 탈모)"
            aria-label="의사 검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="dr-chips" role="group" aria-label="보기">
            {FILTERS.map((f) => (
              <button key={f.key} className="dr-chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="dr-count">
            {rows.length}명 표시 · 앱에 보이는 의사 {live}명 · 후보 {ROWS.filter((r) => r.status === "cand").length} · 뺌{" "}
            {ROWS.filter((r) => r.status === "out").length}
          </div>
        </div>

        <div className="dr-list">
          {rows.length === 0 && <div className="dr-empty">찾는 의사가 없습니다. 검색어를 줄여 보세요.</div>}
          {rows.map((r) => (
            <div className="dr-row" key={r.id + r.ko}>
              <div className="dr-no">{r.id}</div>
              <div>
                {r.zh ? (
                  <>
                    <div className="dr-zh">{r.zh}</div>
                    <div className="dr-en">{r.en}</div>
                    <div className="dr-zdept">{r.zhDept}</div>
                  </>
                ) : (
                  <div className="dr-muted">중국어 이름 없음</div>
                )}
                <div className="dr-ko">한국어 · {r.ko}</div>
              </div>
              <div className="dr-hcell">
                <div className="dr-hosp">{r.hospital}</div>
                <div className="dr-title">{r.title}</div>
              </div>
              <div className="dr-field">
                {r.field}
                {r.note && <div className="dr-note">{r.note}</div>}
              </div>
              <span className="dr-tag" style={{ background: STATUS[r.status].bg, color: STATUS[r.status].fg }}>
                {STATUS[r.status].label}
              </span>
            </div>
          ))}
        </div>

        <div className="dr-foot">
          <div>앱 = 미니프로그램에 들어 있는 의사 · 클라우드 = 클라우드에서 더한 의사(3.2.4 정식 버전부터 고객에게 보임)</div>
          <div>서울대병원 예약: 예약센터 1588-5700 또는 국제진료센터 (세부전공에 맞춰 예약해야 진료 가능)</div>
          <div>{data.updated} 기준</div>
        </div>
      </div>
    </div>
  );
}
