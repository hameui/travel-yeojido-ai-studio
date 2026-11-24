import ProvinceMap from "@/components/ProvinceMap";

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="여행여지도 홈">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-copy"><strong>여행여지도</strong><small>TRAVEL YEOJIDO</small></span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> 대한민국 여행을 잇는 지도</div>
        <a className="explore-link" href="#regions">여행지 둘러보기 <span aria-hidden="true">↘</span></a>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="eyebrow"><span>01</span> YOUR NEXT JOURNEY</p>
          <h1 id="page-title">지도를 따라<br /><em>여행을 발견하다</em></h1>
          <p className="intro-description">익숙한 길 위에서 새로운 이야기를 만나보세요.<br className="desktop-break" /> 여덟 개 지역의 다채로운 여행이 여기서 시작됩니다.</p>
        </div>
        <div className="intro-aside" aria-label="서비스 소개">
          <span className="aside-rule" />
          <p>대한민국의 풍경과 이야기를<br />한 장의 지도에 담았습니다.</p>
          <span className="aside-caption">CURATED LOCAL TRAVEL</span>
        </div>
      </section>

      <section className="map-section" id="regions" aria-labelledby="map-title">
        <div className="section-heading">
          <div><p className="eyebrow">EXPLORE BY REGION</p><h2 id="map-title">어디로 떠나볼까요?</h2></div>
          <span className="region-count"><strong>08</strong> REGIONS</span>
        </div>
        <ProvinceMap />
      </section>

      <footer className="footer">
        <span>© 2026 TRAVEL YEOJIDO</span>
        <span className="map-credit">행정구역 경계: 국가공간정보포털(V-World) · 2023년 자료, 출처 표시 조건</span>
        <span>대한민국의 모든 여행을 위하여</span>
      </footer>
    </main>
  );
}
