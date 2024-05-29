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
      <TopPageBar title="Transactions" onClick={() => router.back()} />
      <div className="transactions">
        {user?.transactions.map((transaction, index) => {
          return (
            <div className="transaction" key={transaction._id}>
              <div className="top">
                <p className="transaction-type">
                  {transaction.transaction_type}
                </p>
                <p
                  className={
                    "amount " + (transaction.is_debit ? "deducted" : "added")
                  }
                >
                  {transaction.amount}
                </p>
              </div>
              <div className="bottom">
                <span className={"status " + transaction.status}>
                  {transaction.status}
                </span>
                <div className="date">
                  {new Date(transaction.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
