import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import ScrollClimber from "@/components/ScrollClimber";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar />
      <ScrollClimber />
      <main style={{ paddingRight: "160px" }}>
        <Hero />
        <Expertise />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
