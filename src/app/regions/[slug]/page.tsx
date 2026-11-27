import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegionBySlug } from "@/data/regions";

export function generateStaticParams() {
  return ["gyeonggi", "gangwon", "chungbuk", "chungnam", "jeonbuk", "jeonnam", "gyeongbuk", "gyeongnam"].map((slug) => ({ slug }));
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) notFound();

  return (
    <main className="region-page" style={{ "--region-color": region.color, "--region-pale": region.paleColor } as React.CSSProperties}>
      <Link className="brand region-page-brand" href="/">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="brand-copy"><strong>여행여지도</strong><small>TRAVEL YEOJIDO</small></span>
      </Link>
      <section className="region-intro-card">
        <span className="region-page-kicker">{region.englishName} · TRAVEL JOURNAL</span>
        <p className="region-page-index">TRAVEL YEOJIDO <span>—</span> 0{["gyeonggi", "gangwon", "chungbuk", "chungnam", "jeonbuk", "jeonnam", "gyeongbuk", "gyeongnam"].indexOf(slug) + 1}</p>
        <h1>{region.name}</h1>
        <p className="region-page-description">{region.description}</p>
        <div className="coming-soon"><span /> 여행 이야기를 준비하고 있어요</div>
        <Link className="back-home" href="/">← 전체 여행지도 보기</Link>
      </section>
      <footer className="region-page-footer">© 2026 TRAVEL YEOJIDO · 대한민국의 모든 여행을 위하여</footer>
    </main>
  );
}
