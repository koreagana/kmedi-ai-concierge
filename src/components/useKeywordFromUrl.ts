import { useEffect, type RefObject } from 'react'
import { useSearchParams } from 'react-router-dom'

/** 카테고리 페이지 키워드 타일을 URL의 ?kw=<id>로 미리 선택한다.
    kmedispring.com 사이드바 서브메뉴(src/data/categorySubmenus.ts)가 이 링크를 쓴다.
    같은 카테고리 안에서 kw만 바뀌어도(페이지가 다시 마운트되지 않음) 반응하도록 effect로 처리하고,
    선택 후 해당 내용 위치로 스크롤한다. kw가 없으면 아무것도 하지 않는다(ai-kmedi.com 기존 동작 그대로). */
export function useKeywordFromUrl(
  keywords: { id: string }[],
  select: (index: number) => void,
  anchorRef?: RefObject<HTMLElement>,
) {
  const [searchParams] = useSearchParams()
  const kw = searchParams.get('kw')

  useEffect(() => {
    if (!kw) return
    const index = keywords.findIndex((k) => k.id === kw)
    if (index < 0) return
    select(index)
    // AppContext가 경로 변경 시 맨 위로 smooth 스크롤을 거는데, 그게 끝난 뒤에 내려가야 안 끊긴다.
    const timer = setTimeout(() => {
      const target = anchorRef?.current ?? document.getElementById(`kw-${kw}`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 450)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kw])
}
