"use client";

import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import logo from "../../../public/logo.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import registerImg from "../../../public/register2.png";
import axios from "axios";
import { createPortal } from "react-dom";
import PopupBox from "@/components/PopupBox";
import useData from "@/hooks/useData";
import { UserType } from "@/types/UserTypes";
import Image from "next/image";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken, setUser, setIsLoggedIn, ShowOverlay, HideOverlay } =
    useData();
  const router = useRouter();

  const defaultError = {
    allFieldsRequired: false,
    invalidPhoneNumber: false,
    invalidPassword: false,
  };
  const [PopupContent, setPopupContent] = useState({
    title: "",
    content: "",
    onClick: hidePopup,
  });

  const [errors, setErrors] = useState(defaultError);
  const [popup, setPopup] = useState(false);

  function showPopup() {
    setPopup(true);
    ShowOverlay();
  }

  function hidePopup() {
    setPopup(false);
    HideOverlay();
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneNumber || !password) {
      setPopupContent({
        title: "All Fields Required",
        content: "Please fill all the fields to continue.",
        onClick: hidePopup,
      });
      showPopup();
      return;
    }
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
        number: phoneNumber,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.isLogedIn) {
          setUser(res.data.user as UserType);
          setToken(res.data.token as string);
          setIsLoggedIn(true);
          setPopupContent({
            title: "Logined Successfully",
            content: `hello ${res.data.user.name}, You are Successfully Logined.`,
            onClick: () => {
              hidePopup();
              router.push("/");
            },
          });
          showPopup();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        switch (err.response.data.error) {
          case "User Not Exist": {
            setPopupContent({
              title: "User Not Exist",
              content:
                "No user found with this phone number. Please Signup to continue.",
              // "The phone number you entered is Not registered, Please Signup to continue.",
              onClick: hidePopup,
            });
            break;
          }
          case "Invalid Password": {
            setPopupContent({
              title: "Invalid Password",
              content:
                "The password you entered is incorrect. Please try again.",
              onClick: hidePopup,
            });
            break;
          }
          case "User not verified": {
            setPopupContent({
              title: "User Not Verified",
              content:
                "The phone number you entered is not verified. Please verify your number to continue.",
              onClick: () => {
                hidePopup();
                router.push(`/verification?id=${err.response.data.id}`);
              },
            });
            break;
          }
          default: {
            console.log("default case: ", err.response.data.error);
            setPopupContent({
              title: err.response.data.error,
              content: "An error occured. Please try again later.",
              onClick: hidePopup,
            });
          }
        }
        showPopup();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleForgotPassword() {
    if (phoneNumber.length !== 10) {
      setPopupContent({
        title: "Invalid Phone Number",
        content: "Please enter a valid phone number to Reset Forgot Password.",
        onClick: hidePopup,
      });
      showPopup();
      return;
    }
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/forgot-password/${phoneNumber}`
      )
      .then((res) => {
        console.log(res.data);
        setPopupContent({
          title: "Password Reset Link Sent",
          content: `A password reset link has been sent to your ${res.data.mail}. Please check your mail.`,
          onClick: hidePopup,
        });
        showPopup();
      });
  }

  return (
    <div className="register split-page auth">
      <div className="cross-bar"></div>
      <div className="left">
        <Link className="heading" href="/">
          <Image src={logo} alt="logo img" />
          <p className="title">One Novel</p>
        </Link>

        <motion.form
          onSubmit={handleFormSubmit}
          action=""
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="number"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="errors"></div>
          <div className="pass-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <div className="errors"></div>
          <div className="forgot-password-row">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit">Login</button>
        </motion.form>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="link"
        >
          <Link className="gray-link" href="/register">
            Create Account ? Signup
          </Link>
        </motion.div>
      </div>
      {popup &&
        createPortal(
          <PopupBox
            title={PopupContent.title}
            content={PopupContent.content}
            onClick={PopupContent.onClick}
          ></PopupBox>,
          document.getElementById("overlay")!
        )}
      <div className="right">
        <Image src={registerImg} alt="register" />
      </div>
    </div>
  );
}
