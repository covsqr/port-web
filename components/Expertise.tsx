import React from "react";

export default function Expertise() {
  const sectionStyle: React.CSSProperties = {
    padding: "100px 0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  };

  const skills = [
    { title: "코딩 (Coding)", desc: "고등학교 시절 흥미를 갖고 시작해 Python을 주력으로 다루며 웹/앱 제작에 관심을 가졌고, 게임 개발을 위한 Godot 엔진까지 폭넓게 학습했습니다." },
    { title: "수학 (Mathematics)", desc: "순수수학에 깊은 매력을 느낍니다. 특히 고등학교 시절 위상수학을 주도적으로 공부하며 교내에서 관련 주제로 발표를 성공적으로 진행했습니다." },
    { title: "연구 (Research)", desc: "자율연구, R&E, 졸업연구 등 고교 내내 수학 중심의 연구를 지속했습니다. 틱택토의 3차원 확장 필승법 연구와 3차원 픽의 정리를 확장하기 위한 Ehrhart Equation 연구를 수행했습니다." }
  ];

  return (
    <section id="expertise" className="container" style={sectionStyle}>
      <h2 className="section-title">Expertise</h2>
      <div style={gridStyle}>
        {skills.map((skill, index) => (
          <div key={index} className="glass-box">
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{skill.title}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{skill.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
