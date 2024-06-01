"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
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
  const { isLoggedIn } = useData();
  const [writersPopup, setWriterPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useData();
  const [currentPageNo, setCurrentPage] = useState(0);

  function stopAutoScroll() {
    clearTimeout(timeoutRef.current as number);
    clearTimeout(scrollTimeoutRef.current as number);
  }

  function handleVerticalScroll(e: Event) {
    if (!vcarouselRef.current) return;
    stopAutoScroll();

    // if (vcarouselRef.current.scrollTop < 10) {
    //  //first vertical page
    // } else {
    //  //other vertical pages
    // }
  }

  function handlehScrollToKnowFirstPage() {
    if (!hcarouselRef.current) return;
    clearTimeout(timeoutRef.current as number);
    if (hcarouselRef.current.scrollLeft == 0) {
      setCurrentPage(0);
    } else {
      ["w1", "w2", "w3"].forEach((id, index) => {
        const page = document.getElementById(id);
        if (page) {
          const rect = page.getBoundingClientRect();
          if (rect.left < 10) {
            setCurrentPage(index + 1);
            console.log("page found", index + 1);
          }
        }
      });
    }
  }

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      hcarouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    }, 2800);

    // hcarouselRef.current?.addEventListener("scroll", handleHorizontalScroll);
    vcarouselRef.current?.addEventListener("scroll", handleVerticalScroll);
    hcarouselRef.current?.addEventListener(
      "scroll",
      handlehScrollToKnowFirstPage
    );
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
      vcarouselRef.current?.removeEventListener("scroll", handleVerticalScroll);
      hcarouselRef.current?.removeEventListener(
        "scroll",
        handlehScrollToKnowFirstPage
      );
      window.removeEventListener("resize", handleZoom);

      clearTimeout(timeoutRef.current as number);
      clearTimeout(scrollTimeoutRef.current as number);
    };
  }, []);

  function handleNextButton() {
    if (!hcarouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = hcarouselRef.current;

    if (scrollWidth - (scrollLeft + clientWidth) < 20) {
      hcarouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      hcarouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }

  function handlePrvButton() {
    if (!hcarouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = hcarouselRef.current;

    if (scrollLeft == 0) {
      hcarouselRef.current.scrollBy({ left: 0, behavior: "smooth" });
    } else {
      hcarouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  }

  function handleMouseEnter() {
    console.log("Mouse Enter");
    setIsHovered(true);
    stopAutoScroll();
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }

  function handleMouseLeave() {
    setIsHovered(false);
    console.log("Mouse Leave");
  }

  return (
    <div className="home" ref={vcarouselRef}>
      <div className="right-arrow"></div>

      <div className="horizontal-carousel-outer home-page-section">
        <div className="page-indicator">
          <div className="page-indicator-inner">
            {(user ? [0, 1, 2, 3] : [0, 1]).map((i) => {
              return (
                <div
                  key={i}
                  className={`page-indicator-item ${
                    i == currentPageNo ? "active" : ""
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
        {currentPageNo !== 0 && (
          <div
            className="left-arrow"
            onClick={handlePrvButton}
            // onMouseEnter={handleMouseEnter}
          >
            <FaChevronLeft size={24} />
          </div>
        )}
        <div
          className="right-arrow"
          onClick={handleNextButton}
          // onMouseEnter={handleMouseEnter}
        >
          <FaChevronRight size={24} />
        </div>
        <TopBar stopAutoScroll={stopAutoScroll} />
        <div
          className="horizontal-carousel home-pagex-section"
          ref={hcarouselRef}
        >
          <HomeSection stopAutoScroll={stopAutoScroll} />
          <WriterSection1 />
          {isLoggedIn && (
            <>
              <WriterSection2 />
              <WriterSection3 />
            </>
          )}
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
