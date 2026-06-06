export interface ConcernContext {
  id: string
  zh: { title: string; desc: string; recommended: string }
  ko: { title: string; desc: string; recommended: string }
  en: { title: string; desc: string; recommended: string }
}

export const concernsData: ConcernContext[] = [
  {
    id: 'younger-look',
    zh: {
      title: '想变年轻一点',
      desc: `不是为了变成另一个人，而是希望看起来更自然、更有精神、更年轻一点。

很多人说自己"显老了"，其实原因并不一样。
有的人是皮肤松弛，有的人是肤质变粗、暗沉，有的人是面部轮廓下垂，也有人只是长期疲劳，让整个人看起来没有状态。

汉江春天不会一开始就推荐某个项目。
我们会先帮您梳理：显老感主要来自哪里、您能接受的恢复期是多少、希望自然改善还是明显提升、计划在韩国停留几天。

整理清楚后，再为您对接适合的韩国医疗咨询方向。`,
      recommended: '皮肤医美 · 抗衰管理 · 轮廓提升',
    },
    ko: {
      title: '좀 더 젊어 보이고 싶다',
      desc: `다른 사람이 되고 싶은 게 아닙니다. 더 자연스럽고 활기차고, 조금 더 젊어 보이고 싶은 것입니다.

많은 분들이 "나이 들어 보인다"고 느끼시는데, 사실 그 원인은 각각 다릅니다.
피부 탄력이 떨어진 분도 있고, 피부 결이 거칠어지거나 칙칙해진 분도 있으며, 얼굴 윤곽이 처진 분도 있고, 단순히 만성 피로로 전체적으로 지쳐 보이는 분도 있습니다.

한강애봄은 처음부터 특정 시술을 추천하지 않습니다.
먼저 정리해 드립니다. 노안의 주요 원인이 무엇인지, 감수할 수 있는 회복 기간은 어느 정도인지, 자연스러운 개선을 원하는지 눈에 띄는 변화를 원하는지, 한국 체류 일정은 어떻게 되는지.

정리가 끝나면 적합한 한국 의료 상담 방향으로 연결해 드립니다.`,
      recommended: '피부의료미용 · 항노화 관리 · 윤곽 리프팅',
    },
    en: {
      title: 'I want to restore a younger look',
      desc: `Not to become someone different — just to look more natural, vibrant, and a little younger.

Many people say they look older than they feel, but the reasons vary greatly.
For some it's loss of skin firmness, for others it's rough texture or dullness, some notice sagging facial contours, and others simply carry years of fatigue that dulls their appearance.

Hangangaeborn doesn't recommend specific treatments right away.
We first help you clarify: where the aging appearance mainly comes from, how much downtime you can accept, whether you prefer subtle improvement or more visible change, and how many days you plan to stay in Korea.

Once that's clear, we connect you with the right Korean medical consultation direction.`,
      recommended: 'Skin & Aesthetics · Anti-Aging · Facial Lifting',
    },
  },
]

export function getConcernById(id: string): ConcernContext | null {
  return concernsData.find(c => c.id === id) ?? null
}
