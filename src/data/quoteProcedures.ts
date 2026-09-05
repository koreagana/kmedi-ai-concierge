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
  /** 'B' = 단일 병원 출처. 개별 금액은 화면에 숨기고 합산 총액에만 반영 */
  grade?: 'A' | 'B'
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
        { unit: '100发', priceLow: 46.0, priceHigh: 91.3, grade: 'A' },
        { unit: '300发', priceLow: 125.0, priceHigh: 184.8, grade: 'A' },
        { unit: '400发', priceLow: 160.0, priceHigh: 176.0, grade: 'B' },
        { unit: '600发', priceLow: 240.0, priceHigh: 342.1, grade: 'A' },
      ] },
      { id: 'eye-ulthera', nameKo: '아이 울쎄라', nameZh: '眼部超声刀', options: [
        { unit: '200发', priceLow: 99.0, priceHigh: 152.9, grade: 'A' },
      ] },
      { id: 'thermage-flx', nameKo: '써마지 FLX', nameZh: '热玛吉FLX', options: [
        { unit: '300发', priceLow: 149.0, priceHigh: 213.4, grade: 'A' },
        { unit: '600发', priceLow: 240.0, priceHigh: 356.4, grade: 'A' },
        { unit: '900发', priceLow: 279.0, priceHigh: 499.4, grade: 'A' },
      ] },
      { id: 'eye-thermage-flx', nameKo: '아이써마지 FLX', nameZh: '眼部热玛吉FLX', options: [
        { unit: '225发', priceLow: 119.0, priceHigh: 170.5, grade: 'A' },
        { unit: '450发', priceLow: 179.0, priceHigh: 270.6, grade: 'A' },
      ] },
      { id: 'shurink-universe', nameKo: '슈링크 유니버스', nameZh: 'Shurink 聚焦超声', options: [
        { unit: '100发', priceLow: 6.6, priceHigh: 6.6, grade: 'B' },
        { unit: '300发', priceLow: 19.8, priceHigh: 19.8 },
        { unit: '600发', priceLow: 38.5, priceHigh: 38.5 },
      ] },
      { id: 'volnewmer', nameKo: '볼뉴머', nameZh: 'Volnewmer 微波紧致', options: [
        { unit: '100发', priceLow: 30.8, priceHigh: 30.8, grade: 'B' },
      ] },
      { id: 'titanium-toning', nameKo: '티타늄 토닝', nameZh: '钛提升 Titanium', options: [
        { unit: '40kJ', priceLow: 69.0, priceHigh: 75.9, grade: 'A' },
        { unit: '80kJ', priceLow: 89.0, priceHigh: 130.9, grade: 'A' },
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
        { unit: '全脸', priceLow: 15.4, priceHigh: 15.4, note: '仅InMode FX', grade: 'B' },
        { unit: '全脸', priceLow: 28.6, priceHigh: 28.6, note: 'InMode FX + FORMA', grade: 'B' },
      ] },
      { id: 'sofwave', nameKo: '소프웨이브', nameZh: 'Sofwave', options: [
        { unit: '10发', priceLow: 23.1, priceHigh: 23.1, grade: 'B' },
      ] },
      { id: 'onda', nameKo: '온다', nameZh: 'ONDA 溶脂提拉', options: [
        { unit: '面部10kJ', priceLow: 22, priceHigh: 22 },
        { unit: '面部80kJ', priceLow: 139.7, priceHigh: 139.7, note: '含面膜2种' },
        { unit: '身体40kJ', priceLow: 63.8, priceHigh: 63.8, note: '含1英寸注射40cc' },
        { unit: '身体100kJ', priceLow: 174.9, priceHigh: 174.9, note: '含身体塑形术后处理' },
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
        { unit: '2cc', priceLow: 29.0, priceHigh: 46.2, grade: 'A' },
        { unit: '4cc', priceLow: 71.5, priceHigh: 71.5 },
      ] },
      { id: 'rejuran-eye', nameKo: '리쥬란 아이', nameZh: '丽珠兰 Eye', options: [
        { unit: '1cc', priceLow: 19.0, priceHigh: 30.8, grade: 'A' },
      ] },
      { id: 'rejuran-hb', nameKo: '리쥬란 HB', nameZh: '丽珠兰 HB', options: [
        { unit: '1cc', priceLow: 20.9, priceHigh: 30.8, grade: 'A' },
        { unit: '2cc', priceLow: 66, priceHigh: 66 },
        { unit: '4cc', priceLow: 104.5, priceHigh: 104.5 },
      ] },
      { id: 'juvelook-skin', nameKo: '쥬베룩 스킨', nameZh: '少女针 Juvelook', options: [
        { unit: '1cc', priceLow: 10.0, priceHigh: 18.7, grade: 'A' },
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
        { unit: '2cc', priceLow: 11.0, priceHigh: 11.0, grade: 'B' },
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
        { unit: '1cc', priceLow: 42.9, priceHigh: 69.3, note: '美国品牌，质地紧实，适合塑形（下巴、鼻部等）', grade: 'A' },
      ] },
      { id: 'filler-belotero', nameKo: '필러 벨로테로', nameZh: '保柔缇 Belotero', options: [
        { unit: '1cc', priceLow: 42.9, priceHigh: 61.6, note: '德国品牌，质地柔软，适合薄皮肤部位（眼下、唇纹等）', grade: 'A' },
      ] },
      { id: 'filler-restylane', nameKo: '필러 레스틸렌', nameZh: '瑞蓝 Restylane', options: [
        { unit: '1cc', priceLow: 46.2, priceHigh: 55, note: '瑞典品牌，弹性适中，应用范围广泛' },
      ] },
      { id: 'wrinkle-botox-domestic', nameKo: '주름보톡스 (국산)', nameZh: '韩版除皱肉毒素', options: [
        { unit: '单部位', priceLow: 3.5, priceHigh: 4.4, grade: 'A' },
      ] },
      { id: 'wrinkle-botox-xeomin', nameKo: '주름보톡스 (제오민)', nameZh: 'Xeomin 除皱肉毒素', options: [
        { unit: '单部位', priceLow: 7.0, priceHigh: 13.2, grade: 'A' },
      ] },
      { id: 'jaw-botox-domestic', nameKo: '사각턱보톡스 (국산)', nameZh: '韩版瘦脸针', options: [
        { unit: '50U', priceLow: 5.5, priceHigh: 6.1, grade: 'A' },
      ] },
      { id: 'jaw-botox-xeomin', nameKo: '사각턱보톡스 (제오민)', nameZh: 'Xeomin 瘦脸针', options: [
        { unit: '50U', priceLow: 12.9, priceHigh: 30.8, grade: 'A' },
      ] },
      { id: 'skin-botox-domestic', nameKo: '스킨보톡스 (국산)', nameZh: '韩版水光肉毒素', options: [
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
        { unit: '1次', priceLow: 9.2, priceHigh: 10.1, grade: 'B' },
      ] },
      { id: 'mole-removal-co2', nameKo: '점 제거 (CO2)', nameZh: '点痣 CO2', options: [
        { unit: '2mm以下', priceLow: 2.0, priceHigh: 3.3, grade: 'A' },
        { unit: '2~5mm', priceLow: 3.0, priceHigh: 5.5, grade: 'A' },
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
        { unit: '全脸', priceLow: 30.8, priceHigh: 37.4, note: '팁 비용 별도인 병원 있음', grade: 'A' },
      ] },
      { id: 'sylfirm-x', nameKo: '실펌 X', nameZh: 'Sylfirm X', options: [
        { unit: '1次', priceLow: 77, priceHigh: 77 },
      ] },
      { id: 'aquapeel', nameKo: '아쿠아필', nameZh: '小气泡 AquaPeel', options: [
        { unit: '1次', priceLow: 6.0, priceHigh: 6.6, grade: 'B' },
      ] },
      { id: 'lhala-peel', nameKo: '라라필', nameZh: 'LHALA 换肤', options: [
        { unit: '1次', priceLow: 27.5, priceHigh: 27.5 },
      ] },
      { id: 'acne-care', nameKo: '여드름 관리', nameZh: '祛痘管理', options: [
        { unit: '1次', priceLow: 27.5, priceHigh: 27.5 },
      ] },
      { id: 'ldm-lifting', nameKo: 'LDM 물방울리프팅', nameZh: 'LDM 水滴提升', options: [
        { unit: '12分钟', priceLow: 9.9, priceHigh: 10.9, grade: 'B' },
      ] },
    ],
  },
]

export const QUOTE_MAX_SELECTION = 5
