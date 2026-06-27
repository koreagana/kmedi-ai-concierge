import { useState } from 'react'
import { buildReferenceTranslation } from '../data/medicalTermMap'
import './FunctionalIntakePage.css'

const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'

interface BilingualOption {
  value: string
  zh: string
  ko: string
}

const SYMPTOM_OPTIONS: BilingualOption[] = [
  { value: 'fatigue', zh: '疲劳', ko: '피로' },
  { value: 'sleep_problem', zh: '睡眠问题', ko: '수면 문제' },
  { value: 'indigestion', zh: '消化不良', ko: '소화불량' },
  { value: 'bloating', zh: '腹胀', ko: '복부 팽만감' },
  { value: 'constipation', zh: '便秘', ko: '변비' },
  { value: 'diarrhea', zh: '腹泻', ko: '설사' },
  { value: 'headache', zh: '头痛', ko: '두통' },
  { value: 'dizziness', zh: '头晕', ko: '어지럼증' },
  { value: 'weight_change', zh: '体重变化', ko: '체중 변화' },
  { value: 'skin_problem', zh: '皮肤问题', ko: '피부 문제' },
  { value: 'allergy', zh: '过敏', ko: '알레르기' },
  { value: 'other', zh: '其他', ko: '기타' },
]

const ONSET_OPTIONS: BilingualOption[] = [
  { value: 'within_1_month', zh: '最近1个月', ko: '최근 1개월' },
  { value: 'within_3_months', zh: '3个月以内', ko: '3개월 이내' },
  { value: 'within_6_months', zh: '6个月以内', ko: '6개월 이내' },
  { value: 'over_1_year', zh: '1年以上', ko: '1년 이상' },
  { value: 'long_ago', zh: '很久以前开始', ko: '오래전부터' },
  { value: 'unsure', zh: '不确定', ko: '잘 모르겠음' },
]

const DIAGNOSIS_OPTIONS: BilingualOption[] = [
  { value: 'hypertension', zh: '高血压', ko: '고혈압' },
  { value: 'diabetes', zh: '糖尿病', ko: '당뇨병' },
  { value: 'thyroid', zh: '甲状腺疾病', ko: '갑상선 질환' },
  { value: 'heart_disease', zh: '心脏疾病', ko: '심장질환' },
  { value: 'cancer', zh: '癌症', ko: '암' },
  { value: 'other', zh: '其他', ko: '기타' },
  { value: 'none', zh: '没有', ko: '없음' },
]

const SLEEP_OPTIONS: BilingualOption[] = [
  { value: 'under_4h', zh: '4小时以下', ko: '4시간 이하' },
  { value: '4_to_6h', zh: '4-6小时', ko: '4~6시간' },
  { value: '6_to_8h', zh: '6-8小时', ko: '6~8시간' },
  { value: 'over_8h', zh: '8小时以上', ko: '8시간 이상' },
  { value: 'irregular', zh: '睡眠时间不规律', ko: '수면 시간이 불규칙함' },
]

const CHECKUP_OPTIONS: BilingualOption[] = [
  { value: 'within_3_months', zh: '最近3个月内做过', ko: '최근 3개월 이내 검사함' },
  { value: 'within_6_months', zh: '最近6个月内做过', ko: '최근 6개월 이내 검사함' },
  { value: 'within_1_year', zh: '最近1年内做过', ko: '최근 1년 이내 검사함' },
  { value: 'over_1_year', zh: '1年以上没有检查', ko: '1년 이상 검사하지 않음' },
  { value: 'unsure', zh: '不确定', ko: '잘 모르겠음' },
]

const REPORT_OPTIONS: BilingualOption[] = [
  { value: 'can_provide', zh: '可以提供', ko: '제공 가능' },
  { value: 'none_now', zh: '目前没有', ko: '현재 없음' },
  { value: 'send_later', zh: '之后可以发送', ko: '추후 발송 가능' },
  { value: 'unsure', zh: '不确定', ko: '잘 모르겠음' },
]

function toggleInSet(set: Set<string>, value: string): Set<string> {
  const next = new Set(set)
  if (next.has(value)) {
    next.delete(value)
  } else {
    next.add(value)
  }
  return next
}

const HANGUL_REGEX = /[ㄱ-ㆎ가-힣]/
const ORIGINAL_TEXT_CHECK_NEEDED = '중국어 원문 확인 필요'

