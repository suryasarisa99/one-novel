import { motion } from "framer-motion";
import img from "@/public/writer/w3.jpg";
import Image from "next/image";
import { ChangeEventHandler, FormEvent, useRef } from "react";
import axios from "axios";
import useData from "@/hooks/useData";
import { createPortal } from "react-dom";
import PopupBox from "@/components/PopupBox";
import usePopup from "@/hooks/usePopup";

export default function WriterSection3() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn, user, token } = useData();
  const { popupIsOpened, ShowPopup, HidePopup, popupContent, setPopupContent } =
    usePopup();
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    // file
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER}/auth/upload?fileName=${file.name}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    }

    // Your code here
  };
  return (
    <div className="horizontal-section sec3 " id="w3">
      {popupIsOpened &&
        createPortal(
          <PopupBox
            title={popupContent.title}
            content="{popupContent.content}"
            onClick={popupContent.onClick}
          />,
          document.getElementById("overlay")!
        )}
      <div className="left">
        <motion.img
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          src="/writer/w3.jpg"
          alt="writer-3"
        />
        {/* <Image
          src="/writer/w3.jpg"
          alt="writer-3"
          className="img"
          // height={300}
        /> */}
      </div>
      <div className="right">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="title"
        >
          Earn Upto ₹ 5000
        </motion.h2>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="desc"
        >
          Earn upto ₹ 5000 upon review and acceptance of your submission
        </motion.div>
        <input
          className="hidden-input"
          type="file"
          ref={inputFileRef}
          onChange={handleSubmit}
        />
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="floating-btn"
          onClick={() => {
            if (!isLoggedIn || !user) return;
            if (user.products.length == 0) {
              setPopupContent({
                title: "First Buy a Product",
                content: "You need to Buy a product to upload your Book",
                onClick: HidePopup,
                btnText: "Ok",
              });
              ShowPopup();
              return;
            }
            if (user.uploadStatus === "pending") return;
            inputFileRef.current?.click();
          }}
        >
          {
            {
              pending: "Uploaded",
              default: "Upload",
            }[user?.uploadStatus || "default"]
          }
        </motion.button>
      </div>
    </div>
  );
}
