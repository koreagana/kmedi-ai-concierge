import type { LocalizedText } from './bigHealthKeywords'

export interface StemCellProductItem {
  /** Brand/product name — not localized */
  name: string
  desc: LocalizedText
}

export interface StemCellKeyword {
  id: string
  title: LocalizedText
  /** Short line shown on the tile itself, under the title */
  tileSubtitle: LocalizedText
  /** Optional photo for the tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  /** 1-2 short lines. May contain \n for a line break. */
  body: LocalizedText
  /** Short tag-style keywords, rendered as pills */
  pills?: LocalizedText[]
  /** Grouped pills (a blank line between each group) */
  pillGroups?: LocalizedText[][]
  /** Plain closing line shown after the pill groups, e.g. "Local Treatment / IV Treatment" */
  footerLine?: LocalizedText
  /** Simple bullet list */
  list?: LocalizedText[]
  /** Product cards */
  products?: StemCellProductItem[]
  /** Small link-style caption at the end of the card, e.g. "See indications →" */
  hint?: LocalizedText
}

export const STEM_CELL_KEYWORDS: StemCellKeyword[] = [
  {
    id: 'skin-regeneration',
    title: { zh: '皮肤再生', en: 'Skin Regeneration' },
    tileSubtitle: { zh: '肤质 · 弹性 · 组织修复', en: 'Texture · Elasticity · Tissue Repair' },
    image: '/keyword-tiles/skin-regeneration-cell-activation-tile.png',
    body: {
      zh: '利用自体血液中的再生相关成分，\n用于皮肤与组织修复相关治疗。',
      en: 'Uses regenerative components drawn from your own blood\nfor skin and tissue repair treatments.',
    },
    pills: [
      { zh: '肤质 · 弹性', en: 'Texture · Elasticity' },
      { zh: '红敏 · 受损肌肤', en: 'Redness · Damaged Skin' },
      { zh: '术后恢复 · 组织修复', en: 'Post-Procedure Recovery · Tissue Repair' },
      { zh: '头皮 · 脱发', en: 'Scalp · Hair Loss' },
    ],
  },
  {
    id: 'joint-cartilage',
    title: { zh: '膝关节 · 软骨修复', en: 'Knee & Cartilage Repair' },
    tileSubtitle: { zh: '软骨损伤 · 退行性膝关节问题', en: 'Cartilage Damage · Degenerative Knee Issues' },
    image: '/keyword-tiles/joint-cartilage-consultation.png',
    body: {
      zh: '针对软骨损伤及退行性膝关节问题的再生治疗。',
      en: 'Regenerative treatments for cartilage damage and degenerative knee conditions.',
    },
    list: [
      { zh: '干细胞治疗', en: 'Stem Cell Therapy' },
      { zh: '骨髓来源治疗', en: 'Bone Marrow-Derived Therapy' },
      { zh: 'PRP / PRF', en: 'PRP / PRF' },
      { zh: '软骨再生治疗', en: 'Cartilage Regeneration Therapy' },
    ],
  },
  {
    id: 'approved-cell-therapy',
    title: { zh: '韩国获批细胞治疗', en: 'Korea-Approved Cell Therapy' },
    tileSubtitle: { zh: '针对特定疾病的正规细胞治疗', en: 'Licensed Therapy for Specific Conditions' },
    image: '/keyword-tiles/approved-cell-therapies.png',
    body: {
      zh: '韩国已有针对特定疾病正式获批的细胞治疗药物。',
      en: 'Korea has cell therapy products formally approved for specific diseases.',
    },
    products: [
      { name: 'Hearticellgram-AMI', desc: { zh: '急性心肌梗死相关治疗', en: 'For acute myocardial infarction' } },
      { name: 'Cartistem', desc: { zh: '膝关节软骨损伤相关治疗', en: 'For knee cartilage damage' } },
      { name: 'Cupistem', desc: { zh: '克罗恩病瘘管相关治疗', en: "For Crohn's disease fistulas" } },
      { name: 'Neuronata-R Inj.', desc: { zh: '肌萎缩侧索硬化症（ALS）相关治疗', en: 'For ALS (Lou Gehrig\'s disease)' } },
    ],
    hint: { zh: '查看适应症 →', en: 'See indications →' },
  },
  {
    id: 'autologous-blood-iv',
    title: { zh: '自体血液 · 抗衰IV', en: 'Autologous Blood · Anti-Aging IV' },
    tileSubtitle: { zh: 'PRP · PRF · PMF · 生长因子', en: 'PRP · PRF · PMF · Growth Factors' },
    image: '/keyword-tiles/autologous-blood-antiaging-iv-tile.png',
    body: {
      zh: '抽取自己的血液，\n分离并浓缩其中的活性成分。',
      en: 'Your own blood is drawn,\nthen separated and concentrated for its active components.',
    },
    pillGroups: [
      [{ zh: 'PRP', en: 'PRP' }, { zh: 'PRF', en: 'PRF' }, { zh: 'PMF', en: 'PMF' }],
      [{ zh: '生长因子', en: 'Growth Factors' }, { zh: '血小板', en: 'Platelets' }, { zh: '细胞外囊泡', en: 'Extracellular Vesicles' }],
    ],
    footerLine: { zh: '局部治疗 / IV静脉治疗', en: 'Local Treatment / IV Treatment' },
  },
]
