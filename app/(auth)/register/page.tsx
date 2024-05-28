"use client";
import logo from "@/public/logo.png";
import registerImg from "@/public/register2.png";
import { motion } from "framer-motion";
import React, { useReducer, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import PopupBox from "@/components/PopupBox";
import axios from "axios";
import usePopup from "@/hooks/usePopup";

export default function RegisterComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Register />
    </Suspense>
  );
}

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(-1);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [referralCode, setReferralCode] = useState(
    searchParams.get("ref") || ""
  );
  const securityQuestions = [
    "What is your Favourite Color ?",
    "What is your Pet's Name ?",
    "What is your Favourite Food ?",
    "What is your Favourite Movie ?",
    "Where were you born ?",
    "What is your Nickname ?",
  ];
  const [loading, setLoading] = useState(false);

  const { popupIsOpened, ShowPopup, HidePopup, popupContent, setPopupContent } =
    usePopup();

  function reducerFunction(
    state: typeof defaultError,
    action: {
      type: "name" | "email" | "phone" | "password" | "referralCode";
      payload: boolean | { empty: boolean; invalid: boolean };
    }
  ) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  const defaultError = {
    email: false,
    phone: false,
    password: false,
  };
  const [error, dispatchError] = useReducer(reducerFunction, defaultError);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) setLoading(false);
    let error = false;

    if (
      !name ||
      !phone ||
      !email ||
      !password ||
      !referralCode ||
      securityQuestion === -1 ||
      !securityAnswer
    ) {
      setPopupContent({
        title: "All Fields Required",
        content: "Please fill all the fields to continue.",
        onClick: HidePopup,
        btnText: "Ok",
      });
      ShowPopup();
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      dispatchError({
        type: "phone",
        payload: true,
      });
      error = true;
    } else {
      dispatchError({
        type: "phone",
        payload: false,
      });
    }
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
      dispatchError({
        type: "email",
        payload: true,
      });
      error = true;
    } else {
      dispatchError({
        type: "email",
        payload: false,
      });
    }
    if (
      password.length < 6 ||
      // !/[A-Z]/.test(password) || // no uppercase
      !/[0-9]/.test(password) || // no number
      !/[^a-zA-Z0-9]/.test(password) // no special character
    ) {
      dispatchError({
        type: "password",
        payload: true,
      });
      error = true;
    } else {
      dispatchError({
        type: "password",
        payload: false,
      });
    }
    if (error) return;

    setLoading(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/auth/signup`, {
        name,
        email,
        number: phone,
        password,
        referal: referralCode,
        security: {
          question: securityQuestion,
          answer: securityAnswer,
        },
      })
      .then((res) => {
        console.log(res.data);
        // router.push(`/verification?id=${res.data.id}&email=${email}`);
        setPopupContent({
          title: "Successfully Registered",
          content:
            "User Registeration is  Successfull. Please Login to Continue.",
          onClick: () => {
            HidePopup();
            router.push("/login");
          },
          btnText: "Login Now",
        });
      })
      .catch((err) => {
        console.log(err.response.data.error);
        switch (err.response.data.error) {
          case "Invalid referal": {
            setPopupContent({
              title: "Invalid Referral Code",
              content:
                "The referral code you entered is invalid. Please check and try again.",
              onClick: HidePopup,
              btnText: "Try Again",
            });
            break;
          }
          case "User already exists": {
            setPopupContent({
              title: "User Already Exists",
              content:
                "The Phone Number you entered is already registered. Please login to continue. or try with another number.",
              onClick: HidePopup,
              btnText: "Ok",
            });
            break;
          }
        }
        ShowPopup();
      })
      .finally(() => {
        setLoading(false);
      });

    // navigate("/verification");
    // dispatchError({
    //   type: "referralCode",
    //   payload: { empty: false, invalid: true },
    // });
    // showPopup();
    // setPopupContent({
    //   title: "Invalid Referral Code",
    //   content:
    //     "The referral code you entered is invalid. Please check and try again.",
    // });

    console.log("Form Submitted");
  }
  return (
    <div className="register split-page">
      <div className="cross-bar"></div>
      <div className="left">
        <div className="heading">
          <Image src={logo} alt="logo" />
          <p className="title">One Novel</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoCapitalize="words"
          />
          <div className="errors"></div>
          <input
            type="number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="errors">
            {error.phone && <p className="error">Invalid Phone Number</p>}
          </div>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="errors">
            {error.email && <p className="error">Invalid Email Adddress</p>}
          </div>
          <div className="pass-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <div
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <div className="errors">
            {error.password && (
              <div className="error">
                Not a Secure a Password
                <p>
                  Password Must Contain a Symbol, Number and Minimum of 6
                  characters
                </p>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Referal code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <div className="errors"></div>
          <select
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(+e.target.value)}
          >
            <option value="" disabled selected>
              Select the Security Question
            </option>
            {securityQuestions.map((question, i) => (
              <option key={i}>{question}</option>
            ))}
          </select>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            placeholder="Answer to Security Question"
          />
          <div className="errors"></div>
          <div className="errors"></div>

          <button type="submit">
            {loading ? <div className="loader"></div> : "Register"}
          </button>
        </motion.form>
        <motion.div
          className="link"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/login">Already Have An Account ? Login</Link>
        </motion.div>
      </div>
      {popupIsOpened &&
        createPortal(
          <PopupBox
            title={popupContent.title}
            content={popupContent.content}
            onClick={popupContent.onClick}
            btnText={popupContent.btnText}
          ></PopupBox>,
          document.getElementById("overlay")!
        )}
      <div className="right">
        <Image src={registerImg} alt="register" />
      </div>
    </div>
  );
}
