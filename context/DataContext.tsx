"use client";

import React, { useState, useEffect, createContext, useReducer } from "react";
import DataContextType from "./DataContextTypes";
import { UserType } from "@/types/UserTypes";
import axios from "axios";

export const DataContext = createContext({} as DataContextType);
export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState(0);
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tk = localStorage.getItem("token");
    console.log(process.env.NEXT_PUBLIC_SERVER);
    if (tk) setToken(tk);

    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}/auth/me`, {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      })
      .then((res) => {
        if (res.data.isLogedIn) {
          console.log("Logged In");
          setUser(res.data.user);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  function ShowOverlay() {
    const overlay = document.getElementById("overlay");
    const body = document.querySelector("body");
    if (overlay && body) {
      overlay.style.display = "block";
      body.style.overflow = "hidden";
    }
  }
  function HideOverlay() {
    const overlay = document.getElementById("overlay");
    const body = document.querySelector("body");
    if (overlay && body) {
      overlay.style.display = "none";
      body.style.overflow = "auto";
    }
  }

  const value = {
    data,
    setData,
    user,
    setUser,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    ShowOverlay,
    HideOverlay,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
