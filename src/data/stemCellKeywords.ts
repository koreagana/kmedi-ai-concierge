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

/** Prominent statement shown right below the category hero, above the accordion tiles —
    reframes "stem cell treatment" as an umbrella term covering several distinct things,
    so the tile breakdown below reads as clarification rather than a generic list. */
export const STEM_CELL_INTRO = {
  line1: {
    zh: '在韩国，不同"干细胞治疗"并不是一回事。',
    en: 'In Korea, not all "stem cell treatments" are the same thing.',
  } as LocalizedText,
  line2: {
    zh: '我们帮您区分真正的细胞治疗、获批治疗、再生医学手术与自体血液再生。',
    en: 'We help you tell apart true cell therapy, approved treatments, regenerative medicine procedures, and autologous blood regeneration.',
  } as LocalizedText,
}

export const STEM_CELL_KEYWORDS: StemCellKeyword[] = [
  {
    id: 'skin-regeneration',
    title: { zh: '皮肤再生', en: 'Skin Regeneration' },
    tileSubtitle: { zh: '肤质 · 弹性 · 组织修复', en: 'Texture · Elasticity · Tissue Repair' },
    body: {
      zh: '通过专用分离设备，从自身血液中提取生长因子等再生相关活性成分，\n可注射于面部改善肤质，也可静脉输注用于全身抗衰管理。',
      en: 'Using dedicated separation equipment, regenerative components such as growth factors are extracted from your own blood —\nthese can be injected into the face to improve skin texture, or given as an IV infusion for whole-body anti-aging management.',
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
    body: {
      zh: '针对软骨损伤及退行性膝关节问题的再生治疗。代表性产品为韩国正式获批的干细胞治疗药物 Cartistem——通过关节内微创钻孔，将其植入软骨缺损部位，属于正规细胞治疗药物的临床应用，而非单纯的注射治疗。',
      en: 'Regenerative treatment for cartilage damage and degenerative knee conditions. The representative product is Cartistem, a cell therapy drug formally approved in Korea — implanted into the cartilage defect through a minimally invasive drilling procedure inside the joint, as a clinical application of a licensed cell therapy rather than a simple injection.',
    },
    list: [
      { zh: 'Cartistem 软骨再生治疗（韩国获批治疗药物）', en: 'Cartistem cartilage regeneration therapy (Korea-approved product)' },
      { zh: '关节内微创钻孔植入', en: 'Minimally invasive intra-articular drilling & implantation' },
      { zh: '骨髓来源治疗', en: 'Bone Marrow-Derived Therapy' },
      { zh: 'PRP / PRF', en: 'PRP / PRF' },
    ],
  },
  {
    id: 'approved-cell-therapy',
    title: { zh: '韩国获批细胞治疗', en: 'Korea-Approved Cell Therapy' },
    tileSubtitle: { zh: '针对特定疾病的正规细胞治疗', en: 'Licensed Therapy for Specific Conditions' },
    body: {
      zh: '韩国已有针对特定疾病正式获批的细胞治疗药物，其中部分产品是全球范围内最早获得监管批准的干细胞治疗药物。',
      en: 'Korea already has cell therapy products formally approved for specific diseases — some of which were among the first stem cell therapies in the world to receive regulatory approval.',
    },
    products: [
      { name: 'Hearticellgram-AMI', desc: { zh: '急性心肌梗死相关治疗（韩国食品药品安全处MFDS批准的全球首个干细胞治疗药物）', en: "For acute myocardial infarction (the world's first stem cell therapy drug approved by Korea's MFDS)" } },
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
    body: {
      zh: '抽取自己的血液，分离并浓缩其中的活性成分。\n韩国对体外培养扩增自体细胞有严格的法律限制，且培养过程本身存在细胞活性受损的风险，因此抗衰老相关的自体血液疗法通常直接使用新鲜分离的生长因子等活性成分，而非体外培养的细胞。',
      en: "Your own blood is drawn, then separated and concentrated for its active components.\nKorea strictly regulates in-vitro culturing and expansion of autologous cells, and the culturing process itself carries a risk of reduced cell viability — so anti-aging autologous blood therapies typically use freshly separated growth factors and active components directly, rather than cultured cells.",
    },
    pillGroups: [
      [{ zh: 'PRP', en: 'PRP' }, { zh: 'PRF', en: 'PRF' }, { zh: 'PMF', en: 'PMF' }],
      [{ zh: '生长因子', en: 'Growth Factors' }, { zh: '血小板', en: 'Platelets' }, { zh: '细胞外囊泡', en: 'Extracellular Vesicles' }],
    ],
    footerLine: { zh: '局部治疗 / IV静脉治疗', en: 'Local Treatment / IV Treatment' },
  },
]
