/* ══════════════════════════════════════════════════════════════════
   견적 시술 마스터 데이터 — 5개 병원 수가 비교 기준 (2026-09 개편)
   단위: 원(KRW) · 전체 VAT 별도 기준
   经济型 = 리베리 강남점 · 标准型 = 원셀의원 · 高端型 = 리앤장·셀온
   근거 문서: public/docs/pricing.html (구 한강애봄_수가비교표.html) / pricing_tiers.json

   [2026-09-11 보완] 5개 병원 비교표에 대응 단위가 없던 항목을 협력병원 원본
   수가표에서 보완. 3단 구분이 불가한 값은 uniform: true 로 표시해 세 칸에
   동일 노출하고, 화면에는 "档位未区分" 안내가 붙는다.
     · 도자기피부과 2026.07 — 리쥬란 힐러 4cc 65만 / HB 4cc 95만 / 엑소좀 5cc 50만
     · 온테나의원 2606 정가 — 엑소좀 5cc 45만 / 쥬베룩2cc+물광1cc 53.8만
       (온테나는 이벤트가·정가 2단 표기 → 운영규칙대로 정가만 채택)
   출처를 찾지 못한 단위(리쥬란 힐러 1cc·HB 2cc, ONDA 면부10kJ·신체40kJ)는
   빈칸 노출 대신 옵션 자체를 제거함. 값을 임의로 추정하지 않는다.
   ══════════════════════════════════════════════════════════════════ */

export interface TierRange { low: number; high: number }

export interface QuoteOption {
  unit: string
  unitEn: string
  note?: string
  noteEn?: string
  /** 经济型 — 리베리 강남점 */
  economy: TierRange | null
  /** 标准型 — 원셀의원 */
  standard: TierRange | null
  /** 高端型 — 리앤장·셀온 중 최저~최고 (한 곳만 있으면 단일값) */
  premium: TierRange | null
  /** 5개 병원 수가표에서 이 사양과 정확히 대응하는 값을 찾지 못해, 기존에 쓰던 단일가를 세 칸에 동일하게 표시하는 항목 */
  uniform?: boolean
}

export interface QuoteProcedure {
  id: string
  nameKo: string
  nameZh: string
  nameEn: string
  options: QuoteOption[]
}

export interface QuoteCategory {
  id: string
  nameKo: string
  nameZh: string
  nameEn: string
  labelZh: string
  labelEn: string
  procedures: QuoteProcedure[]
}

