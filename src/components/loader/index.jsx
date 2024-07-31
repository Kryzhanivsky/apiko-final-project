import React from "react";
import styles from "./loader.module.scss";

const Loader = ({ modal = true, text = "Loading..." }) => (
  <div className={modal ? styles.background : styles.container}>
    <div className={styles.ldsSpinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p className={styles.text}>{text}</p>
  </div>
);

export default Loader;
