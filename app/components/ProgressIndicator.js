"use client";

/**
 * 進捗インジケーター — ノイズレベルを静かに表示
 * 完全にクリアされると消える（それ自体もノイズだから）
 */
export default function ProgressIndicator({ noiseLevel }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const progress = (100 - noiseLevel) / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // ノイズが0になったら、インジケーター自体もフェードアウト
  const indicatorOpacity =
    noiseLevel <= 0 ? 0 : noiseLevel >= 99 ? 0.3 : 0.5;

  return (
    <div
      className="absolute bottom-8 right-8 z-[60] pointer-events-none"
      style={{
        opacity: indicatorOpacity,
        transition: "opacity 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <div className="relative flex items-center gap-3">
        {/* 円形プログレス */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          className="transform -rotate-90"
        >
          {/* 背景リング */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="rgba(85,85,85,0.15)"
            strokeWidth="1"
          />
          {/* プログレスリング */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="rgba(85,85,85,0.5)"
            strokeWidth="1"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="progress-ring"
          />
        </svg>

        {/* 数値 */}
        <span
          className="text-[#888] font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.15em",
          }}
        >
          {Math.round(100 - noiseLevel)}%
        </span>
      </div>
    </div>
  );
}
