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
              <p className="transaction-type">{transaction.transaction_type}</p>
              <p className={"transaction-type " + transaction.status}>
                {transaction.status}
              </p>
              <p className="transaction-type">{transaction.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
