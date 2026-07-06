import { useSearchParams } from 'react-router-dom'
import { AppProvider } from '../contexts/AppContext'
import type { LangCode } from '../data/translations'
import NavBar from './NavBar'
import { FooterSection } from './HomePage'

const VALID_LANGS: LangCode[] = ['zh', 'ko', 'en', 'ar']

interface TermsText {
  title: string
  disclaimer: string
}

const TEXT: Record<LangCode, TermsText> = {
  zh: {
    title: '使用条款及免责声明',
    disclaimer: '温馨提示：本网站不提供医疗诊断、治疗建议或紧急医疗服务。所有医疗判断、检查结果解释与治疗方案，均以韩国正规医疗机构及专业医生面诊为准。汉江春天提供的是医疗咨询整理、预约协调、翻译沟通与医疗旅游相关协助服务。',
  },
  ko: {
    title: '이용약관 및 면책조항',
    disclaimer: '안내: 본 웹사이트는 의료 진단, 치료 조언 또는 응급 의료 서비스를 제공하지 않습니다. 모든 의료 판단, 검사 결과 해석 및 치료 방안은 한국 정규 의료기관 및 전문 의사의 직접 진찰을 기준으로 합니다.',
  },
  en: {
    title: 'Terms of Use & Disclaimer',
    disclaimer: 'Disclaimer: K-MediSpring does not provide medical diagnosis, treatment recommendations, or emergency care. All clinical decisions, test interpretations, and treatment plans are made exclusively by licensed Korean healthcare professionals during in-person consultation. K-MediSpring provides medical coordination, appointment facilitation, interpretation, and travel support services only.',
  },
  ar: {
    title: 'شروط الاستخدام وإخلاء المسؤولية',
    disclaimer: 'تنبيه: لا تقدم كيمديسبرينج التشخيص الطبي أو توصيات العلاج أو الرعاية الطارئة. جميع القرارات السريرية وتفسيرات نتائج الفحوصات وخطط العلاج تُتخذ حصرياً من قِبل متخصصي الرعاية الصحية الكوريين المرخصين خلال الاستشارة الشخصية.',
  },
}

export default function TermsPage() {
  const [searchParams] = useSearchParams()
  const langParam = searchParams.get('lang') as LangCode | null
  const lang: LangCode = langParam && VALID_LANGS.includes(langParam) ? langParam : 'zh'
  const t = TEXT[lang]

  return (
    <AppProvider initialLang={lang}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <NavBar />

        <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 60px' }}>
          <p className="section-title" style={{ textAlign: 'center' }}>{t.title}</p>
          <div className="section-accent-line" />

          <div className="cat-summary-card">
            {t.disclaimer}
          </div>
        </div>

        <FooterSection />
      </div>
    </AppProvider>
  )
}
