"use client";
import React, { useState, useEffect, useRef } from "react";
import TopPageBar from "@/components/TopBarPage";
import useData from "@/hooks/useData";
import { useRouter } from "next/navigation";

export default function TrnasactionsPage() {
  const router = useRouter();
  const { user } = useData();
  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      metaThemeColor.setAttribute("content", "3e3a33");
    } else {
      metaThemeColor.setAttribute("content", "#ffffff");
    }
  }, []);
  return (
    <div className="transactions-page">
      <TopPageBar title="Rferals" onClick={() => router.back()} />
    </div>
  );
}
