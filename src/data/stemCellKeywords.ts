import type { LocalizedText, BigHealthBullet, BigHealthApprovedProductsBlock, BigHealthDocButtonKey } from './bigHealthKeywords'

export interface StemCellKeyword {
  id: string
  title: LocalizedText
  /** Optional photo for the selector tile (public/ path). Falls back to a CSS gradient when omitted. */
  image?: string
  /** May contain \n\n to separate multiple paragraphs. */
  description: LocalizedText
  /** Optional secondary note shown right under the description (used by the approved-products item). */
  note?: LocalizedText
  approvedProducts?: BigHealthApprovedProductsBlock
  listLabel?: LocalizedText
  list?: BigHealthBullet[]
  docKeys: BigHealthDocButtonKey[]
}

export const STEM_CELL_SECTION = {
  title: {
    zh: '再生医学中心',
    en: 'Regenerative Medicine Center',
  } as LocalizedText,
  subCopy: {
    zh: '韩国许可细胞治疗剂 · 关节与再生医学咨询',
    en: 'Licensed Cell Therapy Products in Korea · Joint & Regenerative Medicine Consultation',
  } as LocalizedText,
  desc: {
    zh: '韩国干细胞与再生医学咨询，不是简单判断"能不能治疗"，而是整理客户的诊断名、检查资料、咨询目的和韩国正规医疗机构可以确认的方向。',
    en: 'Stem cell and regenerative medicine consultation in Korea is not simply about determining whether treatment is possible — it is a process of organizing your diagnosis, test records, consultation purpose, and the directions that a licensed Korean medical institution can confirm.',
  } as LocalizedText,
}

const PRODUCT_EXAMPLES_LABEL: LocalizedText = {
  zh: '产品示例',
  en: 'Product Examples',
}

// TODO: once the admin prep-documents page adds a "재생의학 상담 전 자료 준비 / 再生医学咨询前资料准备"
// entry (candidate path: /prep/regenerative-consultation-before), add its key to docKeys on each item below.
export const STEM_CELL_KEYWORDS: StemCellKeyword[] = [
  {
    id: 'approved-cell-therapies',
    image: '/keyword-tiles/approved-cell-therapies.jpg',
    title: {
      zh: '韩国许可细胞治疗剂',
      en: 'Licensed Cell Therapy Products in Korea',
    },
    description: {
      zh: '韩国已有部分细胞治疗剂在特定适应症范围内获批。它们并不是普通的抗衰老项目，也不代表所有人都适用。',
      en: 'Korea has approved a number of cell therapy products within specific indication ranges. These are not general anti-aging procedures, and they do not apply to everyone.',
    },
    note: {
      zh: '以下产品仅作为韩国已获批准细胞治疗剂的示例。是否可以咨询或使用，需要由正规医疗机构根据适应症、检查资料和医生判断确认。',
      en: "The products below are examples of cell therapy products approved in Korea. Whether they can be consulted on or used must be confirmed by a licensed medical institution, based on indications, test records, and the physician's judgment.",
    },
    approvedProducts: {
      title: PRODUCT_EXAMPLES_LABEL,
      items: [
        {
          name: { zh: 'Hearticellgram-AMI', en: 'Hearticellgram-AMI' },
          desc: {
            zh: '急性心肌梗死相关细胞治疗剂。',
            en: 'A cell therapy product related to acute myocardial infarction.',
          },
        },
        {
          name: { zh: 'Cartistem', en: 'Cartistem' },
          desc: {
            zh: '膝关节软骨缺损及退行性关节炎相关细胞治疗剂。',
            en: 'A cell therapy product related to knee cartilage defects and degenerative arthritis.',
          },
        },
        {
          name: { zh: 'Cupistem', en: 'Cupistem' },
          desc: {
            zh: '克罗恩病复杂性肛瘘相关细胞治疗剂。',
            en: "A cell therapy product related to complex perianal fistulas in Crohn's disease.",
          },
        },
        {
          name: { zh: 'Neuronata-R Inj.', en: 'Neuronata-R Inj.' },
          desc: {
            zh: '肌萎缩侧索硬化症（ALS，卢伽雷氏病）相关细胞治疗剂。',
            en: "A cell therapy product related to amyotrophic lateral sclerosis (ALS, Lou Gehrig's disease).",
          },
        },
      ],
      caution: {
        zh: '这些产品有明确的适应症和使用条件，并不代表所有抗衰老、疼痛或关节问题都可以使用。',
        en: 'These products have clearly defined indications and conditions of use, and do not apply to every anti-aging, pain, or joint issue.',
      },
    },
    docKeys: ['functionalIntake'],
  },
  {
    id: 'joint-cartilage-consultation',
    image: '/keyword-tiles/joint-cartilage-consultation.jpg',
    title: {
      zh: '关节·软骨咨询',
      en: 'Joint & Cartilage Consultation',
    },
    description: {
      zh: '膝关节软骨损伤、退行性关节炎、关节疼痛等问题，在咨询前通常需要整理诊断名、疼痛部位、疼痛程度、影像资料和既往治疗记录。\n\nCartistem是韩国已获批准的细胞治疗剂示例之一，但是否适合客户本人，需要由医生根据适应症和检查资料判断。',
      en: 'For issues such as knee cartilage damage, degenerative arthritis, or joint pain, it is generally helpful to organize the diagnosis, pain location, pain severity, imaging materials, and prior treatment history before a consultation.\n\nCartistem is one example of a cell therapy product approved in Korea, but whether it is suitable for you must be determined by a physician based on indications and test records.',
    },
    listLabel: {
      zh: '建议在咨询前准备的资料',
      en: 'Materials Helpful to Prepare Before Consultation',
    },
    list: [
      { zh: '关节部位和疼痛时间', en: 'Joint location and duration of pain' },
      { zh: '诊断名，如退行性关节炎、软骨损伤等', en: 'Diagnosis, such as degenerative arthritis or cartilage damage' },
      { zh: 'X光、MRI等已有影像资料', en: 'Existing imaging materials, such as X-ray or MRI' },
      { zh: '医生意见书或诊断书', en: "Physician's opinion letter or diagnosis record" },
      { zh: '既往注射、手术或康复治疗记录', en: 'Records of prior injection therapy, surgery, or rehabilitation' },
      { zh: '正在服用的药物', en: 'Current medications' },
    ],
    docKeys: ['functionalIntake'],
  },
]
