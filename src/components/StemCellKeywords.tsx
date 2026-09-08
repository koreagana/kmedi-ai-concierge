import { useApp } from '../contexts/AppContext'
import { BIG_HEALTH_PILLS_PROMPT, type LocalizedText } from '../data/bigHealthKeywords'
import { STEM_CELL_KEYWORDS } from '../data/stemCellKeywords'
import type { LangCode } from '../data/translations'

const pick = (text: LocalizedText, lang: LangCode) => text[lang]

export default function StemCellKeywords() {
  const { lang } = useApp()

  return (
    <div className="bh-section">
      <p className="bh-pills-prompt" style={{ paddingTop: 22, paddingBottom: 14 }}>{pick(BIG_HEALTH_PILLS_PROMPT, lang)}</p>

      <div className="bh-tiles bh-tiles--stemcell">
        {STEM_CELL_KEYWORDS.map(kw => (
          <div key={kw.id} className="bh-tile bh-tile--banner">
            <span className="bh-tile-label">
              {pick(kw.title, lang)}
              <span className="bh-tile-sublabel">{pick(kw.tileSubtitle, lang)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
