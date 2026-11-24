# 행정구역 경계 데이터 출처

- 파일: `ctprvn.geojson` (17개 시·도 원본)
- 원천 데이터: 국가공간정보포털(V-World) 행정구역 경계 Shapefile, 2023-07-29 배포
- 제공 및 변환본: [KnellBalm/kr-admin-geojson](https://github.com/KnellBalm/kr-admin-geojson)
- 제공 저장소의 이용 안내: 국가공간정보포털 출처 표시 조건으로 자유 이용 가능
- 사용한 원본 파일: [ctprvn.geojson](https://raw.githubusercontent.com/KnellBalm/kr-admin-geojson/main/ctprvn.geojson)
- 좌표계: WGS84 (EPSG:4326)
- 이 프로젝트의 `public/regions-8.geojson`은 위 원본에서 요청된 8개 도 피처만 추려 만든 파일입니다.
- 화면용 파일을 다시 만들 때 `pnpm prepare:map` 명령을 사용합니다. 경계 좌표 원본은 바꾸지 않고, 방향이 뒤집혀 지구 전체처럼 그려지는 비정상 외곽선만 화면용 복사본에서 보정합니다.

출처 표시는 앱 지도 아래에 표시합니다. 경계의 기준 시점이 2023년이므로, 행정구역 경계가 바뀌는 경우 최신 공식 자료로 교체해야 합니다. 제공 저장소는 원천 데이터가 출처 표시 조건으로 자유 이용 가능하다고 안내하지만, 공개·상업 서비스에서 배포하기 전 최신 원천 이용 조건과 출처 표시 문구를 다시 확인합니다.
