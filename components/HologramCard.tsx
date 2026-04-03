"use client";

import React, { useRef, useState, MouseEvent, useEffect } from "react";
import styles from "./HologramCard.module.css";

export default function HologramCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation
    const maxRotation = 15;
    const rotX = ((y - centerY) / centerY) * -maxRotation;
    const rotY = ((x - centerX) / centerX) * maxRotation;
    
    setRotateX(rotX);
    setRotateY(rotY);
    
    // Calculate glare position
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div className={styles.cardContainer}>
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        <div 
          className={styles.glare} 
          style={{
            background: `linear-gradient(105deg, transparent 20%, rgba(255,100,100,0.7) 25%, rgba(255,200,100,0.7) 35%, rgba(100,255,100,0.7) 45%, rgba(100,200,255,0.7) 55%, rgba(200,100,255,0.7) 65%, transparent 70%)`,
            backgroundSize: "300% 300%",
            backgroundPosition: `${glarePosition.x}% ${glarePosition.y}%`
          }}
        />
        {/* 업로드한 이미지 사용 (public 폴더에 profile.jpg 저장 필요) */}
        <img 
          src="/profile_climbing.png" 
          alt="Profile" 
          className={styles.profileImage}
        />
        <div className={styles.content}>
          <h2 className={styles.name}>최준서</h2>
          <p className={styles.role}>"창업은 선택을 만드는 것"</p>
        </div>
      </div>
    </div>
  );
}
