"use client";

import { useState } from "react";
import { regionDistrictMaps } from "@/data/region-district-maps";

type Props = { regionSlug: string };

export default function RegionalDistrictSelector({ regionSlug }: Props) {
  const map = regionDistrictMaps[regionSlug];
  const [selected, setSelected] = useState<string | null>(null);

  if (!map) return null;

  return (
    <section aria-label="시군 선택 지도" style={{ width: "min(760px, 100%)", margin: "0 auto" }}>
      <div style={{ border: "1px solid #e8e5de", background: "#fff", padding: "24px", borderRadius: "4px" }}>
        <p style={{ margin: "0 0 8px", color: "#718071", fontSize: "11px", letterSpacing: ".12em" }}>SELECT A DISTRICT</p>
        <h2 style={{ margin: "0 0 12px", fontSize: "24px", fontWeight: 700, color: "#30332f" }}>시·군 선택</h2>
        <p style={{ margin: "0 0 16px", color: "#85877f", fontSize: "17px", fontWeight: 600 }}>지도에서 원하는 시·군을 선택하면 해당 지역이 녹색으로 표시됩니다.</p>

        <div style={{ width: "min(100%, 640px)", margin: "0 auto 22px" }}>
          <svg viewBox={map.viewBox} role="group" aria-label="행정구역 선택 지도" style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}>
            {map.items.map((district) => {
              const active = selected === district.id;
              return district.d.map((path, index) => (
                <path
                  key={district.id + "-" + index}
                  d={path}
                  role="button"
                  tabIndex={index === 0 ? 0 : -1}
                  aria-label={district.id}
                  aria-pressed={active}
                  onClick={() => setSelected(district.id)}
                  onKeyDown={(event) => { if (index === 0 && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); setSelected(district.id); } }}
                  fill={active ? "#536d5d" : "#f7f8f5"}
                  stroke={active ? "#385443" : "#8c9a8e"}
                  strokeWidth={active ? 2.4 : 1.35}
                  vectorEffect="non-scaling-stroke"
                  style={{ cursor: "pointer", transition: "fill .15s ease, stroke .15s ease", outline: "none" }}
                />
              ));
            })}
            {map.items.map((district) => (
              <text key={district.id + "-label"} x={district.cx} y={district.cy} textAnchor="middle" dominantBaseline="middle"
                fontSize="18" fontWeight={800}
                fill={selected === district.id ? "#fff" : "#344238"}
                stroke={selected === district.id ? "#536d5d" : "#fff"} strokeWidth="3" paintOrder="stroke"
                style={{ pointerEvents: "none", userSelect: "none" }}>
                {district.id}
              </text>
            ))}
          </svg>
          <p style={{ margin: "8px 0 0", textAlign: "center", color: "#85877f", fontSize: "15px", fontWeight: 600 }}>지도에서 원하는 시·군 영역을 직접 선택하세요.</p>
        </div>

        <div aria-live="polite" style={{ marginTop: "20px", padding: "14px 16px", background: "#f5f7f4", color: "#536d5d", fontSize: "17px", fontWeight: 700, minHeight: "52px" }}>
          {selected ? <><strong style={{ fontSize: "22px", marginRight: "6px" }}>{selected}</strong><span>지역을 선택했습니다.</span></> : "지도에서 여행할 지역을 선택해 주세요."}
        </div>
        <p style={{ margin: "12px 0 0", color: "#999", fontSize: "13px" }}>지도 경계 자료: 통계청 SGIS 행정구역 경계 기반, statgarten/maps (MIT)</p>
      </div>
    </section>
  );
}
