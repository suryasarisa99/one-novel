"use client";

import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { LuClipboard } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";
import useData from "@/hooks/useData";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import usePopup from "@/hooks/usePopup";
import PopupBox from "@/components/PopupBox";
import { createPortal } from "react-dom";
import PopupLayout from "@/components/PopupLayout";

export default function ProfilePage() {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const { user, setUser, setToken, setIsLoggedIn } = useData();
  const [withdrawlMoney, setWithdrawlMoney] = useState(0);
  const [PendingMoney, setPendingMoney] = useState(0);
  const [giftMoney, setGiftMoney] = useState(0);
  type GiftType = {
    forLevel: number;
    amount: number;
  };
  const [showPopup, setShowPopup] = useState(false);
  const [gifts, setGifts] = useState<GiftType[]>([]);

  const { HidePopup, ShowPopup, setPopupContent, popupContent, popupIsOpened } =
    usePopup();

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

    return () => {};
  }, []);

  useEffect(() => {
    if (!user || !user.transactions) return;
    try {
      const w =
        user.transactions
          .filter(
            (t) =>
              t?.transaction_type === "withdrawl" && t.status === "accepted"
          )
          .reduce((acc, t) => acc + Math.abs(t?.amount), 0) || 0;
      const p =
        user.transactions
          .filter(
            (t) => t?.transaction_type === "withdrawl" && t.status === "pending"
          )
          .reduce((acc, t) => acc + Math.abs(t.amount), 0) || 0;
      const g =
        user.transactions
          .filter((t) => t?.transaction_type === "Gift")
          .reduce((acc, t) => acc + Math.abs(t.amount), 0) || 0;

      setGiftMoney(g);
      setWithdrawlMoney(w);
      setPendingMoney(p);
    } catch (err) {
      console.log("error in profile page", err);
    }
  }, [user]);

  if (!user) return null;
  return (
    <div className="profile-page page split-page">
      <div className="left">
        <div className="left-container">
          <div className="heading-with-arrow">
            <Link href="/">
              <div className="icon">
                <FaChevronLeft />
              </div>
            </Link>
            <h1>Profile</h1>
          </div>
          <div className="bio">
            <div className="name field">
              <span className="label">Name</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="email field">
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="phone field">
              <span className="label">Phone</span>
              <span className="value">{user.number}</span>
            </div>
            <div className="phone field">
              <span className="label">Position</span>
              <span className="value">
                {
                  [
                    "Aspiring Author",
                    "Junior Associate",
                    "Associate Manager",
                    "Senior Associate",
                    "Business Development Manager",
                  ][user.level]
                }
              </span>
            </div>
          </div>
          <div
            // initial={{ opacity: 0, x: -100 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.5 }}
            className="details"
          >
            <div className="balance field">
              <span className="value">₹ {user.balance}</span>
              <span className="label">Balance</span>
            </div>

            <div className="transactions field">
              <span className="value">₹ {withdrawlMoney}</span>
              <span className="label">Withdrawl</span>
            </div>
            <div className="transactions field">
              <span className="value">₹ {PendingMoney}</span>
              <span className="label">Pending</span>
            </div>
            <div className="referals-item field">
              <span className="value">
                {user.children.level1.length +
                  user.children.level2.length +
                  user.children.level3.length +
                  user.children.level4.length}
              </span>
              <span className="label">Referals</span>
            </div>
            <div className="referals-item field">
              <span className="value">
                {user.children.level1.filter((c) => c.valid).length +
                  user.children.level2.filter((c) => c.valid).length +
                  user.children.level3.filter((c) => c.valid).length +
                  user.children.level4.filter((c) => c.valid).length}
              </span>
              <span className="label">Valid Ref</span>
            </div>
            <div className="transactions field">
              <span className="value">{giftMoney}</span>
              <span className="label">Gifts</span>
            </div>
          </div>

          <div
            // initial={{ opacity: 0, x: 100 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.5 }}
            className="refer-code-box"
          >
            <div className="title">
              <span>Referral Code</span>
              <div
                className="icon"
                // initial={{ scale: 1 }}
                // whileTap={{
                //   scale: 0.7,
                // }}
                onClick={() => {
                  const url = process.env.NEXT_PUBLIC_FRONTEND_URL;
                  navigator?.clipboard?.writeText(
                    `${url}/register?ref=${user._id}`
                  );
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 1000);
                }}
              >
                {isCopied ? <LuClipboardCheck /> : <LuClipboard />}
              </div>
            </div>
            <div className="value">{user._id}</div>
          </div>

          <div
            // initial={{ opacity: 0, x: -100 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.5 }}
            className="section"
          >
            <Link href="/transactions" className="item-outer">
              <div className="item">
                <span className="label">Transactions</span>
                <FaChevronRight />
              </div>
            </Link>
            {/* <Link className="item-outer" href="/parents">
              <div className="item">
                <span className="label">Parents</span>
                <FaChevronRight />
              </div>
            </Link> */}
            <Link href="/referals" className="item-outer">
              <div className="item">
                <span className="label">Referrals</span>
                <FaChevronRight />
              </div>
            </Link>
            <Link
              href={
                user.withdrawlType === 0 ? "/withdrawl-details" : "/withdrawl"
              }
              className="item-outer"
            >
              <div className="item">
                <span className="label">Withdrawl</span>
                <FaChevronRight />
              </div>
            </Link>
            <Link href={"/withdrawl-details"} className="item-outer">
              <div className="item">
                <span className="label">Withdrawl Details</span>
                <FaChevronRight />
              </div>
            </Link>
            <Link href={"/uploads"} className="item-outer">
              <div className="item">
                <span className="label">Uploads</span>
                <FaChevronRight />
              </div>
            </Link>
            <div
              className="item-outer"
              onClick={() => {
                console.log("requested");
                axios
                  .get(`${process.env.NEXT_PUBLIC_SERVER}/auth/position`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    if (res.data.increased) {
                      setShowPopup(true);
                      setGifts(res.data.gifts);
                      setUser({
                        ...res.data.user,
                      });
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              <div className="item">
                <span className="label">Recheck My Position</span>
              </div>
            </div>
            <div
              className="item-outer"
              onClick={() => {
                router.push("/register");
                localStorage.removeItem("token");
                setUser(null);
                setToken("");
                setIsLoggedIn(false);
              }}
            >
              <div className="item">
                <span className="label">SignOut</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cross-bar"></div>
      <div className="right"></div>
      <PopupLayout show={showPopup} setPopup={setShowPopup}>
        <div className="gift-popup">
          <img src="/gift.png" alt="gift" />
          <div className="content">
            {gifts.map((g, i) => (
              <div className="item" key={i}>
                <div className="flex">
                  <span className="label">GIFT</span>
                  <span className="value">+{g.amount}</span>
                </div>
                <p>
                  On Reaching
                  <span className="level">
                    {
                      [
                        "Aspiring Author",
                        "Junior Associate",
                        "Associate Manager",
                        "Senior Associate",
                        "Business Development Manager",
                      ][g.forLevel]
                    }
                  </span>
                </p>
              </div>
            ))}
            <center>
              <button
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                Claim
              </button>
            </center>
          </div>
        </div>
      </PopupLayout>
      {popupIsOpened &&
        createPortal(<div></div>, document.getElementById("overlay")!)}
    </div>
  );
}
