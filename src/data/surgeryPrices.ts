/* ══════════════════════════════════════════════════════════════════
   성형수술 수가 — 원셀성형외과(양동준 원장) 해외 환자가
   원본: 수가표_원셀성형외과_해외_260511.xlsx (커밋 금지, 수가표/ 폴더)

   ※ 인기시술 견적(quoteProcedures.ts)과 기준이 다르다
      · 단위: 만원  (인기시술은 원)
      · VAT : 포함  (인기시술은 별도)
      · 병원: 원셀 단독 (인기시술은 3곳 비교)
      그래서 합산·비교를 섞지 않고 별도 페이지로 둔다.

   가격 표기 규칙 — 사용자 방침
      · 비교 대상이 없으므로 단일가 그대로 적는다
      · 난이도·부위에 따라 달라지는 항목은 범위([low, high])로 두고,
        조건은 note 로 따로 적는다. 임의로 하나를 고르지 않는다.
   ══════════════════════════════════════════════════════════════════ */

export interface SurgeryItem {
  ko: string
  zh: string
  /** 만원 단위 · VAT 포함. 범위면 [최저, 최고] */
  krw: number | [number, number]
  /** 「~부터」처럼 상한이 없는 경우 */
  from?: boolean
  /** 추가 옵션 금액(만원) — 기본가에 얹는 항목 */
  addOn?: number
  /** 조건 설명 (난이도·부위·구성 등) */
  noteKo?: string
  noteZh?: string
  /** 회복기간 */
  recoveryKo?: string
  recoveryZh?: string
}

export interface SurgeryGroup {
  id: string
  ko: string
  zh: string
  items: SurgeryItem[]
}

export const SURGERY_SOURCE = {
  hospitalKo: '원셀성형외과',
  hospitalZh: '元细胞整形外科',
  basisKo: 'VAT 포함 · 해외 환자 적용가 · 단위 만원',
  basisZh: '含增值税 · 外国患者适用价 · 单位：万韩元',
  asOfKo: '2026년 최신 기준가',
  asOfZh: '2026年最新参考价格',
}

