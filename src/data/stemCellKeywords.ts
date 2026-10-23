import type { LocalizedText } from './bigHealthKeywords'

export interface StemCellProductItem {
  /** Brand/product name — not localized */
  name: string
  desc: LocalizedText
  /** 식약처 허가 시기(승인 치료제만) — kmedispring.com 표의 批准时间 칸 */
  approved?: LocalizedText
}

/** 승인 치료제 표 아래 각주 — 허가 당시 기관명은 식품의약품안전청(KFDA), 2013년부터 식품의약품안전처(MFDS) */
export const APPROVAL_BODY_NOTE: LocalizedText = {
  zh: '获批时的主管机构叫韩国食品医药品安全厅（KFDA），现在改名为韩国食品医药品安全处（MFDS）。',
  en: "Approved by the Korea Food and Drug Administration (KFDA), now Korea's Ministry of Food and Drug Safety (MFDS).",
}

export interface StemCellKeyword {
  id: string
  title: LocalizedText
  /** Short line shown on the tile itself, under the title */
  tileSubtitle: LocalizedText
  /** 1-2 short lines. May contain \n for a line break. */
  body: LocalizedText
  /** Optional real case photo shown inside the expanded card (public/ path). */
  image?: string
  /** Optional second media item shown side-by-side with `image` (public/ path) —
      splits the photo slot into two equal panels instead of one. Both panels use
      object-fit: contain so product/packaging shots don't get cropped top-bottom
      the way a portrait-cropped real-case photo (CasePhoto, object-fit: cover) does. */
  secondaryMedia?: { type: 'image' | 'video'; src: string }
  /** kmedispring.com 세부 페이지에서 image+secondaryMedia 두 칸을 본문 아래가 아니라 페이지 맨 위(히어로)에 둔다.
      값은 두 매체의 가로/세로 비율 — 두 칸 높이를 똑같이 맞추는 데 쓴다. */
  heroSplitRatios?: [number, number]
  /** kmedispring.com 세부 페이지 맨 위 대표 사진(없으면 카테고리 사진). 잘리지 않게 전체를 보여준다. */
  heroImage?: string
  /** Short caption shown above the photo describing what it is. */
  imageCaption?: LocalizedText
  /** Source credit shown under the photo, e.g. hospital name. Not localized (usually a proper noun). */
  credit?: string
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
    zh: '在韩国，同样叫"干细胞治疗"，其实并不是一回事。',
    en: 'In Korea, not all "stem cell treatments" are the same thing.',
  } as LocalizedText,
  line2: {
    zh: '获批的细胞治疗、再生医学手术、自体血液再生……我们帮您分清楚。',
    en: 'We help you tell apart true cell therapy, approved treatments, regenerative medicine procedures, and autologous blood regeneration.',
  } as LocalizedText,
}

