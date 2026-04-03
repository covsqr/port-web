import React from "react";
import HologramCard from "./HologramCard";

export default function Hero() {
  const heroStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "60px", // account for navbar
  };

  const textStyle: React.CSSProperties = {
    flex: 1,
    paddingRight: "4rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "5rem",
    lineHeight: 1.1,
    marginBottom: "1.5rem",
    background: "var(--gradient-light)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const descStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    color: "var(--text-secondary)",
    maxWidth: "600px",
    marginBottom: "2rem",
  };

  const cardStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <section id="hero" className="container" style={heroStyle}>
      <div style={textStyle} className="animate-fade-in">
        <h1 style={titleStyle}>
          CHOI<br />JUN-SEO
        </h1>
        <div style={{ ...descStyle, lineHeight: "1.8", fontSize: "1.1rem" }}>
          <div>▪ <strong>소속:</strong> 성균관대학교 시스템경영공학과</div>
          <div>▪ <strong>생년월일:</strong> 2007. 06. 25</div>
          <div>▪ <strong>성향:</strong> 완벽주의, 즉흥적</div>
          <div>▪ <strong>관심사:</strong> 데이터 및 AI 기반 시스템 최적화</div>
        </div>
      </div>
      <div style={{ ...cardStyle, position: "relative" }}>
        <HologramCard />
        <div
          style={{
            position: "absolute",
            bottom: "-65px",
            right: "20%",
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
            opacity: 0.8,
            transform: "rotate(-5deg)"
          }}
          className="animate-fade-in"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          <span style={{ whiteSpace: "nowrap", fontFamily: "var(--font-sans, sans-serif)", fontStyle: "italic" }}>여기 커서 올리면 빛나요 ✨</span>
        </div>
      </div>
    </section>
  );
}
