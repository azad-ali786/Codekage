import React from "react";
import Image from "next/image";
import styles from "./NavBar.module.css"; // Import CSS module

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Image
        src="/LogoCodeKage.svg"
        alt="CodeKage Logo"
        width={200}
        height={50}
      />
      <div className={styles.banner}>
        <h1 className={styles.bannerText}>
          Only supports JavaScript for now
        </h1>
      </div>
    </nav>
  );
};

export default NavBar;
