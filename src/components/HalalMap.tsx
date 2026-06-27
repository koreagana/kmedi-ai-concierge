import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { useRef, useState } from 'react'
import legacyRestaurants from '../data/halalRestaurants.json'
import { HALAL_RESTAURANTS, type HalalRestaurant } from '../data/halalRestaurants'
import { useApp } from '../contexts/AppContext'
import type { LangCode } from '../data/translations'
import './HalalMap.css'

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string ?? ''

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 }

const INITIAL_VISIBLE_COUNT = 4

const LIST_COPY: Record<LangCode, { title: string; desc: string; openMap: string; showMore: string; showLess: string; prayerLabel: string; prayer: Record<HalalRestaurant['prayerRoom'], string> }> = {
  zh: {
    title: '韩国清真餐厅指南',
    desc: '您可以查看医院或酒店附近的清真餐厅，并通过 Google Maps 打开位置。',
    openMap: '打开地图',
    showMore: '查看更多餐厅',
    showLess: '收起餐厅列表',
    prayerLabel: '祈祷室',
    prayer: { yes: '有', no: '无', unconfirmed: '未确认' },
  },
  ko: {
    title: '한국 할랄 음식점 안내',
    desc: '병원 또는 호텔 근처의 할랄 음식점을 확인하고 Google Maps에서 위치를 열 수 있습니다.',
    openMap: '지도 열기',
    showMore: '음식점 더 보기',
    showLess: '음식점 접기',
    prayerLabel: '기도실',
    prayer: { yes: '있음', no: '없음', unconfirmed: '확인 필요' },
  },
  en: {
    title: 'Halal Restaurant Guide in Korea',
    desc: 'Find halal restaurants near your hospital or hotel and open the location in Google Maps.',
    openMap: 'Open Map',
    showMore: 'View More Restaurants',
    showLess: 'Show Less',
    prayerLabel: 'Prayer room',
    prayer: { yes: 'Yes', no: 'No', unconfirmed: 'Unconfirmed' },
  },
  ar: {
    title: 'خريطة المطاعم الحلال في كوريا',
    desc: 'يمكنك العثور على مطاعم حلال قريبة من المستشفى أو الفندق في سيول والمناطق المحيطة بها.',
    openMap: 'افتح الخريطة',
    showMore: 'عرض المزيد من المطاعم',
    showLess: 'عرض عدد أقل',
    prayerLabel: 'غرفة الصلاة',
    prayer: { yes: 'نعم', no: 'لا', unconfirmed: 'غير مؤكد' },
  },
}

const CATEGORY_LABEL: Record<LangCode, Record<string, string>> = {
  zh: { halal_certified: '清真认证', self_certified: '商家自称清真', muslim_friendly: '穆斯林友好' },
  ko: { halal_certified: '할랄 인증', self_certified: '자체 할랄 표기', muslim_friendly: '무슬림 친화' },
  en: { halal_certified: 'Halal Certified', self_certified: 'Self-Certified Halal', muslim_friendly: 'Muslim-Friendly' },
  ar: { halal_certified: 'حلال معتمد', self_certified: 'حلال ذاتي التصديق', muslim_friendly: 'صديق للمسلمين' },
}

function restaurantName(r: HalalRestaurant, lang: LangCode): string {
  if (lang === 'ko') return r.nameKo || r.nameEn
  if (lang === 'ar') return r.nameAr || r.nameEn
  return r.nameEn
}

function mapsUrl(r: HalalRestaurant): string {
  const mapQuery = encodeURIComponent(`${r.nameEn} ${r.address} ${r.city} Korea`)
  return `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
}

function HalalRestaurantList({ lang }: { lang: LangCode }) {
  const [expanded, setExpanded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const copy = LIST_COPY[lang] ?? LIST_COPY.en
  const categoryLabels = CATEGORY_LABEL[lang] ?? CATEGORY_LABEL.en
  const visible = expanded ? HALAL_RESTAURANTS : HALAL_RESTAURANTS.slice(0, INITIAL_VISIBLE_COUNT)

  const handleToggle = () => {
    const wasExpanded = expanded
    setExpanded(v => !v)
    if (wasExpanded) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="halal-list-section" ref={sectionRef}>
      <p className="halal-list-title">{copy.title}</p>
      <p className="halal-list-desc">{copy.desc}</p>

      <div className="halal-list-cards">
        {visible.map(r => (
          <div key={r.id} className="halal-restaurant-card">
            <div className="halal-restaurant-card-top">
              <p className="halal-restaurant-name">{restaurantName(r, lang)}</p>
              <span className="halal-restaurant-tag">{r.city}</span>
            </div>
            <span className="halal-restaurant-category">{categoryLabels[r.category] ?? r.category}</span>
            <p className="halal-restaurant-address">{r.address}</p>
            {r.phone && <p className="halal-restaurant-phone">{r.phone}</p>}
            <p className="halal-restaurant-prayer">{copy.prayerLabel}: {copy.prayer[r.prayerRoom]}</p>
            <a
              className="halal-restaurant-map-btn"
              href={mapsUrl(r)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.openMap}
            </a>
          </div>
        ))}
      </div>

      {HALAL_RESTAURANTS.length > INITIAL_VISIBLE_COUNT && (
        <button
          type="button"
          className="halal-list-toggle"
          onClick={handleToggle}
        >
          {expanded ? copy.showLess : copy.showMore}
        </button>
      )}
    </div>
  )
}

interface LegacyRestaurant {
  id: number
  name: string
  nameAr: string
  lat: number
  lng: number
  address: string
  cuisine: string
}

interface HalalMapProps {
  dir?: 'rtl' | 'ltr'
}

export default function HalalMap({ dir = 'rtl' }: HalalMapProps) {
  const { lang } = useApp()
  const [selected, setSelected] = useState<LegacyRestaurant | null>(null)

  if (!MAPS_API_KEY) {
    return (
      <div className="halal-map-wrapper" dir={dir}>
        <HalalRestaurantList lang={lang} />
      </div>
    )
  }

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
          {(legacyRestaurants as LegacyRestaurant[]).map((r) => (
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
    </div>
  )
}
