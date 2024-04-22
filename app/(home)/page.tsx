"use client";

import React, { useEffect, useState } from "react";
import HomeSection from "./HomeSection";
import ProductSection from "./ProductSection";
import WhySection from "./WhySection";
import AboutSection from "./AboutSection";
// import "./home.scss";
import useData from "@/hooks/useData";

export default function Home() {
  //   const { isLoggedIn } = useData();

  // useEffect(() => {
  //   const metaThemeColor = document.querySelector("meta[name='theme-color']");
  //   if (!metaThemeColor) return;
  //   metaThemeColor.setAttribute("content", "#e8eeee");
  // }, []);

  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      metaThemeColor.setAttribute("content", "#1c1c1c");
    } else {
      metaThemeColor.setAttribute("content", "#f5f4f0");
    }
  }, []);

  useEffect(() => {
    function handleZoom() {
      // find which page is in view
      const item = {
        id: "none",
        top: 999999,
      };
      const pages = Array.from(document.querySelectorAll(".home-page-section"));
      for (const page of pages) {
        const rect = page.getBoundingClientRect();
        if (item.top > Math.abs(rect.top)) {
          item.id = page.id;
          item.top = Math.abs(rect.top);
        }
      }
      if (item.id != "none") {
        const page = document.getElementById(item.id);
        if (page) page.scrollIntoView({ behavior: "instant" });
      }
    }
    window.addEventListener("resize", handleZoom);

    return () => {
      window.removeEventListener("resize", handleZoom);
    };
  }, []);
  return (
    <div className="home">
      <HomeSection />
      <ProductSection />
      <WhySection />
      <AboutSection />
    </div>
  );
}
