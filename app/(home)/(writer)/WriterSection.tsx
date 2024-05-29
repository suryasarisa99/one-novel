import Image from "next/image";
import img from "@/public/writer/w1.jpg";
import { motion } from "framer-motion";

export default function WriterSection1() {
  return (
    <div className="horizontal-section sec1">
      <div className="content">
        <div className="writer-img">
          <motion.img
            // initial={{ y: 150, scale: 0.6, opacity: 0 }}
            // whileInView={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            initial={{ y: 100, scale: 0.7, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            src={"/writer/w1.jpg"}
            className="writer-img"
            alt="writer-image"
          />
          {/* <Image
            src={img}
            className="writer-img"
            alt="writer-image"
            width={200}
          /> */}
        </div>
        <motion.span
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          // transition={{ duration: 0.4 }}
          className="right"
        >
          Writer&apos;s Benfit Program
        </motion.span>
      </div>
    </div>
  );
}
