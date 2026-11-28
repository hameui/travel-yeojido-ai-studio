"use client";

import { useEffect, useState } from "react";

const places = [
  // 사진 원의 중심과 크기를 포스터 이미지 기준(%)으로 맞춘 클릭 영역
  { id: "1", name: "경포대", x: 52, y: 14, w: 30, h: 25 },
  { id: "2", name: "오죽헌", x: 71.3, y: 21.9, w: 21, h: 17.5 },
  { id: "3", name: "강문해변", x: 71.8, y: 37.2, w: 21, h: 17.5 },
  { id: "4", name: "아쿠아리움", x: 74.8, y: 50.8, w: 19.7, h: 16.5 },
  { id: "5", name: "정동진역", x: 74.4, y: 64.9, w: 17.2, h: 14.5 },
  { id: "6", name: "하슬라아트월드", x: 68.8, y: 77.9, w: 19.7, h: 16.5 },
  { id: "7", name: "안반데기", x: 51.6, y: 77.9, w: 19.7, h: 16.5 },
  { id: "8", name: "주문진수산시장", x: 32.2, y: 77.8, w: 19.7, h: 16.5 },
  { id: "9", name: "강릉중앙시장", x: 23.1, y: 71.1, w: 17.2, h: 14.5 },
  { id: "10", name: "정동심곡바다부채길", x: 25.1, y: 59, w: 21, h: 17.5 },
  { id: "11", name: "아르떼뮤지엄강릉", x: 23.7, y: 46.6, w: 17.8, h: 15 },
  { id: "12", name: "강릉솔향수목원", x: 26.2, y: 32.9, w: 18.5, h: 15.5 },
];

const storageKey = "travel-yeojido-gangneung-links";

export default function GangneungPoster() {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("포스터 속 명소 사진을 누르면 연결된 여행 글이 열립니다.");
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
        <div>사진을 선택해 내가 저장한 여행 이야기를 만나보세요.</div>
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
              className={`gangneung-hotspot${links[place.id] ? " has-link" : ""}`}
              style={{
                left: `${place.x}%`,
                top: `${place.y}%`,
                width: `${place.w}%`,
                height: `${place.h}%`,
              }}
              aria-label={`${place.name} 여행 글 열기`}
              title={`${place.name}${links[place.id] ? " — 링크 등록됨" : " — 링크 미등록"}`}
              onClick={() => openPlace(place.id, place.name)}
            />
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
