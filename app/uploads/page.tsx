"use client";
import TopPageBar from "@/components/TopBarPage";
import useData from "@/hooks/useData";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

export default function UploadPage() {
  const { user } = useData();
  const router = useRouter();

  if (!user) return null;
  return (
    <div className="transactions-page">
      <TopPageBar title="Uploads" onClick={() => router.back()} />
      <div className="transactions">
        {user?.uploadedBooks.map((book, index) => {
          return (
            <div className="transaction upload" key={index}>
              <div className="left">
                {/* <button
                  onClick={() => {
                    open(book.url, "_blank");
                  }}
                >
                  View Book {index + 1}
                </button> */}
                Status
              </div>
              <div className="right">
                <p className={"status " + book.status}>{book.status}</p>
                {/* <div className="date">
                  {new Date(book.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
