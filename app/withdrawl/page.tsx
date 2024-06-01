"use client";
import { createPortal } from "react-dom";
import usePopup from "@/hooks/usePopup";
import PopupBox from "@/components/PopupBox";
import { useEffect, useState } from "react";
import useData from "@/hooks/useData";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

export default function WithdrawlPage() {
  const { HidePopup, ShowPopup, setPopupContent, popupContent, popupIsOpened } =
    usePopup();
  const [balance, setBalance] = useState(1000);
  const [showWithdrawlOptions, setShowWithdrawlOptions] = useState(false);
  const { user, setUser, token } = useData();
  const [choosenWithdrawlType, setChoosenWithdrawlType] = useState(1);
  const defaultCancel = {
    text: "",
    event: () => {},
  };
  const [cancel, setCancel] = useState(defaultCancel);

  useEffect(() => {
    if (!user) return;
    if (user.withdrawlType == 0) router.push("/withdrawl-details");

    return () => {
      HidePopup();
    };
  }, []);

  const router = useRouter();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return router.push("/login");
    if (user.products.length == 0) {
      setPopupContent({
        title: "First Buy Product",
        content: "Please Purchace a Book in One Novel, Inorder to withdrawl.",
        onClick: HidePopup,
        btnText: "Ok",
      });
      setCancel(defaultCancel);
      ShowPopup();
      return;
    }
    if (user?.balance < balance) {
      setPopupContent({
        title: "Insufficient Balance",
        content:
          "You don't have enough balance, Your Balance is ₹" + user.balance,
        onClick: HidePopup,
        btnText: "Ok",
      });
      setCancel(defaultCancel);
      ShowPopup();
      return;
    } else {
      if (user.withdrawlType === 3) {
        setShowWithdrawlOptions(true);
        document.getElementById("overlay")!.className = "";
        document.documentElement.style.overflow = "hidden";
      } else {
        setPopupContent({
          title: "Confirm Withdrawl",
          content: `Are you sure you want to withdrawl ₹${balance}?`,
          onClick: () => {
            handleWithdrawl(user.withdrawlType);
            HidePopup();
          },
          btnText: "Yes",
        });
        setCancel({
          text: "Cancel",
          event: HidePopup,
        });
        ShowPopup();
      }
    }
  }

  function handleWithdrawl(type: Number) {
    if (!user) return;
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/withdrawl`,
        {
          amount: balance,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setPopupContent({
          title: "Withdrawl Request Sent",
          content: `Wait for the admin to approve the request. You will get the amount in your wallet soon.`,
          onClick: HidePopup,
          btnText: "Ok",
        });
        setCancel(defaultCancel);
        ShowPopup();
        setUser({ ...user, balance: user.balance - balance });
      })
      .catch((err) => {
        setPopupContent({
          title: err.response.data?.error || "Error",
          content: err.response.data?.mssg || "Something went wrong",
          onClick: HidePopup,
          btnText: "Ok",
        });
        ShowPopup();
      });
  }

  useEffect(() => {
    console.log(choosenWithdrawlType);
  }, [choosenWithdrawlType]);

  if (!user) return null;

  return (
    <div className="page only-withdrawl-page center-page">
      {popupIsOpened &&
        createPortal(
          <PopupBox
            title={popupContent.title}
            content={popupContent.content}
            onClick={popupContent.onClick}
            btnText={popupContent.btnText}
            cancelText={cancel.text}
            onCancel={cancel.event}
          />,
          document.getElementById("overlay")!
        )}
      {showWithdrawlOptions &&
        createPortal(
          <div className="withdrawl-popup">
            <h1 className="title">Choose Withdrawl Method</h1>
            <div className="row-field">
              <input
                type="radio"
                id="upiInput"
                name="withdrawlType"
                value={1}
                checked={choosenWithdrawlType === 1}
                onChange={(e) =>
                  setChoosenWithdrawlType(Number(e.target.value))
                }
              />
              <label htmlFor="upiInput">Upi Id: {user.upi}</label>
            </div>
            <div className="row-field">
              <input
                type="radio"
                id="bankInput"
                checked={choosenWithdrawlType === 2}
                name="withdrawlType"
                value={2}
                onChange={(e) =>
                  setChoosenWithdrawlType(Number(e.target.value))
                }
              />
              <label htmlFor="bankInput">
                <span className="row">
                  <span className="title">Bank</span>
                  <span className="details">{user.bank.bank_name}</span>
                </span>
                <span className="row">
                  <span className="title">Acc No</span>
                  <span className="details">{user.bank.account_no}</span>
                </span>
                <span className="row">
                  <span className="title">IFCS</span>
                  <span className="details">{user.bank.ifsc}</span>
                </span>
              </label>
            </div>
            <div className="btns">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowWithdrawlOptions(false);
                  document.getElementById("overlay")!.className = "hidden";
                  document.documentElement.style.overflow = "auto";
                }}
              >
                Cacnel
              </button>
              <button
                onClick={() => {
                  if (!user) return;
                  setShowWithdrawlOptions(false);
                  document.getElementById("overlay")!.className = "hidden";
                  document.documentElement.style.overflow = "auto";
                  handleWithdrawl(choosenWithdrawlType);
                }}
              >
                Confirm Withdrawl
              </button>
            </div>
          </div>,
          document.getElementById("overlay")!
        )}

      <div className="heading-with-arrow">
        <Link href="/">
          <div className="icon">
            <FaChevronLeft />
          </div>
        </Link>
        <h1>Withdrawl Money</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={balance}
          onChange={(e) => setBalance(e.target.valueAsNumber)}
          name="amount"
        />
        <button type="submit">Withdrawl</button>
      </form>
    </div>
  );
}
