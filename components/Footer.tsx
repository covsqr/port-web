import React from "react";

export default function Footer() {
  const footerStyle: React.CSSProperties = {
    padding: "4rem 2rem",
    borderTop: "1px solid var(--border-color)",
    textAlign: "center",
    marginTop: "5rem",
  };

  const linkStyle: React.CSSProperties = {
    margin: "0 1rem",
    color: "var(--text-secondary)",
    fontWeight: 600,
    fontSize: "0.9rem",
  };

  return (
    <footer style={footerStyle}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Contacts</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        편하게 연락주세요
      </p>
      <div style={{ marginBottom: "3rem" }}>
        <a href="mailto:1097cjs@gmail.com" style={linkStyle}>Email</a>
        <a href="https://github.com/covsqr" style={linkStyle} target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://instagram.com/krjseo" style={linkStyle} target="_blank" rel="noreferrer">Instagram</a>
      </div>
      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", opacity: 0.5 }}>
        &copy; {new Date().getFullYear()} Choi Junseo. All rights reserved. Black & White aesthetics.
      </p>
    </footer>
  );
}
