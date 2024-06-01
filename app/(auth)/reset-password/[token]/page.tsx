"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import PopupBox from "@/components/PopupBox";
import usePopup from "@/hooks/usePopup";
import { createPortal } from "react-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notSecurePassword, setNotSecurePassword] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { HidePopup, ShowPopup, setPopupContent, popupContent, popupIsOpened } =
    usePopup();

  useEffect(() => {
    return () => {
      HidePopup();
    };
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let hasError = false;
    if (
      password.length < 6 ||
      !/[0-9]/.test(password) || // no number
      !/[^a-zA-Z0-9]/.test(password) // no special character
    ) {
      setNotSecurePassword(true);
      hasError = true;
    } else {
      setNotSecurePassword(false);
    }
    if (password !== confirmPassword) {
      setPasswordNotMatch(true);
      hasError = true;
    } else {
      setPasswordNotMatch(false);
    }
    if (hasError) return;

    console.log("no error");
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/auth/reset-password`, {
        token,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setPopupContent({
          title: "Password Reset",
          content:
            "Your Password has been reset successfully, Please Login to continue.",
          onClick: () => {
            HidePopup();
            router.push("/login");
          },
          btnText: "Login",
        });
        ShowPopup();
      })
      .catch((err) => {
        setPopupContent({
          title: err.response.data.title || "Error",
          content: err.response.data.error || "Something went wrong",
          onClick: HidePopup,
          btnText: "Ok",
        });
        ShowPopup();
      });

    // Reset Password API Call
  }

  return (
    <div className="reset-password auth">
      {popupIsOpened &&
        createPortal(
          <PopupBox
            title={popupContent.title}
            content={popupContent.content}
            onClick={popupContent.onClick}
            btnText={popupContent.btnText}
          />,
          document.getElementById("overlay")!
        )}
      <div className="heading">Reset Password</div>
      <center>
        <form action="" onSubmit={handleSubmit}>
          <div className="pass-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New password"
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
            {notSecurePassword && (
              <div className="error">
                Not a Secure a Password
                <p>
                  Password Must Contain a Symbol, Number and Minimum of 6
                  characters
                </p>
              </div>
            )}
          </div>
          <div className="pass-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div
              className="icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <div className="errors">
            {passwordNotMatch && (
              <div className="error">Password Not Match</div>
            )}
          </div>
          <button>Submit</button>
        </form>
      </center>
    </div>
  );
}
