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
    ko: '재생의학센터',
    en: 'Regenerative Medicine Center',
    ar: 'مركز الطب التجديدي',
  } as LocalizedText,
  subCopy: {
    zh: '韩国许可细胞治疗剂 · 合法咨询范围 · 关节与再生医学咨询',
    ko: '한국 허가 세포치료제 · 합법 상담 범위 · 관절 및 재생의학 상담',
    en: 'Licensed Cell Therapy Products in Korea · Legally Consultable Scope · Joint & Regenerative Medicine Consultation',
    ar: 'منتجات العلاج الخلوي المعتمدة في كوريا · النطاق القانوني للاستشارة · استشارة المفاصل والطب التجديدي',
  } as LocalizedText,
  desc: {
    zh: '韩国干细胞与再生医学咨询，不是简单判断"能不能治疗"，而是整理客户的诊断名、检查资料、咨询目的和韩国正规医疗机构可以确认的方向。',
    ko: '한국 줄기세포·재생의학 상담은 단순히 "치료가 가능한지"를 판단하는 것이 아니라, 고객의 진단명, 검사자료, 상담 목적, 한국 정규 의료기관에서 확인 가능한 상담 방향을 정리하는 과정입니다.',
    en: 'Stem cell and regenerative medicine consultation in Korea is not simply about determining whether treatment is possible — it is a process of organizing your diagnosis, test records, consultation purpose, and the directions that a licensed Korean medical institution can confirm.',
    ar: 'لا تقتصر استشارة الخلايا الجذعية والطب التجديدي في كوريا على تحديد ما إذا كان العلاج ممكناً، بل هي عملية لتنظيم تشخيصك وسجلات فحوصاتك والغرض من الاستشارة والاتجاهات التي يمكن لمؤسسة طبية كورية مرخصة تأكيدها.',
  } as LocalizedText,
  safety: [
    {
      zh: '本页内容仅用于韩国再生医学咨询前的信息整理，不代替医生诊断或治疗判断。',
      ko: '본 페이지는 한국 재생의학 상담 전 정보 정리를 위한 참고 안내이며 의사의 진단이나 치료 판단을 대신하지 않습니다.',
      en: "This page is for organizing information before a regenerative medicine consultation in Korea, and does not replace a physician's diagnosis or treatment decision.",
      ar: 'هذه الصفحة مخصصة لتنظيم المعلومات قبل استشارة الطب التجديدي في كوريا، ولا تحل محل تشخيص الطبيب أو قراره العلاجي.',
    },
    {
      zh: '是否适合相关治疗，需要由正规医疗机构和专业医生根据诊断、检查资料、适应症和韩国相关法规判断。',
      ko: '관련 치료 적합 여부는 정규 의료기관과 전문의가 진단, 검사자료, 적응증 및 한국 관련 법규에 따라 판단해야 합니다.',
      en: 'Whether a related treatment is suitable must be determined by a licensed medical institution and a qualified physician, based on diagnosis, test records, indications, and relevant Korean regulations.',
      ar: 'يجب أن تحدد مؤسسة طبية مرخصة وطبيب مختص مدى ملاءمة العلاج المعني، بناءً على التشخيص وسجلات الفحوصات ودواعي الاستعمال واللوائح الكورية ذات الصلة.',
    },
  ] as LocalizedText[],
}

const PRODUCT_EXAMPLES_LABEL: LocalizedText = {
  zh: '产品示例',
  ko: '제품 예시',
  en: 'Product Examples',
  ar: 'أمثلة على المنتجات',
}

