import React, { useEffect, useState } from "react";
import styles from "./countriesSelect.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/asyncThunks";

const CountriesSelect = ({ value, setValue, placeholder, error, touched }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { countries } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={
          error ? styles.input.concat(" ", styles.error) : styles.input
        }
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={styles.value}>{value}</p>
        <span
          className={
            isOpen || value
              ? styles.placeholder.concat(" ", styles.active)
              : styles.placeholder
          }
        >
          {placeholder}
        </span>
        <button
          className={
            isOpen ? styles.icon.concat(" ", styles.active) : styles.icon
          }
          onClick={(e) => e.preventDefault()}
        >
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
        </button>
      </div>

      {error ? <div className={styles.error}>{error}</div> : ""}

      {isOpen && (
        <ul className={styles.modal}>
          {countries.map((option) => (
            <li
              key={option}
              onClick={() => {
                setValue("country", option);
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

export default CountriesSelect;
