"use client";

/**
 * コンクリートの壁 — 防音材としての建材レイヤー
 * ノイズが取れるにつれて、壁の質感が浮き上がる
 */
export default function ConcreteTexture({ visibility }) {
  return (
    <>
      {/* 実際のテクスチャ画像 */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('/concrete-texture.png')",
          backgroundSize: "512px 512px",
          backgroundRepeat: "repeat",
          opacity: 0.12 + visibility * 0.08,
          transition: "opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />

      {/* CSSノイズグレイン（微細な質感を追加） */}
      <div className="grain-overlay" />

      {/* 壁の微かな色ムラ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(180,175,165,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(160,155,145,0.1) 0%, transparent 50%)",
          opacity: visibility,
          transition: "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
    </>
  );
}
