import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <p className={styles.copyrighting}>Copyright © 2021. Privacy Policy.</p>
    </footer>
  );
};

export default Footer;
