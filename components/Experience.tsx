import React from "react";

export default function Experience() {
  const sectionStyle: React.CSSProperties = {
    padding: "100px 0",
    minHeight: "100vh",
  };

  const timelineStyle: React.CSSProperties = {
    position: "relative",
    maxWidth: "800px",
    margin: "4rem auto 0",
  };

  const lineStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "2px",
    height: "100%",
    backgroundColor: "var(--border-color)",
  };

  const experiences = [
    { year: "2026", role: "신사업 공모전 사업계획서 제출", company: "CAS:TIS", desc: "'과외공방': AI를 통한 학생 맞춤형 교안 생성 사업 아이디어 기획" },
    { year: "2025", role: "성균관대학교 입학", company: "시스템경영공학과", desc: "경영과 엔지니어링의 융합적 사고를 바탕으로 시스템 최적화 방향 연구" },
    { year: "2024", role: "대구과학고등학교 졸업", company: "과학영재학교", desc: "심도 있는 수학/과학 탐구 및 데이터를 활용한 분석 연구 경험" },
    { year: "2021", role: "대도중학교 졸업", company: "", desc: "논리적 사고와 기틀 마련" }
  ];

  return (
    <section id="experience" className="container" style={sectionStyle}>
      <h2 className="section-title">History</h2>
      <div style={timelineStyle}>
        <div style={lineStyle}></div>
        {experiences.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={idx} style={{
              display: "flex",
              justifyContent: isLeft ? "flex-start" : "flex-end",
              paddingTop: "2rem",
              paddingBottom: "2rem",
              width: "100%",
              position: "relative"
            }}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-color)",
                  border: "4px solid #fff",
                  zIndex: 2,
                }}
              />
              <div className="glass-box" style={{ width: "45%", textAlign: isLeft ? "right" : "left" }}>
                <span style={{ color: "var(--text-secondary)", fontWeight: 600, fontSize: "0.9rem" }}>{exp.year}</span>
                <h3 style={{ fontSize: "1.25rem", margin: "0.5rem 0" }}>{exp.role}</h3>
                <h4 style={{ color: "var(--text-primary)", fontWeight: 400, marginBottom: "1rem" }}>{exp.company}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{exp.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
