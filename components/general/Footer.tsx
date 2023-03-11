import React from "react";

const Footer = () => {
  let tm = "\u2122";
  return (
    <footer className="border-t-2 border-black ">
      <address className="flex justify-center text-center">
        <p className="text-sm text-white">Aftin{tm} 2023</p>
      </address>
    </footer>
  );
};

export default Footer;
