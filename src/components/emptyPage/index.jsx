import React from "react";
import styles from "./emptyPage.module.scss";

const EmptyPage = ({ title, message }) => (
  <div className={styles.wrapper}>
    <h3>{title}</h3>
    <p>{message}</p>
  </div>
);
export default EmptyPage;
