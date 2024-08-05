"use client";

import { ShareIcon } from "@/assets";
import { useState, useEffect } from "react";
import { Toast } from "../";

const ShareButton = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Ziphop",
        url: currentUrl,
      });
    } else {
      await navigator.clipboard.writeText(currentUrl);
      handleShowToast();
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <ShareIcon className="w-6 h-6" onClick={share} />
      <Toast
        message="コピーしました"
        show={showToast}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default ShareButton;
