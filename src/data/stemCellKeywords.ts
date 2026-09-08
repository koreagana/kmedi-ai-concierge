import type { LocalizedText } from './bigHealthKeywords'

export interface StemCellKeyword {
  id: string
  title: LocalizedText
  /** Short line shown under the title on the tile */
  tileSubtitle: LocalizedText
}

export const STEM_CELL_KEYWORDS: StemCellKeyword[] = [
  {
    id: 'skin-regeneration',
    title: { zh: '皮肤再生', en: 'Skin Regeneration' },
    tileSubtitle: { zh: '肤质 · 弹性 · 组织修复', en: 'Texture · Elasticity · Tissue Repair' },
  },
  {
    id: 'joint-cartilage',
    title: { zh: '膝关节 · 软骨修复', en: 'Knee & Cartilage Repair' },
    tileSubtitle: { zh: '软骨损伤 · 退行性膝关节问题', en: 'Cartilage Damage · Degenerative Knee Issues' },
  },
  {
    id: 'approved-cell-therapy',
    title: { zh: '韩国获批细胞治疗', en: 'Korea-Approved Cell Therapy' },
    tileSubtitle: { zh: '针对特定疾病的正规细胞治疗', en: 'Licensed Therapy for Specific Conditions' },
  },
  {
    id: 'autologous-blood-iv',
    title: { zh: '自体血液 · 抗衰IV', en: 'Autologous Blood · Anti-Aging IV' },
    tileSubtitle: { zh: 'PRP · PRF · PMF · 生长因子', en: 'PRP · PRF · PMF · Growth Factors' },
  },
]
