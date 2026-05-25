import { useCallback, useRef } from 'react'

export function useVoice() {
  const synthRef = useRef(window.speechSynthesis)

  const speak = useCallback((text: string, lang = 'zh-CN', rate = 0.9) => {
    synthRef.current.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = lang
    utt.rate = rate
    utt.pitch = 1.05
    synthRef.current.speak(utt)
    return utt
  }, [])

  const stop = useCallback(() => {
    synthRef.current.cancel()
  }, [])

  const speakSequence = useCallback(
    (lines: { text: string; lang?: string; delay?: number }[]) => {
      let offset = 0
      const ids: ReturnType<typeof setTimeout>[] = []
      lines.forEach(line => {
        const id = setTimeout(() => {
          speak(line.text, line.lang ?? 'zh-CN')
        }, offset)
        ids.push(id)
        offset += (line.delay ?? 3000)
      })
      return () => ids.forEach(clearTimeout)
    },
    [speak],
  )

  return { speak, stop, speakSequence }
}
