"use client";

import { useState } from "react";

const districts = [
  "춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시",
  "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군",
  "양구군", "인제군", "고성군", "양양군",
];

export default function GangwonDistrictSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section aria-label="강원특별자치도 시군 선택" style={{ width: "min(760px, 100%)", margin: "0 auto" }}>
      <div style={{ border: "1px solid #e8e5de", background: "#fff", padding: "24px", borderRadius: "4px" }}>
        <p style={{ margin: "0 0 8px", color: "#718071", fontSize: "11px", letterSpacing: ".12em" }}>SELECT A DISTRICT</p>
        <h2 style={{ margin: "0 0 18px", fontFamily: "inherit", fontSize: "20px", fontWeight: 500, color: "#30332f" }}>강원특별자치도 시·군 선택</h2>
        <p style={{ margin: "0 0 18px", color: "#85877f", fontSize: "13px" }}>지역 이름을 누르면 선택한 곳이 녹색으로 표시됩니다.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(105px, 1fr))", gap: "9px" }}>
          {districts.map((district) => {
            const active = selected === district;
            return (
              <button
                key={district}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(district)}
                style={{
                  minHeight: "46px", borderRadius: "3px",
                  border: active ? "1px solid #536d5d" : "1px solid #e8e5de",
                  background: active ? "#536d5d" : "#fbfaf8",
                  color: active ? "#fff" : "#4b504a",
                  fontSize: "14px", fontWeight: active ? 600 : 400,
                  cursor: "pointer", transition: "all .15s ease",
                }}
              >
                {district}
              </button>
            );
          })}
        </div>
        <div aria-live="polite" style={{ marginTop: "20px", padding: "14px 16px", background: "#f5f7f4", color: "#536d5d", fontSize: "14px", minHeight: "48px" }}>
          {selected ? <><strong>{selected}</strong> 지역을 선택했습니다.</> : "아직 선택된 지역이 없습니다."}
        </div>
      </div>
    </section>
  );
}
