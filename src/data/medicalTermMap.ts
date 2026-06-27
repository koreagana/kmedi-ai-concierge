export const MEDICAL_TERM_MAP: Record<string, string> = {
  '高血压': '고혈압',
  '糖尿病': '당뇨병',
  '甲状腺疾病': '갑상선 질환',
  '甲状腺结节': '갑상선 결절',
  '心脏病': '심장질환',
  '心脏疾病': '심장질환',
  '癌症': '암',
  '高脂血症': '고지혈증',
  '高胆固醇': '고콜레스테롤',
  '脂肪肝': '지방간',
  '胃炎': '위염',
  '胃溃疡': '위궤양',
  '肠炎': '장염',
  '贫血': '빈혈',
  '失眠': '불면',
  '睡眠障碍': '수면장애',
  '头痛': '두통',
  '头晕': '어지럼증',
  '眩晕': '현훈',
  '过敏': '알레르기',
  '鼻炎': '비염',
  '哮喘': '천식',
  '湿疹': '습진',
  '皮炎': '피부염',
  '便秘': '변비',
  '腹泻': '설사',
  '腹胀': '복부 팽만감',
  '消化不良': '소화불량',
  '疲劳': '피로',
  '慢性疲劳': '만성피로',
  '焦虑': '불안',
  '抑郁': '우울',
  '月经不调': '생리불순',
  '更年期': '갱년기',
  '多囊卵巢': '다낭성난소',
  '子宫肌瘤': '자궁근종',
  '乳腺结节': '유방 결절',
  '肾结石': '신장결석',
  '胆结石': '담석',
  '痛风': '통풍',
  '关节炎': '관절염',
  '腰椎间盘突出': '허리디스크',
  '颈椎病': '경추질환',
  '手术': '수술',
  '药物过敏': '약물 알레르기',
  '食物过敏': '음식 알레르기',
}

export function buildReferenceTranslation(text: string): string {
  let remaining = text
  const matchedTerms: string[] = []
  const sortedTerms = Object.keys(MEDICAL_TERM_MAP).sort((a, b) => b.length - a.length)

  for (const term of sortedTerms) {
    if (remaining.includes(term)) {
      matchedTerms.push(MEDICAL_TERM_MAP[term])
      remaining = remaining.split(term).join('')
    }
  }

  return matchedTerms.join(', ')
}
