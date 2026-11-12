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
    "視界を埋めるノイズを、指先のスクロールで少しずつ削ぎ落としていく。スコアも、クリアもなく、ただ永続する静寂を追い求める。",
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
