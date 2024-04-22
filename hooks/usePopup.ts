import { useState } from "react";
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
  });

  return {
    ShowPopup,
    HidePopup,
    popupIsOpened,
    setPopupContent,
    popupContent,
  };
}
