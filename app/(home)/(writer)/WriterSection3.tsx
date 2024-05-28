import { motion } from "framer-motion";
import img from "@/public/writer/w3.jpg";
import Image from "next/image";

export default function WriterSection3() {
  return (
    <div className="horizontal-section sec3 ">
      <div className="left">
        <img src="/writer/w3.jpg" alt="writer-3" />
        {/* <Image
          src="/writer/w3.jpg"
          alt="writer-3"
          className="img"
          // height={300}
        /> */}
      </div>
      <div className="right">
        <h2
          // initial={{ y: 100, opacity: 0 }}
          // whileInView={{ y: 0, opacity: 1 }}
          // transition={{ delay: 0.1, duration: 0.5 }}
          className="title"
        >
          Earn Upto ₹ 5000
        </h2>
        <div
          // initial={{ y: 100, opacity: 0 }}
          // whileInView={{ y: 0, opacity: 1 }}
          // transition={{ delay: 0.4 }}
          className="desc"
        >
          Earn upto ₹ 5000 upon review and acceptance of your submission
        </div>
        <button
          // initial={{ y: 100, opacity: 0 }}
          // whileInView={{ y: 0, opacity: 1 }}
          // transition={{ delay: 0.7 }}
          className="floating-btn"
        >
          Upload Pdf
        </button>
      </div>
    </div>
  );
}
