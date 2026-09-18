/** 실제 전후사진 1장. 카드 높이를 고정하고 object-fit: cover로 채워 원본 비율이
    제각각이어도 카드 크기가 동일하게 보이도록 한다(가장자리는 자연스럽게 크롭됨).
    카테고리 상세페이지의 "真实案例" 섹션에서 사용 (피부미용·성형외과).
    환자 전후사진이라 우클릭 저장·드래그 저장·iOS 길게 눌러 저장을 막아둔다 —
    URL을 알면 직접 내려받는 것까지는 막지 못하는 가벼운 저지선일 뿐이다. */
export default function CasePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="case-photo-card" onContextMenu={(e) => e.preventDefault()}>
      <img src={src} alt={alt} className="case-photo-img" draggable={false} />
    </div>
  )
}
