"use client";

import React, { useEffect, useState } from "react";
import img1 from "@/public/home/img1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import { useRouter } from "next/navigation";
import useData from "@/hooks/useData";
import Image from "next/image";
import { createPortal } from "react-dom";
export default function HomeSection() {
  const router = useRouter();
  const { isLoggedIn } = useData();
  const [showWriterPopup, setShowWriterPopup] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     document.getElementById("overlay")!.className = "";
  //     document.documentElement.style.overflow = "auto";
  //     setShowWriterPopup(true);
  //   }, 1000);
  // }, []);
  return (
    <div
      className="home-page home-page-section horizontal-section page"
      id="home"
    >
      {showWriterPopup &&
        createPortal(
          <div className="writer-popup">
            <h2>Writers Benfit Program</h2>
          </div>,
          document.getElementById("overlay")!
        )}
      <motion.p
        initial={{ opacity: 0, y: 150 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileInView={{ opacity: 1.0, y: 0 }}
        className="title"
      >
        WELECOME TO ONE NOVEL WHERE EVERY PAGE TELLS A STORY
      </motion.p>

      <Image className="main-img" src={img1} alt="home page" priority={true} />
      {!isLoggedIn && (
        <motion.button
          initial={{ opacity: 0, y: 300 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="floating-btn"
          onClick={() => router.push("/register")}
        >
          JOIN NOW
        </motion.button>
      )}
    </div>
  );
}
