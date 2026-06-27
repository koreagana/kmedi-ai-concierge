import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HeroSection,
  ConcernSection,
  CategoryGridSection,
  ContactSection,
  MedicalNetworkSection,
  AboutSection,
  FooterSection,
} from './HomePage'
import HalalMap from './HalalMap'

const WHATSAPP_URL = 'https://wa.me/821077671903'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

function ArConciergeSection() {
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <section id="concierge" className="section-light">
      <motion.div {...fadeUp}>
        <p className="section-title">استشاري المرضى العرب</p>
        <div className="section-accent-line" />
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="concierge-card"
        style={{ maxWidth: 340, margin: '0 auto' }}
      >
        <div className="concierge-avatar concierge-avatar-m">
          <img
            src="/concierge_image/alaadin.png"
            alt="Dr. Alaa Eldin Elastel"
            className="concierge-avatar-img"
          />
        </div>
        <div>
          <p className="concierge-name">Dr. Alaa Eldin Elastel</p>
          <p className="concierge-title-text">استشاري متخصص في السياحة الطبية الكورية</p>
        </div>
        <p className="concierge-specialty" style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          خبرة واسعة في استقطاب المرضى من الإمارات والسعودية وقطر إلى كوريا، من خلال عمله في وزارة الصحة الكورية والمستشفيات الكبرى والملحقية العسكرية للسفارة الإماراتية في سيول.
        </p>
        <p style={{ fontSize: 11, color: 'var(--brand)', lineHeight: 1.6, marginBottom: 8 }}>
          استشارات الأمراض الحرجة · استشارات شاملة في المجال الطبي الكوري · الفحوصات الدقيقة
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          <p
            onClick={() => copy('+821077671903', setCopiedPhone)}
            style={{ fontSize: 11, color: copiedPhone ? 'var(--brand)' : 'var(--text-muted)', cursor: 'pointer', userSelect: 'none', transition: 'color 0.2s' }}
          >
            📱 {copiedPhone ? '✓ تم النسخ' : '+82-10-7767-1903'}
          </p>
          <p
            onClick={() => copy('alaadin22@yahoo.co.kr', setCopiedEmail)}
            style={{ fontSize: 11, color: copiedEmail ? 'var(--brand)' : 'var(--text-muted)', cursor: 'pointer', userSelect: 'none', transition: 'color 0.2s' }}
          >
            ✉️ {copiedEmail ? '✓ تم النسخ' : 'alaadin22@yahoo.co.kr'}
          </p>
        </div>
        <button
          className="concierge-btn"
          onClick={() => window.open(WHATSAPP_URL, '_blank')}
        >
          تواصل عبر واتساب
        </button>
      </motion.div>
    </section>
  )
}

export default function ArHomePage() {
  return (
    <div>
      <HeroSection />
      <ArConciergeSection />
      <ConcernSection />
      <CategoryGridSection />
      <ContactSection />
      <section id="halal-map-section" className="section-light">
        <HalalMap dir="rtl" />
      </section>
      <MedicalNetworkSection />
      <AboutSection />
      <FooterSection />
    </div>
  )
}
