import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import type { HeroTreatmentInfo } from '../data/heroTreatments'
import './HeroTreatmentSheet.css'

interface Props {
  info: HeroTreatmentInfo | null
  onClose: () => void
}

const SHEET_COPY = {
  zh: {
    recommend: '适用情况',
    difference: '项目区别',
    recovery: '恢复期',
    cta: '查看该项目预估费用',
    noPrice: '该项目暂无固定报价，具体费用请通过咨询确认',
    footer: '准确诊断请通过院内咨询确认。',
  },
  en: {
    recommend: "Who it's for",
    difference: 'How it differs',
    recovery: 'Downtime',
    cta: 'See the price range',
    noPrice: "We don't list a set price for this one — a concierge can confirm the cost with you.",
    footer: 'Only a consultation at the clinic can confirm what suits you.',
  },
}

export default function HeroTreatmentSheet({ info, onClose }: Props) {
  const { lang, goToQuote } = useApp()
  const isEn = lang === 'en'
  const s = isEn ? SHEET_COPY.en : SHEET_COPY.zh
  /* 시트 본문은 언어별 필드를 쓰되, 영문 번역이 비어 있으면 중문 원문으로 폴백 */
  const definition = isEn ? info?.definitionEn ?? info?.definition : info?.definition
  const recommend = isEn ? info?.recommendEn ?? info?.recommend : info?.recommend
  const difference = isEn ? info?.differenceEn ?? info?.difference : info?.difference
  const deviceNote = isEn ? info?.deviceNoteEn ?? info?.deviceNote : info?.deviceNote
  const recovery = isEn ? info?.recoveryEn ?? info?.recovery : info?.recovery
  const exceptionNote = isEn ? info?.exceptionNoteEn ?? info?.exceptionNote : info?.exceptionNote
  const title = isEn ? info?.chipEn ?? info?.chip : info?.chip

  const handleQuote = () => {
    if (!info) return
    onClose()
    goToQuote(info.quoteCategoryId, info.quoteProcedureId)
  }

  return (
    <AnimatePresence>
      {info && (
        <>
          <motion.div
            className="hts-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="hts-sheet"
            initial={{ x: '-50%', y: '100%' }}
            animate={{ x: '-50%', y: 0 }}
            exit={{ x: '-50%', y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <button className="hts-handle-btn" onClick={onClose} aria-label="close">
              <span className="hts-handle" />
            </button>

            <div className="hts-body">
              <h3 className="hts-title">{title}</h3>
              <p className="hts-definition">{definition}</p>

              {info.isException ? (
                <>
                  <p className="hts-exception-note">{exceptionNote}</p>
                  {(recommend || recovery) && (
                    <div className="hts-fields">
                      {recommend && (
                        <div className="hts-field">
                          <span className="hts-field-label">{s.recommend}</span>
                          <p className="hts-field-value">{recommend}</p>
                        </div>
                      )}
                      {recovery && (
                        <div className="hts-field">
                          <span className="hts-field-label">{s.recovery}</span>
                          <p className="hts-field-value">{recovery}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="hts-fields">
                  <div className="hts-field">
                    <span className="hts-field-label">{s.recommend}</span>
                    <p className="hts-field-value">{recommend}</p>
                  </div>
                  <div className="hts-field">
                    <span className="hts-field-label">{s.difference}</span>
                    <p className="hts-field-value">{difference}</p>
                    {deviceNote && <p className="hts-device-note">{deviceNote}</p>}
                  </div>
                  <div className="hts-field">
                    <span className="hts-field-label">{s.recovery}</span>
                    <p className="hts-field-value">{recovery}</p>
                  </div>
                </div>
              )}

              {info.quoteCategoryId ? (
                <button className="hts-cta" onClick={handleQuote}>{s.cta}</button>
              ) : (
                !info.isException && (
                  <p className="hts-noprice-note">{s.noPrice}</p>
                )
              )}

              <p className="hts-footer-note">{s.footer}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
