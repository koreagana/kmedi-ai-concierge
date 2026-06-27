import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react'
import restaurants from '../data/halalRestaurants.json'
import { useApp } from '../contexts/AppContext'
import type { LangCode } from '../data/translations'
import './HalalMap.css'

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string ?? ''

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 }

const WHATSAPP_URL = 'https://wa.me/821077671903'
const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'
const WHATSAPP_MESSAGE = 'Hello, I would like help finding a halal restaurant near my hospital or hotel in Korea.'

const GUIDE_COPY: Record<LangCode, { title: string; desc: string; tags: string[]; cta: string }> = {
  zh: {
    title: '韩国清真餐厅指南',
    desc: '我们可以协助您查找医院或酒店附近的清真餐厅。',
    tags: ['首尔', '江南', '明洞', '梨泰院', '弘大', '医院附近'],
    cta: '咨询附近清真餐厅',
  },
  ko: {
    title: '한국 할랄 음식점 안내',
    desc: '병원 또는 호텔 근처의 할랄 음식점을 확인할 수 있도록 도와드립니다.',
    tags: ['서울', '강남', '명동', '이태원', '홍대', '병원 근처'],
    cta: '근처 할랄 음식점 문의하기',
  },
  en: {
    title: 'Halal Restaurant Guide in Korea',
    desc: 'We can help you find halal restaurants near your hospital or hotel in Korea.',
    tags: ['Seoul', 'Gangnam', 'Myeongdong', 'Itaewon', 'Hongdae', 'Near Hospital'],
    cta: 'Ask About Nearby Halal Restaurants',
  },
  ar: {
    title: 'دليل المطاعم الحلال في كوريا',
    desc: 'نساعدك في العثور على مطاعم حلال قريبة من المستشفى أو الفندق في سيول والمناطق المحيطة بها.',
    tags: ['سيول', 'جانجنام', 'ميونغدونغ', 'إيتاوون', 'هونغداي', 'قريبة من المستشفى'],
    cta: 'اسأل الكونسيرج عن مطعم قريب',
  },
}

interface Restaurant {
  id: number
  name: string
  nameAr: string
  lat: number
  lng: number
  address: string
  cuisine: string
}

function HalalGuideCard({ lang }: { lang: LangCode }) {
  const copy = GUIDE_COPY[lang] ?? GUIDE_COPY.en
  const contactUrl = lang === 'zh' || lang === 'ko'
    ? WECHAT_BIZ_URL
    : `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className="halal-guide-card">
      <div className="halal-guide-card-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="1.8">
          <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </div>
      <p className="halal-guide-card-title">{copy.title}</p>
      <p className="halal-guide-card-desc">{copy.desc}</p>
      <div className="halal-guide-card-tags">
        {copy.tags.map(tag => (
          <span key={tag} className="halal-guide-card-tag">{tag}</span>
        ))}
      </div>
      <button
        type="button"
        className="halal-guide-card-cta"
        onClick={() => window.open(contactUrl, '_blank')}
      >
        {copy.cta}
      </button>
    </div>
  )
}

interface HalalMapProps {
  dir?: 'rtl' | 'ltr'
}

export default function HalalMap({ dir = 'rtl' }: HalalMapProps) {
  const { lang } = useApp()
  const [selected, setSelected] = useState<Restaurant | null>(null)

  return (
    <div className="halal-map-wrapper" dir={dir}>
      <div className="halal-map-header">
        <h2 className="halal-map-title">
          {dir === 'rtl' ? 'خريطة المطاعم الحلال في كوريا' : '한국 할랄 식당 지도'}
        </h2>
        <p className="halal-map-subtitle">
          {dir === 'rtl'
            ? 'ابحث عن أقرب مطعم حلال في سيول وضواحيها'
            : '서울 및 근교 할랄 식당을 찾아보세요'}
        </p>
      </div>

      {MAPS_API_KEY ? (
        <LoadScript googleMapsApiKey={MAPS_API_KEY}>
          <GoogleMap
            mapContainerClassName="halal-map-container"
            center={DEFAULT_CENTER}
            zoom={12}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {(restaurants as Restaurant[]).map((r) => (
              <Marker
                key={r.id}
                position={{ lat: r.lat, lng: r.lng }}
                title={dir === 'rtl' ? r.nameAr : r.name}
                onClick={() => setSelected(r)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="halal-map-infowindow">
                  <p className="halal-map-infowindow-name">
                    {dir === 'rtl' ? selected.nameAr : selected.name}
                  </p>
                  <p className="halal-map-infowindow-address">{selected.address}</p>
                  <p className="halal-map-infowindow-cuisine">{selected.cuisine}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      ) : (
        <HalalGuideCard lang={lang} />
      )}
    </div>
  )
}
