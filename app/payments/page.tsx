"use client";
import "@/app/qr.scss";
import React, { useEffect, useState, useCallback, FormEvent } from "react";
import qrcode from "qrcode";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";
import Image from "next/image";
import { motion } from "framer-motion";
import TopPageBar from "@/components/TopBarPage";
import usePopup from "@/hooks/usePopup";
import { createPortal } from "react-dom";
import PopupBox from "@/components/PopupBox";
import axios from "axios";
import useData from "@/hooks/useData";
import { useRouter } from "next/navigation";

export default function PaymentsPage() {
  const [qr, setQr] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [utr, setUtr] = useState("");
  const { HidePopup, ShowPopup, popupContent, setPopupContent, popupIsOpened } =
    usePopup();
  const upiId = "suryasarisa99-2@okhdfcbank";
  const { user } = useData();
  const router = useRouter();

  useEffect(() => {
    const transactionAmount = 5000;
    const upiUrl = `upi://pay?pa=suryasarisa99-2@okhdfcbank&pn=YourName&am=${transactionAmount}&cu=INR`;
    qrcode.toDataURL(upiUrl, (err, url) => {
      if (err) console.error(err);
      else setQr(url);
    });
  }, []);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;

    if (utr == "") {
      setPopupContent({
        title: "UTR Number Required",
        content: "Please Enter UTR After the Payment is Done",
        onClick: HidePopup,
      });
      ShowPopup();
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/m-pay/pay`, {
        id: user._id,
        utr: utr,
      })
      .then((res) => {
        setPopupContent({
          title: "Admin Will Verify Your Payment Soon",
          content:
            "Please Wait for a while, Admin will verify your payment soon and product will be brought to you Automatically.",
          onClick: () => {
            HidePopup();
            router.back();
          },
        });
        ShowPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="payments-page center-page  split-xpage">
      {popupIsOpened &&
        createPortal(
          <PopupBox
            title={popupContent.title}
            content={popupContent.content}
            onClick={popupContent.onClick}
          ></PopupBox>,
          document.getElementById("overlay")!
        )}
      {/* <div className="left">/ */}
      {/* <TopPageBar title="Payments" onClick={() => {}} /> */}
      <div className="title">Payments</div>
      <div className="amount-box">
        <p className="info">Pay</p>
        <p className="amount">5000 ₹</p>
      </div>

      <center>
        <div className="container">
          <div className="qr-box">
            <Image src={qr} alt="qr code" height={220} width={220} />

            <a href={qr} download>
              Download
            </a>
          </div>
          <p className="or">Or </p>
          <div className="upi-id-box">
            <div className="left">
              <p className="info">copy UPI id</p>
              <p className="id">{upiId}</p>
            </div>
            <motion.div
              className="icon"
              whileTap={{ scale: 0.7 }}
              onClick={() => {
                navigator?.clipboard?.writeText(upiId);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 1000);
              }}
            >
              {isCopied ? (
                <LuClipboardCheck size={22} />
              ) : (
                <LuClipboard size={20} />
              )}
            </motion.div>
          </div>
        </div>
      </center>
      <form action="" onSubmit={handleFormSubmit}>
        <label htmlFor="utrnum">Confirm Transaction</label>
        <input
          id="utrnum"
          type="text"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          placeholder="12 Digits UTR Number"
        />
        <button>Confirm Payment</button>
      </form>
      {/* </div> */}
      <div className="right"></div>
    </div>
  );
}
