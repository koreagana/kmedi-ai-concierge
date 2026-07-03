import { useEffect, useRef, useState } from 'react'
import type { LangCode } from '../data/translations'

const SPEECH_LANG: Record<LangCode, string> = {
  zh: 'zh-CN',
  ko: 'ko-KR',
  en: 'en-US',
  ar: 'ar-SA',
}

// Ordered best → acceptable. Matched case-insensitively against each
// candidate voice's name. Covers common Chrome/Google, Microsoft Edge
// and macOS/iOS voice names so we avoid whatever low-quality default
// the browser would otherwise fall back to.
const PREFERRED_VOICE_NAMES: Record<LangCode, string[]> = {
  zh: ['Google 普通话', 'Xiaoxiao', 'Yunxi', 'Yunyang', 'Tingting (Enhanced)', 'Tingting', 'Ting-Ting'],
  ko: ['Google 한국의', 'SunHi', 'InJoon', 'Yuna (Enhanced)', 'Yuna'],
  en: ['Google US English', 'Aria', 'Ava (Enhanced)', 'Ava', 'Samantha (Enhanced)', 'Samantha'],
  ar: ['Google العربية', 'Hamed', 'Salma', 'Maged (Enhanced)', 'Maged'],
}

const LABEL: Record<LangCode, { play: string; stop: string }> = {
  zh: { play: '朗读本文', stop: '停止朗读' },
  ko: { play: '본문 읽어주기', stop: '읽기 중지' },
  en: { play: 'Read aloud', stop: 'Stop reading' },
  ar: { play: 'قراءة النص', stop: 'إيقاف القراءة' },
}

function pickVoice(voices: SpeechSynthesisVoice[], lang: LangCode): SpeechSynthesisVoice | null {
  const target = SPEECH_LANG[lang].toLowerCase()
  const base = target.split('-')[0]
  const candidates = voices.filter(v => v.lang.toLowerCase().startsWith(base))
  if (candidates.length === 0) return null

  // Prefer an exact locale match (e.g. zh-CN over zh-TW) when available.
  const exact = candidates.filter(v => v.lang.toLowerCase() === target)
  const pool = exact.length > 0 ? exact : candidates

  for (const name of PREFERRED_VOICE_NAMES[lang]) {
    const match = pool.find(v => v.name.toLowerCase().includes(name.toLowerCase()))
    if (match) return match
  }
  const quality = pool.find(v => /natural|enhanced|premium|neural/i.test(v.name))
  if (quality) return quality
  return pool[0]
}

// Classic speaker glyph — deliberately drawn as SVG rather than relying on
// the 🔊 emoji, whose glyph shape varies wildly across OS/browser fonts
// (on some systems it renders as a round speaker driver, not a "speaker").
function SpeakerIcon({ active }: { active: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 9v6h4l5 4V5L8 9H4z"
        fill="currentColor"
      />
      {active ? (
        <path
          d="M17 9l6 6M23 9l-6 6"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M15.5 8.5a5 5 0 0 1 0 7"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M18.5 5.5a9 9 0 0 1 0 13"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}
    </svg>
  )
}

export default function TtsButton({ text, lang }: { text: string; lang: LangCode }) {
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)
  const textRef = useRef(text)
  textRef.current = text
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window
    setSupported(hasSpeech)
    if (!hasSpeech) return

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices()
    }
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  // Stop mid-read if the underlying text changes (e.g. switching categories) or on unmount.
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [text, lang])

  if (!supported) return null

  const handleClick = () => {
    const synth = window.speechSynthesis
    if (speaking) {
      synth.cancel()
      setSpeaking(false)
      return
    }
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(textRef.current.replace(/\n+/g, ' '))
    utterance.lang = SPEECH_LANG[lang]
    const voice = pickVoice(voicesRef.current.length ? voicesRef.current : synth.getVoices(), lang)
    if (voice) utterance.voice = voice
    utterance.rate = 0.95
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    synth.speak(utterance)
    setSpeaking(true)
  }

  return (
    <button
      type="button"
      className={`tts-btn ${speaking ? 'tts-btn-active' : ''}`}
      onClick={handleClick}
      aria-label={speaking ? LABEL[lang].stop : LABEL[lang].play}
      title={speaking ? LABEL[lang].stop : LABEL[lang].play}
    >
      <SpeakerIcon active={speaking} />
    </button>
  )
}
