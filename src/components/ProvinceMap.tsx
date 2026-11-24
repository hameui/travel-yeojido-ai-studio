"use client";

import { geoCentroid, geoMercator, geoPath } from "d3-geo";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { regions } from "@/data/regions";

type Properties = { CTPRVN_CD: string; CTP_KOR_NM: string };
type ProvinceFeature = Feature<Polygon | MultiPolygon, Properties>;
type ProvinceCollection = FeatureCollection<Polygon | MultiPolygon, Properties>;
const viewSize: [number, number] = [840, 620];

export default function ProvinceMap() {
  const router = useRouter();
  const [data, setData] = useState<ProvinceCollection | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/regions-8.geojson")
      .then((response) => {
        if (!response.ok) throw new Error("지역 경계 데이터를 불러오지 못했습니다.");
        return response.json() as Promise<ProvinceCollection>;
      })
      .then((collection) => { if (!cancelled) setData(collection); })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, []);

  const projection = useMemo(() => data ? geoMercator().fitSize([viewSize[0] - 56, viewSize[1] - 56], data) : null, [data]);
  const pathBuilder = useMemo(() => projection ? geoPath(projection) : null, [projection]);

  function visit(slug: string) {
    router.push(`/regions/${slug}`);
  }

  return (
    <div className="map-card">
      <div className="map-canvas">
        <div className="map-topline"><span>REPUBLIC OF KOREA</span><span>01 — 08</span></div>
        {loadError ? (
          <p className="map-message" role="alert">지도 경계 데이터를 불러오지 못했습니다. 새로고침해 주세요.</p>
        ) : !data || !projection || !pathBuilder ? (
          <p className="map-message" role="status">여행지도를 준비하고 있습니다…</p>
        ) : (
          <svg className="province-map" viewBox={`0 0 ${viewSize[0]} ${viewSize[1]}`} role="group" aria-label="대한민국 8개 도 여행지도">
            <defs><filter id="province-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#443d32" floodOpacity=".13" /></filter></defs>
            <g filter="url(#province-shadow)">
              {regions.map((region) => {
                const feature = data.features.find((item) => item.properties.CTPRVN_CD === region.code);
                if (!feature) return null;
                const active = activeSlug === region.slug;
                const centroid = projection(geoCentroid(feature));
                return (
                  <g key={region.code}>
                    <path
                      d={pathBuilder(feature) ?? ""}
                      fill={region.paleColor}
                      stroke={active ? region.color : "#fff"}
                      strokeWidth={active ? 3.2 : 2.2}
                      className={`province-shape${active ? " is-active" : ""}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${region.name} 여행정보 보기`}
                      onMouseEnter={() => setActiveSlug(region.slug)}
                      onMouseLeave={() => setActiveSlug(null)}
                      onFocus={() => setActiveSlug(region.slug)}
                      onBlur={() => setActiveSlug(null)}
                      onClick={() => visit(region.slug)}
                      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); visit(region.slug); } }}
                    >
                      <title>{region.name} — 여행정보 보기</title>
                    </path>
                    {centroid && <text className={`map-label${active ? " is-active" : ""}`} x={centroid[0]} y={centroid[1]}>{region.shortName}</text>}
                  </g>
                );
              })}
            </g>
          </svg>
        )}
        <div className="map-compass" aria-hidden="true"><span>N</span><b>✳</b></div>
        <p className="map-hint">지역을 선택해 여행 이야기를 만나보세요 <span>↗</span></p>
      </div>

      <aside className="region-panel" aria-label="여행 지역 선택">
        <div className="panel-heading"><span>여덟 개의 여정</span><span className="panel-index">REGION INDEX</span></div>
        <nav className="region-list">
          {regions.map((region, index) => (
            <button
              type="button"
              key={region.code}
              className={`region-row${activeSlug === region.slug ? " is-active" : ""}`}
              onMouseEnter={() => setActiveSlug(region.slug)}
              onMouseLeave={() => setActiveSlug(null)}
              onFocus={() => setActiveSlug(region.slug)}
              onBlur={() => setActiveSlug(null)}
              onClick={() => visit(region.slug)}
              aria-label={`${region.name} 여행정보 보기`}
            >
              <span className="region-number">0{index + 1}</span>
              <span className="region-name-wrap"><strong>{region.name}</strong><small>{region.description}</small></span>
              <span className="region-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </nav>
        <div className="panel-footnote"><span className="legend-dot" /> 선택 가능한 여행 지역 <span>8개 권역</span></div>
      </aside>
    </div>
  );
}
