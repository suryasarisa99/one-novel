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
          {/* <span
            onClick={() => {
              stopAutoScroll();
              if (!user) return router.push("/login");
              router.push("/profile");
            }}
          >
            <FaRegUser className="outline" size={22} />
            <FaUser className="fill" size={22} />
          </span> */}
        </li>

        <li className="wallet">
          <IoWalletOutline size={24} className="outline" />
          <IoWallet size={24} className="fill" />
          <div className="wallet-box">
            <p className="balance">
              Balance:
              <span className="amount">₹ {user?.balance || 0} </span>
            </p>
            {/* <button
              className="withdrawl-btn"
              onClick={() => {
                stopAutoScroll();
                if (!user) return router.push("/login");
                if (user.withdrawlType === 0) router.push("/withdrawl-details");
                else router.push("/withdrawl");
              }}
            >
              With Drawl
            </button> */}
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
        <li className="long-elm">
          <a href="#about">About</a>
        </li>
      </ul>
    </nav>
  );
}
