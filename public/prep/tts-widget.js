/* 汉江春天 / 한강애봄 — 준비문서 공용 TTS(읽어주기) 위젯
   모든 public/prep/* 정적 페이지에서 <script src="/prep/tts-widget.js"></script>
   한 줄만 추가하면 우측 상단 플로팅 스피커 버튼이 생기고, 페이지의 중국어(.zh) 본문을
   차분한 남성 중국어 음성으로 읽어줍니다. 서버/과금 없이 브라우저 내장 음성만 사용합니다. */
(function () {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

  var SPEECH_LANG = 'zh-CN'
  // 차분하고 낮은 톤의 남성 음성 우선순위 (Edge/Windows 신경망 음성이 가장 잘 맞음).
  // 기기에 이 이름들이 없으면 기기에 있는 아무 중국어 음성으로 자연스럽게 대체됩니다.
  var MALE_VOICE_PREFERENCE = ['Yunyang', 'Yunjian', 'Yunxi', 'Kangkang', 'Zhiwei']

  var ICON_IDLE =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>' +
    '<path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>' +
    '<path d="M18.5 5.5a9 9 0 0 1 0 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>' +
    '</svg>'
  var ICON_ACTIVE =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>' +
    '<path d="M17 9l6 6M23 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>'

  var style = document.createElement('style')
  style.textContent =
    '.tts-float-btn{position:fixed;top:14px;right:14px;width:38px;height:38px;border-radius:50%;' +
    'border:1px solid rgba(0,119,182,0.35);background:rgba(255,255,255,0.94);color:#0077b6;' +
    'display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:9999;' +
    'box-shadow:0 2px 10px rgba(0,60,110,0.18);transition:background .15s ease,transform .15s ease;}' +
    '.tts-float-btn:active{transform:scale(0.94);}' +
    '.tts-float-btn.tts-on{background:#0077b6;color:#fff;border-color:#0077b6;' +
    'animation:ttsPulse 1.4s ease-in-out infinite;}' +
    '@keyframes ttsPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,119,182,.35);}50%{box-shadow:0 0 0 6px rgba(0,119,182,0);}}'
  document.head.appendChild(style)

  var voicesCache = []
  function loadVoices() { voicesCache = window.speechSynthesis.getVoices() }
  loadVoices()
  window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

  function pickVoice() {
    var voices = voicesCache.length ? voicesCache : window.speechSynthesis.getVoices()
    var pool = voices.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf('zh') === 0 })
    if (!pool.length) return null
    var exact = pool.filter(function (v) { return v.lang.toLowerCase() === 'zh-cn' })
    var target = exact.length ? exact : pool
    for (var i = 0; i < MALE_VOICE_PREFERENCE.length; i++) {
      for (var j = 0; j < target.length; j++) {
        if (target[j].name.indexOf(MALE_VOICE_PREFERENCE[i]) !== -1) return target[j]
      }
    }
    return target[0]
  }

  // <br>을 줄바꿈으로 보존해서 문장이 붙어버리지 않도록 함
  function textWithBreaks(el) {
    var html = el.innerHTML.replace(/<br\s*\/?>/gi, '\n')
    var tmp = document.createElement('div')
    tmp.innerHTML = html
    return (tmp.textContent || '').trim()
  }

  function extractChineseText() {
    var parts = []
    var h1 = document.querySelector('.header h1')
    if (h1) parts.push(textWithBreaks(h1))

    // "🔔 중국어 / 한국어" 형태로 섞여 있는 제목류는 " / " 앞부분(중국어)만 사용
    document.querySelectorAll('.section-title, .part-title, .result-title, .title, .zh').forEach(function (el) {
      var text = textWithBreaks(el)
      if (!text) return
      if (text.indexOf(' / ') !== -1) text = text.split(' / ')[0]
      parts.push(text)
    })

    return parts.join('。 ')
  }

  function init() {
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'tts-float-btn'
    btn.setAttribute('aria-label', '朗读本文')
    btn.innerHTML = ICON_IDLE
    document.body.appendChild(btn)

    var speaking = false
    btn.addEventListener('click', function () {
      var synth = window.speechSynthesis
      if (speaking) {
        synth.cancel()
        speaking = false
        btn.innerHTML = ICON_IDLE
        btn.classList.remove('tts-on')
        return
      }
      synth.cancel()
      var text = extractChineseText()
      if (!text) return
      var utter = new SpeechSynthesisUtterance(text)
      utter.lang = SPEECH_LANG
      var voice = pickVoice()
      if (voice) utter.voice = voice
      utter.rate = 0.95
      utter.pitch = 0.9
      utter.onend = function () { speaking = false; btn.innerHTML = ICON_IDLE; btn.classList.remove('tts-on') }
      utter.onerror = utter.onend
      synth.speak(utter)
      speaking = true
      btn.innerHTML = ICON_ACTIVE
      btn.classList.add('tts-on')
    })

    window.addEventListener('beforeunload', function () { window.speechSynthesis.cancel() })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
