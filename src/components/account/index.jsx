import React, { useState } from "react";
import styles from "./account.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/accountSlice";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { account } = useSelector((state) => state.account);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper} onClick={() => setIsOpen((prev) => !prev)}>
      <p className={styles.text}>{`Welcome, ${account.fullName}!`}</p>
      <div className={styles.avatar}>
        {account.fullName
          .split(" ")
          .map((string) => string.charAt(0).toUpperCase())}
      </div>
      <button
        className={isOpen ? styles.btn.concat(" ", styles.active) : styles.btn}
      >
        <svg
          width="13"
          height="8"
          viewBox="0 0 13 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1.09091L1.04 0L6.5 5.80364L11.96 0L13 1.09091L6.5 8L0 1.09091Z"
            fill="white"
          />
        </svg>
      </button>

      <div
        className={
          isOpen ? styles.popup.concat(" ", styles.active) : styles.popup
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <p className={styles.name}>{account.fullName}</p>
          <p className={styles.email}>{account.email}</p>
        </div>
        <div className={styles.basement}>
          <button
            onClick={() => {
              navigate("/user");
              setIsOpen((prev) => !prev);
            }}
          >
            Settings
          </button>
          <button className={styles.logout} onClick={() => dispatch(logOut())}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
