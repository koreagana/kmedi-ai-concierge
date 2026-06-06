import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'

const QUESTIONS = [
  {
    label: '最想改善',
    q: '您最想改善的第一感觉是什么？',
    opts: ['看起来没精神', '脸看起来松了', '皮肤变粗糙了', '脸型不够清晰', '拍照不上镜', '想自然变年轻一点'],
  },
  {
    label: '最在意部位',
    q: '您最在意的部位是哪里？',
    opts: ['下颌线/双下巴', '法令纹/嘴角下垂', '眼周/眼袋/黑眼圈', '毛孔/痘印/痘疤', '色斑/暗沉/肤色不均', '脸部凹陷/苹果肌流失', '整体轮廓/侧脸线条'],
  },
  {
    label: '期望效果',
    q: '您希望效果是什么感觉？',
    opts: ['自然一点，不想被看出来', '明显变年轻，但不要夸张', '拍照更好看', '脸更紧致、更小一点', '皮肤更干净、更亮', '疲惫感少一点'],
  },
  {
    label: '可接受恢复期',
    q: '您能接受的恢复期是？',
    opts: ['几乎不想有恢复期', '1-3天可以接受', '4-7天可以接受', '可以接受较长恢复期，但想效果更明显', '还不确定，想先咨询'],
  },
  {
    label: '最担心',
    q: '您最担心什么？',
    opts: ['怕不自然', '怕疼', '怕恢复期影响工作', '怕价格太高', '怕选错项目', '怕沟通不清楚', '怕去了韩国不知道怎么安排'],
  },
  {
    label: '计划来韩',
    q: '您计划什么时候来韩国？',
    opts: ['1个月内', '3个月内', '半年内', '还没确定', '先了解方案'],
  },
  {
    label: '希望先做',
    q: '您希望我们先帮您做什么？',
    opts: ['先判断我适合哪个方向', '先整理大致预算', '先告诉我恢复期和行程安排', '先推荐适合的韩国咨询方向', '先帮我安排顾问沟通'],
  },
]

const COPY_LABELS = [
  '我最想改善的第一感觉',
  '我最在意的部位',
  '我希望的效果',
  '我能接受的恢复期',
  '我最担心的问题',
  '计划来韩国时间',
  '希望先获得的帮助',
]

function classify(answers: string[]): 'A' | 'B' | 'C' | 'D' {
  const [q1, q2, q3, q4, q5] = answers

  const isA =
    (q1 === '皮肤变粗糙了' || q2 === '毛孔/痘印/痘疤' || q2 === '色斑/暗沉/肤色不均') &&
    q3 === '自然一点，不想被看出来' &&
    q5 === '怕价格太高'

  const isB =
    (q1 === '脸看起来松了' || q1 === '想自然变年轻一点' || q2 === '下颌线/双下巴' || q2 === '法令纹/嘴角下垂') &&
    (q3 === '明显变年轻，但不要夸张' || q3 === '脸更紧致、更小一点') &&
    (q4 === '4-7天可以接受' || q4 === '可以接受较长恢复期，但想效果更明显')

  const isC =
    (q1 === '看起来没精神' || q2 === '眼周/眼袋/黑眼圈') &&
    q3 === '疲惫感少一点' &&
    (q4 === '几乎不想有恢复期' || q4 === '1-3天可以接受')

  if (isA) return 'A'
  if (isB) return 'B'
  if (isC) return 'C'
  return 'D'
}

const RESPONSES: Record<string, string> = {
  A: `您好，已为您生成初步咨询方向。

您比较关注自然变美、皮肤状态改善和费用控制。
这种情况通常不适合一开始就选择过重的项目，而是建议先从肤质管理、轻抗衰、皮肤亮泽度改善方向进行咨询。

我们可以先帮您梳理：
1. 适合您的皮肤管理方向
2. 大致恢复期
3. 来韩停留时间安排
4. 合理预算范围

请点击下方按钮，通过企业微信联系顾问。`,

  B: `您好，您的变美咨询卡已生成。

您主要关注脸部轮廓、下颌线、法令纹和整体年轻感。
这类问题通常需要先判断是皮肤松弛、脂肪堆积、支撑力下降，还是面部比例问题。

我们建议先进行轮廓提升与抗衰方向的初步咨询。
根据恢复期、预算和来韩停留时间，可以再判断适合轻医美、提升类项目，还是更综合的咨询方案。

请通过企业微信发送您的咨询卡，顾问会帮您进一步梳理方向。`,

  C: `您好，已根据您的选择整理初步方向。

您比较在意眼周疲惫感、黑眼圈、眼袋或整体没精神的问题。
如果恢复期有限，建议先从非手术类改善、皮肤状态管理和眼周咨询方向开始了解。

我们会根据您的照片、停留时间和预算，帮您判断更适合哪一类韩国医疗咨询方向。
具体项目是否适合，仍需由专业医疗机构进一步评估。

请点击下方按钮，通过企业微信联系顾问。`,

  D: `您好，您的变美咨询卡已生成。

根据您的选择，我们会先帮您梳理：
1. 您最在意的外貌变化
2. 可接受的恢复期
3. 来韩时间与停留安排
4. 预算与沟通顾虑
5. 适合进一步咨询的韩国医疗方向

这不是医疗诊断，也不是最终治疗建议。
后续需要根据照片、面诊或专业医疗机构判断，进一步确认适合的咨询方向。

请点击下方按钮，通过企业微信联系顾问。`,
}

