import React, { useState } from "react";
import img4 from "@/public/home/img4.jpg";
import { motion } from "framer-motion";
import Image from "next/image";
export default function AboutSection() {
  return (
    <div className="about-page home-page-section" id="about">
      <div className="mask">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="box"
        >
          ARE YOU PASSIONATE ABOUT BOOKS? JOIN YOUR ONE NOVEL PROGRAM AND TURN
          YOUR LOVE FOR LITERATURE INTO PROFITABLE VENTURE. AS A BOOKPRENEUR,
          YOU&apos;LL HAVE THE OPPORTUNITY TO SELL BOOKS, BUILD YOUR OWN
          CUSTOMER BASE, AND EARN COMMISSIONS. WHETHER YOU&apos;RE A BOOK
          ENTHUSIAST, A BUILDING ENTREPRENEUR, OR SOMONE LOOKING FOR A FLEXIBLE
          INCOME STREAM, THE ONE NOVEL PROGRAM AT ONE IS THE PERFECT FIT FOR
          YOU.
        </motion.div>
      </div>
      <Image src={img4} alt={"money background img"} draggable={false} />
      <div className="bottom-section">
        <div className="contact-info">
          <p>
            <span className="label">Gmail</span>
            <span className="value">1.one.novel.service@gmail.com</span>
          </p>
          <p>
            <span className="label">Mobile No </span>
            <span className="value">9876543210</span>
          </p>
        </div>
        <div className="links">
          <a href="#home">Home</a>
          <a href="#product">Product</a>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}