function buildOtherDetailLines(detail: string): { zh: string; ko: string } {
  const trimmed = detail.trim()
  const zh = `其他：${trimmed}`

  if (trimmed === '不确定') {
    return { zh, ko: `기타: ${FREE_TEXT_TRANSLATIONS['不确定']}` }
  }

  if (HANGUL_REGEX.test(trimmed)) {
    return { zh, ko: `기타: ${trimmed}` }
  }

  const referenceTranslation = buildReferenceTranslation(trimmed)
  if (referenceTranslation) {
    return { zh, ko: `기타 참고 번역: ${referenceTranslation}` }
  }

  return { zh, ko: `기타: ${ORIGINAL_TEXT_CHECK_NEEDED}` }
}

function formatOptionList(
  selected: Set<string>,
  options: BilingualOption[],
  otherDetail?: string,
): { zh: string; ko: string } {
  const picked = options.filter(o => selected.has(o.value))
  if (picked.length === 0) {
    return { zh: '未填写', ko: '미작성' }
  }
  const trimmedDetail = otherDetail?.trim()
  const otherLines = trimmedDetail ? buildOtherDetailLines(trimmedDetail) : null
  return {
    zh: picked.map(o => (o.value === 'other' && otherLines ? otherLines.zh : o.zh)).join('、'),
    ko: picked.map(o => (o.value === 'other' && otherLines ? otherLines.ko : o.ko)).join(', '),
  }
}

const FREE_TEXT_TRANSLATIONS: Record<string, string> = {
  '没有': '없음',
  '有': '있음',
  '不确定': '잘 모르겠음',
  '未填写': '미작성',
  '可以提供': '제공 가능',
  '目前没有': '현재 없음',
  '之后可以发送': '추후 발송 가능',
  '最近1个月': '최근 1개월',
  '3个月以内': '3개월 이내',
  '6个月以内': '6개월 이내',
  '1年以上': '1년 이상',
  '很久以前开始': '오래전부터',
  '4小时以下': '4시간 이하',
  '4-6小时': '4~6시간',
  '6-8小时': '6~8시간',
  '8小时以上': '8시간 이상',
  '睡眠时间不规律': '수면 시간이 불규칙함',
}

function translateFreeText(value: string): { zh: string; ko: string } {
  const trimmed = value.trim()
  if (!trimmed) {
    return { zh: '未填写', ko: '미작성' }
  }
  return { zh: trimmed, ko: FREE_TEXT_TRANSLATIONS[trimmed] ?? trimmed }
}

