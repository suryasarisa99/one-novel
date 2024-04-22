import React, { useState, useEffect, useRef } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
// import { FaArrowLeftLong } from "react-icons/fa6";
export default function TopPageBar({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <div className="top-page-bar">
      <div className="back-button" onClick={onClick}>
        <FaChevronLeft className="icon" />
      </div>
      <div className="title">{title}</div>
    </div>
  );
}
