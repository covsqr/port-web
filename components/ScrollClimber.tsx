"use client";

import React, { useEffect, useState, useRef } from "react";

export default function ScrollClimber() {
  const [holds, setHolds] = useState<any[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [snapY, setSnapY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const [isAutoClimbing, setIsAutoClimbing] = useState(false);
  const [isFalling, setIsFalling] = useState(false);

  const targetYRef = useRef(0);
  const needsInstantSnap = useRef(false);

  const SVGFrames = [
    // Frame 1: Rest
    <svg width="160" height="430" viewBox="0 -22 32 64" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="16" cy="18" r="2" fill="#fff" />
      <line x1="16" y1="20" x2="16" y2="28" />
      <polyline points="16,21 12,10 8,0" />
      <polyline points="16,21 20,20 24,20" />
      <polyline points="16,28 12,35 8,40" />
      <polyline points="16,28 22,35 26,35" />
    </svg>,
    // Frame 2: Squat
    <svg width="160" height="430" viewBox="0 -22 32 64" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="16" cy="12" r="2" fill="#fff" />
      <line x1="16" y1="14" x2="16" y2="22" />
      <polyline points="16,15 12,5 8,0" />
      <polyline points="16,15 20,20 24,20" />
      <polyline points="16,22 12,30 8,40" />
      <polyline points="16,22 20,20 24,20" />
    </svg>,
    // Frame 3: Reach (Dyno)
    <svg width="160" height="430" viewBox="0 -22 32 64" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="16" cy="5" r="2" fill="#fff" />
      <line x1="16" y1="7" x2="16" y2="15" />
      <polyline points="16,8 12,2 8,0" />
      <polyline points="16,8 20,-10 24,-20" />
      <polyline points="16,15 12,30 8,40" />
      <polyline points="16,15 20,18 24,20" />
    </svg>,
    // Frame 4: Lock-off
    <svg width="160" height="430" viewBox="0 -22 32 64" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="20" cy="-2" r="2" fill="#fff" />
      <line x1="20" y1="0" x2="20" y2="8" />
      <polyline points="20,1 15,0 8,0" />
      <polyline points="20,1 22,-10 24,-20" />
      <polyline points="20,8 15,20 12,30" />
      <polyline points="20,8 22,20 24,20" />
    </svg>
  ];

  // Sparse Hold Generation
  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const blockSize = 100;
    const totalBlocks = Math.floor(scrollHeight / blockSize);

    const generatedHolds = [];
    for (let i = 0; i <= totalBlocks; i++) {
      const isLeft = i % 2 === 0;
      generatedHolds.push({
        top: i * blockSize + 110,
        left: isLeft ? 40 : 120,
        width: 32 + Math.random() * 8,
        height: 24 + Math.random() * 6,
        borderRadius: `${40 + Math.random() * 40}% ${30 + Math.random() * 50}% ${40 + Math.random() * 40}% ${30 + Math.random() * 50}%`,
        transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
        backgroundColor: `hsl(${40 + Math.random() * 15}, 90%, 50%)`,
      });
    }
    setHolds(generatedHolds);
  }, []);

  // Initialization: 대기열(페이지 하단)로 위치 영구 고정
  useEffect(() => {
    const initClimber = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const bottomBase = docHeight - viewHeight * 0.5;
      const startY = Math.round(bottomBase / 100) * 100;

      targetYRef.current = startY;
      setCurrentY(startY);
      setIsReady(true);
    };

    // DOM 로드 높이를 확보하기 위해 약간의 딜레이
    setTimeout(initClimber, 100);
  }, []);

  // Auto-Climb Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updatePosition = (time: number) => {
      let dt = time - lastTime;
      if (dt > 100) dt = 16;
      lastTime = time;

      if (isAutoClimbing) {
        // 초당 200px (2칸) 속도로 정상(0)을 향해 뚫고 올라감!
        let newTarget = targetYRef.current - (200 * dt / 1000);

        if (newTarget <= 0) {
          newTarget = 0;
          setIsAutoClimbing(false);
          setIsFalling(true); // 맨 위 도달 시 구역 낙하 시퀀스 돌입

          setTimeout(() => {
            setIsFalling(false);
            // 1.5초 자유 낙하 후 조용히 시작 거점으로 복귀시켜 리셋
            const docHeight = document.documentElement.scrollHeight;
            const viewHeight = window.innerHeight;
            const bottomBase = docHeight - viewHeight * 0.5;
            targetYRef.current = Math.round(bottomBase / 100) * 100;
            needsInstantSnap.current = true;
          }, 1500);
        }

        targetYRef.current = newTarget;

        // 카메라(브라우저 스크롤)가 캐릭터를 즉각적으로 쫓아가도록 락온
        window.scrollTo({
          top: newTarget - window.innerHeight * 0.5,
          behavior: "instant"
        });
      }

      setCurrentY((prev) => {
        if (needsInstantSnap.current) {
          needsInstantSnap.current = false;
          return targetYRef.current;
        }

        const diff = targetYRef.current - prev;
        const nextY = Math.abs(diff) < 0.5 ? targetYRef.current : prev + diff * 0.15;

        const cycle = Math.ceil(nextY / 100);
        const currentSnapY = cycle * 100;

        const frameFloat = (currentSnapY - nextY) / 25;
        let f = Math.floor(frameFloat) % 4;
        if (f < 0) f += 4;

        setFrameIndex(f);
        setIsFlipped(cycle % 2 !== 0);
        setSnapY(currentSnapY);

        return nextY;
      });
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoClimbing]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "160px",
          background: "#161616",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          zIndex: 40,
        }}
      >
        {/* Background Holds */}
        {holds.map((hold, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: `${hold.top}px`,
              left: `${hold.left}px`,
              width: `${hold.width}px`,
              height: `${hold.height}px`,
              borderRadius: hold.borderRadius,
              transform: hold.transform,
              backgroundColor: hold.backgroundColor,
              boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.8)",
            }}
          />
        ))}

        {/* Climber Character */}
        <div
          style={{
            position: "absolute",
            top: `${snapY - 62}px`,
            left: "50%",
            transform: isFalling
              ? `translateX(-50%) translateY(120vh) rotate(540deg) scale(0.6)` // 거침없이 추락
              : `translateX(-50%) ${isFlipped ? "scaleX(-1)" : ""}`,
            transition: isFalling
              ? "transform 1.5s cubic-bezier(0.8, 0, 1, 1), top 0s"
              : "none", // 등반 중에는 좌표가 100px 단위로 텔레포트하므로 CSS transition이 들어가면 캐릭터가 일그러짐(Spaz)
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            willChange: "top, transform",
          }}
        >
          <div
            style={{
              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.9))",
              zIndex: 10,
            }}
          >
            {SVGFrames[frameIndex]}
          </div>
        </div>
      </div>

      {/* Auto-Climb Trigger Button */}
      {isReady && !isAutoClimbing && !isFalling && targetYRef.current > 0 && (
        <button
          onClick={() => setIsAutoClimbing(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(255, 138, 0, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(255, 138, 0, 0.4)";
          }}
          style={{
            position: "absolute",
            top: `${snapY - 30}px`,
            right: "180px", // 우측 벽을 뚫고 넉넉히 바깥쪽(왼쪽)에 배치
            background: "linear-gradient(135deg, #FFB800, #FF8A00)",
            color: "#111",
            fontWeight: 800,
            fontSize: "15px",
            padding: "16px 28px",
            borderRadius: "40px", // 둥근 직사각형
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(255, 138, 0, 0.4)",
            transition: "all 0.2s ease-in-out",
            zIndex: 50,
          }}
        >
          페이지 올라가기 🧗‍♂️
        </button>
      )}
    </>
  );
}