export const QUOTE_CATEGORIES: QuoteCategory[] = [
  {
    id: 'lifting',
    nameKo: '리프팅',
    nameZh: '提拉紧致',
    nameEn: 'Lifting & Tightening',
    labelZh: '提拉紧致 · 抗衰',
    labelEn: 'Lifting · Anti-Aging',
    procedures: [
      { id: 'ulthera-prime', nameKo: '울쎄라피 프라임', nameZh: '超声刀 Ulthera', nameEn: 'Ultherapy PRIME', options: [
        { unit: '100发', unitEn: '100 shots', economy: { low: 430000, high: 430000 }, standard: { low: 460000, high: 460000 }, premium: { low: 600000, high: 755000 } },
        { unit: '300发', unitEn: '300 shots', economy: null, standard: { low: 1250000, high: 1250000 }, premium: { low: 1500000, high: 1527000 } },
        { unit: '400发', unitEn: '400 shots', economy: null, standard: { low: 1600000, high: 1600000 }, premium: null },
        { unit: '600发', unitEn: '600 shots', economy: null, standard: { low: 2400000, high: 2400000 }, premium: { low: 2700000, high: 2827000 } },
      ] },
      { id: 'eye-ulthera', nameKo: '아이 울쎄라', nameZh: '眼部超声刀', nameEn: 'Ultherapy (Eye Area)', options: [
        { unit: '200发', unitEn: '200 shots', economy: null, standard: { low: 990000, high: 990000 }, premium: { low: 1527000, high: 1527000 } },
      ] },
      { id: 'thermage-flx', nameKo: '써마지 FLX', nameZh: '热玛吉FLX', nameEn: 'Thermage FLX', options: [
        { unit: '300发', unitEn: '300 shots', economy: null, standard: { low: 1490000, high: 1490000 }, premium: { low: 1500000, high: 1764000 } },
        { unit: '600发', unitEn: '600 shots', economy: { low: 1990000, high: 1990000 }, standard: { low: 2400000, high: 2400000 }, premium: { low: 2700000, high: 2945000 } },
        { unit: '900发', unitEn: '900 shots', economy: null, standard: { low: 2790000, high: 2790000 }, premium: { low: 3900000, high: 4127000 } },
      ] },
      { id: 'eye-thermage-flx', nameKo: '아이써마지 FLX', nameZh: '眼部热玛吉FLX', nameEn: 'Thermage FLX (Eye Area)', options: [
        { unit: '225发', unitEn: '225 shots', economy: null, standard: { low: 1190000, high: 1190000 }, premium: { low: 1409000, high: 1409000 } },
        { unit: '450发', unitEn: '450 shots', economy: null, standard: { low: 1790000, high: 1790000 }, premium: { low: 2000000, high: 2236000 } },
      ] },
      { id: 'shurink-universe', nameKo: '슈링크 유니버스', nameZh: 'Shurink 聚焦超声', nameEn: 'Shurink Universe', options: [
        { unit: '100发', unitEn: '100 shots', economy: null, standard: null, premium: { low: 55000, high: 55000 } },
        { unit: '300发', unitEn: '300 shots', economy: { low: 150000, high: 150000 }, standard: null, premium: { low: 400000, high: 400000 } },
        { unit: '600发', unitEn: '600 shots', economy: null, standard: null, premium: { low: 600000, high: 600000 } },
      ] },
      { id: 'volnewmer', nameKo: '볼뉴머', nameZh: 'Volnewmer 微波紧致', nameEn: 'Volnewmer', options: [
        { unit: '100发', unitEn: '100 shots', economy: null, standard: null, premium: { low: 255000, high: 255000 } },
      ] },
      { id: 'titanium-toning', nameKo: '티타늄 토닝', nameZh: '钛提升 Titanium', nameEn: 'Titanium Toning', options: [
        { unit: '40kJ', unitEn: '40kJ', economy: { low: 390000, high: 390000 }, standard: { low: 690000, high: 690000 }, premium: { low: 573000, high: 573000 } },
        { unit: '80kJ', unitEn: '80kJ', economy: null, standard: { low: 890000, high: 890000 }, premium: { low: 1082000, high: 1082000 } },
      ] },
      { id: 'pair-titanium-dual', nameKo: '페어티타늄(듀얼)', nameZh: '双钛提升 Dual', nameEn: 'Pair Titanium (Dual)', options: [
        { unit: '80KJ', unitEn: '80kJ', economy: { low: 2970000, high: 2970000 }, standard: { low: 2970000, high: 2970000 }, premium: { low: 2970000, high: 2970000 }, uniform: true },
      ] },
      { id: 'titanium-lifting', nameKo: '티타늄 리프팅', nameZh: '钛提升', nameEn: 'Titanium Lifting', options: [
        { unit: '25分钟', unitEn: '25 min', economy: { low: 1320000, high: 1320000 }, standard: { low: 1320000, high: 1320000 }, premium: { low: 1320000, high: 1320000 }, uniform: true },
      ] },
      { id: 'ten-therma', nameKo: '텐써마', nameZh: 'Ten-Therma', nameEn: 'Ten-Therma', options: [
        { unit: '600发', unitEn: '600 shots', economy: { low: 2970000, high: 2970000 }, standard: { low: 2970000, high: 2970000 }, premium: { low: 2970000, high: 2970000 }, uniform: true },
      ] },
      { id: 'inmode-fx-forma', nameKo: '인모드 FX/FORMA', nameZh: 'InMode FX/FORMA', nameEn: 'InMode FX / FORMA', options: [
        { unit: '全脸', unitEn: 'Full face', note: '仅InMode FX', noteEn: 'InMode FX only', economy: null, standard: null, premium: { low: 127000, high: 127000 } },
        { unit: '全脸', unitEn: 'Full face', note: 'InMode FX + FORMA', noteEn: 'InMode FX + FORMA', economy: { low: 190000, high: 190000 }, standard: null, premium: { low: 236000, high: 236000 } },
      ] },
      { id: 'sofwave', nameKo: '소프웨이브', nameZh: 'Sofwave', nameEn: 'Sofwave', options: [
        { unit: '10发', unitEn: '10 shots', economy: null, standard: null, premium: { low: 191000, high: 191000 } },
      ] },
      { id: 'onda', nameKo: '온다', nameZh: 'ONDA 溶脂提拉', nameEn: 'ONDA', options: [
        { unit: '面部80kJ', unitEn: 'Face 80kJ', note: '含面膜2种', noteEn: 'Includes two mask treatments', economy: null, standard: { low: 790000, high: 790000 }, premium: null },
        { unit: '身体100kJ', unitEn: 'Body 100kJ', note: '含身体塑形术后处理', noteEn: 'Includes post-treatment body contouring care', economy: null, standard: { low: 950000, high: 950000 }, premium: null },
      ] },
      { id: 'xerf', nameKo: '세르프', nameZh: 'XERF 泽弗', nameEn: 'XERF', options: [
        { unit: '600发', unitEn: '600 shots', economy: { low: 1590000, high: 1590000 }, standard: null, premium: null },
        { unit: '组合套餐', unitEn: 'Combo package', note: '含300发＋ONDA或钛提升80kJ＋下颌线肉毒素4cc，不可单独购买', noteEn: 'Includes 300 shots + ONDA or Titanium 80kJ + jawline botox 4cc — not sold as XERF alone', economy: { low: 1690000, high: 1690000 }, standard: { low: 1690000, high: 1690000 }, premium: { low: 1690000, high: 1690000 }, uniform: true },
      ] },
    ],
  },
  {
    id: 'skinbooster',
    nameKo: '스킨부스터',
    nameZh: '水光养肤',
    nameEn: 'Skin Boosters',
    labelZh: '水光 · 养肤',
    labelEn: 'Skin Boosters · Glow',
    procedures: [
      { id: 'rejuran-healer', nameKo: '리쥬란 힐러', nameZh: '丽珠兰 Healer', nameEn: 'Rejuran Healer', options: [
        { unit: '2cc', unitEn: '2cc', economy: { low: 240000, high: 240000 }, standard: { low: 290000, high: 290000 }, premium: { low: 382000, high: 382000 } },
        { unit: '4cc', unitEn: '4cc', economy: { low: 650000, high: 650000 }, standard: { low: 650000, high: 650000 }, premium: { low: 650000, high: 650000 }, uniform: true },
      ] },
      { id: 'rejuran-eye', nameKo: '리쥬란 아이', nameZh: '丽珠兰 Eye', nameEn: 'Rejuran Eye', options: [
        { unit: '1cc', unitEn: '1cc', economy: { low: 200000, high: 200000 }, standard: { low: 190000, high: 190000 }, premium: { low: 255000, high: 255000 } },
      ] },
      { id: 'rejuran-hb', nameKo: '리쥬란 HB', nameZh: '丽珠兰 HB', nameEn: 'Rejuran HB', options: [
        { unit: '1cc', unitEn: '1cc', economy: { low: 230000, high: 230000 }, standard: { low: 209000, high: 209000 }, premium: { low: 255000, high: 255000 } },
        { unit: '4cc', unitEn: '4cc', economy: { low: 950000, high: 950000 }, standard: { low: 950000, high: 950000 }, premium: { low: 950000, high: 950000 }, uniform: true },
      ] },
      { id: 'juvelook-skin', nameKo: '쥬베룩 스킨', nameZh: '少女针 Juvelook', nameEn: 'Juvelook Skin', options: [
        { unit: '1cc', unitEn: '1cc', economy: null, standard: { low: 100000, high: 100000 }, premium: { low: 155000, high: 155000 } },
      ] },
      { id: 'juvelook-water', nameKo: '쥬베룩 물광', nameZh: '少女针水光', nameEn: 'Juvelook Water Glow', options: [
        { unit: '3cc', unitEn: '3cc', note: '少女针2cc＋水光针1cc 组合', noteEn: 'Juvelook 2cc + water glow 1cc, combined', economy: { low: 538000, high: 538000 }, standard: { low: 538000, high: 538000 }, premium: { low: 538000, high: 538000 }, uniform: true },
      ] },
      { id: 'exosome', nameKo: '엑소좀', nameZh: '外泌体 Exosome', nameEn: 'Exosome Therapy', options: [
        { unit: '5cc', unitEn: '5cc', economy: { low: 450000, high: 500000 }, standard: { low: 450000, high: 500000 }, premium: { low: 450000, high: 500000 }, uniform: true },
      ] },
      { id: 'hilowave', nameKo: '힐로웨이브', nameZh: 'HiloWave', nameEn: 'HiloWave', options: [
        { unit: '2cc', unitEn: '2cc', economy: null, standard: { low: 149000, high: 149000 }, premium: null },
      ] },
      { id: 'water-injection', nameKo: '물광주사', nameZh: '水光针', nameEn: 'Water Glow Injection', options: [
        { unit: '2cc', unitEn: '2cc', economy: null, standard: null, premium: { low: 91000, high: 91000 } },
      ] },
    ],
  },
  {
    id: 'filler-botox',
    nameKo: '필러·보톡스',
    nameZh: '填充除皱',
    nameEn: 'Fillers & Botox',
    labelZh: '填充 · 除皱',
    labelEn: 'Filler · Botox',
    procedures: [
      { id: 'vline-combo', nameKo: '브이라인 콤보 (사각턱보톡스+윤곽주사+지방분해)', nameZh: 'V脸针 · 轮廓针 · 溶脂针 的组合施术', nameEn: 'V-Line Combo (Jawline Botox + Contouring & Fat-Dissolving Injections)', options: [
        { unit: '全套', unitEn: 'Full set', economy: { low: 280000, high: 350000 }, standard: { low: 280000, high: 350000 }, premium: { low: 280000, high: 350000 }, uniform: true },
      ] },
      { id: 'filler-juvederm', nameKo: '필러 쥬비덤', nameZh: '乔雅登 Juvederm', nameEn: 'Juvederm Filler', options: [
        { unit: '1cc', unitEn: '1cc', note: '美国品牌，质地紧实，适合塑形（下巴、鼻部等）', noteEn: 'US brand · firm texture, holds shape well for the chin and nose', economy: { low: 450000, high: 450000 }, standard: { low: 429000, high: 429000 }, premium: { low: 573000, high: 800000 } },
      ] },
      { id: 'filler-belotero', nameKo: '필러 벨로테로', nameZh: '保柔缇 Belotero', nameEn: 'Belotero Filler', options: [
        { unit: '1cc', unitEn: '1cc', note: '德国品牌，质地柔软，适合薄皮肤部位（眼下、唇纹等）', noteEn: 'German brand · soft texture, suited to delicate areas such as under the eyes and lip lines', economy: { low: 350000, high: 350000 }, standard: { low: 429000, high: 429000 }, premium: { low: 509000, high: 509000 } },
      ] },
      { id: 'filler-restylane', nameKo: '필러 레스틸렌', nameZh: '瑞蓝 Restylane', nameEn: 'Restylane Filler', options: [
        { unit: '1cc', unitEn: '1cc', note: '瑞典品牌，弹性适中，应用范围广泛', noteEn: 'Swedish brand · balanced elasticity, works across a wide range of areas', economy: { low: 400000, high: 400000 }, standard: { low: 429000, high: 429000 }, premium: { low: 618000, high: 800000 } },
      ] },
      { id: 'wrinkle-botox-domestic', nameKo: '주름보톡스 (국산)', nameZh: '韩版除皱肉毒素', nameEn: 'Wrinkle Botox (Korean brand)', options: [
        { unit: '单部位', unitEn: 'Per area', economy: { low: 19000, high: 19000 }, standard: { low: 35000, high: 35000 }, premium: { low: 36000, high: 100000 } },
      ] },
      { id: 'wrinkle-botox-xeomin', nameKo: '주름보톡스 (제오민)', nameZh: 'Xeomin 除皱肉毒素', nameEn: 'Wrinkle Botox (Xeomin)', options: [
        { unit: '单部位', unitEn: 'Per area', economy: { low: 79000, high: 79000 }, standard: { low: 70000, high: 70000 }, premium: { low: 109000, high: 150000 } },
      ] },
      { id: 'jaw-botox-domestic', nameKo: '사각턱보톡스 (국산)', nameZh: '韩版瘦脸针', nameEn: 'Jawline Slimming Botox (Korean brand)', options: [
        { unit: '50U', unitEn: '50 units', economy: { low: 29000, high: 29000 }, standard: { low: 55000, high: 55000 }, premium: { low: 45000, high: 200000 } },
      ] },
      { id: 'jaw-botox-xeomin', nameKo: '사각턱보톡스 (제오민)', nameZh: 'Xeomin 瘦脸针', nameEn: 'Jawline Slimming Botox (Xeomin)', options: [
        { unit: '50U', unitEn: '50 units', economy: { low: 150000, high: 150000 }, standard: { low: 129000, high: 129000 }, premium: { low: 255000, high: 300000 } },
      ] },
      { id: 'skin-botox-domestic', nameKo: '스킨보톡스 (국산)', nameZh: '韩版水光肉毒素', nameEn: 'Skin Botox (Korean brand)', options: [
        { unit: '全脸', unitEn: 'Full face', economy: { low: 90000, high: 90000 }, standard: { low: 150000, high: 150000 }, premium: { low: 127000, high: 500000 } },
      ] },
    ],
  },
  {
    id: 'whitening',
    nameKo: '색소·미백',
    nameZh: '祛斑美白',
    nameEn: 'Pigmentation & Brightening',
    labelZh: '祛斑 · 美白',
    labelEn: 'Pigment · Brightening',
    procedures: [
      { id: 'laser-toning', nameKo: '레이저 토닝', nameZh: '激光祛斑 Toning', nameEn: 'Laser Toning', options: [
        { unit: '1次', unitEn: '1 session', economy: { low: 100000, high: 100000 }, standard: { low: 200000, high: 200000 }, premium: { low: 155000, high: 250000 } },
      ] },
      { id: 'pico-light', nameKo: '피코 라이트', nameZh: '皮秒激光 Pico', nameEn: 'Pico Laser (Light)', options: [
        { unit: '全脸', unitEn: 'Full face', economy: null, standard: null, premium: { low: 382000, high: 382000 } },
      ] },
      { id: 'vbeam', nameKo: '브이빔 (홍조·혈관)', nameZh: 'V-Beam 红血丝', nameEn: 'V-Beam (Redness & Vessels)', options: [
        { unit: '全脸', unitEn: 'Full face', economy: { low: 300000, high: 300000 }, standard: { low: 200000, high: 200000 }, premium: null },
      ] },
      { id: 'white-injection', nameKo: '백옥주사', nameZh: '美白针', nameEn: 'Glutathione Brightening Injection', options: [
        { unit: '1次', unitEn: '1 session', economy: { low: 70000, high: 70000 }, standard: { low: 92000, high: 92000 }, premium: { low: 82000, high: 82000 } },
      ] },
      { id: 'mole-removal-co2', nameKo: '점 제거 (CO2)', nameZh: '点痣 CO2', nameEn: 'Mole Removal (CO2 Laser)', options: [
        { unit: '2mm以下', unitEn: 'Under 2mm', economy: { low: 10000, high: 10000 }, standard: { low: 20000, high: 20000 }, premium: { low: 27000, high: 27000 } },
        { unit: '2~5mm', unitEn: '2–5mm', economy: { low: 30000, high: 30000 }, standard: { low: 30000, high: 30000 }, premium: { low: 45000, high: 45000 } },
      ] },
    ],
  },
  {
    id: 'acne-pore',
    nameKo: '여드름·모공',
    nameZh: '祛痘毛孔',
    nameEn: 'Acne & Pores',
    labelZh: '祛痘 · 毛孔',
    labelEn: 'Acne · Pores',
    procedures: [
      { id: 'potenza', nameKo: '포텐자', nameZh: '黄金微针 Potenza', nameEn: 'Potenza', options: [
        { unit: '全脸', unitEn: 'Full face', note: '含针头费用', noteEn: 'Tip included', economy: { low: 300000, high: 300000 }, standard: { low: 340000, high: 340000 }, premium: { low: 255000, high: 255000 } },
      ] },
      { id: 'sylfirm-x', nameKo: '실펌 X', nameZh: 'Sylfirm X', nameEn: 'Sylfirm X', options: [
        { unit: '1次', unitEn: '1 session', economy: null, standard: null, premium: { low: 500000, high: 500000 } },
      ] },
      { id: 'aquapeel', nameKo: '아쿠아필', nameZh: '小气泡 AquaPeel', nameEn: 'Aqua Peel', options: [
        { unit: '1次', unitEn: '1 session', economy: { low: 49000, high: 49000 }, standard: { low: 60000, high: 60000 }, premium: { low: 91000, high: 91000 } },
      ] },
      { id: 'lhala-peel', nameKo: '라라필', nameZh: 'LHALA 换肤', nameEn: 'LaLa Peel', options: [
        { unit: '1次', unitEn: '1 session', note: '经济型为焕肤套餐价（含黑面膜等）', noteEn: 'Value tier is a peel-package rate (black peel and others included)', economy: { low: 99000, high: 99000 }, standard: null, premium: { low: 91000, high: 91000 } },
      ] },
      { id: 'acne-care', nameKo: '여드름 관리', nameZh: '祛痘管理', nameEn: 'Acne Care Program', options: [
        { unit: '1次', unitEn: '1 session', note: '以面部全区挤压护理为准', noteEn: 'Based on full-face extraction care', economy: null, standard: { low: 100000, high: 100000 }, premium: { low: 127000, high: 127000 } },
      ] },
      { id: 'ldm-lifting', nameKo: 'LDM 물방울리프팅', nameZh: 'LDM 水滴提升', nameEn: 'LDM Water Drop Lifting', options: [
        { unit: '12分钟', unitEn: '12 min', economy: { low: 80000, high: 80000 }, standard: { low: 99000, high: 99000 }, premium: { low: 91000, high: 200000 } },
      ] },
    ],
  },
]

export const QUOTE_MAX_SELECTION = 5
