import type { LocalizedText } from './bigHealthKeywords'

export interface NetworkCity {
  id: string
  name: LocalizedText
  /** position within the map SVG's 0-200 x 0-240 viewBox */
  x: number
  y: number
}

/* 韩国全国医疗资源网络 카드 확장 시 보여주는 도시 목록.
   부산・제주 등은 아직 협력병원이 많지 않아도, "확장 중인 네트워크"라는
   메시지로 먼저 보여줄 수 있음 — 나중에 도시가 늘어나면 이 배열에만
   추가하면 지도 위 점과 라벨이 자동으로 늘어남. */
export const NETWORK_CITIES: NetworkCity[] = [
  { id: 'seoul', name: { zh: '首尔', ko: '서울', en: 'Seoul', ar: 'سيول' }, x: 78, y: 48 },
  { id: 'busan', name: { zh: '釜山', ko: '부산', en: 'Busan', ar: 'بوسان' }, x: 148, y: 148 },
  { id: 'jeju', name: { zh: '济州', ko: '제주', en: 'Jeju', ar: 'جيجو' }, x: 68, y: 216 },
]
