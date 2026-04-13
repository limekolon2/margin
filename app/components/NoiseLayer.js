"use client";

import { useMemo } from "react";

/**
 * ノイズレイヤー — 煩悩のアラート群
 * noiseLevel が高いほど濃く表示される
 */

const CHAOS_MESSAGES = [
  "ALERT_OVERLOAD",
  "UNREAD_MESSAGES: 99+",
  "SYSTEM_ERROR_PENDING",
  "TASKS_ACCUMULATING...",
  "NOTIFICATION_STORM",
  "DEADLINE_APPROACHING",
  "INBOX_OVERFLOW: 2,847",
  "MEETING_CONFLICT_DETECTED",
  "SYNC_FAILURE_x42",
  "PRIORITY_ESCALATION",
  "MEMORY_LEAK_ACTIVE",
  "CONNECTION_UNSTABLE",
  "UPDATE_REQUIRED_URGENT",
  "CACHE_CORRUPTED",
  "QUEUE_SATURATED",
  "RESPONSE_TIMEOUT",
  "BUFFER_OVERFLOW",
  "THREAD_DEADLOCK",
  "API_RATE_LIMITED",
  "DISK_SPACE_CRITICAL",
  "SESSION_EXPIRING",
  "TOKEN_REVOKED",
  "PATCH_FAILED",
  "ROLLBACK_INITIATED",
  "DEPENDENCY_CONFLICT",
  "BUILD_BROKEN",
  "DEPLOY_BLOCKED",
  "QUOTA_EXCEEDED",
  "PERMISSION_DENIED",
  "ENTROPY_RISING",
];

export default function NoiseLayer({ opacity }) {
  // テキストグリッドを生成（パフォーマンスのためメモ化）
  const chaosGrid = useMemo(() => {
    const rows = [];
    for (let i = 0; i < 60; i++) {
      const msg = CHAOS_MESSAGES[i % CHAOS_MESSAGES.length];
      rows.push(
        <span
          key={i}
          className="chaos-text inline-block px-3 py-1"
          style={{
            animationDelay: `${(i * 0.13) % 2}s`,
            opacity: 0.3 + ((i * 7 + 3) % 10) * 0.07,
          }}
        >
          {msg}
        </span>
      );
    }
    return rows;
  }, []);

  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 z-50 pointer-events-none transition-opacity"
      style={{
        opacity,
        transitionDuration: "150ms",
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {/* 暗幕ベース */}
      <div className="absolute inset-0 bg-[#1a1a1a]" />

      {/* スキャンライン効果 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* カオステキスト */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="chaos-scroll w-full max-w-6xl text-center leading-loose">
          <div className="text-[#3a3a3a] text-[10px] tracking-[0.3em] font-mono break-all px-8">
            {chaosGrid}
          </div>
          {/* 複製（無限スクロール用） */}
          <div className="text-[#3a3a3a] text-[10px] tracking-[0.3em] font-mono break-all px-8 mt-8">
            {chaosGrid}
          </div>
        </div>
      </div>

      {/* 赤い警告パルス */}
      <div
        className="absolute top-6 right-6 flex items-center gap-2"
        style={{ opacity: Math.min(opacity * 1.5, 1) }}
      >
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-red-500/60 text-[9px] font-mono tracking-widest">
          OVERLOAD
        </span>
      </div>
    </div>
  );
}
