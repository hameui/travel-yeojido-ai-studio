# 여행여지도 (Travel Yeojido)

대한민국 8개 도 경계를 따라 여행 지역을 둘러보는 첫 화면입니다. Next.js App Router와 TypeScript로 만들었습니다. 기존 `index.html`과 `index.pdf`는 참고 원본으로 그대로 보존되어 있습니다.

## 내 컴퓨터에서 실행하기

1. Windows에 Node.js 20.9 이상을 설치합니다. 이 프로젝트의 권장 버전은 Node.js 24입니다.
2. 프로젝트 폴더에서 터미널을 엽니다.
3. 아래 명령을 차례로 실행합니다.

```powershell
npm install
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.
5. 작업을 마치면 터미널에서 `Ctrl+C`를 눌러 개발 서버를 종료합니다.

이 저장소는 pnpm 잠금 파일도 포함합니다. pnpm을 사용한다면 `pnpm install`과 `pnpm dev`를 실행해도 됩니다.

## 점검 명령

```powershell
npm run typecheck
npm run build
```

실제 행정구역 경계 원본은 `data/source/ctprvn.geojson`에 보존합니다. 출처와 이용 안내는 `data/source/ATTRIBUTION.md`에 있습니다. 화면에서 쓰는 8개 도 경계 파일을 원본에서 다시 만들려면 `npm run prepare:map`을 실행합니다.

## 현재 첫 버전 범위

- 전국 17개 시·도 중 요청된 8개 도를 실제 행정구역 경계로 표시합니다.
- 지역 도형에 마우스를 올리거나 키보드 포커스를 두면 밝아지고 강조됩니다.
- 지도 도형 또는 지역 목록을 누르면 해당 지역 안내 페이지로 이동합니다.
- 지역별 여행 정보 콘텐츠와 계정 기능은 아직 연결하지 않았습니다. 지역 페이지는 다음 개발 단계를 위한 기본 화면입니다.
- Supabase, 로그인, 외부 유료 지도 API는 사용하지 않습니다.
