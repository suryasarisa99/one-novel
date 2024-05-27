import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useData from "@/hooks/useData";
import logo from "@/public/logo.png";
import Image from "next/image";

// icons
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoWalletOutline, IoWallet } from "react-icons/io5";

import "@/public/logo.png";

export default function TopBar() {
  const router = useRouter();

  const { user } = useData();
  return (
    <nav>
      <Image src={logo} className="logo" alt="" />
      <ul className="menu">
        <li>
          <Link href="/profile" className="link">
            <FaRegUser className="outline" size={22} />
            <FaUser className="fill" size={22} />
          </Link>
        </li>

        <li className="wallet">
          <IoWalletOutline size={24} className="outline" />
          <IoWallet size={24} className="fill" />
          <div className="wallet-box">
            <p className="balance">
              Balance:
              <span className="amount">₹ {user?.balance || 0} </span>
            </p>
            <button
              className="withdrawl-btn"
              onClick={() => {
                if (!user) return router.push("/login");
                if (user.withdrawlType === 0) router.push("/withdrawl-details");
                else router.push("/withdrawl");
              }}
            >
              With Drawl
            </button>
          </div>
        </li>
        <li className="long-elm">
          <a href="#about">About</a>
        </li>
      </ul>
    </nav>
  );
}
