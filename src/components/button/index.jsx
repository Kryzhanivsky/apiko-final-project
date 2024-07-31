import React from "react";
import styles from "./button.module.scss";

const Button = ({filled = true, children, ...args }) => (
  <button
    className={filled ? styles.filled : styles.empty}
    {...args}
  >
    {children}
  </button>
);

export default Button;
