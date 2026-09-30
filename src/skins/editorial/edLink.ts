import type { MouseEvent } from 'react'

/** Editorial 스킨의 모든 내부 링크: 진짜 href를 달아(새 탭 열기·주소 복사·검색엔진 수집 가능)
    두고, 평범한 왼쪽 클릭만 SPA 이동으로 가로챈다. */
export function edLink(href: string, go: () => void) {
  return {
    href,
    onClick: (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      go()
    },
  }
}
