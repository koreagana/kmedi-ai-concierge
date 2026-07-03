import LZString from 'lz-string'

const TEMPLATE = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>__TITLE__</title>
<!-- 카카오톡/위챗 등 메신저 링크 미리보기용 태그 -->
<meta property="og:title" content="__TITLE__">
<meta property="og:description" content="__DESC__">
<meta property="og:site_name" content="汉江春天">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="__TITLE__">
<style>
  /* ============================================================
     색상 변수 정의
     - navy 계열: 환자정보 등 진한 남색
     - brand-blue 계열: kmedispring.com 실제 네비게이션바 색상 (카드 상단 배경)
     - sky: 포인트 컬러, paper: 페이지 전체 배경
     ============================================================ */
  :root{
    --navy:#0B2545;
    --navy-deep:#081B36;
    --brand-blue:#0077B6;
    --brand-blue-deep:#035C8C;
    --sky:#2D7FF9;
    --sky-pale:#EAF2FF;
    --paper:#F7F9FC;
    --line:#D8E2F0;
    --muted:#6B7785;
    --good:#1FA672;
  }
  *{box-sizing:border-box;}
  body{
    margin:0;
    font-family:"PingFang SC","Malgun Gothic","Microsoft YaHei","Noto Sans KR",system-ui,sans-serif;
    background:var(--paper);
    color:var(--navy);
    padding:28px 16px 60px;
  }
  /* ============================================================
     상단 입력 폼 영역 스타일 (.panel, .field 등)
     - 병원명/날짜/환자정보 등을 입력하는 흰색 박스들
     - 이 영역은 카드(아래쪽)와 별개로, 나만 보는 편집용 UI
     ============================================================ */
  h1{ font-size:19px; font-weight:700; margin:0 0 4px; letter-spacing:-0.2px; }
  .sub{ font-size:13px; color:var(--muted); margin:0 0 24px; }
  /* 환자 전환 시 누르는 초기화 버튼 - 날짜/시간/환자명/생년월일/여권번호/메모만 비움 (병원명·주소는 자주 재사용하므로 유지) */
  .resetbtn{
    margin-top:-12px; margin-bottom:20px; padding:9px 14px; border-radius:8px;
    border:1px solid #F0C36D; background:#FFF7E6; color:#8A6116;
    font-size:12.5px; font-weight:700; cursor:pointer;
  }
  .resetbtn.done{ background:var(--good); color:#fff; border-color:var(--good); }
  .layout{ max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:28px; }
  .panel{ background:#fff; border:1px solid var(--line); border-radius:16px; padding:20px; }
  .panel h2{ font-size:13px; text-transform:uppercase; letter-spacing:1px; color:var(--sky); margin:0 0 16px; font-weight:700; }
  .row2{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:10px; }
  .row2 .field label{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .row2 .field input{ width:100%; min-width:0; padding:10px 8px; font-size:13.5px; }
  .field{margin-bottom:12px;}
  .field label{ display:block; font-size:12px; color:var(--muted); margin-bottom:6px; font-weight:600; }
  .field input, .field textarea{
    width:100%; padding:10px 12px; border:1px solid var(--line); border-radius:9px;
    font-size:14px; font-family:inherit; color:var(--navy); background:var(--paper);
  }
  .field input:focus, .field textarea:focus{ outline:none; border-color:var(--sky); background:#fff; }
  .field textarea{resize:vertical; min-height:40px;}

  /* ============================================================
     카드(예약 확인서) - 모바일 화면에 꽉 차는 풀스크린 카드
     상단 절반: 파란 배경 / 하단 절반: 흰 배경
     ============================================================ */
  .preview-wrap{ display:flex; justify-content:center; }

  #card{
    width:100%;
    max-width:420px;
    margin:0 auto;
    border-radius:24px;
    overflow:hidden;
    box-shadow:0 14px 36px rgba(45,127,249,0.16);
    background:#fff;
    border:1px solid var(--line);
    display:flex;
    flex-direction:column;
    min-height:640px;
  }
  .card-topbar{ display:none; }

  /* ============================================================
     카드 상단부 - 파란 배경 영역 (stub-main), 카드 높이의 절반
     구성: 【预约确认书】타이틀 → 병원명(한/중) → 날짜·시간 → 환자정보(이름/생년월일)
     ============================================================ */
  .stub-main{
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    background:linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-blue-deep) 100%);
    color:#fff;
    padding:40px 28px;
  }
  /* 상단 중앙에 떠 있는 【预约确认书】 타이틀 배지 */
  .eyebrow{
    display:block; width:fit-content; margin:0 auto 20px;
    font-size:14px; letter-spacing:1.5px; text-transform:uppercase; text-align:center;
    color:#CFEAFB; font-weight:800;
    background:rgba(255,255,255,0.14); padding:7px 16px; border-radius:20px;
    text-decoration:none;
  }
  .hospital-ko{ font-size:30px; font-weight:800; line-height:1.3; word-break:keep-all; color:#fff; text-align:center; }
  .hospital-zh{ font-size:17px; font-weight:600; color:#CFEAFB; margin-top:6px; text-align:center; }
  .datetime-row{ display:flex; justify-content:center; gap:40px; margin:26px 0 22px; padding-top:22px; border-top:1px solid rgba(255,255,255,0.22); }
  .dt-block{ text-align:center; }
  .dt-block .label{ font-size:11px; letter-spacing:1px; color:#CFEAFB; text-transform:uppercase; margin-bottom:6px; font-weight:700; }
  .dt-block .value{ font-size:28px; font-weight:800; color:#fff; }
  .dt-block .value.empty{ color:#CFEAFB; opacity:0.7; font-weight:600; }
  /* 환자 이름/생년월일/여권번호 - 값이 없는 줄은 is-empty 클래스로 자동 숨김 */
  .patient-block{
    border-top:1px solid rgba(255,255,255,0.22); padding-top:18px; margin-top:4px;
    display:flex; flex-direction:column; gap:8px; align-items:center;
  }
  .patient-block.is-empty{ display:none; }
  .patient-row{ display:flex; gap:10px; font-size:15px; }
  .patient-row .pl{ color:#CFEAFB; font-weight:700; min-width:72px; flex-shrink:0; }
  .patient-row .pv{ font-weight:700; color:#fff; }
  .patient-row.is-empty{ display:none; }
  .meta-row{ display:flex; justify-content:center; margin-top:8px; }
  .memo.empty{ display:none; }
  .memo{ font-size:13px; color:#CFEAFB; font-style:italic; max-width:100%; text-align:center; }

  /* ============================================================
     절취선 - 파란 영역과 흰 영역 사이를 점선으로 분리
     ============================================================ */
  .perf-row{ position:relative; height:0; flex-shrink:0; }
  .perf-row::before, .perf-row::after{
    content:""; position:absolute; width:26px; height:26px; background:var(--paper);
    border-radius:50%; top:-13px; z-index:2;
  }
  .perf-row::before{ left:-13px; }
  .perf-row::after{ right:-13px; }
  .perf-row .dash{ position:absolute; left:14px; right:14px; top:0; border-top:2px dashed rgba(11,37,69,0.2); }

  /* ============================================================
     카드 하단부 - 흰 배경 영역 (stub-addr), 카드 높이의 절반
     구성: 3개국어 주소(한/중/영) → 한강애봄 표기
     ============================================================ */
  .stub-addr{
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    background:#fff;
    padding:28px 28px;
  }
  .addr-head{ font-size:14px; font-weight:800; color:var(--navy); margin-bottom:16px; text-align:center; letter-spacing:0.5px; }
  .addr-row{
    display:flex; align-items:flex-start; gap:12px;
    padding:13px 0; border-bottom:1px solid var(--line);
  }
  .addr-row:last-of-type{ border-bottom:none; }
  .addr-flag{
    flex-shrink:0; width:36px; height:24px; border-radius:5px; background:var(--sky-pale);
    color:var(--sky); font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center;
    margin-top:2px;
  }
  /* 주소칸은 <input>이 아니라 줄바꿈 가능한 div(contenteditable)
     → 카드 안에서 바로 탭해서 수정 가능, 긴 영문 주소도 자동 줄바꿈됨 */
  .addr-input{
    flex:1; min-width:0; font-size:14.5px; line-height:1.5; color:var(--navy);
    border:none; background:transparent; padding:2px 0; font-family:inherit; outline:none;
    white-space:normal; word-break:break-word; overflow-wrap:break-word;
  }
  .addr-input:focus{ background:var(--sky-pale); border-radius:5px; padding:2px 6px; }

  /* 카드 맨 아래 작게 들어가는 회사명 - 클릭하면 ai-kmedi.com으로 이동 */
  .brandfoot{ display:block; margin-top:18px; text-align:center; font-size:11px; color:var(--muted); letter-spacing:0.5px; text-decoration:none; }

  /* "PDF로 저장" 버튼 - 브라우저 인쇄 기능(window.print)을 그대로 사용.
     서버 변환 없이 클라이언트에서만 처리되며, 파일도 저장하지 않음. */
  .pdfbtn{
    width:100%; max-width:420px; margin:18px auto 0; display:block; padding:15px; border-radius:11px;
    border:none; background:var(--brand-blue); color:#fff; font-size:15px; font-weight:800; cursor:pointer;
  }

  /* PDF로 저장(인쇄) 시: 폼/안내문/버튼들은 다 빼고 카드만 출력.
     @page에 세로로 긴 모바일 카드 비율을 지정해 카드가 종이를 가득 채우게 함. */
  @media print{
    @page{ size:100mm 200mm; margin:0; }
    .intro, .form-panel, .resetbtn, .pdfbtn{ display:none !important; }
    body{ background:#fff; padding:0; }
    .layout{ max-width:none; gap:0; }
    .panel.card-panel{ border:none; padding:0; background:transparent; box-shadow:none; }
    .preview-wrap{ padding:0; }
    #card{ max-width:none; width:100%; height:100vh; min-height:0; border:none; border-radius:0; box-shadow:none; }
  }
</style>
</head>
<body>

<!-- ============================================================
     ① 입력 폼 패널 (나만 보는 편집 화면)
     병원명/날짜/환자정보를 입력하면 아래 카드 미리보기가 실시간으로 바뀜
     ============================================================ -->
<div class="layout">
  <div class="intro">
    <h1>예약 카드 생성기 (중국 환자용)</h1>
    <p class="sub">정보 입력 → 미리보기 자동 갱신 → PDF로 저장해서 전달</p>
    <button class="resetbtn" id="resetbtn">🔄 새 환자 입력 시작하기 (날짜·환자정보 초기화)</button>
  </div>

  <div class="panel form-panel">
    <h2>医院 / 预约信息</h2>
    <div class="field">
      <label>병원명 (한국어)</label>
      <input id="f-hospital-ko" value="서래셀의원">
    </div>
    <div class="field">
      <label>병원명 (中文)</label>
      <input id="f-hospital-zh" value="瑞莱赛尔医院">
    </div>
    <div class="row2">
      <div class="field">
        <label>预约日期</label>
        <input id="f-date" type="date">
      </div>
      <div class="field">
        <label>预约时间</label>
        <input id="f-time" type="time">
      </div>
    </div>
    <div class="field">
      <label>患者姓名</label>
      <input id="f-patient" placeholder="예: 王小姐 / 김민준 환자님">
    </div>
    <div class="row2">
      <div class="field">
        <label>出生日期</label>
        <input id="f-dob" type="date">
      </div>
      <div class="field">
        <label>护照号码</label>
        <input id="f-passport" placeholder="미정이면 비워두기">
      </div>
    </div>
    <div class="field">
      <label>备注</label>
      <textarea id="f-memo" placeholder="예: 1层接待处告知姓名 / 1층 접수처에서 성함 말씀해주세요"></textarea>
    </div>
  </div>

<!-- ============================================================
     ② 카드 미리보기 패널 (환자가 실제로 받아보는 부분)
     #card 안쪽이 곧 "예약 확인서" 디자인 - 위(파란)/아래(흰색) 두 구역
     ============================================================ -->
  <div class="panel card-panel">
    <div class="preview-wrap">
      <div id="card">
        <div class="card-topbar"></div>

        <!-- ②-1. 카드 상단(파란 영역): 타이틀/병원명/날짜시간/환자정보 -->
        <div class="stub-main">
          <div class="eyebrow">【预约确认书】</div>
          <div class="hospital-ko" id="c-hospital-ko">서래셀의원</div>
          <div class="hospital-zh" id="c-hospital-zh">瑞莱赛尔医院</div>

          <div class="datetime-row">
            <div class="dt-block">
              <div class="label">날짜 / 日期</div>
              <div class="value" id="c-date">--</div>
            </div>
            <div class="dt-block">
              <div class="label">시간 / 时间</div>
              <div class="value" id="c-time">--</div>
            </div>
          </div>

          <div class="patient-block" id="patient-block">
            <div class="patient-row" id="row-patient"><span class="pl">姓名</span><span class="pv" id="c-patient"></span></div>
            <div class="patient-row" id="row-dob"><span class="pl">出生日期</span><span class="pv" id="c-dob"></span></div>
            <div class="patient-row" id="row-passport"><span class="pl">护照号码</span><span class="pv" id="c-passport"></span></div>
          </div>
          <div class="meta-row">
            <div class="memo" id="c-memo"></div>
          </div>
        </div>

        <!-- ②-2. 절취선 (점선 구분선) -->
        <div class="perf-row"><div class="dash"></div></div>

        <!-- ②-3. 카드 하단(흰 영역): 3개국어 주소 + 브랜드 -->
        <div class="stub-addr">
          <div class="addr-head">주소 / 地址 / Address</div>

          <div class="addr-row">
            <div class="addr-flag">KO</div>
            <div class="addr-input" id="c-addr-ko" contenteditable="true">서울 서초구 사평대로26길 38</div>
          </div>
          <div class="addr-row">
            <div class="addr-flag">ZH</div>
            <div class="addr-input" id="c-addr-zh" contenteditable="true">首尔特别市瑞草区沙坪大路26街38号</div>
          </div>
          <div class="addr-row">
            <div class="addr-flag">EN</div>
            <div class="addr-input" id="c-addr-en" contenteditable="true">38 Sapyeong-daero 26-gil, Seocho-gu, Seoul</div>
          </div>

          <a class="brandfoot" href="https://ai-kmedi.com" target="_blank" rel="noopener">한강애봄 ㅣ 汉江春天</a>
        </div>
      </div>
    </div>
    <!-- ③ PDF로 저장 - 브라우저 인쇄 기능을 그대로 사용 (서버 변환 없음, 파일 저장 없음) -->
    <button class="pdfbtn" id="pdfbtn">📄 PDF로 저장 / 保存为PDF</button>
  </div>
</div>

<script>
/* ================================================================
   스크립트 구조 안내
   1) fmtDate / fmtDob : 날짜 표시 형식 변환
   2) update()         : 입력폼 → 카드 미리보기 실시간 반영
   3) resetbtn 이벤트   : 날짜·환자정보 초기화
   4) pdfbtn 이벤트     : window.print()로 PDF 저장 다이얼로그 열기
   ※ 이 페이지는 링크 공유 기능이 없습니다. 직접 정보를 입력하고
     카드를 확인한 뒤 PDF로 저장해서 위챗 등으로 전달하는 방식입니다.
   ================================================================ */

/* 예약 날짜를 "7월 1일 (周三)" 형식으로 변환 (요일은 중국어 표기) */
function fmtDate(iso){
  if(!iso) return '--';
  const d = new Date(iso + 'T00:00:00');
  const days = ['周日','周一','周二','周三','周四','周五','周六'];
  return (d.getMonth()+1) + '월 ' + d.getDate() + '일 (' + days[d.getDay()] + ')';
}

/* 생년월일을 "2026.7.1" 형식으로 변환 */
function fmtDob(iso){
  if(!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.getFullYear() + '.' + (d.getMonth()+1) + '.' + d.getDate();
}

/* 핵심 함수: 입력 폼의 값을 읽어서 카드 미리보기(c-로 시작하는 요소들)에 반영
   값이 비어있는 항목(환자명/생년월일/여권번호 등)은 is-empty 클래스로 자동 숨김 */
function update(){
  const hKo = document.getElementById('f-hospital-ko').value || '병원명';
  const hZh = document.getElementById('f-hospital-zh').value || '';
  const date = document.getElementById('f-date').value;
  const time = document.getElementById('f-time').value;
  const patient = document.getElementById('f-patient').value;
  const dob = document.getElementById('f-dob').value;
  const passport = document.getElementById('f-passport').value;
  const memo = document.getElementById('f-memo').value;

  document.getElementById('c-hospital-ko').textContent = hKo;
  document.getElementById('c-hospital-zh').textContent = hZh;
  document.getElementById('c-date').textContent = fmtDate(date);

  const timeEl = document.getElementById('c-time');
  timeEl.textContent = time || '미정 待定';
  timeEl.classList.toggle('empty', !time);

  document.getElementById('c-patient').textContent = patient;
  document.getElementById('row-patient').classList.toggle('is-empty', !patient);

  document.getElementById('c-dob').textContent = fmtDob(dob);
  document.getElementById('row-dob').classList.toggle('is-empty', !dob);

  document.getElementById('c-passport').textContent = passport;
  document.getElementById('row-passport').classList.toggle('is-empty', !passport);

  document.getElementById('patient-block').classList.toggle('is-empty', !patient && !dob && !passport);

  const memoEl = document.getElementById('c-memo');
  memoEl.textContent = memo;
  memoEl.classList.toggle('empty', !memo);
}

/* 입력칸에 글자를 칠 때마다 update() 자동 실행 (실시간 미리보기) */
['f-hospital-ko','f-hospital-zh','f-date','f-time','f-patient','f-dob','f-passport','f-memo'].forEach(id=>{
  document.getElementById(id).addEventListener('input', update);
});

update();

/* "새 환자 입력 시작하기" 버튼 - 날짜/시간/환자명/생년월일/여권번호/메모만 비우고
   병원명·주소는 그대로 둠 (같은 병원으로 다음 환자를 보낼 때가 많으므로) */
const resetBtn = document.getElementById('resetbtn');
if(resetBtn){
  resetBtn.addEventListener('click', function(){
    ['f-date','f-time','f-patient','f-dob','f-passport','f-memo'].forEach(id=>{
      document.getElementById(id).value = '';
    });
    update();
    const orig = this.textContent;
    this.textContent = '✓ 초기화됨 已重置';
    this.classList.add('done');
    setTimeout(()=>{ this.textContent = orig; this.classList.remove('done'); }, 1400);
  });
}

/* "PDF로 저장" 버튼 - 브라우저 인쇄 다이얼로그를 열어 "PDF로 저장"을 선택하게 함.
   서버로 아무것도 전송하지 않으며, 인쇄용 CSS(@media print)가 폼/버튼을 가리고
   카드만 보이게 해줌. */
document.getElementById('pdfbtn').addEventListener('click', function(){
  window.print();
});
</script>

</body>
</html>
`

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Decodes patient data from an old-style shared link (lz-string compressed
// JSON in ?d=) purely to build a human-readable title, for backward
// compatibility with any links sent before the share-link flow was removed.
// Nothing here is written to disk or a database.
function buildTitleAndDescription(compressed) {
  if (!compressed) {
    return { title: '预约确认书', description: '点击查看预约确认书' }
  }
  try {
    const json = LZString.decompressFromEncodedURIComponent(compressed)
    if (!json) return { title: '预约确认书', description: '点击查看预约确认书' }
    const data = JSON.parse(json)
    const hospital = data.hk || data.hz || ''
    const title = hospital ? `${hospital} 预约确认书` : '预约确认书'
    const description = hospital ? `${hospital} 预约确认书` : '点击查看预约确认书'
    return { title, description }
  } catch {
    return { title: '预约确认书', description: '点击查看预约确认书' }
  }
}

export const handler = async (event) => {
  const compressed = event.queryStringParameters && event.queryStringParameters.d
  const { title, description } = buildTitleAndDescription(compressed)

  const html = TEMPLATE
    .replaceAll('__TITLE__', escapeHtml(title))
    .replaceAll('__DESC__', escapeHtml(description))

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: html,
  }
}
