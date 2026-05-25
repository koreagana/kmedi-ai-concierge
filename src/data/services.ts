export interface Service {
  id: string
  icon: string
  zh: string
  en: string
  ko: string
  descZh: string
  items: string[]
}

export const services: Service[] = [
  {
    id: 'anti-aging',
    icon: '✨',
    zh: '抗衰老',
    en: 'Anti-Aging',
    ko: '항노화',
    descZh: '通过干细胞、PRP、NAD+等尖端技术，从细胞层面逆转衰老，全面恢复青春活力。',
    items: ['干细胞疗法', 'PRP血小板', 'NAD+点滴', '激光嫩肤', '荷尔蒙调节'],
  },
  {
    id: 'beauty',
    icon: '💎',
    zh: '皮肤美容·提升',
    en: 'Beauty & Lifting',
    ko: '피부미용',
    descZh: '韩国顶级皮肤科，HIFU·热玛吉·水光等高端设备，定制专属美肤方案。',
    items: ['HIFU超声刀', '热玛吉Thermage', '水光针', '肉毒素', '玻尿酸'],
  },
  {
    id: 'plastic',
    icon: '🌸',
    zh: '整形外科',
    en: 'Plastic Surgery',
    ko: '성형외과',
    descZh: '韩国顶尖整形专家，采用最先进手术技术，打造自然精致的完美轮廓。',
    items: ['双眼皮·开眼角', '鼻综合整形', '面部轮廓', '脂肪移植', '胸部整形'],
  },
  {
    id: 'checkup',
    icon: '🔬',
    zh: '精密健康检查',
    en: 'Health Check-up',
    ko: '정밀건강검진',
    descZh: '韩国权威医院全套精密体检，中文陪同翻译，一站式结果解读服务。',
    items: ['基础体检套餐', '精密癌症筛查', 'MRI · CT', '心脑血管', '肿瘤标志物'],
  },
  {
    id: 'orthopedic',
    icon: '🦴',
    zh: '骨科·脊椎',
    en: 'Orthopedic',
    ko: '정형외과',
    descZh: '韩国脊椎·关节专科，内镜微创+干细胞再生，精准无痛康复方案。',
    items: ['脊椎内镜微创', '人工关节置换', '椎间盘治疗', '干细胞再生', 'PRP韧带'],
  },
  {
    id: 'women',
    icon: '🌺',
    zh: '女性医疗',
    en: "Women's Clinic",
    ko: '여성의료',
    descZh: '专为女性打造的全方位医疗服务，从妇科到更年期管理，全程中文陪护。',
    items: ['妇科精密检查', '更年期管理', '子宫·卵巢', '生育力咨询', '私密护理'],
  },
]

export const hospitals = [
  { id: 'h1', name: '首尔峰岭整形外科', specialty: ['plastic', 'beauty'], rating: 4.9, location: '江南区', price: '咨询后定价' },
  { id: 'h2', name: 'JK整形外科医院', specialty: ['plastic'], rating: 4.8, location: '清潭洞', price: '¥15,000起' },
  { id: 'h3', name: '清潭365皮肤科', specialty: ['beauty', 'anti-aging'], rating: 4.9, location: '清潭洞', price: '¥8,000起' },
  { id: 'h4', name: '爱思特医疗集团', specialty: ['checkup', 'anti-aging'], rating: 4.7, location: '江南区', price: '¥12,000起' },
  { id: 'h5', name: '强北脊椎医院', specialty: ['orthopedic'], rating: 4.8, location: '江北区', price: '¥20,000起' },
  { id: 'h6', name: '梨大女性医院', specialty: ['women'], rating: 4.9, location: '新村', price: '¥6,000起' },
]
