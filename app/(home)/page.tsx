"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import useData from "@/hooks/useData";

import HomeSection from "./HomeSection";
import ProductSection from "./ProductSection";
import WhySection from "./WhySection";
import AboutSection from "./AboutSection";
import WriterSection1 from "./(writer)/WriterSection";
import WriterSection2 from "./(writer)/WriterSection2";
import WriterSection3 from "./(writer)/WriterSection3";
import TopBar from "./TopBar";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Home() {
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

  // handle scroll
  const hcarouselRef = useRef<HTMLDivElement | null>(null);
  const vcarouselRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const [writersPopup, setWriterPopup] = useState(false);

  function showWriterPopup() {
    setWriterPopup(true);
    document.getElementById("overlay")!.className = "";
    document.documentElement.style.overflow = "auto";
  }
  function hideWriterPopup() {
    setWriterPopup(false);
    document.getElementById("overlay")!.className = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function autoScroll() {
    if (!hcarouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = hcarouselRef.current;

    if (scrollWidth - (scrollLeft + clientWidth) < 20) {
      hcarouselRef.current.scrollTo({ left: 0, behavior: "instant" });
    } else hcarouselRef.current.scrollBy({ left: 300, behavior: "smooth" });

    timeoutRef.current = window.setTimeout(autoScroll, 2200);
  }

  function handleHorizontalScroll(e: Event) {
    if (scrollTimeoutRef.current !== null) {
      clearTimeout(scrollTimeoutRef.current);
    }
    clearTimeout(timeoutRef.current as number);
    scrollTimeoutRef.current = window.setTimeout(() => {
      autoScroll();
    }, 2500);
    // Wait for 2 seconds before auto scrolling again
  }

  function stopAutoScroll() {
    clearTimeout(timeoutRef.current as number);
    clearTimeout(scrollTimeoutRef.current as number);
  }

  function handleVerticalScroll(e: Event) {
    // if at top page: start auto scroll and clear previous timeout
    // else at other page: stop auto scroll and scroll to first page ( after small delay )

    if (!vcarouselRef.current) return;
    if (vcarouselRef.current.scrollTop < 10) {
      console.log("Scroll Started: go to First vertical section");
      clearTimeout(timeoutRef.current as number);
      timeoutRef.current = window.setTimeout(() => {
        autoScroll();
      }, 2000);
    } else {
      console.log("Scroll Stoped: go to other vertical section");
      stopAutoScroll();
      setTimeout(() => {
        if (hcarouselRef.current)
          hcarouselRef.current.scrollTo({ left: 0, behavior: "instant" });
      }, 300);
      console.log(timeoutRef.current);
    }
  }

  useEffect(() => {
    // setTimeout(() => {
    //   hideWriterPopup();
    // }, 2000);
    // showWriterPopup();
    setTimeout(() => {
      autoScroll();
    }, 2800);
    hcarouselRef.current?.addEventListener("scroll", handleHorizontalScroll);
    vcarouselRef.current?.addEventListener("scroll", handleVerticalScroll);
    window.addEventListener("resize", handleZoom);

    // handle status bar theme
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        metaThemeColor.setAttribute("content", "#1c1c1c");
      } else {
        metaThemeColor.setAttribute("content", "#f5f4f0");
      }
    }

    return () => {
      hcarouselRef.current?.removeEventListener(
        "scroll",
        handleHorizontalScroll
      );
      vcarouselRef.current?.removeEventListener("scroll", handleVerticalScroll);
      window.removeEventListener("resize", handleZoom);

      clearTimeout(timeoutRef.current as number);
      clearTimeout(scrollTimeoutRef.current as number);
    };
  }, []);

  return (
    <div className="home" ref={vcarouselRef}>
      {/* <HomeSection /> */}
      {/* <HorizontalCarousel /> */}
      <div className="horizontal-carousel-outer home-page-section">
        <TopBar stopAutoScroll={stopAutoScroll} />
        <div
          className="horizontal-carousel home-pagex-section"
          ref={hcarouselRef}
        >
          <HomeSection stopAutoScroll={stopAutoScroll} />
          <WriterSection1 />
          <WriterSection2 />
          <WriterSection3 />
        </div>
      </div>
      <ProductSection />
      <WhySection />
      <AboutSection />
      {writersPopup &&
        createPortal(
          <motion.div
            initial={{ scale: 0, y: 150 }}
            animate={{ scale: 1, y: 0 }}
            className="writer-popup"
            onClick={() => {
              // this is to prevent the popup from closing when click the overlay
            }}
          >
            <h2>Writers Benfit Program</h2>
            <div className="flex">
              <img src="" alt="" />
            </div>
          </motion.div>,
          document.getElementById("overlay")!
        )}
    </div>
  );
}
