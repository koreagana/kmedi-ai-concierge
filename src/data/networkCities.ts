import type { LocalizedText } from './bigHealthKeywords'

export interface NetworkCity {
  id: string
  name: LocalizedText
  /** label position within the map SVG's 0-190 x 0-265 viewBox */
  x: number
  y: number
  /** scattered dot positions (already jittered) suggesting network density —
      deliberately not a literal 1:1 count of partner hospitals, see note below */
  dots: [number, number][]
}

/* 韩国全国医疗资源网络 카드를 펼치면 보여주는 도시 목록.
   나중에 도시가 늘어나면(예: 대구 협력병원 추가 확정 등) 이 배열에만
   추가하면 지도 위 점 무리와 라벨이 자동으로 늘어남.

   ⚠️ 점 개수는 파트너_병의원_목록.xlsx의 실제 병원 수와 1:1로 맞춘 게
   아니라 "네트워크가 확장되고 있다"는 인상을 주기 위한 밀도 표현임
   (사용자 요청에 따름 — 서울 다수/부산 7개/제주 6개/대구 3개).
   실제 등록 수: 서울 31 · 경기 2 · 대구 1 · 제주 2 · 부산 0(2026-07 기준). */
export const NETWORK_CITIES: NetworkCity[] = [
  {
    id: 'seoul',
    name: { zh: '首尔', ko: '서울', en: 'Seoul', ar: 'سيول' },
    x: 80,
    y: 74,
    dots: [
      [93.6, 53.7], [81.6, 59.5], [73.4, 41.3], [94.3, 59.0], [91.0, 53.7],
      [71.1, 51.8], [82.1, 57.0], [66.6, 48.9], [72.5, 48.2], [95.8, 52.5],
      [75.0, 40.1], [85.8, 58.8], [70.9, 64.0], [86.1, 55.4], [67.1, 44.1], [78.0, 39.5],
    ],
  },
  {
    id: 'daegu',
    name: { zh: '大邱', ko: '대구', en: 'Daegu', ar: 'دايغو' },
    x: 120,
    y: 162,
    dots: [[126.2, 151.2], [114.9, 150.6], [114.1, 147.7]],
  },
  {
    id: 'busan',
    name: { zh: '釜山', ko: '부산', en: 'Busan', ar: 'بوسان' },
    x: 153,
    y: 195,
    dots: [
      [143.3, 173.9], [162.3, 180.2], [151.5, 182.6], [153.5, 181.8],
      [152.1, 181.9], [147.0, 183.5], [154.8, 183.5],
    ],
  },
  {
    id: 'jeju',
    name: { zh: '济州', ko: '제주', en: 'Jeju', ar: 'جيجو' },
    x: 65,
    y: 250,
    dots: [[71.3, 232.9], [57.2, 229.9], [64.2, 230.2], [60.7, 238.3], [56.8, 227.0], [61.3, 228.2]],
  },
]
