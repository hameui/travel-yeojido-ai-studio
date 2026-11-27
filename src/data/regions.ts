export type Region = {
  code: string;
  slug: string;
  name: string;
  shortName: string;
  englishName: string;
  color: string;
  paleColor: string;
  description: string;
};

export const regions: Region[] = [
  { code: "41", slug: "gyeonggi", name: "경기도", shortName: "경기", englishName: "GYEONGGI", color: "#b8875a", paleColor: "#f4e7d8", description: "도시와 자연이 어우러진 가까운 여행" },
  { code: "51", slug: "gangwon", name: "강원특별자치도", shortName: "강원", englishName: "GANGWON", color: "#6f907c", paleColor: "#e0ebe3", description: "산과 바다를 품은 깊은 쉼" },
  { code: "43", slug: "chungbuk", name: "충청북도", shortName: "충북", englishName: "CHUNGBUK", color: "#bf9860", paleColor: "#f3ead9", description: "호수와 산길을 따라가는 느린 여행" },
  { code: "44", slug: "chungnam", name: "충청남도", shortName: "충남", englishName: "CHUNGNAM", color: "#b47667", paleColor: "#f1e3de", description: "고즈넉한 마을과 서해의 풍경" },
  { code: "45", slug: "jeonbuk", name: "전북특별자치도", shortName: "전북", englishName: "JEONBUK", color: "#71889a", paleColor: "#e2e9ed", description: "오래된 골목과 정겨운 맛" },
  { code: "46", slug: "jeonnam", name: "전라남도", shortName: "전남", englishName: "JEONNAM", color: "#8d7da1", paleColor: "#ece7f0", description: "섬과 바다, 남도의 다정한 풍미" },
  { code: "47", slug: "gyeongbuk", name: "경상북도", shortName: "경북", englishName: "GYEONGBUK", color: "#b57976", paleColor: "#f0e4e2", description: "천년의 역사와 푸른 산하" },
  { code: "48", slug: "gyeongnam", name: "경상남도", shortName: "경남", englishName: "GYEONGNAM", color: "#658c82", paleColor: "#e0ebe7", description: "항구와 섬이 이어지는 남쪽 길" },
];

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug);
}
