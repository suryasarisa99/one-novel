"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="5px"
        color="#dccb92"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
