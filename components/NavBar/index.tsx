import React from "react";
import Image from "next/image";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <Image
        src="/LogoCodeKage.svg"
        alt="CodeKage Logo"
        width={200}
        height={50}
      />
      <div className="banner">
        <h1 className="banner-text">Only supports JavaScript for now</h1>
      </div>
    </nav>
  );
};

export default NavBar;