// TODO: once the admin prep-documents page adds a "재생의학 상담 전 자료 준비 / 再生医学咨询前资料准备"
// entry (candidate path: /prep/regenerative-consultation-before), add its key to docKeys on each item below.
export const STEM_CELL_KEYWORDS: StemCellKeyword[] = [
  {
    id: 'approved-cell-therapies',
    image: '/keyword-tiles/approved-cell-therapies.jpg',
    title: {
      zh: '韩国许可细胞治疗剂',
      ko: '한국 허가 세포치료제',
      en: 'Licensed Cell Therapy Products in Korea',
      ar: 'منتجات العلاج الخلوي المعتمدة في كوريا',
    },
    description: {
      zh: '韩国已有部分细胞治疗剂在特定适应症范围内获批。它们并不是普通的抗衰老项目，也不代表所有人都适用。',
      ko: '한국에는 특정 적응증 범위에서 허가된 일부 세포치료제가 있습니다. 이는 일반적인 항노화 시술이 아니며, 모든 사람에게 적용되는 것은 아닙니다.',
      en: 'Korea has approved a number of cell therapy products within specific indication ranges. These are not general anti-aging procedures, and they do not apply to everyone.',
      ar: 'لدى كوريا عدد من منتجات العلاج الخلوي المعتمدة ضمن نطاقات محددة من دواعي الاستعمال. وهي ليست إجراءات عامة لمكافحة الشيخوخة، ولا تنطبق على الجميع.',
    },
    note: {
      zh: '以下产品仅作为韩国已获批准细胞治疗剂的示例。是否可以咨询或使用，需要由正规医疗机构根据适应症、检查资料和医生判断确认。',
      ko: '아래 제품명은 한국에서 허가된 세포치료제 예시입니다. 상담 또는 사용 가능 여부는 정규 의료기관이 적응증, 검사자료, 의사의 판단에 따라 확인해야 합니다.',
      en: "The products below are examples of cell therapy products approved in Korea. Whether they can be consulted on or used must be confirmed by a licensed medical institution, based on indications, test records, and the physician's judgment.",
      ar: 'المنتجات أدناه هي أمثلة على منتجات العلاج الخلوي المعتمدة في كوريا. يجب تأكيد إمكانية استشارتها أو استخدامها من قبل مؤسسة طبية مرخصة، بناءً على دواعي الاستعمال وسجلات الفحوصات وتقدير الطبيب.',
    },
    approvedProducts: {
      title: PRODUCT_EXAMPLES_LABEL,
      items: [
        {
          name: { zh: 'Hearticellgram-AMI', ko: '하티셀그램-AMI', en: 'Hearticellgram-AMI', ar: 'Hearticellgram-AMI' },
          desc: {
            zh: '急性心肌梗死相关细胞治疗剂。',
            ko: '급성 심근경색 관련 세포치료제.',
            en: 'A cell therapy product related to acute myocardial infarction.',
            ar: 'منتج علاج خلوي متعلق باحتشاء عضلة القلب الحاد.',
          },
        },
        {
          name: { zh: 'Cartistem', ko: '카티스템', en: 'Cartistem', ar: 'Cartistem' },
          desc: {
            zh: '膝关节软骨缺损及退行性关节炎相关细胞治疗剂。',
            ko: '무릎 연골결손 및 퇴행성 관절염 관련 세포치료제.',
            en: 'A cell therapy product related to knee cartilage defects and degenerative arthritis.',
            ar: 'منتج علاج خلوي متعلق بتلف غضروف الركبة والتهاب المفاصل التنكسي.',
          },
        },
        {
          name: { zh: 'Cupistem', ko: '큐피스템', en: 'Cupistem', ar: 'Cupistem' },
          desc: {
            zh: '克罗恩病复杂性肛瘘相关细胞治疗剂。',
            ko: '크론병 복잡성 누공 관련 세포치료제.',
            en: "A cell therapy product related to complex perianal fistulas in Crohn's disease.",
            ar: 'منتج علاج خلوي متعلق بالنواسير الشرجية المعقدة المصاحبة لداء كرون.',
          },
        },
        {
          name: { zh: 'Neuronata-R Inj.', ko: '뉴로나타-알주', en: 'Neuronata-R Inj.', ar: 'Neuronata-R Inj.' },
          desc: {
            zh: '肌萎缩侧索硬化症（ALS，卢伽雷氏病）相关细胞治疗剂。',
            ko: '근위축성측삭경화증, ALS, 루게릭병 관련 세포치료제.',
            en: "A cell therapy product related to amyotrophic lateral sclerosis (ALS, Lou Gehrig's disease).",
            ar: 'منتج علاج خلوي متعلق بالتصلب الجانبي الضموري (ALS، مرض لو جيريغ).',
          },
        },
      ],
      caution: {
        zh: '这些产品有明确的适应症和使用条件，并不代表所有抗衰老、疼痛或关节问题都可以使用。',
        ko: '이 제품들은 명확한 적응증과 사용 조건이 있으며, 모든 항노화, 통증, 관절 문제에 적용되는 것은 아닙니다.',
        en: 'These products have clearly defined indications and conditions of use, and do not apply to every anti-aging, pain, or joint issue.',
        ar: 'لهذه المنتجات دواعي استعمال وشروط استخدام محددة بوضوح، ولا تنطبق على كل مشكلة تتعلق بمكافحة الشيخوخة أو الألم أو المفاصل.',
      },
    },
    docKeys: ['functionalIntake'],
  },
  {
    id: 'what-is-stem-cell-consultation',
    image: '/keyword-tiles/what-is-stem-cell-consultation.jpg',
    title: {
      zh: '什么是干细胞咨询',
      ko: '줄기세포 상담이란',
      en: 'What Is a Stem Cell Consultation',
      ar: 'ما هي استشارة الخلايا الجذعية',
    },
    description: {
      zh: '干细胞咨询不是直接判断客户能否接受某种治疗，而是先整理客户的疾病名称、症状、检查资料、既往治疗记录和咨询目的。\n\n整理后，可以向韩国正规医疗机构确认是否有可咨询的方向、需要补充哪些资料，以及是否属于相关适应症范围。',
      ko: '줄기세포 상담은 고객이 특정 치료를 받을 수 있는지 직접 판단하는 것이 아니라, 먼저 고객의 질환명, 증상, 검사자료, 기존 치료 기록, 상담 목적을 정리하는 과정입니다.\n\n자료를 정리한 뒤 한국 정규 의료기관에 상담 가능한 방향이 있는지, 어떤 자료가 더 필요한지, 관련 적응증 범위에 해당하는지 확인할 수 있습니다.',
      en: "A stem cell consultation does not directly determine whether you can receive a specific treatment. It starts by organizing your condition name, symptoms, test records, prior treatment history, and consultation purpose.\n\nOnce organized, this information can be used to confirm with a licensed Korean medical institution whether there is a consultable direction, what additional materials are needed, and whether your case falls within the relevant indication range.",
      ar: 'لا تحدد استشارة الخلايا الجذعية مباشرة ما إذا كان بإمكانك تلقي علاج معين، بل تبدأ بتنظيم اسم حالتك وأعراضك وسجلات فحوصاتك وتاريخ علاجك السابق والغرض من الاستشارة.\n\nبعد التنظيم، يمكن التأكد من مؤسسة طبية كورية مرخصة عما إذا كان هناك اتجاه قابل للاستشارة، وما هي المواد الإضافية المطلوبة، وما إذا كانت حالتك ضمن نطاق دواعي الاستعمال ذات الصلة.',
    },
    listLabel: {
      zh: '咨询中整理的内容',
      ko: '상담에서 정리하는 내용',
      en: 'Information Organized During Consultation',
      ar: 'المعلومات التي يتم تنظيمها أثناء الاستشارة',
    },
    list: [
      { zh: '诊断名和主要症状', ko: '진단명과 주요 증상', en: 'Diagnosis and main symptoms', ar: 'التشخيص والأعراض الرئيسية' },
      { zh: '咨询目的', ko: '상담 목적', en: 'Purpose of consultation', ar: 'الغرض من الاستشارة' },
      { zh: '既往检查报告', ko: '기존 검사결과지', en: 'Prior test results', ar: 'نتائج الفحوصات السابقة' },
      { zh: '既往治疗或手术记录', ko: '기존 치료 또는 수술 기록', en: 'Prior treatment or surgical records', ar: 'سجلات العلاج أو الجراحة السابقة' },
      { zh: '正在服用的药物', ko: '현재 복용 중인 약', en: 'Current medications', ar: 'الأدوية الحالية' },
      { zh: '过敏史和慢性疾病', ko: '알레르기 및 만성질환', en: 'Allergy history and chronic conditions', ar: 'تاريخ الحساسية والأمراض المزمنة' },
      { zh: '希望来韩国的时间和停留时间', ko: '한국 방문 희망 시기와 체류 기간', en: 'Preferred visit timing and length of stay in Korea', ar: 'التوقيت المفضل للزيارة ومدة الإقامة في كوريا' },
    ],
    docKeys: ['functionalIntake'],
  },
  {
    id: 'legal-consultation-scope',
    image: '/keyword-tiles/legal-consultation-scope.jpg',
    title: {
      zh: '合法咨询范围',
      ko: '합법 상담 범위',
      en: 'Legally Consultable Scope',
      ar: 'النطاق القانوني للاستشارة',
    },
    description: {
      zh: '不同国家对细胞治疗和再生医学的规定不同。韩国医疗机构也需要根据韩国法规、医疗机构资质、适应症和医生判断，确认是否可以进行相关咨询或治疗。\n\n汉江春天可以帮助客户整理资料、确认咨询目的，并将信息转达给正规医疗机构，但不进行诊断、治疗判断或效果保证。',
      ko: '국가마다 세포치료와 재생의학 관련 규정이 다릅니다. 한국 의료기관도 한국 법규, 의료기관 자격, 적응증, 의사의 판단에 따라 관련 상담 또는 치료 가능 여부를 확인해야 합니다.\n\n한강애봄은 고객 자료를 정리하고 상담 목적을 확인해 정규 의료기관에 전달할 수 있지만, 진단, 치료 판단 또는 효과 보장을 하지 않습니다.',
      en: "Regulations on cell therapy and regenerative medicine differ from country to country. Korean medical institutions must also confirm whether a related consultation or treatment is possible, based on Korean regulations, the institution's qualifications, indications, and the physician's judgment.\n\nK-Medi Spring can help organize your materials and confirm the purpose of consultation, then forward the information to a licensed medical institution — but it does not provide diagnosis, treatment decisions, or guarantee outcomes.",
      ar: 'تختلف اللوائح المتعلقة بالعلاج الخلوي والطب التجديدي من دولة إلى أخرى. كما يجب على المؤسسات الطبية الكورية تأكيد إمكانية الاستشارة أو العلاج المعني بناءً على اللوائح الكورية ومؤهلات المؤسسة ودواعي الاستعمال وتقدير الطبيب.\n\nيمكن لـ K-Medi المساعدة في تنظيم موادك وتأكيد الغرض من الاستشارة، ثم إرسال المعلومات إلى مؤسسة طبية مرخصة، لكنها لا تقدم تشخيصاً أو قرارات علاجية أو ضماناً للنتائج.',
    },
    listLabel: {
      zh: '需要向客户说明的核心内容',
      ko: '고객에게 안내할 핵심',
      en: 'Key Points to Understand',
      ar: 'نقاط أساسية يجب فهمها',
    },
    list: [
      { zh: '是否属于适应症，需要医生判断', ko: '적응증 해당 여부는 의사가 판단해야 합니다', en: 'Whether a case falls within the indication must be judged by a physician', ar: 'يجب أن يحدد الطبيب مدى انطباق دواعي الاستعمال' },
      { zh: '是否需要追加检查，需要医院确认', ko: '추가 검사가 필요한지는 병원이 확인해야 합니다', en: 'Whether additional tests are needed must be confirmed by the hospital', ar: 'يجب أن يؤكد المستشفى ما إذا كانت هناك حاجة لفحوصات إضافية' },
      { zh: '是否可以预约相关咨询，需要根据医院回复确认', ko: '관련 상담 예약 가능 여부는 병원 회신에 따라 확인해야 합니다', en: "Whether a related consultation can be booked must be confirmed based on the hospital's response", ar: 'يجب تأكيد إمكانية حجز استشارة معينة بناءً على رد المستشفى' },
      { zh: '不应相信"任何人都可以做"的宣传', ko: '"누구나 가능하다"는 식의 홍보는 주의해야 합니다', en: 'Advertising claiming "anyone can do this" should be treated with caution', ar: 'يجب الحذر من الإعلانات التي تدعي أن "الجميع يمكنه ذلك"' },
    ],
    docKeys: ['functionalIntake'],
  },
  {
    id: 'joint-cartilage-consultation',
    image: '/keyword-tiles/joint-cartilage-consultation.jpg',
    title: {
      zh: '关节·软骨咨询',
      ko: '관절·연골 상담',
      en: 'Joint & Cartilage Consultation',
      ar: 'استشارة المفاصل والغضاريف',
    },
    description: {
      zh: '膝关节软骨损伤、退行性关节炎、关节疼痛等问题，在咨询前通常需要整理诊断名、疼痛部位、疼痛程度、影像资料和既往治疗记录。\n\nCartistem是韩国已获批准的细胞治疗剂示例之一，但是否适合客户本人，需要由医生根据适应症和检查资料判断。',
      ko: '무릎 연골 손상, 퇴행성 관절염, 관절 통증 등은 상담 전 진단명, 통증 부위, 통증 정도, 영상자료, 기존 치료 기록을 정리하는 것이 좋습니다.\n\n카티스템은 한국에서 허가된 세포치료제 예시 중 하나이지만, 고객 본인에게 적합한지 여부는 의사가 적응증과 검사자료를 바탕으로 판단해야 합니다.',
      en: 'For issues such as knee cartilage damage, degenerative arthritis, or joint pain, it is generally helpful to organize the diagnosis, pain location, pain severity, imaging materials, and prior treatment history before a consultation.\n\nCartistem is one example of a cell therapy product approved in Korea, but whether it is suitable for you must be determined by a physician based on indications and test records.',
      ar: 'بالنسبة لمشكلات مثل تلف غضروف الركبة أو التهاب المفاصل التنكسي أو ألم المفاصل، من المفيد عادة تنظيم التشخيص وموقع الألم وشدته والمواد التصويرية وسجل العلاج السابق قبل الاستشارة.\n\nيُعد Cartistem أحد الأمثلة على منتجات العلاج الخلوي المعتمدة في كوريا، لكن مدى ملاءمته لك يجب أن يحدده الطبيب بناءً على دواعي الاستعمال وسجلات الفحوصات.',
    },
    listLabel: {
      zh: '建议在咨询前准备的资料',
      ko: '상담 전 준비하면 좋은 자료',
      en: 'Materials Helpful to Prepare Before Consultation',
      ar: 'المواد التي يُنصح بتحضيرها قبل الاستشارة',
    },
    list: [
      { zh: '关节部位和疼痛时间', ko: '관절 부위와 통증 기간', en: 'Joint location and duration of pain', ar: 'موقع المفصل ومدة الألم' },
      { zh: '诊断名，如退行性关节炎、软骨损伤等', ko: '퇴행성 관절염, 연골 손상 등 진단명', en: 'Diagnosis, such as degenerative arthritis or cartilage damage', ar: 'التشخيص، مثل التهاب المفاصل التنكسي أو تلف الغضروف' },
      { zh: 'X光、MRI等已有影像资料', ko: '이미 보유한 X-ray, MRI 등 영상자료', en: 'Existing imaging materials, such as X-ray or MRI', ar: 'المواد التصويرية الموجودة لديك، مثل الأشعة السينية أو الرنين المغناطيسي' },
      { zh: '医生意见书或诊断书', ko: '의사 소견서 또는 진단서', en: "Physician's opinion letter or diagnosis record", ar: 'تقرير رأي الطبيب أو سجل التشخيص' },
      { zh: '既往注射、手术或康复治疗记录', ko: '기존 주사치료, 수술, 재활치료 기록', en: 'Records of prior injection therapy, surgery, or rehabilitation', ar: 'سجلات العلاج بالحقن أو الجراحة أو إعادة التأهيل السابقة' },
      { zh: '正在服用的药物', ko: '현재 복용 중인 약', en: 'Current medications', ar: 'الأدوية الحالية' },
    ],
    docKeys: ['functionalIntake'],
  },
]
