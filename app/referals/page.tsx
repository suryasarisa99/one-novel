"use client";
import React, { useState, useEffect, useRef } from "react";
import TopPageBar from "@/components/TopBarPage";
import useData from "@/hooks/useData";
import { useRouter } from "next/navigation";

export default function TrnasactionsPage() {
  const router = useRouter();
  const { user } = useData();
  const [selectedReferal, setSelectedReferal] = useState<1 | 2 | 3 | 4>(1);
  const referalsLevels = [1, 2, 3, 4];

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
  if (!user) return null;

  return (
    <div className="transactions-page">
      <TopPageBar title="Referals" onClick={() => router.back()} />

      <div className="referal-selector">
        {referalsLevels.map((level) => {
          return (
            <div
              key={level}
              className={
                "referal-lvl " + (selectedReferal == level ? "selected" : "")
              }
              onClick={() => setSelectedReferal(level as 1 | 2 | 3 | 4)}
            >
              {level}
            </div>
          );
        })}
      </div>

      <div className="referals">
        {user.children[
          ("level" + selectedReferal) as
            | "level1"
            | "level2"
            | "level3"
            | "level4"
        ].map((referal) => {
          return (
            <div className="referal" key={referal._id}>
              <div className="left">
                <p className="name">{referal.name}</p>
                <p className="id">{referal._id}</p>
              </div>
              <div
                className={"status " + (referal.valid ? "valid" : "invalid")}
              >
                {referal.valid ? "Valid" : "Invalid"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
