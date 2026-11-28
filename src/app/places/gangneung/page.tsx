import Link from "next/link";
import GangneungPoster from "@/components/GangneungPoster";

export const metadata = {
  title: "강릉 여행 명소 12 | 여행여지도",
  description: "강릉의 명소 사진을 선택해 연결된 여행 이야기를 만나보세요.",
};

export default function GangneungPlacePage() {
  return <><GangneungPoster /><div style={{ display: "none" }}><Link href="/regions/gangwon">강원도</Link></div></>;
}
