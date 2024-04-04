import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f7f7f7]">
      <div className="width-wrapper text-sm mx-auto text-center text-[#888888] py-2">
        Developed by HieuDev ©{new Date().getFullYear()}
      </div>
    </footer>
  );
}
