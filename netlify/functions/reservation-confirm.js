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
     - brand-blue 계열: ai-kmedi.com 실제 네비게이션바 색상 (카드 상단 배경)
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
    flex-shrink:0; width:40px; height:24px; border-radius:5px; background:var(--sky-pale);
    color:var(--sky); font-size:10.5px; font-weight:800; display:flex; align-items:center; justify-content:center;
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
  .addr-input:empty::before{ content:attr(data-placeholder); color:#B9C4D1; }

  /* ============================================================
     병원명(한국어) 입력칸 아래 뜨는 커스텀 드롭다운
     - <datalist>는 모바일 사파리/크롬에서 거의 동작하지 않아 직접 구현
     - 칸을 탭하면 전체 목록, 입력하면 이름에 포함되는 병원만 필터링
     ============================================================ */
  .hospital-dropdown{
    display:none; position:absolute; left:0; right:0; top:100%; margin-top:4px;
    max-height:260px; overflow-y:auto; background:#fff; border:1px solid var(--line);
    border-radius:10px; box-shadow:0 8px 24px rgba(11,37,69,0.14); z-index:20;
  }
  .hospital-dropdown.open{ display:block; }
  .hospital-option{ padding:11px 14px; font-size:14px; color:var(--navy); cursor:pointer; border-bottom:1px solid var(--line); }
  .hospital-option:last-child{ border-bottom:none; }
  .hospital-option:active, .hospital-option.active{ background:var(--sky-pale); }
  .hospital-option .zh-name{ display:block; font-size:12px; color:var(--muted); margin-top:2px; }
  .hospital-empty{ padding:14px; font-size:13px; color:var(--muted); text-align:center; }

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
    @page{ size:90mm 160mm; margin:0; } /* 휴대폰 화면 비율 9:16 */
    /* 브라우저가 인쇄 시 배경색을 기본적으로 빼거나 색을 흐리게(회색조) 바꾸는 것을 막음
       - 이게 없으면 stub-main의 파란 배경이 사라지고 흰 글씨가 회색으로 보임 */
    *{ -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
    .intro, .form-panel, .resetbtn, .pdfbtn{ display:none !important; }
    body{ background:#fff; padding:0; }
    .layout{ max-width:none; gap:0; }
    .panel.card-panel{ border:none; padding:0; background:transparent; box-shadow:none; }
    .preview-wrap{ padding:0; }
    #card{ max-width:none; width:100%; height:100vh; min-height:0; border:none; border-radius:0; box-shadow:none; }

    /* 90×160mm(9:16)는 기존 100×200mm보다 세로가 짧아서, 화면 미리보기용 여백/글자
       크기 그대로 두면 카드 내용이 한 페이지를 넘어 2페이지로 잘림 → 인쇄 시에만
       여백·글자 크기를 줄여 한 페이지(1장)에 맞춤. 화면 편집 화면은 그대로 유지됨. */
    .stub-main{ padding:22px 20px; }
    .eyebrow{ margin-bottom:10px; padding:5px 14px; font-size:12px; }
    .hospital-ko{ font-size:23px; }
    .hospital-zh{ font-size:13px; margin-top:4px; }
    .datetime-row{ margin:14px 0 12px; padding-top:14px; }
    .dt-block .label{ margin-bottom:3px; }
    .dt-block .value{ font-size:20px; }
    .patient-block{ padding-top:12px; gap:5px; }
    .patient-row{ font-size:12.5px; }
    .meta-row{ margin-top:4px; }
    .stub-addr{ padding:16px 20px; }
    .addr-head{ margin-bottom:10px; font-size:13px; }
    .addr-row{ padding:8px 0; }
    .addr-input{ font-size:12.5px; }
    .brandfoot{ margin-top:10px; }
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
    <div class="field" style="position:relative;">
      <label>병원명 (한국어) <span style="font-weight:400;color:var(--muted)">— 칸을 탭하면 파트너 병원 목록이 열립니다</span></label>
      <input id="f-hospital-ko" value="" autocomplete="off">
      <div id="hospital-dropdown" class="hospital-dropdown"></div>
    </div>
    <div class="field">
      <label>병원명 (中文)</label>
      <input id="f-hospital-zh" value="">
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
          <div class="addr-head">주소 / 地址 / Address · 연락처</div>

          <div class="addr-row">
            <div class="addr-flag">KO</div>
            <div class="addr-input" id="c-addr-ko" contenteditable="true" data-placeholder="병원 선택 시 자동 입력"></div>
          </div>
          <div class="addr-row">
            <div class="addr-flag">ZH</div>
            <div class="addr-input" id="c-addr-zh" contenteditable="true" data-placeholder="选择医院后自动填写"></div>
          </div>
          <div class="addr-row">
            <div class="addr-flag">EN</div>
            <div class="addr-input" id="c-addr-en" contenteditable="true" data-placeholder="Auto-filled on hospital select"></div>
          </div>
          <div class="addr-row">
            <div class="addr-flag">TEL</div>
            <div class="addr-input" id="c-phone" contenteditable="true" data-placeholder="-"></div>
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

/* ================================================================
   파트너 병의원 목록 (파트너_병의원_목록.xlsx 기준, 2026년)
   병원명(한국어)을 입력하면 中文名/영문명/3개국어 주소/전화번호가
   자동으로 채워집니다. 목록을 갱신할 때는 이 배열만 수정하면 됩니다.
   ================================================================ */
const HOSPITALS = [{"ko": "녹십자의료재단", "zh": "绿十字医疗财团", "en": "Green Cross Medical Foundation", "addrKo": "서울특별시 강남구 일원로 75", "addrZh": "首尔特别市江南区一院路75", "addrEn": "75, Ilwon-ro, Gangnam-gu, Seoul", "phone": "02-3469-0000"}, {"ko": "분당서울대학교병원", "zh": "盆唐首尔大学医院", "en": "Seoul National University Bundang Hospital", "addrKo": "경기도 성남시 분당구 구미로173번길 82", "addrZh": "京畿道城南市盆唐区龟尾路173号街82", "addrEn": "82, Gumi-ro 173beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do", "phone": "031-787-7114"}, {"ko": "삼성서울병원", "zh": "三星首尔医院", "en": "Samsung Medical Center", "addrKo": "서울특별시 강남구 일원로 81", "addrZh": "首尔特别市江南区一院路81", "addrEn": "81, Irwon-ro, Gangnam-gu, Seoul", "phone": "02-3410-2114"}, {"ko": "서울대학교병원 강남센터", "zh": "首尔大学医院江南中心", "en": "Seoul National University Hospital Gangnam Center", "addrKo": "서울특별시 강남구 봉은사로 235", "addrZh": "首尔特别市江南区奉恩寺路235", "addrEn": "235, Bongeunsa-ro, Gangnam-gu, Seoul", "phone": "02-2112-5500"}, {"ko": "연세대학교 세브란스병원", "zh": "延世大学世福兰斯医院", "en": "Severance Hospital, Yonsei University", "addrKo": "서울특별시 서대문구 연세로 50-1", "addrZh": "首尔特别市西大门区延世路50-1", "addrEn": "50-1, Yonsei-ro, Seodaemun-gu, Seoul", "phone": "02-2228-5800"}, {"ko": "부민병원 서울", "zh": "釜民医院首尔", "en": "Bumin Hospital Seoul", "addrKo": "서울특별시 서초구 강남대로 7", "addrZh": "首尔特别市瑞草区江南大路7", "addrEn": "7, Gangnam-daero, Seocho-gu, Seoul", "phone": "02-3012-4000"}, {"ko": "차병원 서울 (강남차병원)", "zh": "首尔CHA医院(江南CHA)", "en": "CHA Gangnam Medical Center", "addrKo": "서울특별시 강남구 논현로 566", "addrZh": "首尔特别市江南区论岘路566", "addrEn": "566, Nonhyeon-ro, Gangnam-gu, Seoul", "phone": "02-3468-3000"}, {"ko": "대구차여성병원", "zh": "大邱CHA女性医院", "en": "CHA Daegu Women's Hospital", "addrKo": "대구광역시 북구 호암로 335", "addrZh": "大邱广域市北区虎岩路335", "addrEn": "335, Hoam-ro, Buk-gu, Daegu", "phone": "053-321-5678"}, {"ko": "가톨릭대학교 성심병원", "zh": "天主教大学圣心医院", "en": "Yeouido St. Mary's Hospital", "addrKo": "서울특별시 영등포구 63로 10", "addrZh": "首尔特别市永登浦区63路10", "addrEn": "10, 63-ro, Yeongdeungpo-gu, Seoul", "phone": "02-3779-1114"}, {"ko": "중앙대학교의료원 현대병원", "zh": "中央大学医疗院现代医院", "en": "Chung-Ang University Hyundai Hospital", "addrKo": "서울특별시 동작구 흑석로 102", "addrZh": "首尔特别市铜雀区黑石路102", "addrEn": "102, Heukseok-ro, Dongjak-gu, Seoul", "phone": "02-6299-1114"}, {"ko": "허쉬성형외과", "zh": "HERSHE整形外科", "en": "HERSHE Plastic Surgery", "addrKo": "서울특별시 강남구 삼성로 730, 2~4층 (청담동)", "addrZh": "首尔特别市江南区三星路730号2-4层(清潭洞)", "addrEn": "730, 2~4F, Samseong-ro, Cheongdam-dong, Gangnam-gu, Seoul", "phone": "02-511-3911"}, {"ko": "바노바기성형외과", "zh": "芭诺芭琪整形外科", "en": "Banobagi Plastic Surgery", "addrKo": "서울특별시 강남구 논현로 517 (역삼동)", "addrZh": "首尔特别市江南区论岘路517(驿三洞)", "addrEn": "517, Nonhyeon-ro, Gangnam-gu, Seoul", "phone": "1588-6508"}, {"ko": "디에이 DA 성형외과", "zh": "DA整形外科", "en": "DA Plastic Surgery", "addrKo": "서울특별시 강남구 테헤란로 125 (역삼동)", "addrZh": "首尔特别市江南区德黑兰路125(驿三洞)", "addrEn": "125, Teheran-ro, Gangnam-gu, Seoul", "phone": "02-515-4600"}, {"ko": "에이비성형외과", "zh": "AB整形外科", "en": "AB Plastic Surgery", "addrKo": "서울특별시 서초구 서초대로77길 17 BLOCK77빌딩 2·3·4층", "addrZh": "首尔特别市瑞草区瑞草大路77街17号BLOCK77楼2-4层", "addrEn": "17, Seocho-daero 77-gil, Seocho-gu, Seoul (BLOCK77 Bldg 2-4F)", "phone": "02-512-1288"}, {"ko": "아이콘성형외과", "zh": "ICON整形外科", "en": "ICON Plastic Surgery", "addrKo": "서울특별시 강남구 압구정로 (압구정역 인근)", "addrZh": "首尔特别市江南区狎鸥亭路(狎鸥亭站附近)", "addrEn": "Apgujeong-ro, Gangnam-gu, Seoul (near Apgujeong Stn)", "phone": "문의 필요"}, {"ko": "루비성형외과", "zh": "Ruby整形外科", "en": "Ruby Plastic Surgery", "addrKo": "서울특별시 강남구 논현동", "addrZh": "首尔特别市江南区论岘洞", "addrEn": "Nonhyeon-dong, Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "드립성형외과", "zh": "Drip整形外科", "en": "Drip Plastic Surgery", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "마인성형외과", "zh": "MINE整形外科", "en": "Mine Plastic Surgery", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "맹경룡성형외과", "zh": "孟庆龙整形外科", "en": "Maeng Gyeong-ryong Plastic Surgery", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "바노바기피부과", "zh": "芭诺芭琪皮肤科", "en": "Banobagi Skin Clinic", "addrKo": "서울특별시 강남구 봉은사로 219 (논현동, 두남빌딩)", "addrZh": "首尔特别市江南区奉恩寺路219(论岘洞,斗南大厦)", "addrEn": "219, Bongeunsa-ro, Gangnam-gu, Seoul (Dunam Bldg)", "phone": "02-3288-3322"}, {"ko": "아름다운나라피부과", "zh": "美丽国度皮肤科", "en": "Beautiful Country Dermatology", "addrKo": "서울특별시 강남구 강남대로 390 미진프라자 12F (역삼동)", "addrZh": "首尔特别市江南区江南大路390美珍广场12楼(驿三洞)", "addrEn": "390, Gangnam-daero, Gangnam-gu, Seoul (Mijin Plaza 12F)", "phone": "02-3420-2201"}, {"ko": "블랑드비의원", "zh": "Blanc de Vis医院", "en": "Blanc de Vis Clinic", "addrKo": "서울특별시 강남구 압구정로29길 21, 현대백화점 컬처파크 지하1층", "addrZh": "首尔特别市江南区狎鸥亭路29街21号,现代百货文化广场地下1层", "addrEn": "21, Apgujeong-ro 29-gil, Gangnam-gu, Seoul (Hyundai Dept. Culture Park B1)", "phone": "02-563-0000"}, {"ko": "벤스의원 강남", "zh": "VandS诊所 江南", "en": "VandS Clinic Gangnam", "addrKo": "서울특별시 서초구 강남대로 411 DS타워 12~13층 (강남역 10번 출구)", "addrZh": "首尔特别市瑞草区江南大路411号DS大厦12-13层(江南站10号出口)", "addrEn": "411, Gangnam-daero, Seocho-gu, Seoul (DS Tower 12-13F)", "phone": "문의 필요"}, {"ko": "리베리의원 강남", "zh": "Reberry诊所 江南", "en": "Reberry Clinic Gangnam", "addrKo": "서울특별시 서초구 강남대로69길 8, 케이아이타워 지하1·2층 (서초동)", "addrZh": "首尔特别市瑞草区江南大路69街8号KI大厦地下1-2层(瑞草洞)", "addrEn": "8, Gangnam-daero 69-gil, Seocho-gu, Seoul (K I Tower B1-B2)", "phone": "02-2039-2822"}, {"ko": "바로그의원 강남", "zh": "Barog医院 江南", "en": "Barog Clinic Gangnam", "addrKo": "서울특별시 강남구 (강남역 인근)", "addrZh": "首尔特别市江南区(江南站附近)", "addrEn": "Gangnam-gu, Seoul (near Gangnam Stn)", "phone": "문의 필요"}, {"ko": "살롱드닥터튜즈", "zh": "Salon de Dr. TUES", "en": "Salon de Dr. TUES", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "신소애의원", "zh": "新素爱医院", "en": "Sinsoa Clinic", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "리클리닉", "zh": "Li Clinic", "en": "Li Clinic", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "운선미원장", "zh": "云善美院长诊所", "en": "Dr. Wunsunmi Clinic", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "유캔비의원", "zh": "You Can Be诊所", "en": "You Can Be Clinic", "addrKo": "서울특별시 강남구 (강남 위치)", "addrZh": "首尔特别市江南区", "addrEn": "Gangnam-gu, Seoul", "phone": "문의 필요"}, {"ko": "제주와인피부과", "zh": "济州Wine皮肤科", "en": "Jeju Wine Dermatology", "addrKo": "제주특별자치도 제주시 (제주 위치)", "addrZh": "济州特别自治道济州市", "addrEn": "Jeju-si, Jeju-do", "phone": "문의 필요"}, {"ko": "더미인 제주", "zh": "The Miin 济州", "en": "The Miin Jeju", "addrKo": "제주특별자치도 제주시 (제주 위치)", "addrZh": "济州特别自治道济州市", "addrEn": "Jeju-si, Jeju-do", "phone": "문의 필요"}, {"ko": "셀러블153강남의원", "zh": "Cellable153江南医院", "en": "Cellable153 Gangnam", "addrKo": "서울특별시 강남구 언주로 720 B1~B3층 (논현동)", "addrZh": "首尔特别市江南区彦鹤路720号B1-B3层(论岘洞)", "addrEn": "720, Eonju-ro, Gangnam-gu, Seoul (B1-B3F)", "phone": "0504-3179-6712"}, {"ko": "더클리닉", "zh": "The Clinic", "en": "The Clinic", "addrKo": "서울특별시 강남구 청담동 (신라호텔 더클리닉)", "addrZh": "首尔特别市江南区清潭洞(新罗酒店The Clinic)", "addrEn": "Cheongdam-dong, Gangnam-gu, Seoul", "phone": "02-2230-3000"}, {"ko": "서래마을병원", "zh": "西来村医院", "en": "Seorae Village Hospital", "addrKo": "서울특별시 서초구 반포동 (서래마을 인근)", "addrZh": "首尔特别市瑞草区盘浦洞(西来村附近)", "addrEn": "Banpo-dong, Seocho-gu, Seoul", "phone": "문의 필요"}, {"ko": "양성자치료", "zh": "质子治疗中心", "en": "Proton Therapy Center", "addrKo": "경기도 고양시 일산동구 일산로 323 (국립암센터)", "addrZh": "京畿道高阳市一山东区一山路323(国立癌症中心)", "addrEn": "323, Ilsan-ro, Ilsandong-gu, Goyang-si, Gyeonggi-do", "phone": "1588-8110"}, {"ko": "리앤장성형외과피부과", "zh": "LIENJANG整形外科皮肤科", "en": "LIENJANG Plastic Surgery & Dermatology", "addrKo": "서울특별시 서초구 강남대로 403, 343강남타워 16~18층", "addrZh": "首尔特别市瑞草区江南大路403号343江南大厦16-18层", "addrEn": "403, Gangnam-daero, Seocho-gu, Seoul (343 Gangnam Tower 16-18F)", "phone": "문의 필요"}]

/* 병원명(한국어) 커스텀 드롭다운
   - <datalist>는 모바일 사파리/크롬에서 거의 열리지 않아 직접 구현함
   - 칸을 탭(focus)하면 전체 목록이 열리고, 입력하면 이름에 포함되는 병원만 필터링
   - 목록에서 정확히 일치하는 병원을 선택(또는 타이핑으로 완전 일치)하면
     中文名/영문명/주소/전화번호가 자동으로 채워짐 */
function renderHospitalDropdown(filterText){
  const dropdown = document.getElementById('hospital-dropdown')
  const q = filterText.trim().toLowerCase()
  const matches = q ? HOSPITALS.filter(h => h.ko.toLowerCase().includes(q)) : HOSPITALS

  dropdown.innerHTML = ''
  if (!matches.length){
    const empty = document.createElement('div')
    empty.className = 'hospital-empty'
    empty.textContent = '일치하는 파트너 병원이 없습니다'
    dropdown.appendChild(empty)
  } else {
    matches.forEach(h => {
      const opt = document.createElement('div')
      opt.className = 'hospital-option'
      opt.innerHTML = h.ko + '<span class="zh-name">' + h.zh + '</span>'
      // mousedown(터치는 touchstart보다 먼저 발생)이 input의 blur보다 먼저 실행되므로
      // 모바일 탭에서도 선택이 blur로 인해 취소되지 않고 확실히 반영됨
      opt.addEventListener('mousedown', function(e){
        e.preventDefault()
        document.getElementById('f-hospital-ko').value = h.ko
        applyHospital(h)
        update()
        closeHospitalDropdown()
      })
      dropdown.appendChild(opt)
    })
  }
  dropdown.classList.add('open')
}

function closeHospitalDropdown(){
  document.getElementById('hospital-dropdown').classList.remove('open')
}

function applyHospital(h){
  document.getElementById('f-hospital-zh').value = h.zh
  document.getElementById('c-addr-ko').textContent = h.addrKo
  document.getElementById('c-addr-zh').textContent = h.addrZh
  document.getElementById('c-addr-en').textContent = h.addrEn
  document.getElementById('c-phone').textContent = h.phone || '-'
}

function handleHospitalInput(){
  const typed = document.getElementById('f-hospital-ko').value
  renderHospitalDropdown(typed)
  const exact = HOSPITALS.find(h => h.ko === typed.trim())
  if (exact) applyHospital(exact)
  update()
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

/* 입력칸에 글자를 칠 때마다 update() 자동 실행 (실시간 미리보기)
   병원명(한국어)만 예외로, 파트너 목록과 정확히 일치하면 中文名/주소/전화번호까지
   함께 채우는 handleHospitalInput()을 사용 */
const hospitalKoInput = document.getElementById('f-hospital-ko');
hospitalKoInput.addEventListener('input', handleHospitalInput);
hospitalKoInput.addEventListener('focus', function(){ renderHospitalDropdown(hospitalKoInput.value) });
hospitalKoInput.addEventListener('blur', closeHospitalDropdown);
['f-hospital-zh','f-date','f-time','f-patient','f-dob','f-passport','f-memo'].forEach(id=>{
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
