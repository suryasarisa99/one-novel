"use client";

import React from "react";
import useData from "@/hooks/useData";
// import pdfFile from "@/public/jannu.pdf";

export default function PdfViewer() {
  // const pdfFile = "../../assets/jannu.pdf"; // Replace with your PDF file path

  const { user } = useData();

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.products.length === 0) {
    return <div> You Can&apos;t have Access To it</div>;
  }

  return (
    <div
      style={{
        height: "100dvh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* <iframe src={"./jannu.pdf"} width={"100%"} height={"100%"} /> */}
      <embed
        src={"./jannu.pdf"}
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
  );
}
