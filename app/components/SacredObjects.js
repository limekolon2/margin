"use client";

/**
 * 究極の均衡を保つ3つのオブジェクト
 * - 極小の円（過去）
 * - M A R G I N テキスト（現在）
 * - かすかな垂直線（未来）
 *
 * 黄金比 (φ ≈ 1.618) に基づく配置
 */
export default function SacredObjects({ visibility }) {
  // 黄金比: 全体をφで分割し、各オブジェクトを配置
  // 左端: 38.2% | 中央: 61.8% | 右端: 85.4%

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center"
      style={{
        opacity: visibility,
        transition: "opacity 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {/* 過去 — 極小の円 */}
      <div
        className="absolute float-gentle"
        style={{
          left: "38.2%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          className="rounded-full bg-[#555]"
          style={{
            width: "6px",
            height: "6px",
            boxShadow: "0 0 20px rgba(85,85,85,0.15)",
            transition: "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        />
      </div>

      {/* 現在 — M A R G I N テキスト */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span
          className="text-[#4a4a4a] font-light select-none"
          style={{
            fontSize: "13px",
            letterSpacing: "0.85em",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontWeight: 200,
          }}
        >
          M A R G I N
        </span>
        {/* 日本語サブタイトル */}
        <div
          className="text-center mt-6"
          style={{
            opacity: visibility * 0.4,
            transition: "opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <span
            className="text-[#888] select-none"
            style={{
              fontSize: "9px",
              letterSpacing: "0.5em",
              fontFamily: "var(--font-noto-jp), 'Noto Sans JP', sans-serif",
              fontWeight: 200,
            }}
          >
            余 白
          </span>
        </div>
      </div>

      {/* 未来 — かすかな垂直線 */}
      <div
        className="absolute float-gentle"
        style={{
          left: "61.8%",
          top: "50%",
          transform: "translateY(-50%)",
          animationDelay: "2s",
        }}
      >
        <div
          className="bg-[#555]"
          style={{
            width: "1px",
            height: "48px",
            opacity: 0.7,
            boxShadow: "0 0 15px rgba(85,85,85,0.1)",
          }}
        />
      </div>
    </div>
  );
}
