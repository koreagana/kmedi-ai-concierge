import type { LocalizedText } from './bigHealthKeywords'

export interface NetworkCity {
  id: string
  name: LocalizedText
  /** label position in the /public/korea_map.png pixel space (400 x 714) */
  x: number
  y: number
  /** scattered dot positions (already jittered, each individually verified
      to land on the actual landmass in korea_map.png) suggesting network
      density — deliberately not a literal 1:1 count of partner hospitals,
      see note below */
  dots: [number, number][]
}

/* 韩国全国医疗资源网络 카드를 펼치면 보여주는 도시 목록.
   좌표 기준: /public/korea_map.png (400x714px, 양옆 살짝 잘린 실루엣 이미지)
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
    x: 195,
    y: 168,
    dots: [
      [201.1, 89.2], [188.6, 150.2], [157.5, 115.7], [199.8, 65.6], [207.3, 108.1],
      [146.0, 124.8], [235.2, 105.6], [184.3, 73.4], [211.8, 97.2], [240.0, 114.7],
      [175.7, 101.2], [151.5, 140.6], [170.0, 115.7], [192.6, 119.7], [158.2, 105.8], [192.8, 128.2],
    ],
  },
  {
    id: 'daegu',
    name: { zh: '大邱', ko: '대구', en: 'Daegu', ar: 'دايغو' },
    x: 305,
    y: 460,
    dots: [[322.5, 430.7], [302.6, 444.5], [292.7, 413.8]],
  },
  {
    id: 'busan',
    name: { zh: '釜山', ko: '부산', en: 'Busan', ar: 'بوسان' },
    x: 345,
    y: 512,
    dots: [
      [340.6, 475.9], [340.3, 468.8], [359.8, 472.2], [356.5, 495.5],
      [320.7, 486.5], [324.6, 484.5], [372.2, 461.3],
    ],
  },
  {
    id: 'jeju',
    name: { zh: '济州', ko: '제주', en: 'Jeju', ar: 'جيجو' },
    x: 40,
    y: 670,
    dots: [[47.5, 697.2], [46.6, 702.7], [31.2, 694.9], [35.0, 708.0], [46.3, 696.6], [48.3, 684.9]],
  },
]
