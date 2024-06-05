import { motion, useSpring, useTransform } from "framer-motion";
import img from "@/public/writer/w3.jpg";
import Image from "next/image";
import { ChangeEventHandler, FormEvent, useRef, useState } from "react";
import axios from "axios";
import useData from "@/hooks/useData";
import { createPortal } from "react-dom";
import PopupBox from "@/components/PopupBox";
import usePopup from "@/hooks/usePopup";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "@/firebaseConfig.js";
import PopupLayout from "@/components/PopupLayout";

export default function WriterSection3() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn, user, token, setUser } = useData();
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { popupIsOpened, ShowPopup, HidePopup, popupContent, setPopupContent } =
    usePopup();
  const progressSpring = useSpring(progress, {
    stiffness: 10, // Adjust stiffness and damping for different spring dynamics
    damping: 10,
  });
  const progressWidth = useTransform(progressSpring, (value) => `${value}%`);

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    setShowPopup(true);
    setLoading(true);
    if (file) {
      const storageRef = ref(storage, `pdfs/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.max(0, progress - 14));
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads

          console.log(error);
        },
        async () => {
          setProgress(93);
          const downloadURL = await getDownloadURL(storageRef);
          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER}/auth/upload-url`,
              {
                url: downloadURL,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              setProgress(100);
              if (res.data.success)
                setUser((prvUser) => {
                  if (!prvUser) return prvUser;
                  prvUser.uploadedBooks.push({
                    url: downloadURL,
                    status: "pending",
                    date: new Date().toISOString(),
                  });
                  return { ...prvUser };
                });
              setTimeout(() => {
                setShowPopup(false);
              }, 500);
              setLoading(false);
            })
            .catch((res) => {
              console.log(res);
            });
          console.log("Download URL: ", downloadURL);
          console.log("Upload completed successfully");
        }
      );
    }
  };
  return (
    <div className="horizontal-section sec3 " id="w3">
      {popupIsOpened &&
        createPortal(
          <PopupBox
            title={popupContent.title}
            content={popupContent.content}
            onClick={popupContent.onClick}
          />,
          document.getElementById("overlay")!
        )}
      <PopupLayout show={showPopup} setPopup={setShowPopup}>
        <div className="upload-popup">
          <div className="title">Uploading</div>
          <motion.div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </motion.div>
        </div>
      </PopupLayout>
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
            if (
              user?.uploadedBooks[user?.uploadedBooks.length - 1]?.status ===
              "pending"
            ) {
              setPopupContent({
                title: "Already Uploaded",
                content:
                  "You have already uploaded a book. Please wait for the review, After the review you can upload another book.",
                onClick: HidePopup,
                btnText: "Ok",
              });
              ShowPopup();
              return;
            }
            inputFileRef.current?.click();
          }}
        >
          {loading ? (
            <center>
              <div className="loader"></div>
            </center>
          ) : (
            {
              pending: "Uploaded",
              default: "Upload",
              accepted: "Upload",
              rejected: "Upload",
            }[
              user?.uploadedBooks[user?.uploadedBooks.length - 1]?.status ||
                "default"
            ]
          )}
        </motion.button>
      </div>
    </div>
  );
}
