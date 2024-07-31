import React, { useState } from "react";
import styles from "./sort.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSortOption } from "../../redux/slices/catalogSlice";

const sorts = ["Popular", "Latest"];

const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sortOption } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div
        className={isOpen ? styles.btn.concat(" ", styles.active) : styles.btn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.icon}>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.51 2.00031V2C0.51 1.17287 1.1794 0.5 2 0.5H12C12.8239 0.5 13.5 1.17614 13.5 2V17.2417L7.19696 14.5404L7 14.456L6.80304 14.5404L0.500474 17.2415L0.51 2.00031Z"
              fill="#727272"
              stroke="#727272"
            />
          </svg>
        </div>
        <p className={styles.text}>{sortOption}</p>
        <div className={styles.icon}>
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.14256 7.62263L14.7307 0.206904C15.0092 -0.0569425 15.4723 -0.0701755 15.7649 0.17716C16.0576 0.424495 16.0691 0.838996 15.7904 1.10284L9.06588 8.67222C8.86861 8.85905 8.57881 8.92028 8.32251 8.85227C8.03055 9.06765 7.59773 9.0531 7.32469 8.80862C7.03436 8.54867 0.217836 1.35396 0.217836 1.35396C-0.072612 1.09414 -0.072612 0.672842 0.217836 0.412901C0.508284 0.153081 0.978876 0.153081 1.26934 0.412901L8.14256 7.62263Z"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className={styles.content}>
          {sorts.map((option) => (
            <li
              key={option}
              className={styles.option}
              onClick={() => {
                dispatch(setSortOption(option));
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sort;
