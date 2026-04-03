"use client";

import React from "react";

export default function Projects() {
  const sectionStyle: React.CSSProperties = {
    padding: "100px 0",
    minHeight: "100vh",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "3rem",
    marginTop: "3rem",
  };

  const projectCardStyle: React.CSSProperties = {
    position: "relative",
    aspectRatio: "16/9",
    overflow: "hidden",
    borderRadius: "16px",
    background: "#111",
    cursor: "pointer",
    border: "1px solid var(--border-color)",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(100%)",
    transition: "filter 0.5s ease, transform 0.5s ease",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "2rem",
    background: "linear-gradient(0deg, #000 0%, transparent 100%)",
    color: "#fff",
    transform: "translateY(20px)",
    opacity: 0,
    transition: "all 0.3s ease",
  };

  const projects = [
    {
      name: "Handtexting",
      type: "Vibe-Coding / Utility",
      desc: "수기 과학실험보고서 작성을 대체하고자 txt 파일을 손글씨 형태의 pdf로 자동 변환해주는 프로그램을 바이브코딩으로 개발했습니다.",
      img: "/project_handtexting.png"
    },
    {
      name: "Hearts of Iron 데이터 분석",
      type: "Machine Learning",
      desc: "전쟁 게임 '하츠오브아이언'에서 머신러닝을 활용해 군대 규모를 분석하고 효율적인 최적의 부대 배치를 도출해낸 데이터 과학 프로젝트입니다.",
      img: "/project_hoi.png"
    },
    {
      name: "과외공방 기획",
      type: "Business Plan (CAS:TIS)",
      desc: "CAS:TIS 기업 신사업 공모전에 제출한 아이디어로, AI를 활용하여 학생 수준별 맞춤형 교안을 제작하는 비즈니스 모델입니다.",
      img: "/project_tutoring.png"
    },
    {
      name: "Keysave",
      type: "Vibe-Coding / Utility",
      desc: "어떠한 타자를 치더라도 사전에 작성해 둔 txt 파일의 내용이 순차적으로 입력되는 프로그램. 한글의 자음 모음 결합 처리까지 완벽하게 지원하도록 바이브코딩을 통해 개발했습니다.",
      img: "/project_keysave.png"
    }
  ];

  return (
    <section id="projects" className="container" style={sectionStyle}>
      <h2 className="section-title">Selected Projects</h2>
      <div style={gridStyle}>
        {projects.map((proj, idx) => (
          <div
            key={idx}
            style={projectCardStyle}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLDivElement;
              if (img) {
                img.style.filter = 'grayscale(0%)';
                img.style.transform = 'scale(1.05)';
              }
              if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
              }
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLDivElement;
              if (img) {
                img.style.filter = 'grayscale(100%)';
                img.style.transform = 'scale(1)';
              }
              if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
              }
            }}
          >
            <img src={proj.img} alt={proj.name} style={imageStyle} />
            <div className="overlay" style={overlayStyle}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.2rem" }}>{proj.name}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{proj.type}</p>
              <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: "1.4" }}>{proj.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
