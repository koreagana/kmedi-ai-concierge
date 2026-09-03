/* ══════════════════════════════════════════════════════════════════
   견적 시술 마스터 데이터 — 해외수가 기준 (2026 개편)
   단위: 만원(KRW) / VAT 10% 포함가
   근거: 도자기 · 바노바기(해외) · 제주와인
   ══════════════════════════════════════════════════════════════════ */

export interface QuoteOption {
  unit: string
  priceLow: number
  priceHigh: number
  note?: string
}

export interface QuoteProcedure {
  id: string
  nameKo: string
  nameZh: string
  options: QuoteOption[]
}

export interface QuoteCategory {
  id: string
  nameKo: string
  nameZh: string
  labelZh: string
  procedures: QuoteProcedure[]
}

export const QUOTE_CATEGORIES: QuoteCategory[] = [
  {
    id: 'lifting',
    nameKo: '리프팅',
    nameZh: '提拉紧致',
    labelZh: '提拉紧致 · 抗衰',
    procedures: [
      { id: 'ulthera-prime', nameKo: '울쎄라피 프라임', nameZh: '超声刀 Ulthera', options: [
        { unit: '100发', priceLow: 49.5, priceHigh: 121 },
        { unit: '300发', priceLow: 148.5, priceHigh: 330 },
        { unit: '400发', priceLow: 198, priceHigh: 396 },
        { unit: '600发', priceLow: 297, priceHigh: 495 },
      ] },
      { id: 'eye-ulthera', nameKo: '아이 울쎄라', nameZh: '眼部超声刀', options: [
        { unit: '100发', priceLow: 49.5, priceHigh: 49.5 },
      ] },
      { id: 'thermage-flx', nameKo: '써마지 FLX', nameZh: '热玛吉FLX', options: [
        { unit: '300发', priceLow: 165, priceHigh: 165 },
        { unit: '600发', priceLow: 319, priceHigh: 495 },
        { unit: '900发', priceLow: 440, priceHigh: 660 },
      ] },
      { id: 'eye-thermage-flx', nameKo: '아이써마지 FLX', nameZh: '眼部热玛吉FLX', options: [
        { unit: '225发', priceLow: 137.5, priceHigh: 137.5 },
        { unit: '450发', priceLow: 220, priceHigh: 330 },
      ] },
      { id: 'shurink-universe', nameKo: '슈링크 유니버스', nameZh: 'Shurink 聚焦超声', options: [
        { unit: '100发', priceLow: 8.8, priceHigh: 8.8 },
        { unit: '300发', priceLow: 19.8, priceHigh: 19.8 },
        { unit: '600发', priceLow: 38.5, priceHigh: 38.5 },
      ] },
      { id: 'volnewmer', nameKo: '볼뉴머', nameZh: 'Volnewmer 微波紧致', options: [
        { unit: '70KJ', priceLow: 77, priceHigh: 77 },
      ] },
      { id: 'titanium-toning', nameKo: '티타늄 토닝', nameZh: '钛提升 Titanium', options: [
        { unit: '50KJ', priceLow: 110, priceHigh: 110 },
      ] },
      { id: 'pair-titanium-dual', nameKo: '페어티타늄(듀얼)', nameZh: '双钛提升 Dual', options: [
        { unit: '80KJ', priceLow: 297, priceHigh: 297 },
      ] },
      { id: 'titanium-lifting', nameKo: '티타늄 리프팅', nameZh: '钛提升', options: [
        { unit: '25分钟', priceLow: 132, priceHigh: 132 },
      ] },
      { id: 'ten-therma', nameKo: '텐써마', nameZh: 'Ten-Therma', options: [
        { unit: '600发', priceLow: 297, priceHigh: 297 },
      ] },
      { id: 'inmode-fx-forma', nameKo: '인모드 FX/FORMA', nameZh: 'InMode FX/FORMA', options: [
        { unit: '单部位', priceLow: 37.4, priceHigh: 37.4, note: 'FX 또는 FORMA 중 1종' },
        { unit: '全脸', priceLow: 59.4, priceHigh: 59.4, note: 'FX 또는 FORMA 중 1종' },
      ] },
      { id: 'xref-lifting', nameKo: 'XREF 리프팅', nameZh: 'XREF提升', options: [
        { unit: '600发', priceLow: 330, priceHigh: 330 },
      ] },
    ],
  },
  {
    id: 'skinbooster',
    nameKo: '스킨부스터',
    nameZh: '水光养肤',
    labelZh: '水光 · 养肤',
    procedures: [
      { id: 'rejuran-healer', nameKo: '리쥬란 힐러', nameZh: '丽珠兰 Healer', options: [
        { unit: '1cc', priceLow: 27.5, priceHigh: 27.5 },
        { unit: '2cc', priceLow: 58.3, priceHigh: 110 },
        { unit: '4cc', priceLow: 71.5, priceHigh: 71.5 },
      ] },
      { id: 'rejuran-eye', nameKo: '리쥬란 아이', nameZh: '丽珠兰 Eye', options: [
        { unit: '1cc', priceLow: 29.7, priceHigh: 55 },
      ] },
      { id: 'rejuran-hb', nameKo: '리쥬란 HB', nameZh: '丽珠兰 HB', options: [
        { unit: '1cc', priceLow: 33, priceHigh: 33 },
        { unit: '2cc', priceLow: 66, priceHigh: 66 },
        { unit: '4cc', priceLow: 104.5, priceHigh: 104.5 },
      ] },
      { id: 'juvelook-skin', nameKo: '쥬베룩 스킨', nameZh: '少女针 Juvelook', options: [
        { unit: '1cc', priceLow: 13.8, priceHigh: 13.8 },
      ] },
      { id: 'juvelook-water', nameKo: '쥬베룩 물광', nameZh: '少女针水光', options: [
        { unit: '2.5~3cc', priceLow: 58.3, priceHigh: 99 },
      ] },
      { id: 'exosome', nameKo: '엑소좀', nameZh: '外泌体 Exosome', options: [
        { unit: '5cc', priceLow: 55, priceHigh: 82.5 },
      ] },
      { id: 'hilowave', nameKo: '힐로웨이브', nameZh: 'HiloWave', options: [
        { unit: '2cc', priceLow: 66, priceHigh: 88 },
      ] },
      { id: 'water-injection', nameKo: '물광주사', nameZh: '水光针', options: [
        { unit: '2cc', priceLow: 16.5, priceHigh: 16.5 },
      ] },
      { id: 'prp-water', nameKo: 'PRP 물광', nameZh: 'PRP 水光', options: [
        { unit: '1次', priceLow: 165, priceHigh: 165 },
      ] },
    ],
  },
  {
    id: 'filler-botox',
    nameKo: '필러·보톡스',
    nameZh: '填充除皱',
    labelZh: '填充 · 除皱',
    procedures: [
      { id: 'filler-juvederm', nameKo: '필러 쥬비덤', nameZh: '乔雅登 Juvederm', options: [
        { unit: '1cc', priceLow: 55, priceHigh: 99, note: '부위별 상이' },
      ] },
      { id: 'filler-belotero', nameKo: '필러 벨로테로', nameZh: '保柔缇 Belotero', options: [
        { unit: '1cc', priceLow: 49.5, priceHigh: 88, note: '부위별 상이' },
      ] },
      { id: 'filler-restylane', nameKo: '필러 레스틸렌', nameZh: '瑞蓝 Restylane', options: [
        { unit: '1cc', priceLow: 46.2, priceHigh: 55 },
      ] },
      { id: 'wrinkle-botox-domestic', nameKo: '주름보톡스 (국산)', nameZh: '国产除皱肉毒素', options: [
        { unit: '单部位', priceLow: 5.5, priceHigh: 6.6 },
      ] },
      { id: 'wrinkle-botox-xeomin', nameKo: '주름보톡스 (제오민)', nameZh: 'Xeomin 除皱肉毒素', options: [
        { unit: '单部位', priceLow: 9.9, priceHigh: 27.5 },
      ] },
      { id: 'jaw-botox-domestic', nameKo: '사각턱보톡스 (국산)', nameZh: '国产瘦脸针', options: [
        { unit: '50U', priceLow: 11, priceHigh: 13.2 },
      ] },
      { id: 'jaw-botox-xeomin', nameKo: '사각턱보톡스 (제오민)', nameZh: 'Xeomin 瘦脸针', options: [
        { unit: '50U', priceLow: 22, priceHigh: 44 },
      ] },
      { id: 'skin-botox-domestic', nameKo: '스킨보톡스 (국산)', nameZh: '国产水光肉毒素', options: [
        { unit: '全脸', priceLow: 27.5, priceHigh: 66 },
      ] },
    ],
  },
  {
    id: 'whitening',
    nameKo: '색소·미백',
    nameZh: '祛斑美白',
    labelZh: '祛斑 · 美白',
    procedures: [
      { id: 'laser-toning', nameKo: '레이저 토닝', nameZh: '激光祛斑 Toning', options: [
        { unit: '1次', priceLow: 11, priceHigh: 11 },
      ] },
      { id: 'pico-light', nameKo: '피코 라이트', nameZh: '皮秒激光 Pico', options: [
        { unit: '全脸', priceLow: 82.5, priceHigh: 82.5 },
      ] },
      { id: 'vbeam', nameKo: '브이빔 (홍조·혈관)', nameZh: 'V-Beam 红血丝', options: [
        { unit: '全脸', priceLow: 82.5, priceHigh: 82.5 },
      ] },
      { id: 'white-injection', nameKo: '백옥주사', nameZh: '美白针', options: [
        { unit: '1次', priceLow: 11, priceHigh: 11 },
      ] },
      { id: 'mole-removal-co2', nameKo: '점 제거 (CO2)', nameZh: '点痣 CO2', options: [
        { unit: '1颗', priceLow: 2.2, priceHigh: 5 },
      ] },
    ],
  },
  {
    id: 'acne-pore',
    nameKo: '여드름·모공',
    nameZh: '祛痘毛孔',
    labelZh: '祛痘 · 毛孔',
    procedures: [
      { id: 'potenza', nameKo: '포텐자', nameZh: '黄金微针 Potenza', options: [
        { unit: '全脸', priceLow: 38.5, priceHigh: 38.5, note: '팁 비용 별도인 병원 있음' },
      ] },
      { id: 'sylfirm-x', nameKo: '실펌 X', nameZh: 'Sylfirm X', options: [
        { unit: '1次', priceLow: 77, priceHigh: 77 },
      ] },
      { id: 'aquapeel', nameKo: '아쿠아필', nameZh: '小气泡 AquaPeel', options: [
        { unit: '1次', priceLow: 33, priceHigh: 33 },
      ] },
      { id: 'lhala-peel', nameKo: '라라필', nameZh: 'LHALA 换肤', options: [
        { unit: '1次', priceLow: 27.5, priceHigh: 27.5 },
      ] },
      { id: 'acne-care', nameKo: '여드름 관리', nameZh: '祛痘管理', options: [
        { unit: '1次', priceLow: 27.5, priceHigh: 27.5 },
      ] },
      { id: 'ldm-lifting', nameKo: 'LDM 물방울리프팅', nameZh: 'LDM 水滴提升', options: [
        { unit: '1次', priceLow: 16.5, priceHigh: 16.5 },
      ] },
    ],
  },
]

export const QUOTE_MAX_SELECTION = 5
