"use client";

import React, { useEffect, useState } from "react";
import img1 from "@/public/home/img1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import { useRouter } from "next/navigation";
import useData from "@/hooks/useData";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
export default function HomeSection({
  stopAutoScroll,
}: {
  stopAutoScroll: () => void;
}) {
  const router = useRouter();
  const { isLoggedIn } = useData();
  return (
    <div
      className="home-page home-page-section horizontal-section page"
      id="home"
    >
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
        <Link href="/register" className="btn floating-btn">
          JOIN NOW
        </Link>
      )}
    </div>
  );
}
