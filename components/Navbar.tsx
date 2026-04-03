"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    transition: "all 0.3s ease",
    background: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
  };

  const linkStyle = {
    marginLeft: "2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  const logoStyle: React.CSSProperties = {
    display: "inline-block",
    fontWeight: 900,
    fontSize: "1.2rem",
    letterSpacing: "-0.05em",
    transition: "transform 0.3s ease",
    transform: hovered ? "rotate(90deg)" : "rotate(0deg)",
  };

  return (
    <nav style={navStyle}>
      <div>
        <a
          href="#hero"
          style={logoStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          KrJ
        </a>
      </div>
      <div>
        <a href="#expertise" style={linkStyle}>Expertise</a>
        <a href="#projects" style={linkStyle}>Projects</a>
        <a href="#experience" style={linkStyle}>History</a>
      </div>
    </nav>
  );
}