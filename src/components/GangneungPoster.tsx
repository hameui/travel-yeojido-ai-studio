"use client";

import { useEffect, useState } from "react";

const places = [
  // 포스터에 인쇄된 금색 번호 배지의 중심에 클릭용 번호를 겹쳐 표시합니다.
  { id: "1", name: "경포대", x: 42.1, y: 5.5 },
  { id: "2", name: "오죽헌", x: 80.4, y: 19.8 },
  { id: "3", name: "강문해변", x: 84.2, y: 37.9 },
  { id: "4", name: "아쿠아리움", x: 84.2, y: 54.5 },
  { id: "5", name: "정동진역", x: 81.8, y: 68 },
  { id: "6", name: "하슬라아트월드", x: 77.5, y: 82.2 },
  { id: "7", name: "안반데기", x: 45.4, y: 85.5 },
  { id: "8", name: "주문진수산시장", x: 26.1, y: 84.2 },
  { id: "9", name: "강릉중앙시장", x: 16.8, y: 75.2 },
  { id: "10", name: "정동심곡바다부채길", x: 16.7, y: 64 },
  { id: "11", name: "아르떼뮤지엄강릉", x: 15.9, y: 48.6 },
  { id: "12", name: "강릉솔향수목원", x: 19.2, y: 34.1 },
];

const storageKey = "travel-yeojido-gangneung-links";

export default function GangneungPoster() {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("금색 번호를 누르면 해당 명소의 여행 글이 열립니다.");
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, string>;
        setLinks(parsed);
        setDrafts(parsed);
      }
    } catch {
      setNotice("저장된 링크를 읽지 못했습니다. 링크를 다시 등록해 주세요.");
    }
  }, []);

  function openPlace(id: string, name: string) {
    setSelectedId(id);
    const url = links[id]?.trim();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setEditing(true);
      setNotice(`${name} 링크가 아직 등록되지 않았습니다. 아래 링크 관리에서 주소를 입력해 주세요.`);
    }
  }

  function saveLinks() {
    const cleaned = Object.fromEntries(
      places
        .map((place) => [place.id, (drafts[place.id] ?? "").trim()])
        .filter((entry) => Boolean(entry[1]))
    );
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cleaned));
      setLinks(cleaned);
      setEditing(false);
      setNotice("이 브라우저에 명소 링크를 저장했습니다.");
    } catch {
      setNotice("브라우저 저장에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <main className="gangneung-poster-page">
      <header className="gangneung-poster-header">
        <a href="/regions/gangwon">← 강원특별자치도 시·군 지도</a>
        <span>TRAVEL YEOJIDO · GANGNEUNG</span>
      </header>
      <section className="gangneung-poster-intro">
        <p>YOUR LOCAL JOURNEY</p>
        <h1>강릉, 꼭 가봐야 할 명소 12</h1>
        <div>포스터의 금색 번호를 누르면 해당 명소의 여행 이야기가 열립니다.</div>
      </section>
      <section className="gangneung-poster-stage" aria-label="강릉 여행 명소 포스터">
        <div className="gangneung-poster-image-wrap">
          <img
            className="gangneung-poster-image"
            src="/images/강릉.png"
            alt="강릉의 경포대, 오죽헌, 강문해변 등 12개 명소를 소개하는 여행 포스터"
          />
          {places.map((place) => (
            <button
              key={place.id}
              type="button"
              className={`gangneung-hotspot${selectedId === place.id ? " is-selected" : ""}${links[place.id] ? " has-link" : ""}`}
              style={{ left: `${place.x}%`, top: `${place.y}%` }}
              aria-label={`${place.id}번 ${place.name} 여행 글 열기`}
              title={`${place.id}번 ${place.name}${links[place.id] ? " — 링크 등록됨" : " — 링크 미등록"}`}
              onClick={() => openPlace(place.id, place.name)}
            >
              <span>{place.id}</span>
            </button>
          ))}
        </div>
      </section>
      <div className="gangneung-poster-toolbar">
        <p aria-live="polite">{notice}</p>
        <button type="button" onClick={() => { setDrafts(links); setEditing((value) => !value); }}>
          {editing ? "링크 관리 닫기" : "명소 링크 관리"}
        </button>
      </div>
      {editing && (
        <section className="gangneung-link-editor" aria-label="명소별 링크 등록">
          <h2>명소별 여행 글 주소 등록</h2>
          <p>카페, 블로그, 틱톡, 유튜브 등 원하는 주소를 붙여 넣으세요.</p>
          <div className="gangneung-link-list">
            {places.map((place) => (
              <label key={place.id}>
                <span><b>{place.id.padStart(2, "0")}</b>{place.name}</span>
                <input
                  type="url"
                  value={drafts[place.id] ?? ""}
                  onChange={(event) => setDrafts((current) => ({ ...current, [place.id]: event.target.value }))}
                  placeholder="https:// 링크 주소 붙여넣기"
                />
              </label>
            ))}
          </div>
          <div className="gangneung-editor-actions">
            <button type="button" className="secondary" onClick={() => { setDrafts(links); setEditing(false); }}>취소</button>
            <button type="button" onClick={saveLinks}>링크 저장</button>
          </div>
          <small>현재 1차 버전은 이 브라우저에 저장됩니다. 다른 기기에서도 공유하려면 다음 단계에서 공용 데이터 저장 기능을 연결합니다.</small>
        </section>
      )}
      <footer className="gangneung-poster-footer">© 2026 TRAVEL YEOJIDO</footer>
    </main>
  );
}
