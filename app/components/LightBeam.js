"use client";

/**
 * 一筋の自然光 — 空間を斜めに切り裂くアンカー
 * ノイズが減少するにつれて光が差し込む
 */
export default function LightBeam({ visibility }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* メインの光線 */}
      <div
        className="light-beam absolute"
        style={{
          top: "-20%",
          left: "22%",
          width: "180px",
          height: "160%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,252,245,0.25) 20%, rgba(255,252,245,0.35) 50%, rgba(255,252,245,0.25) 80%, rgba(255,255,255,0) 100%)",
          transform: "rotate(25deg)",
          filter: "blur(40px)",
          opacity: visibility * 0.5,
          transition: "opacity 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />

      {/* 光の芯（より鮮明な中心線） */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          left: "24%",
          width: "40px",
          height: "140%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,253,248,0.15) 30%, rgba(255,253,248,0.2) 50%, rgba(255,253,248,0.15) 70%, rgba(255,255,255,0) 100%)",
          transform: "rotate(25deg)",
          filter: "blur(15px)",
          opacity: visibility * 0.6,
          transition: "opacity 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />

      {/* 床面の光の反射 */}
      <div
        className="absolute bottom-0 left-[15%] w-[30%] h-[20%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,252,245,0.08) 0%, transparent 70%)",
          opacity: visibility * 0.4,
          transition: "opacity 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
    </div>
  );
}
