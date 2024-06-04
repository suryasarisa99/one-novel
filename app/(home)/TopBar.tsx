import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useData from "@/hooks/useData";
import logo from "@/public/logo.png";
import Image from "next/image";

// icons
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoWalletOutline, IoWallet } from "react-icons/io5";

import "@/public/logo.png";
import { BiGift, BiSolidGift } from "react-icons/bi";

export default function TopBar({
  stopAutoScroll,
}: {
  stopAutoScroll: () => void;
}) {
  const router = useRouter();
  const { user } = useData();

  useEffect(() => {
    router.prefetch("/profile");
    router.prefetch("/login");
    router.prefetch("/withdrawl");
    router.prefetch("/withdrawl-details");
  }, []);

  return (
    <nav>
      <Image src={logo} className="logo" alt="" />
      <ul className="menu">
        <li>
          {user ? (
            <Link href="/profile" className="link">
              <FaRegUser className="outline" size={22} />
              <FaUser className="fill" size={22} />
            </Link>
          ) : (
            <Link href="/login" className="link">
              <FaRegUser className="outline" size={22} />
              <FaUser className="fill" size={22} />
            </Link>
          )}
        </li>

        <li className="wallet">
          <IoWalletOutline size={24} className="outline" />
          <IoWallet size={24} className="fill" />
          <div className="wallet-box">
            <p className="balance">
              Balance:
              <span className="amount">₹ {user?.balance || 0} </span>
            </p>
            <Link
              href={
                !user
                  ? "/login"
                  : user.withdrawlType === 0
                  ? "/withdrawl-details"
                  : "/withdrawl"
              }
              className="btn withdrawl-btn"
            >
              With Drawl
            </Link>
          </div>
        </li>
        <li className="wallet">
          <BiGift size={24} className="outline" />
          <BiSolidGift size={24} className="fill" />
          <div className="wallet-box">
            <p className="balance">
              Amount:
              <span className="amount">
                ₹{" "}
                {user?.transactions
                  ?.filter((t) => t.transaction_type == "Gift")
                  .reduce((s, t) => s + t.amount, 0) || 0}
              </span>
            </p>
            <p className="balance">
              Gifts 🎁 :
              <span className="amount">
                {user?.transactions?.filter((t) => t.transaction_type == "Gift")
                  .length || 0}
              </span>
            </p>
          </div>
        </li>
        <li className="long-elm">
          <a href="#about">About</a>
        </li>
      </ul>
    </nav>
  );
}
