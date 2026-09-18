/** 실제 전후사진 1장. 카드 높이를 고정하고 object-fit: cover로 채워 원본 비율이
    제각각이어도 카드 크기가 동일하게 보이도록 한다(가장자리는 자연스럽게 크롭됨).
    카테고리 상세페이지의 "真实案例" 섹션에서 사용 (피부미용·성형외과). */
export default function CasePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="case-photo-card">
      <img src={src} alt={alt} className="case-photo-img" />
    </div>
  )
}
