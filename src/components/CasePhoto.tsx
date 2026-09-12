/** 실제 전후사진 1장. 사진 자체는 원본 비율 그대로 보이도록 object-fit: contain을
    쓴다 — before/after 합성 이미지는 잘리면 비교가 깨짐.
    카테고리 상세페이지의 "真实案例" 섹션에서 사용 (피부미용·성형외과). */
export default function CasePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="case-photo-card">
      <img src={src} alt={alt} className="case-photo-img" />
    </div>
  )
}
