import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "여행여지도 | 대한민국 여행을 한눈에",
  description: "지도를 따라 발견하는 대한민국 여행 이야기. 여행여지도에서 다음 여정을 찾아보세요.",
  applicationName: "여행여지도",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f7f4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
