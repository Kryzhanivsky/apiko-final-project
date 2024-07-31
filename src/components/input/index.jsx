import React, { useState } from "react";
import styles from "./input.module.scss";

const Input = ({
  error,
  message = "",
  placeholder,
  touched,
  type,
  visibility = true,
  ...args
}) => {
  const [visible, setVisible] = useState(false);

  let field = styles.field;
  let label = styles.label;

  if (args.value) {
    field = field.concat(" ", styles.active);
    label = label.concat(" ", styles.active);
  }

  if (error && touched) {
    field = field.concat(" ", styles.error);
    label = label.concat(" ", styles.error);
  }

  return (
    <label className={styles.wrapper}>
      <input className={field} type={visible ? "text" : type} {...args} />
      <span className={label}>{placeholder}</span>
      {type === "password" && visibility && (
        <button
          className={styles.passwordIcon}
          onClick={(e) => {
            e.preventDefault();
            setVisible((prev) => !prev);
          }}
        >
          {visible ? (
            <svg
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4C13.76 4 16 6.24 16 9C16 9.65 15.87 10.26 15.64 10.83L18.56 13.75C20.07 12.49 21.26 10.86 21.99 9C20.26 4.61 15.99 1.5 10.99 1.5C9.59 1.5 8.25 1.75 7.01 2.2L9.17 4.36C9.74 4.13 10.35 4 11 4ZM1 1.27L3.28 3.55L3.74 4.01C2.08 5.3 0.78 7.02 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.8 16.08L18.73 19L20 17.73L2.27 0L1 1.27ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.78 8 9C8 10.66 9.34 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C8.24 14 6 11.76 6 9C6 8.21 6.2 7.47 6.53 6.8ZM10.84 6.02L13.99 9.17L14.01 9.01C14.01 7.35 12.67 6.01 11.01 6.01L10.84 6.02Z"
                fill="#727272"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z"
                fill="#727272"
              />
            </svg>
          )}
        </button>
      )}

      {error && touched ? (
        <div className={styles.error}>{error}</div>
      ) : message ? (
        <div className={styles.message}>{message}</div>
      ) : (
        ""
      )}
    </label>
  );
};

export default Input;
