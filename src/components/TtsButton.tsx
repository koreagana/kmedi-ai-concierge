import { useEffect, useRef, useState } from 'react'
import type { LangCode } from '../data/translations'

const SPEECH_LANG: Record<LangCode, string> = {
  zh: 'zh-CN',
  ko: 'ko-KR',
  en: 'en-US',
  ar: 'ar-SA',
}

const LABEL: Record<LangCode, { play: string; stop: string }> = {
  zh: { play: '朗读本文', stop: '停止朗读' },
  ko: { play: '본문 읽어주기', stop: '읽기 중지' },
  en: { play: 'Read aloud', stop: 'Stop reading' },
  ar: { play: 'قراءة النص', stop: 'إيقاف القراءة' },
}

export default function TtsButton({ text, lang }: { text: string; lang: LangCode }) {
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)
  const textRef = useRef(text)
  textRef.current = text

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
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
      {speaking ? '⏸' : '🔊'}
    </button>
  )
}
