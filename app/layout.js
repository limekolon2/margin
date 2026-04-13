import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["200", "300"],
});

export const metadata = {
  title: "余白 — MARGIN",
  description:
    "デジタル枯山水。過剰なノイズを削ぎ落とし、究極の均衡を鑑賞する引き算のシミュレーション。",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "余白",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#c8c4be",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-hidden bg-[#c8c4be]">
        {children}
      </body>
    </html>
  );
}
