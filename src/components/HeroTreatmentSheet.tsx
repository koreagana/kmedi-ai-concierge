import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import type { HeroTreatmentInfo } from '../data/heroTreatments'
import './HeroTreatmentSheet.css'

interface Props {
  info: HeroTreatmentInfo | null
  onClose: () => void
}

export default function HeroTreatmentSheet({ info, onClose }: Props) {
  const { goToQuote } = useApp()

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
              <h3 className="hts-title">{info.chip}</h3>
              <p className="hts-definition">{info.definition}</p>

              {info.isException ? (
                <p className="hts-exception-note">{info.exceptionNote}</p>
              ) : (
                <div className="hts-fields">
                  <div className="hts-field">
                    <span className="hts-field-label">推荐情况</span>
                    <p className="hts-field-value">{info.recommend}</p>
                  </div>
                  <div className="hts-field">
                    <span className="hts-field-label">与其他项目的区别</span>
                    <p className="hts-field-value">{info.difference}</p>
                    {info.deviceNote && <p className="hts-device-note">{info.deviceNote}</p>}
                  </div>
                  <div className="hts-field">
                    <span className="hts-field-label">恢复期</span>
                    <p className="hts-field-value">{info.recovery}</p>
                  </div>
                </div>
              )}

              {!info.isException && (
                info.quoteProcedureId ? (
                  <button className="hts-cta" onClick={handleQuote}>查看该项目预估费用</button>
                ) : (
                  <p className="hts-noprice-note">该项目暂无固定报价，具体费用请通过咨询确认</p>
                )
              )}

              <p className="hts-footer-note">准确诊断请通过咨询确认</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
