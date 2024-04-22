import React, { useState, useEffect } from "react";
import img2 from "@/public/home/img2.png";
import { motion, AnimatePresence } from "framer-motion";
import useData from "@/hooks/useData";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function ProductSection() {
  const router = useRouter();
  const { isLoggedIn, user } = useData();
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleBuy() {
    if (!isLoggedIn || !user) {
      router.push("/register");
      return;
    }
    if (user.products.length > 0) return;

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/payment/pay`, {
        _id: user._id,
      })
      .then((res) => {
        // open(res.data.url, "_blank");
        open(res.data.url);
      });
  }

  return (
    <div className="product-page home-page-section page" id="product">
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        transition={{ delay: 0.2, duration: 0.25 }}
        whileInView={{ opacity: 1, y: 0 }}
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        className="title"
      >
        ESCAPE INTO THE WORLD OF <span>&apos;JANNU&apos;</span>
      </motion.p>

      <motion.div
        className="img-container"
        initial={{ scale: 0.7, y: 100 }}
        transition={{ duration: 0.2 }}
        whileInView={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.85 }}
      >
        <Image
          src={img2}
          alt="jannu book image"
          priority={true}
          fetchPriority="high"
          placeholder="blur"
          loading="eager"
          onLoadedMetadata={() => setImageLoaded(true)}
          onLoadingComplete={() => setImageLoaded(true)}
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
      </motion.div>
      {!user || user.products.length == 0 ? (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="floating-btn"
          onClick={handleBuy}
        >
          Buy Now
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="floating-btn"
          onClick={() => router.push("/pdf")}
        >
          View Book
        </motion.button>
      )}
    </div>
  );
}