/* ─── styles ─────────────────────────────────────────────── */
const S = {
  wrap: {
    background: 'linear-gradient(180deg, #061225 0%, #0a1a35 100%)',
    padding: '32px 20px 40px',
  } as React.CSSProperties,

  progressTrack: {
    height: 3,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 24,
    overflow: 'hidden',
  } as React.CSSProperties,

  stepLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: '0.1em',
    marginBottom: 10,
  } as React.CSSProperties,

  questionText: {
    fontSize: 16,
    fontWeight: 700,
    color: 'white',
    lineHeight: 1.5,
    marginBottom: 20,
  } as React.CSSProperties,

  chipsWrap: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 9,
    marginBottom: 24,
  },

  chip: (selected: boolean): React.CSSProperties => ({
    padding: '9px 14px',
    borderRadius: 20,
    border: `1px solid ${selected ? 'rgba(0,170,255,0.8)' : 'rgba(255,255,255,0.16)'}`,
    background: selected ? 'rgba(0,119,182,0.85)' : 'rgba(255,255,255,0.06)',
    color: selected ? 'white' : 'rgba(255,255,255,0.7)',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
    lineHeight: 1.4,
  }),

  backBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.35)',
    fontSize: 13,
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'inherit',
  } as React.CSSProperties,

  resultBox: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: '18px 16px',
    marginBottom: 20,
  } as React.CSSProperties,

  resultText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 1.85,
    whiteSpace: 'pre-line' as const,
  },

  tagsWrap: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 7,
    marginBottom: 24,
  },

  tag: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '5px 10px',
    lineHeight: 1.3,
  } as React.CSSProperties,

  btnPrimary: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 12,
    background: 'var(--brand, #0077b6)',
    border: 'none',
    color: 'white',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginBottom: 10,
    letterSpacing: '0.02em',
  } as React.CSSProperties,

  btnOutline: (copied: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '13px 0',
    borderRadius: 12,
    background: copied ? 'rgba(0,200,100,0.15)' : 'rgba(255,255,255,0.07)',
    border: `1px solid ${copied ? 'rgba(0,200,100,0.4)' : 'rgba(255,255,255,0.2)'}`,
    color: copied ? 'rgba(100,220,150,1)' : 'rgba(255,255,255,0.75)',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  }),
}

/* ─── component ──────────────────────────────────────────── */
export default function ConsultationCard() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(7).fill(''))
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const select = (opt: string) => {
    const next = [...answers]
    next[step] = opt
    setAnswers(next)
    setTimeout(() => {
      if (step < 6) setStep(step + 1)
      else setSubmitted(true)
    }, 140)
  }

  const goBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const restart = () => {
    setStep(0)
    setAnswers(Array(7).fill(''))
    setSubmitted(false)
    setCopied(false)
  }

  const type = submitted ? classify(answers) : 'D'

  const copyText = [
    '您好，我想咨询韩国变美 / 医美相关服务。',
    '',
    ...COPY_LABELS.map((label, i) => `${label}：${answers[i]}`),
    '',
    '请帮我梳理适合的韩国医疗咨询方向。',
  ].join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const progress = submitted ? 1 : step / 7

  return (
    <div style={S.wrap}>
      {/* progress bar */}
      <div style={S.progressTrack}>
        <motion.div
          style={{ height: '100%', background: 'var(--brand, #0077b6)', borderRadius: 2 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <p style={S.stepLabel}>Q{step + 1} / 7</p>
            <p style={S.questionText}>{QUESTIONS[step].q}</p>
            <div style={S.chipsWrap}>
              {QUESTIONS[step].opts.map(opt => (
                <button
                  key={opt}
                  style={S.chip(answers[step] === opt)}
                  onClick={() => select(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button style={S.backBtn} onClick={goBack}>
                ← 上一步
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 14 }}>
              变美咨询卡已生成
            </p>

            {/* response text */}
            <div style={S.resultBox}>
              <p style={S.resultText}>{RESPONSES[type]}</p>
            </div>

            {/* selected tags */}
            <div style={S.tagsWrap}>
              {QUESTIONS.map((q, i) => (
                answers[i] ? (
                  <span key={i} style={S.tag}>
                    {q.label}：{answers[i]}
                  </span>
                ) : null
              ))}
            </div>

            {/* copy button */}
            <button style={S.btnOutline(copied)} onClick={handleCopy}>
              {copied ? '已复制咨询内容' : '复制咨询内容'}
            </button>

            <div style={{ height: 10 }} />

            {/* WeChat button */}
            <button
              style={S.btnPrimary}
              onClick={() => window.open(WECHAT_BIZ_URL, '_blank')}
            >
              打开企业微信咨询
            </button>

            <button
              style={{ ...S.backBtn, display: 'block', margin: '12px auto 0', textAlign: 'center' }}
              onClick={restart}
            >
              重新填写
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