export const SURGERY_GROUPS: SurgeryGroup[] = [
  {
    id: 'eye', ko: '눈', zh: '眼部',
    items: [
      { ko: '매몰법', zh: '埋线双眼皮', krw: 220, recoveryKo: '3일', recoveryZh: '3天' },
      { ko: '절개법', zh: '切开双眼皮', krw: 330, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '눈두덩이 지방 제거', zh: '上眼睑去脂', krw: 110 },
      { ko: '눈매교정 추가', zh: '上睑下垂矫正（追加）', krw: 165, addOn: 165, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '쌍꺼풀 재수술', zh: '双眼皮修复', krw: 330, from: true, noteKo: '난이도에 따라', noteZh: '依难度而定', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '앞트임', zh: '开内眼角', krw: [165, 220], noteKo: '단순 165 · 복잡 220', noteZh: '简单 165 · 复杂 220', recoveryKo: '9일', recoveryZh: '9天' },
      { ko: '뒷트임 · 밑트임', zh: '开外眼角 · 下至', krw: 220, noteKo: '각 220', noteZh: '每项 220', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '앞·뒤트임 재수술', zh: '内外眼角修复', krw: [65, 220], noteKo: '난이도에 따라', noteZh: '依难度而定', recoveryKo: '7~9일', recoveryZh: '7~9天' },
      { ko: '앞·뒤트임 복원술', zh: '内外眼角复原', krw: [250, 440], noteKo: '난이도에 따라', noteZh: '依难度而定' },
      { ko: '상안검', zh: '上眼睑提升', krw: 330, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '하안검', zh: '下眼睑（去眼袋）', krw: 330, noteKo: '눈꼬리 고정 추가 +110', noteZh: '眼尾固定追加 +110', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '하안검 재수술', zh: '下眼睑修复', krw: 440, from: true, noteKo: '난이도에 따라', noteZh: '依难度而定', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '경결막 지방재배치', zh: '内路眼袋脂肪重置', krw: 220, recoveryKo: '3일', recoveryZh: '3天' },
      { ko: '눈 지방이식 (추가시)', zh: '眼部脂肪填充（追加）', krw: 150, addOn: 125, noteKo: '다른 눈 수술과 동시 진행 시 125', noteZh: '与其他眼部手术同时进行时 125' },
      { ko: '눈썹거상 (눈썹 위)', zh: '提眉术（眉上）', krw: 550, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '눈썹거상 (눈썹 아래)', zh: '提眉术（眉下）', krw: 440, noteKo: '지방제거 추가 +100', noteZh: '去脂追加 +100', recoveryKo: '7일', recoveryZh: '7天' },
    ],
  },
  {
    id: 'nose', ko: '코', zh: '鼻部',
    items: [
      { ko: '코 기본 (콧대+코끝)', zh: '硅胶隆鼻（鼻梁+鼻尖）', krw: 480, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '맞춤 보형물', zh: '3D定制假体隆鼻', krw: 660, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '코끝 성형', zh: '鼻尖成形', krw: 440, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '기증 늑연골', zh: '异体肋软骨', krw: 660, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '갈아내기 추가', zh: '磨骨（追加）', krw: 110, addOn: 110, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '절골 추가', zh: '截骨（追加）', krw: 150, addOn: 150, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '매부리 축소술', zh: '鹰钩鼻矫正', krw: 220, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '비중격만곡증 교정', zh: '鼻中隔弯曲矫正', krw: 440, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '콧볼 축소 (비절개)', zh: '鼻翼缩小（非切开）', krw: 150, addOn: 120, noteKo: '다른 코 수술과 동시 진행 시 120', noteZh: '与其他鼻部手术同时进行时 120', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '콧볼 축소 (절개)', zh: '鼻翼缩小（切开）', krw: 330, addOn: 220, noteKo: '다른 코 수술과 동시 진행 시 220', noteZh: '与其他鼻部手术同时进行时 220', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '귀족수술 추가', zh: '贵族手术（追加）', krw: 200, addOn: 125, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '비순각 교정술 (고양이수술)', zh: '猫式手术（鼻唇角矫正）', krw: 200, addOn: 125, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '알로덤 추가', zh: '人工真皮（追加）', krw: 110, addOn: 110 },
      { ko: '코 재수술', zh: '鼻修复', krw: [770, 1100], noteKo: '난이도에 따라 · 재수술 매회당 +110', noteZh: '依难度而定 · 每次修复追加 110', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '기증 늑연골 재수술', zh: '异体肋软骨修复', krw: 990, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '보형물 · 이물질 제거', zh: '取假体 · 取异物', krw: [165, 220], noteKo: '보형물 165 · 이물질 220', noteZh: '假体 165 · 异物 220' },
      { ko: '전신마취 추가', zh: '全身麻醉（追加）', krw: 110, addOn: 110 },
    ],
  },
  {
    id: 'breast', ko: '가슴', zh: '胸部',
    items: [
      { ko: '가슴성형 (세빈/멘토/모티바)', zh: '隆胸（赛宾/曼陀/魔滴）', krw: [990, 1980], noteKo: '보형물 종류·칩 유무에 따라 990 / 1,100 / 1,320 / 1,980', noteZh: '依假体种类与芯片有无：990 / 1,100 / 1,320 / 1,980', recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '코젤백 내시경', zh: '水凝胶假体（内窥镜）', krw: 1100, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '가슴 재수술', zh: '胸部修复', krw: 1320, from: true, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '가슴 축소', zh: '胸部缩小', krw: 1145, from: true, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '지방이식 가슴', zh: '自体脂肪隆胸', krw: 1145, from: true, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '필러 가슴 (다나애)', zh: '玻尿酸隆胸', krw: 1320, from: true, recoveryKo: '3일', recoveryZh: '3天' },
      { ko: '보형물 + 지방이식', zh: '假体＋自体脂肪', krw: 550, addOn: 550, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '함몰유두 (양쪽)', zh: '乳头凹陷矫正（双侧）', krw: [132, 198], recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '유두 축소 (양쪽)', zh: '乳头缩小（双侧）', krw: [198, 265], recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '부유방 제거 추가', zh: '副乳切除（追加）', krw: 110, addOn: 110, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '가슴 리프팅 (실)', zh: '胸部埋线提升', krw: 550 },
      { ko: '보형물 제거 (본원 수술자)', zh: '取假体（本院手术者）', krw: 440 },
      { ko: '보형물 제거 (타원 수술자)', zh: '取假体（他院手术者）', krw: 660 },
      { ko: '가슴 이물질 제거', zh: '胸部取异物', krw: [450, 800] },
    ],
  },
  {
    id: 'lipo', ko: '지방흡입 · 지방이식', zh: '吸脂 · 脂肪填充',
    items: [
      { ko: '팔 지방흡입', zh: '手臂吸脂', krw: 260, noteKo: '브라라인 추가 +200', noteZh: '内衣线追加 +200', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '복부 지방흡입', zh: '腹部吸脂', krw: 300, noteKo: '옆구리 +200 · 뒷구리 +200', noteZh: '侧腰 +200 · 后腰 +200', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '허벅지 지방흡입', zh: '大腿吸脂', krw: 600, noteKo: '안쪽·바깥쪽·앞면 각 200', noteZh: '内侧·外侧·前侧 各 200', recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '엉덩이 지방흡입', zh: '臀部吸脂', krw: 390, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '이중턱 · 볼 · 턱라인', zh: '双下巴 · 脸颊 · 下颌线吸脂', krw: 160, noteKo: '각 160 · 턱선 브이씰 추가 +175', noteZh: '每部位 160 · 下颌线埋线追加 +175', recoveryKo: '5일', recoveryZh: '5天' },
      { ko: '심부볼 제거', zh: '颊脂垫去除', krw: 200, recoveryKo: '5일', recoveryZh: '5天' },
      { ko: '지방이식 (부위당)', zh: '脂肪填充（每部位）', krw: 200, noteKo: '2차 리터치 포함', noteZh: '含第2次补充' },
      { ko: '얼굴전체 지방이식', zh: '全脸脂肪填充', krw: [265, 330], noteKo: '1차만 265 · 2차 포함 330', noteZh: '仅第1次 265 · 含第2次 330' },
      { ko: '엉덩이 지방이식', zh: '臀部脂肪填充', krw: [800, 1100], noteKo: '1차 800 · 2차 포함 1,100', noteZh: '第1次 800 · 含第2次 1,100' },
      { ko: '줄기세포 지방이식', zh: '干细胞脂肪填充', krw: [880, 1320], noteKo: '2차 포함', noteZh: '含第2次' },
      { ko: '줄기세포 + 지방이식', zh: '干细胞＋脂肪填充', krw: [1040, 1540], noteKo: '리터치 2회 포함', noteZh: '含2次补充' },
      { ko: 'PRP', zh: '自体血清 PRP', krw: 66 },
    ],
  },
  {
    id: 'contour', ko: '안면윤곽 · 보형물', zh: '面部轮廓 · 假体',
    items: [
      { ko: '안면윤곽 (부위별)', zh: '面部轮廓（每部位）', krw: 770 },
      { ko: '윤곽 2종 브이라인', zh: '轮廓2项 V-Line', krw: 1500, noteKo: '앞턱 + 사각턱', noteZh: '下巴 + 下颌角' },
      { ko: '윤곽 3종 (첫수술)', zh: '轮廓3项（首次）', krw: 2200, noteKo: '광대 + 사각턱 + 앞턱', noteZh: '颧骨 + 下颌角 + 下巴' },
      { ko: '양악 + 윤곽 2종', zh: '正颌＋轮廓2项', krw: 2400 },
      { ko: '양악 + 윤곽 3종', zh: '正颌＋轮廓3项', krw: 2600 },
      { ko: '돌출입 (첫수술)', zh: '凸嘴矫正 ASO（首次）', krw: 1500 },
      { ko: '이마 보형물', zh: '额头假体', krw: 450 },
      { ko: '앞광대 보형물', zh: '前颧骨假体', krw: 400 },
      { ko: '앞턱 보형물', zh: '下巴假体', krw: 265, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '맞춤보형물 — 광대 3D', zh: '3D定制假体 — 颧骨', krw: 880 },
      { ko: '맞춤보형물 — 사각턱 3D', zh: '3D定制假体 — 下颌角', krw: 880 },
      { ko: '맞춤보형물 — 턱끝 3D', zh: '3D定制假体 — 下巴', krw: 660 },
      { ko: '맞춤보형물 — 귀족 3D', zh: '3D定制假体 — 贵族', krw: 550 },
      { ko: '인중축소', zh: '人中缩短', krw: 380, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '전신마취 추가', zh: '全身麻醉（追加）', krw: 110, addOn: 110 },
    ],
  },
  {
    id: 'lift', ko: '리프팅 · 거상', zh: '提升 · 拉皮',
    items: [
      { ko: '브이씰 리프팅 (턱선)', zh: 'VXiL埋线提升（下颌线）', krw: 220 },
      { ko: '브이씰 리프팅 (얼굴)', zh: 'VXiL埋线提升（脸颊）', krw: 330 },
      { ko: '브이씰 리프팅 (이마)', zh: 'VXiL埋线提升（额头）', krw: 300 },
      { ko: '브이씰 리프팅 (얼굴+턱선)', zh: 'VXiL埋线提升（脸颊＋下颌线）', krw: 420 },
      { ko: '트리플 메쉬 리프팅 (8줄)', zh: '三重网状埋线提升（8根）', krw: 450 },
      { ko: '미니 페이스 리프팅', zh: '迷你面部拉皮', krw: 660 },
      { ko: 'SMAS 안면 + 목 거상', zh: 'SMAS筋膜拉皮（面部＋颈部）', krw: 1540, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '엔도타인 이마거상', zh: '内窥镜额头提升', krw: 660, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '이마 축소술', zh: '额头缩小', krw: 880, recoveryKo: '14일', recoveryZh: '14天' },
      { ko: '이중턱 근육묶기', zh: '双下巴肌肉固定', krw: 350 },
      { ko: '힙업 실리프팅', zh: '埋线提臀', krw: 550, from: true },
      { ko: '복부절제술', zh: '腹部提拉', krw: 1540, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '울쎄라 1세대 300샷', zh: '第一代超声刀 300发', krw: 165 },
    ],
  },
  {
    id: 'inject', ko: '보톡스 · 필러 · 주사', zh: '肉毒 · 填充 · 注射',
    items: [
      { ko: '보톡스 (국산) — 이마·미간·눈가·눈밑·턱끝·콧잔등', zh: '肉毒（韩版）— 额头·眉间·眼周·眼下·下巴·鼻梁', krw: 11, noteKo: '부위당', noteZh: '每部位' },
      { ko: '사각턱 보톡스 (국산)', zh: '咬肌肉毒（韩版）', krw: 15 },
      { ko: '침샘 보톡스 (국산)', zh: '腮腺肉毒（韩版）', krw: 15 },
      { ko: '리프팅 보톡스', zh: '提升肉毒', krw: 25 },
      { ko: '종아리 보톡스', zh: '小腿肉毒', krw: 35 },
      { ko: '승모근 보톡스', zh: '斜方肌肉毒', krw: 35 },
      { ko: '다한증 보톡스 (손·발·겨드랑이)', zh: '多汗症肉毒（手·脚·腋下）', krw: 30 },
      { ko: '특수부위 보톡스 (국산)', zh: '特殊部位肉毒（韩版）', krw: 15, noteKo: '입꼬리·잇몸·콧볼·자갈턱', noteZh: '嘴角·牙龈·鼻翼·橘皮下巴' },
      { ko: '특수부위 보톡스 (제오민)', zh: '特殊部位肉毒（Xeomin）', krw: 22 },
      { ko: '특수부위 보톡스 (엘러간)', zh: '特殊部位肉毒（Allergan）', krw: 33 },
      { ko: '다한증·침샘 보톡스 (국산)', zh: '多汗症·腮腺肉毒（韩版）', krw: 35 },
      { ko: '다한증·침샘 보톡스 (제오민)', zh: '多汗症·腮腺肉毒（Xeomin）', krw: 45 },
      { ko: '다한증·침샘 보톡스 (엘러간)', zh: '多汗症·腮腺肉毒（Allergan）', krw: 55 },
      { ko: '스킨보톡스 (국산)', zh: '水光肉毒（韩版）', krw: 35 },
      { ko: '스킨보톡스 (제오민)', zh: '水光肉毒（Xeomin）', krw: 45 },
      { ko: '스킨보톡스 (엘러간)', zh: '水光肉毒（Allergan）', krw: 55 },
      { ko: '바디보톡스 (국산) 50u', zh: '身体肉毒（韩版）50u', krw: 33 },
      { ko: '바디보톡스 (제오민) 50u', zh: '身体肉毒（Xeomin）50u', krw: 66 },
      { ko: '바디보톡스 (엘러간) 50u', zh: '身体肉毒（Allergan）50u', krw: 77 },
      { ko: '윤곽주사 (얼굴 부위당)', zh: '溶脂针（面部每部位）', krw: 25, noteKo: '5cc 내외', noteZh: '约5cc' },
      { ko: '윤곽주사 (바디) 1cc', zh: '溶脂针（身体）1cc', krw: 22 },
      { ko: '필러 국산 1cc', zh: '填充剂 韩版 1cc', krw: 22 },
      { ko: '필러 레스틸렌 1cc', zh: '瑞蓝 Restylane 1cc', krw: 55 },
      { ko: '필러 쥬비덤 1cc', zh: '乔雅登 Juvederm 1cc', krw: 66 },
      { ko: '필러 레디어스 1vial', zh: '瑞得喜 Radiesse 1支', krw: 99 },
      { ko: '바디필러 1cc (국산)', zh: '身体填充剂 1cc（韩版）', krw: [13.2, 16.5], noteKo: '50cc 초과 13.2 · 미만 16.5', noteZh: '超过50cc 13.2 · 未满 16.5' },
      { ko: '히알라제', zh: '溶解酶', krw: 22 },
    ],
  },
  {
    id: 'booster', ko: '스킨부스터 · 흉터', zh: '皮肤管理 · 疤痕',
    items: [
      { ko: '리쥬란 힐러 2cc', zh: '丽珠兰 Healer 2cc', krw: 55 },
      { ko: '리쥬란 아이 1cc', zh: '丽珠兰 Eye 1cc', krw: 55 },
      { ko: '리쥬란 HB 1cc', zh: '丽珠兰 HB 1cc', krw: 35 },
      { ko: '물광주사 1cc', zh: '水光针 1cc', krw: 35 },
      { ko: '리투오 1vial', zh: 'Re2O 1支', krw: 88, noteKo: '물광 2cc +33 · PRP 4cc +55', noteZh: '水光2cc +33 · PRP4cc +55' },
      { ko: 'PRP 4cc', zh: '自体血清 PRP 4cc', krw: 110 },
      { ko: '흉살주사 (1회)', zh: '去疤针（1次）', krw: 20, recoveryKo: '7일', recoveryZh: '7天' },
      { ko: '흉살 CO2 레이저', zh: '祛疤激光 CO2', krw: 10 },
      { ko: '흉터성형 (cm당)', zh: '疤痕修复（每cm）', krw: 33 },
    ],
  },
  {
    id: 'hair', ko: '모발이식', zh: '植发',
    items: [
      { ko: '절개 3,000모', zh: '切开式 3,000根', krw: 550, noteKo: '최대 할인 시 440', noteZh: '最大优惠时 440' },
      { ko: '절개 4,000모', zh: '切开式 4,000根', krw: 660, noteKo: '최대 할인 시 550', noteZh: '最大优惠时 550' },
      { ko: '비절개 3,000모', zh: '非切开 FUE 3,000根', krw: 660, noteKo: '최대 할인 시 550', noteZh: '最大优惠时 550' },
      { ko: '비절개 4,000모', zh: '非切开 FUE 4,000根', krw: 770, noteKo: '최대 할인 시 660', noteZh: '最大优惠时 660' },
      { ko: '하이브리드 (절개 4,000 + 비절개 1,000)', zh: '混合式（切开4,000＋FUE1,000）', krw: 880, noteKo: '최대 할인 시 770', noteZh: '最大优惠时 770' },
    ],
  },
  {
    id: 'etc', ko: '기타 · 항노화', zh: '其他 · 抗衰',
    items: [
      { ko: '입꼬리 성형', zh: '嘴角上扬术', krw: 275 },
      { ko: '입술 축소 (한쪽/양쪽)', zh: '唇部缩小（单唇/双唇）', krw: [330, 550] },
      { ko: '귀성형 (양쪽)', zh: '耳部整形（双侧）', krw: 440 },
      { ko: '보조개 (한쪽/양쪽)', zh: '酒窝成形（单侧/双侧）', krw: [60, 110] },
      { ko: '배꼽성형', zh: '肚脐整形', krw: 350 },
      { ko: '줄기세포 (정맥·얼굴)', zh: '干细胞（静脉·面部）', krw: [330, 750], noteKo: '회당 330 · 3회 750', noteZh: '每次 330 · 3次 750' },
      { ko: '헤마퓨어', zh: 'Hemapure 血液净化', krw: [44, 330], noteKo: '회당 44 · 10회 330', noteZh: '每次 44 · 10次 330' },
      { ko: '줄기세포 3회 + 헤마퓨어 10회', zh: '干细胞3次＋Hemapure10次', krw: 880, noteKo: '정가 1,200 → 880', noteZh: '原价 1,200 → 880' },
      { ko: '고압산소 30분', zh: '高压氧 30分钟', krw: 25 },
      { ko: 'CT 촬영', zh: 'CT 检查', krw: 15, noteKo: '수술 시 차감', noteZh: '手术时可抵扣' },
      { ko: '위고비 0.25 / 0.5 / 1.0', zh: '司美格鲁肽 Wegovy 0.25 / 0.5 / 1.0', krw: 44 },
      { ko: '위고비 1.7 / 2.4', zh: '司美格鲁肽 Wegovy 1.7 / 2.4', krw: 55 },
      { ko: '마운자로 2.5', zh: '替尔泊肽 Mounjaro 2.5', krw: 44 },
      { ko: '마운자로 5.0', zh: '替尔泊肽 Mounjaro 5.0', krw: 55 },
      { ko: '마운자로 7.5', zh: '替尔泊肽 Mounjaro 7.5', krw: 71.5 },
    ],
  },
]
