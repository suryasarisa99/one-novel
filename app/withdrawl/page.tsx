"use client";
import { createPortal } from "react-dom";
import usePopup from "@/hooks/usePopup";
import PopupBox from "@/components/PopupBox";
import { useEffect, useState } from "react";
import useData from "@/hooks/useData";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function WithdrawlPage() {
  const { HidePopup, ShowPopup, setPopupContent, popupContent, popupIsOpened } =
    usePopup();
  const [balance, setBalance] = useState(1000);
  const [showWithdrawlOptions, setShowWithdrawlOptions] = useState(false);
  const { user, setUser, token } = useData();
  const [choosenWithdrawlType, setChoosenWithdrawlType] = useState(1);

  const router = useRouter();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return router.push("/login");
    if (user?.balance < balance) {
      setPopupContent({
        title: "Insufficient Balance",
        content:
          "You don't have enough balance, Your Balance is ₹" + user.balance,
        onClick: HidePopup,
      });
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
          content: `Wait for the admin to approve the request. You will get the amount in your account soon.`,
          onClick: HidePopup,
        });
        ShowPopup();
        setUser({ ...user, balance: user.balance - balance });
      })
      .catch((err) => {
        console.log(err);
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
            <center>
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
            </center>
          </div>,
          document.getElementById("overlay")!
        )}

      <h1>Withdrawl Money</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.valueAsNumber)}
            name="amount"
          />
        </label>
        <button type="submit">Withdrawl</button>
      </form>
    </div>
  );
}