export const STEM_CELL_KEYWORDS: StemCellKeyword[] = [
  {
    id: 'immuncell-lc',
    title: { zh: '免疫细胞治疗 · Immuncell-LC', en: 'Immune Cell Therapy · Immuncell-LC' },
    tileSubtitle: { zh: '自体NK/T细胞 · 肝癌辅助免疫治疗', en: 'Autologous NK/T Cells · Liver Cancer Adjuvant Therapy' },
    body: {
      zh: 'Immuncell-LC和干细胞治疗不是一回事。它是韩国GC Cell（绿十字细胞）研发的自体免疫细胞治疗药：先抽您自己的血，在体外把其中的NK细胞和T细胞培养扩增，再输回体内，用于原发性肝癌手术后的辅助免疫治疗。',
      en: 'Unlike stem cell therapy, Immuncell-LC is an autologous immune cell therapy developed by GC Cell: the patient\'s own blood is drawn, the NK and T cells within it are cultured and expanded outside the body, then infused back in — used as adjuvant immunotherapy after treatment for hepatocellular carcinoma (liver cancer).',
    },
    image: '/category-tiles/stem-cell/Immuncelllc.jpg',
    secondaryMedia: { type: 'video', src: '/category-tiles/stem-cell/nkcell.mp4' },
    heroSplitRatios: [500 / 398, 640 / 448], // Immuncelllc.jpg 500×398, nkcell.mp4 640×448
    imageCaption: { zh: 'Immuncell-LC®注射液——用您自己的血培养14天做成的专属药', en: 'Immuncell-LC® Injection — Made From Your Own Blood After 14 Days of Culture' },
    footerLine: { zh: '采血 → 体外培养14天 → 回输体内', en: 'Blood draw → 14-day culture → Infusion' },
    list: [
      { zh: '2007年8月获韩国食品医药品安全处（MFDS）正式批准上市', en: 'Approved by Korea\'s MFDS in August 2007' },
      { zh: '2021年8月按《先进再生医疗及先进生物药品法》重新获批为先进生物药品', en: 'Re-approved as an advanced biopharmaceutical under Korea\'s Advanced Regenerative Bio Act in August 2021' },
      { zh: '适应症 → 原发性肝癌术后辅助免疫治疗', en: 'Indication → Adjuvant immunotherapy after hepatocellular carcinoma' },
    ],
  },
  {
    id: 'skin-regeneration',
    title: { zh: '皮肤再生', en: 'Skin Regeneration' },
    tileSubtitle: { zh: '肤质 · 弹性 · 组织修复', en: 'Texture · Elasticity · Tissue Repair' },
    heroImage: '/category-tiles/stem-cell/skin-regeneration-hero.jpg', // 자가혈 분리 → 피부 재생 이미지(1997×788)
    body: {
      zh: '用专门的分离设备，从您自己的血液里提取生长因子等和再生有关的成分，\n可以打在脸上改善肤质，也可以静脉输注做全身抗衰。',
      en: 'Using dedicated separation equipment, regenerative components such as growth factors are extracted from your own blood —\nthese can be injected into the face to improve skin texture, or given as an IV infusion for whole-body anti-aging management.',
    },
    pills: [
      { zh: '肤质 · 弹性', en: 'Texture · Elasticity' },
      { zh: '敏感泛红 · 受损肌肤', en: 'Redness · Damaged Skin' },
      { zh: '术后恢复 · 组织修复', en: 'Post-Procedure Recovery · Tissue Repair' },
      { zh: '头皮 · 脱发', en: 'Scalp · Hair Loss' },
    ],
  },
  {
    id: 'joint-cartilage',
    title: { zh: '膝关节 · 软骨修复', en: 'Knee & Cartilage Repair' },
    tileSubtitle: { zh: '膝关节软骨再生 · CARTISTEM®', en: 'Knee Cartilage Regeneration · CARTISTEM®' },
    body: {
      zh: '针对软骨损伤和膝关节退化的再生治疗。代表产品是CARTISTEM——韩国Medipost（美迪波斯特）研发的同种异体脐带血间充质干细胞药物，通过关节内微创钻孔，植入软骨缺损的位置。这是正式获批的细胞治疗药，不是普通的打针。\n人工关节的假体有使用年限，一般一辈子只能换一次；软骨再生治疗常用来在真正需要换关节之前，尽量延缓病情、保住自己的关节。',
      en: 'Regenerative treatment for cartilage damage and degenerative knee conditions. The representative product is CARTISTEM — an allogeneic umbilical cord blood-derived mesenchymal stem cell therapy developed by Medipost (Korea), implanted into the cartilage defect through a minimally invasive drilling procedure inside the joint, as a clinical application of a licensed cell therapy rather than a simple injection.\nBy comparison, traditional artificial joint replacement can typically only be performed once in a lifetime due to the limited lifespan of the implant — cartilage regeneration therapy is often used to slow disease progression and preserve the natural joint for as long as possible before replacement becomes necessary.',
    },
    image: '/category-tiles/stem-cell/joint-cartilage.jpg',
    secondaryMedia: { type: 'image', src: '/category-tiles/stem-cell/cartistem.jpg' },
    heroSplitRatios: [805 / 643, 543 / 371], // joint-cartilage.jpg 805×643, cartistem.jpg 543×371
    imageCaption: { zh: '韩国膝关节软骨再生治疗 · 医疗团队实拍', en: 'Korea Knee Cartilage Regeneration Case · Real Medical Team' },
    credit: '图片提供：JS医院',
    list: [
      { zh: 'CARTISTEM® · 韩国MFDS批准的干细胞治疗药', en: 'CARTISTEM® · MFDS Approved Stem Cell Therapy' },
      { zh: '关节内微创钻孔植入', en: 'Minimally invasive intra-articular drilling & implantation' },
      { zh: '韩国一家专科医院就已经做了3,000例以上CARTISTEM软骨修复手术（截至2026年）', en: 'A single specialist hospital in Korea has performed 3,000+ CARTISTEM cartilage repair procedures (as of 2026)' },
      { zh: '骨髓来源治疗', en: 'Bone Marrow-Derived Therapy' },
    ],
    products: [
      {
        name: 'PRF',
        desc: {
          zh: '把自己血液里的血小板和纤维蛋白浓缩后注射，帮助组织再生。常用在牙龈和牙科手术、皮肤再生、伤口恢复等需要组织慢慢长好的情况。',
          en: "An injectable treatment using concentrated platelet and fibrin components from your own blood to support tissue regeneration. Commonly used for gum and dental surgery, skin regeneration, and wound healing — situations where long-lasting tissue regeneration is needed.",
        },
      },
      {
        name: 'PRP',
        desc: {
          zh: '把自己血液里的血小板和生长因子浓缩后注射，帮助恢复和组织再生。常用在关节和肌腱疼痛、运动损伤、脱发、皮肤再生等需要消炎、加快恢复的情况。',
          en: "An injectable treatment using concentrated platelets and growth factors from your own blood to support recovery and tissue regeneration. Commonly used for joint and tendon pain, sports injuries, hair loss, and skin regeneration — situations where inflammation relief and faster recovery are needed.",
        },
      },
    ],
  },
  {
    id: 'autologous-blood-iv',
    title: { zh: '自体血液 · 抗衰IV', en: 'Autologous Blood · Anti-Aging IV' },
    tileSubtitle: { zh: 'PRP · PRF · PMF · 生长因子', en: 'PRP · PRF · PMF · Growth Factors' },
    heroImage: '/category-tiles/stem-cell/autologous-blood-iv-hero.jpg', // 서울 뷰 IV 라운지 · 골드 수액 · 분리 혈액 튜브(1996×788)
    body: {
      zh: '抽您自己的血，把里面有用的成分分离、浓缩出来。\n韩国法律严格限制在体外培养扩增自体细胞，而且培养过程本身也可能让细胞活性变差。所以和抗衰有关的自体血液疗法，一般直接用新鲜分离出来的生长因子等成分，而不是体外培养的细胞。',
      en: "Your own blood is drawn, then separated and concentrated for its active components.\nKorea strictly regulates in-vitro culturing and expansion of autologous cells, and the culturing process itself carries a risk of reduced cell viability — so anti-aging autologous blood therapies typically use freshly separated growth factors and active components directly, rather than cultured cells.",
    },
    pillGroups: [
      [{ zh: 'PRP', en: 'PRP' }, { zh: 'PRF', en: 'PRF' }, { zh: 'PMF', en: 'PMF' }],
      [{ zh: '生长因子', en: 'Growth Factors' }, { zh: '血小板', en: 'Platelets' }, { zh: '细胞外囊泡', en: 'Extracellular Vesicles' }],
    ],
    footerLine: { zh: '局部注射 / 静脉输注', en: 'Local Treatment / IV Treatment' },
  },
  {
    id: 'approved-cell-therapy',
    title: { zh: '韩国获批的细胞治疗药', en: 'Korea-Approved Cell Therapy Drugs' },
    tileSubtitle: { zh: '针对特定疾病、正式获批的细胞治疗', en: 'Licensed Therapy for Specific Conditions' },
    heroImage: '/category-tiles/stem-cell/approved-cell-therapy-hero.jpg', // 승인 치료제 4종 제품 사진(1997×788)
    body: {
      zh: '韩国已经有针对特定疾病、正式获批上市的细胞治疗药物，其中有几款是全世界较早获得批准的干细胞药物。',
      en: 'Korea already has cell therapy products formally approved for specific diseases — some of which were among the first stem cell therapies in the world to receive regulatory approval.',
    },
    products: [
      { name: 'Hearticellgram-AMI', desc: { zh: '适应症 → 急性心肌梗死', en: "Indication → Acute myocardial infarction" }, approved: { zh: '2011年7月', en: 'Jul 2011' } },
      { name: 'Cartistem', desc: { zh: '适应症 → 膝关节软骨损伤', en: 'Indication → Knee cartilage damage' }, approved: { zh: '2012年1月', en: 'Jan 2012' } },
      { name: 'Cupistem', desc: { zh: '适应症 → 克罗恩病肛瘘', en: "Indication → Crohn's disease fistulas" }, approved: { zh: '2012年1月', en: 'Jan 2012' } },
      { name: 'Neuronata-R Inj.', desc: { zh: '适应症 → 肌萎缩侧索硬化症（ALS，渐冻症）', en: 'Indication → ALS (Lou Gehrig\'s disease)' }, approved: { zh: '2014年7月', en: 'Jul 2014' } },
    ],
  },
]
