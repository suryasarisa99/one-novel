"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import usePopup from "@/hooks/usePopup";
import PopupBox from "@/components/PopupBox";
import { createPortal } from "react-dom";
import axios from "axios";
import useData from "@/hooks/useData";
import { useRouter } from "next/navigation";

export default function WithdrawlPage() {
  const { token, user, setUser } = useData();
  const [upi, setUpi] = useState(user?.upi || "");
  const [bank, setBank] = useState({
    bank_name: user?.bank.bank_name || "",
    account_no: user?.bank.account_no || "",
    ifsc: user?.bank.ifsc || "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    setUpi(user.upi);
    setBank({
      bank_name: user.bank.bank_name,
      account_no: user.bank.account_no,
      ifsc: user.bank.ifsc,
    });
  }, [user?._id]);

  const { HidePopup, ShowPopup, popupIsOpened, popupContent, setPopupContent } =
    usePopup();

  function ValidateUpiId(upiId: string) {
    const regex = /^([a-zA-Z1-9-]+)@([a-zA-Z]+)$/;
    if (regex.test(upiId)) {
      return true;
    }
    return false;
  }

  function postData(type: number) {
    console.log("Posting Data");
    console.log(upi, bank, type);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/withdrawl-details`,
        {
          upi: upi,
          bank: bank,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (!user) return;
        if (res.data.success) {
          setUser({
            ...user,
            upi: upi,
            bank: bank,
            withdrawlType: type,
          });

          setPopupContent({
            title: "Success",
            content: "Withdrawl Request Sent Successfully.",
            onClick: () => {
              HidePopup();
              router.push("/withdrawl");
            },
          });
          ShowPopup();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    console.log(upi, bank);
    if (
      upi &&
      bank.bank_name &&
      bank.account_no &&
      bank.ifsc
      // && bank.mobile
    ) {
      // Withdrawl using UPI and Bank Details

      if (ValidateUpiId(upi)) {
        console.log("Valid UPI");
        postData(3);
      } else {
        console.log("Invalid UPI");
        setPopupContent({
          title: "Invalid UPI ID",
          content: "Please enter a valid UPI Id.",
          onClick: HidePopup,
        });
        ShowPopup();
      }
    } else if (
      upi &&
      !bank.bank_name &&
      !bank.account_no &&
      !bank.ifsc
      // && !bank.mobile
    ) {
      // Withdrawl using UPI
      if (ValidateUpiId(upi)) {
        console.log("Valid UPI");
        postData(1);
      } else {
        setPopupContent({
          title: "Invalid UPI ID",
          content: "Please enter a valid UPI Id.",
          onClick: HidePopup,
        });
        ShowPopup();
      }
    } else if (!upi && bank.bank_name && bank.account_no && bank.ifsc) {
      // Withdrawl using Bank Details
      postData(2);
    } else {
      // Show Error
      setPopupContent({
        title: "Insufficient Details",
        content:
          "Enter Both Details or Any One Of Them, But Can't Enter Partial Details.",
        onClick: HidePopup,
      });
      ShowPopup();
    }
  }

  const [hideSuggestions, setHideSuggestions] = useState(false);
  const suggestions = [
    { s: "okhdfcbank", k: 0 },
    { s: "okaxis", k: 1 },
    { s: "okicici", k: 2 },
    { s: "axl", k: 3 },
    { s: "ibl", k: 4 },
    { s: "ybl", k: 5 },
    { s: "paytm", k: 6 },
  ];
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

  useEffect(() => {
    if (!upi.includes("@")) {
      setHideSuggestions(false);
    }
  }, [upi]);

  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      metaThemeColor.setAttribute("content", "#1c1c1c");
    } else {
      metaThemeColor.setAttribute("content", "#f5f4f0");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const filterSuggestions = suggestions.filter((sugg) =>
        sugg.s.includes(upi.split("@")[1])
      );
      const filterSuggestionsLen = filterSuggestions.length;
      console.log("len: ", filterSuggestionsLen);
      // setSelectedSuggestion(0);
      if (e.key === "ArrowDown") {
        setSelectedSuggestion((prev) => {
          if (prev === -1) {
            return 0;
          } else {
            return (prev + 1) % filterSuggestionsLen;
          }
        });
      } else if (e.key === "ArrowUp") {
        setSelectedSuggestion(
          (prv) => (prv - 1 + filterSuggestionsLen) % filterSuggestionsLen
        );
      } else if (e.key === "Enter") {
        if (selectedSuggestion !== -1) {
          console.log("HI");
          setUpi(
            upi.split("@")[0] + "@" + filterSuggestions[selectedSuggestion].s
          );
          setHideSuggestions(true);
        } else {
          console.log("No");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [upi, selectedSuggestion]);

  return (
    <div className="payment-page split-page">
      {popupIsOpened &&
        createPortal(
          <PopupBox
            content={popupContent.content}
            title={popupContent.title}
            onClick={popupContent.onClick}
          />,
          document.getElementById("overlay")!
        )}
      <div className="left">
        <div className="heading">
          <p className="title">Withdrawl Details</p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="payment-option"
        >
          <p className="title">Upi Id :</p>
          <input
            type="text"
            placeholder="Enter Upi Id"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />
          {upi.includes("@") &&
            !hideSuggestions &&
            suggestions.filter((s) => s.s.includes(upi.split("@")[1])).length >
              0 && (
              <div className="suggestions">
                {suggestions
                  .filter((sugg) => sugg.s.includes(upi.split("@")[1]))
                  .map((sugg, sInd) => (
                    <p
                      className={
                        "item " +
                        (sInd === selectedSuggestion ? "selected" : "")
                      }
                      onClick={() => {
                        setUpi(upi.split("@")[0] + "@" + sugg.s);
                        setHideSuggestions(true);
                      }}
                      key={sugg.k}
                    >
                      {upi.split("@")[0] + "@" + sugg.s}
                    </p>
                  ))}
              </div>
            )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="payment-option"
        ></motion.div>
        <p className="or">Or</p>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="payment-option bank-details"
        >
          <div className="title">Bank Details :</div>
          <input
            type="text"
            placeholder="Enter Name"
            value={bank.bank_name}
            onChange={(e) => setBank({ ...bank, bank_name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Enter Bank Account Number"
            value={bank.account_no}
            onChange={(e) => setBank({ ...bank, account_no: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter IFSC Code"
            value={bank.ifsc}
            onChange={(e) => setBank({ ...bank, ifsc: e.target.value })}
          />
          {/* <input
            type="number"
            placeholder="Enter Mobile Number"
            value={bank.mobile}
            onChange={(e) => setBank({ ...bank, mobile: e.target.value })}
          /> */}
        </motion.div>
        <div className="btn-row">
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="cross-bar"></div>
      <div className="right" style={{ height: "100%" }}></div>
    </div>
  );
}