export default function FunctionalIntakePage() {
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [mainConcern, setMainConcern] = useState('')
  const [symptoms, setSymptoms] = useState<Set<string>>(new Set())
  const [onset, setOnset] = useState<BilingualOption | null>(null)
  const [diagnoses, setDiagnoses] = useState<Set<string>>(new Set())
  const [surgery, setSurgery] = useState('')
  const [allergy, setAllergy] = useState('')
  const [medications, setMedications] = useState('')
  const [otherSymptomDetail, setOtherSymptomDetail] = useState('')
  const [otherDiagnosisDetail, setOtherDiagnosisDetail] = useState('')
  const [sleep, setSleep] = useState<BilingualOption | null>(null)
  const [checkup, setCheckup] = useState<BilingualOption | null>(null)
  const [report, setReport] = useState<BilingualOption | null>(null)
  const [copied, setCopied] = useState(false)

  const buildIntakeText = (): string => {
    const symptomText = formatOptionList(symptoms, SYMPTOM_OPTIONS, otherSymptomDetail)
    const diagnosisText = formatOptionList(diagnoses, DIAGNOSIS_OPTIONS, otherDiagnosisDetail)
    const mainConcernText = translateFreeText(mainConcern)
    const surgeryText = translateFreeText(surgery)
    const allergyText = translateFreeText(allergy)
    const medicationsText = translateFreeText(medications)

    const lines = [
      '【功能医学初诊问诊卡】',
      '【기능의학 초진 문진카드】',
      '',
      `1. 年龄：${age || '未填写'}`,
      `   나이: ${age || '미작성'}`,
      '',
      `2. 身高 / 体重：${height || '未填写'}cm / ${weight || '未填写'}kg`,
      `   키 / 몸무게: ${height || '미작성'}cm / ${weight || '미작성'}kg`,
      '',
      `3. 目前最希望改善的健康问题：${mainConcernText.zh}`,
      `   현재 가장 개선하고 싶은 건강 문제: ${mainConcernText.ko}`,
      '',
      `4. 目前不舒服的症状：${symptomText.zh}`,
      `   현재 불편한 증상: ${symptomText.ko}`,
      '',
      `5. 症状开始时间：${onset?.zh ?? '未填写'}`,
      `   증상 시작 시점: ${onset?.ko ?? '미작성'}`,
      '',
      `6. 过去诊断疾病：${diagnosisText.zh}`,
      `   과거 진단 질환: ${diagnosisText.ko}`,
      '',
      `7. 手术经历：${surgeryText.zh}`,
      `   수술 이력: ${surgeryText.ko}`,
      '',
      `8. 药物或食物过敏：${allergyText.zh}`,
      `   약물 또는 음식 알레르기: ${allergyText.ko}`,
      '',
      `9. 目前服用药物 / 维生素 / 保健食品：${medicationsText.zh}`,
      `   현재 복용 중인 약 / 비타민 / 건강기능식품: ${medicationsText.ko}`,
      '',
      `10. 平均睡眠时间：${sleep?.zh ?? '未填写'}`,
      `    평균 수면시간: ${sleep?.ko ?? '미작성'}`,
      '',
      `11. 最近健康检查 / 血液检查：${checkup?.zh ?? '未填写'}`,
      `    최근 건강검진 / 혈액검사 여부: ${checkup?.ko ?? '미작성'}`,
      '',
      `12. 是否可以提供检查报告：${report?.zh ?? '未填写'}`,
      `    검사 결과지 제공 가능 여부: ${report?.ko ?? '미작성'}`,
      '',
      '【检查报告 / 검사결과 안내】',
      '如有最近的健康检查或血液检查报告，请通过顾问另行发送。',
      '최근 건강검진 또는 혈액검사 결과지가 있다면 상담원에게 별도로 보내주세요.',
      '',
      '【说明】',
      '以上内容仅用于医生初步了解身体状态及安排功能医学评估参考。',
      '위 내용은 의사가 고객님의 현재 건강 상태를 사전에 이해하고 기능의학 평가 및 검사 방향을 참고하기 위한 자료입니다.',
      '',
      '汉江春天不是医疗机构，不进行诊断或治疗判断。',
      '한강애봄은 의료기관이 아니며, 진단이나 치료 판단을 하지 않습니다.',
      '',
      '最终检查、诊断及治疗方案需由医疗机构和医生判断。',
      '최종 검사, 진단 및 치료 방향은 의료기관과 의사의 판단에 따라 결정됩니다.',
    ]

    return lines.join('\n')
  }

  const handleCopy = async () => {
    const text = buildIntakeText()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 4000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="intake-page">
      <div className="intake-container">
        <header className="intake-header">
          <p className="intake-title-zh">功能医学初诊问诊表</p>
          <p className="intake-title-ko">기능의학 초진 문진표</p>
          <p className="intake-desc-zh">
            为了让医生更准确地了解您的身体状态，并安排适合的功能医学评估及检查，请先填写以下信息。填写完成后，请点击"复制问诊内容"，并发送给汉江春天顾问。
          </p>
          <p className="intake-desc-ko">
            의사가 고객님의 건강 상태를 더 정확히 이해하고, 기능의학 평가 및 검사를 원활하게 진행할 수 있도록 아래 내용을 작성해주세요. 작성 후 "문진 내용 복사" 버튼을 눌러 한강애봄 상담원에게 보내주세요.
          </p>
        </header>

        <div className="intake-card">
          <p className="intake-q-zh">1. 年龄</p>
          <p className="intake-q-ko">나이</p>
          <input
            className="intake-input"
            type="number"
            inputMode="numeric"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="例 / 예: 45"
          />
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">2. 身高 / 体重</p>
          <p className="intake-q-ko">키 / 몸무게</p>
          <div className="intake-row">
            <input
              className="intake-input"
              type="number"
              inputMode="numeric"
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder="cm"
            />
            <input
              className="intake-input"
              type="number"
              inputMode="numeric"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="kg"
            />
          </div>
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">3. 目前最希望改善的健康问题是什么？</p>
          <p className="intake-q-ko">현재 가장 개선하고 싶은 건강 문제는 무엇인가요?</p>
          <textarea
            className="intake-textarea"
            value={mainConcern}
            onChange={e => setMainConcern(e.target.value)}
            rows={2}
          />
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">4. 目前有哪些不舒服的症状？</p>
          <p className="intake-q-ko">현재 불편한 증상은 무엇인가요? (복수 선택 가능)</p>
          <div className="intake-options">
            {SYMPTOM_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`intake-chip ${symptoms.has(opt.value) ? 'intake-chip-active' : ''}`}
                onClick={() => setSymptoms(prev => toggleInSet(prev, opt.value))}
              >
                {opt.zh} / {opt.ko}
              </button>
            ))}
          </div>
          {symptoms.has('other') && (
            <input
              className="intake-input intake-other-input"
              value={otherSymptomDetail}
              onChange={e => setOtherSymptomDetail(e.target.value)}
              placeholder="可选，请简单填写 / 선택 입력, 간단히 작성해주세요"
            />
          )}
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">5. 这些症状从什么时候开始？</p>
          <p className="intake-q-ko">이러한 증상은 언제부터 시작되었나요?</p>
          <div className="intake-options">
            {ONSET_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`intake-chip ${onset?.value === opt.value ? 'intake-chip-active' : ''}`}
                onClick={() => setOnset(opt)}
              >
                {opt.zh} / {opt.ko}
              </button>
            ))}
          </div>
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">6. 过去是否曾被诊断任何疾病？</p>
          <p className="intake-q-ko">과거에 진단받은 질환이 있으신가요? (복수 선택 가능)</p>
          <div className="intake-options">
            {DIAGNOSIS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`intake-chip ${diagnoses.has(opt.value) ? 'intake-chip-active' : ''}`}
                onClick={() => setDiagnoses(prev => toggleInSet(prev, opt.value))}
              >
                {opt.zh} / {opt.ko}
              </button>
            ))}
          </div>
          {diagnoses.has('other') && (
            <input
              className="intake-input intake-other-input"
              value={otherDiagnosisDetail}
              onChange={e => setOtherDiagnosisDetail(e.target.value)}
              placeholder="可选，请简单填写 / 선택 입력, 간단히 작성해주세요"
            />
          )}
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">7. 是否曾接受手术？</p>
          <p className="intake-q-ko">수술받은 적이 있으신가요?</p>
          <textarea
            className="intake-textarea"
            value={surgery}
            onChange={e => setSurgery(e.target.value)}
            rows={2}
            placeholder="没有 / 없음, 有，手术名称： / 있음, 수술명:"
          />
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">8. 是否有药物或食物过敏？</p>
          <p className="intake-q-ko">약물 또는 음식 알레르기가 있으신가요?</p>
          <textarea
            className="intake-textarea"
            value={allergy}
            onChange={e => setAllergy(e.target.value)}
            rows={2}
            placeholder="没有 / 없음, 有： / 있음:"
          />
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">9. 目前是否正在服用药物、维生素或保健食品？</p>
          <p className="intake-q-ko">현재 복용 중인 약, 비타민 또는 건강기능식품이 있으신가요?</p>
          <textarea
            className="intake-textarea"
            value={medications}
            onChange={e => setMedications(e.target.value)}
            rows={2}
          />
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">10. 平均睡眠时间</p>
          <p className="intake-q-ko">평균 수면시간</p>
          <div className="intake-options">
            {SLEEP_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`intake-chip ${sleep?.value === opt.value ? 'intake-chip-active' : ''}`}
                onClick={() => setSleep(opt)}
              >
                {opt.zh} / {opt.ko}
              </button>
            ))}
          </div>
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">11. 最近是否做过健康检查或血液检查？</p>
          <p className="intake-q-ko">최근 건강검진 또는 혈액검사를 받은 적이 있으신가요?</p>
          <div className="intake-options">
            {CHECKUP_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`intake-chip ${checkup?.value === opt.value ? 'intake-chip-active' : ''}`}
                onClick={() => setCheckup(opt)}
              >
                {opt.zh} / {opt.ko}
              </button>
            ))}
          </div>
        </div>

        <div className="intake-card">
          <p className="intake-q-zh">12. 是否可以提供检查报告？</p>
          <p className="intake-q-ko">검사 결과지를 제공할 수 있으신가요?</p>
          <div className="intake-options">
            {REPORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`intake-chip ${report?.value === opt.value ? 'intake-chip-active' : ''}`}
                onClick={() => setReport(opt)}
              >
                {opt.zh} / {opt.ko}
              </button>
            ))}
          </div>
        </div>

        <div className="intake-notice">
          <p className="intake-notice-zh">如有最近的健康检查或血液检查报告，请通过顾问另行发送，无需在此上传。</p>
          <p className="intake-notice-ko">최근 건강검진 또는 혈액검사 결과지가 있다면 상담원에게 별도로 보내주시면 됩니다. 이 페이지에는 업로드하지 않으셔도 됩니다.</p>
        </div>

        <div className="intake-actions">
          <button type="button" className="intake-copy-btn" onClick={handleCopy}>
            复制问诊内容 / 문진 내용 복사
          </button>
          {copied && (
            <p className="intake-copied-msg">已复制，请发送给顾问 / 복사되었습니다, 상담원에게 보내주세요</p>
          )}
          <a
            className="intake-wechat-btn"
            href={WECHAT_BIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            打开企业微信咨询
          </a>
        </div>

        <p className="intake-privacy-note">
          本页面内容仅在您的浏览器中处理，不会保存到服务器。 / 이 페이지의 내용은 브라우저 안에서만 처리되며 서버에 저장되지 않습니다.
        </p>
      </div>
    </div>
  )
}
