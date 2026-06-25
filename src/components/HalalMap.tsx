import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react'
import restaurants from '../data/halalRestaurants.json'
import './HalalMap.css'

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string ?? ''

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 }

interface Restaurant {
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
        <div className="halal-map-placeholder">
          <span className="halal-map-placeholder-icon">🗺️</span>
          <p className="halal-map-placeholder-text">
            {dir === 'rtl'
              ? 'سيتم تفعيل الخريطة بعد إضافة مفتاح Google Maps API'
              : 'Google Maps API 키 등록 후 지도가 활성화됩니다'}
          </p>
        </div>
      )}
    </div>
  )
}
