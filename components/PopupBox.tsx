import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
type PopupBoxProps = {
  children?: React.ReactNode;
  content?: string;
  title: string;
  onClick: () => void;
};

export default function PopupBox({
  children,
  content,
  title,
  onClick,
}: PopupBoxProps) {
  return (
    <motion.div
      initial={{ scale: 0, y: 200 }}
      whileInView={{ scale: 1, y: 0 }}
      className="popup-box"
    >
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="text">{content}</div>
      <div className="buttons">
        <button onClick={onClick}>OK</button>
      </div>
    </motion.div>
  );
}
