import { useState } from "react";
function ShowOverlay() {
  const overlay = document.getElementById("overlay");
  const body = document.querySelector("body");
  if (overlay && body) {
    overlay.style.display = "block";
    body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
}
function HideOverlay() {
  const overlay = document.getElementById("overlay");
  const body = document.querySelector("body");
  if (overlay && body) {
    overlay.style.display = "none";
    body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }
}
export default function usePopup() {
  const [popupIsOpened, setShowPopup] = useState(false);
  const ShowPopup = () => {
    setShowPopup(true);
    ShowOverlay();
  };
  const HidePopup = () => {
    setShowPopup(false);
    HideOverlay();
  };
  const [popupContent, setPopupContent] = useState({
    title: "",
    content: "",
    onClick: HidePopup,
    btnText: "",
  });

  return {
    ShowPopup,
    HidePopup,
    popupIsOpened,
    setPopupContent,
    popupContent,
  };
}
