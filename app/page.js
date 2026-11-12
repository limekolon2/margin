"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import NoiseLayer from "./components/NoiseLayer";
import ConcreteTexture from "./components/ConcreteTexture";
import LightBeam from "./components/LightBeam";
import SacredObjects from "./components/SacredObjects";
import ProgressIndicator from "./components/ProgressIndicator";
import QuitButton from "./components/QuitButton";

/**
 * 『余白 (MARGIN)』
 * ──────────────────────
 * 視界を埋めるノイズを、指先のスクロールで少しずつ削ぎ落としていく。
 * スコアも、クリアもなく、ただ永続する静寂を追い求める。
 */

// ノイズが自然回復する速度（ノイズは常に微かに戻ろうとする）
const NOISE_RECOVERY_RATE = 0.015;
// ノイズ回復が始まるまでの待機時間(ms)
const RECOVERY_DELAY = 3000;
// ダイヤル感度
const DIAL_SENSITIVITY = 0.08;

export default function MarginSpace() {
  // ── 状態管理 ──
  const [noiseLevel, setNoiseLevel] = useState(100);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasReachedZen, setHasReachedZen] = useState(false);
  const lastInteractionRef = useRef(Date.now());
  const animationFrameRef = useRef(null);

  // ── 操作系: ダイヤル回転（ホイールイベント）でノイズを削る ──
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      lastInteractionRef.current = Date.now();
      setIsInteracting(true);

      setNoiseLevel((prev) => {
        // deltaYが正（下スクロール）= ノイズ減少、負（上スクロール）= ノイズ増加
        const delta = e.deltaY * DIAL_SENSITIVITY;
        const nextLevel = prev - delta;
        const clamped = Math.min(Math.max(nextLevel, 0), 100);

        // 禅の境地に到達
        if (clamped <= 0.5 && !hasReachedZen) {
          setHasReachedZen(true);
        }

        return clamped;
      });
    },
    [hasReachedZen]
  );

  // ── タッチ操作対応（iPad用） ──
  const touchStartRef = useRef(null);
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (touchStartRef.current === null) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartRef.current - currentY;
      touchStartRef.current = currentY;
      lastInteractionRef.current = Date.now();
      setIsInteracting(true);

      setNoiseLevel((prev) => {
        const delta = deltaY * DIAL_SENSITIVITY * 0.5;
        const nextLevel = prev - delta;
        const clamped = Math.min(Math.max(nextLevel, 0), 100);
        if (clamped <= 0.5 && !hasReachedZen) {
          setHasReachedZen(true);
        }
        return clamped;
      });
    },
    [hasReachedZen]
  );

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  // ── ノイズの自然回復ループ ──
  // 操作をやめるとノイズがゆっくり戻ってくる（静寂は永続しない）
  useEffect(() => {
    const tick = () => {
      const timeSinceInteraction =
        Date.now() - lastInteractionRef.current;

      if (timeSinceInteraction > RECOVERY_DELAY) {
        setIsInteracting(false);
        setNoiseLevel((prev) => {
          if (prev >= 100) return 100;
          // 禅の境地に達した場合、回復は極めて緩やか
          const rate = hasReachedZen
            ? NOISE_RECOVERY_RATE * 0.3
            : NOISE_RECOVERY_RATE;
          return Math.min(prev + rate, 100);
        });
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasReachedZen]);

  // ── パッシブでないホイールイベントを登録（preventDefault用） ──
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchMove]);

  // ── 視覚制御 ──
  const noiseOpacity = noiseLevel / 100;
  const objectVisibility = Math.max(0, 1 - noiseOpacity);

  // ── 禅の境地メッセージ ──
  const zenMessageOpacity =
    hasReachedZen && noiseLevel <= 1 ? 0.4 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden cursor-default"
      style={{
        backgroundColor: "#c8c4be",
        touchAction: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* レイヤー1: コンクリートの質感（建材）— 常に存在 */}
      <ConcreteTexture visibility={objectVisibility} />

      {/* レイヤー2: 一筋の自然光（アンカー） */}
      <LightBeam visibility={objectVisibility} />

      {/* レイヤー3: 究極の均衡を保つ3つのオブジェクト */}
      <SacredObjects visibility={objectVisibility} />

      {/* レイヤー4: ノイズ（煩悩）— 最前面 */}
      <NoiseLayer opacity={noiseOpacity} />

      {/* 進捗インジケーター */}
      <ProgressIndicator noiseLevel={noiseLevel} />

      {/* やめてポータルに戻る — ノイズに負けないよう最前面に、ただし静かに */}
      <div className="absolute top-6 left-6 z-[70]">
        <QuitButton
          note="この庭は保存されません。次に開くと、またノイズから始まります。"
          theme={{
            panel: "#e4e1dc",
            text: "#3a3835",
            sub: "#77736d",
            border: "rgba(0,0,0,0.12)",
            accent: "#3a3835",
            accentText: "#e4e1dc",
            font: "var(--font-noto-jp), 'Noto Sans JP', sans-serif",
            radius: 2,
          }}
          style={{
            background: "rgba(200,196,190,0.6)",
            color: "#77736d",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 2,
            padding: "6px 12px",
            fontSize: 10,
            letterSpacing: "0.3em",
            cursor: "pointer",
            fontFamily: "var(--font-noto-jp), 'Noto Sans JP', sans-serif",
          }}
        />
      </div>

      {/* 操作ヒント — 初期状態でのみ表示 */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
        style={{
          opacity: noiseLevel >= 95 ? 0.35 : 0,
          transition: "opacity 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-[#888] text-[9px] font-mono tracking-[0.3em]">
            SCROLL TO SUBTRACT
          </div>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="animate-bounce opacity-50"
          >
            <rect
              x="5"
              y="1"
              width="6"
              height="10"
              rx="3"
              stroke="#888"
              strokeWidth="1"
            />
            <line
              x1="8"
              y1="4"
              x2="8"
              y2="7"
              stroke="#888"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M4 16 L8 20 L12 16"
              stroke="#888"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 禅の境地メッセージ */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
        style={{
          opacity: zenMessageOpacity,
          transition: "opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <span
          className="text-[#999] text-[8px] tracking-[0.5em]"
          style={{
            fontFamily: "var(--font-noto-jp), 'Noto Sans JP', sans-serif",
            fontWeight: 200,
          }}
        >
          静 寂 は 永 続 し な い
        </span>
      </div>

      {/* インタラクション状態のフィードバック — 画面の端に微かなバイブレーション */}
      <div
        className="absolute inset-0 pointer-events-none z-[55] border border-white/0"
        style={{
          borderColor: isInteracting
            ? "rgba(255,255,255,0.03)"
            : "rgba(255,255,255,0)",
          transition: "border-color 0.3s ease",
        }}
      />
    </div>
  );
}
