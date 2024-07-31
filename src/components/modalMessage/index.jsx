import React from "react";
import ReactDOM from "react-dom";
import styles from "./modalMessage.module.scss";

const ModalMessage = ({ setIsOpen, name }) => {
  setTimeout(setIsOpen, 6000);

  return ReactDOM.createPortal(
    <div className={styles.block}>
      <p>
        The <span>{name}</span> is successfully added to cart
      </p>
      <button className={styles.close} onClick={setIsOpen}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 1.81286L16.1871 0L9 7.18714L1.81286 0L0 1.81286L7.18714 9L0 16.1871L1.81286 18L9 10.8129L16.1871 18L18 16.1871L10.8129 9L18 1.81286Z"
            fill="#707070"
          />
        </svg>
      </button>
    </div>,
    document.getElementById("message")
  );
};

export default ModalMessage;
