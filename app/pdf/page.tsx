import React from "react";
// import pdfFile from "@/public/jannu.pdf";

export default function PdfViewer() {
  //   const pdfFile = "../../assets/jannu.pdf"; // Replace with your PDF file path

  return (
    <div
      style={{
        height: "100vh",
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
