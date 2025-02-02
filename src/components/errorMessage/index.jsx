import React from "react";
import styles from "./errorMessage.module.scss";

const ErrorMessage = ({ message = "Something went wrong" }) => (
  <div className={styles.wrapper}>
    <svg
      fill="none"
      height="90"
      width="90"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M12.8455 5.21137C12.4531 4.59003 11.5469 4.59003 11.1545 5.21137L2.78316 18.466C2.36261 19.1319 2.84109 20 3.62865 20H20.3713C21.1589 20 21.6374 19.1319 21.2168 18.466L12.8455 5.21137ZM9.46353 4.14338C10.6408 2.27935 13.3592 2.27936 14.5365 4.14339L22.9078 17.398C24.1695 19.3956 22.734 22 20.3713 22H3.62865C1.26598 22 -0.169465 19.3956 1.09218 17.398L9.46353 4.14338ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM10.6941 10.1644L11.4178 14.5068C11.4652 14.7914 11.7115 15 12 15C12.2885 15 12.5348 14.7914 12.5822 14.5068L13.3059 10.1644C13.4075 9.55487 12.9375 9 12.3195 9H11.6805C11.0625 9 10.5925 9.55487 10.6941 10.1644Z"
        fill="#373737"
        fillRule="evenodd"
      />
    </svg>
    <p className={styles.text}>{message}</p>
  </div>
);

export default ErrorMessage;
