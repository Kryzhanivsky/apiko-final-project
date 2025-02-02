import React, { useCallback, useState } from "react";
import styles from "./search.module.scss";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/slices/catalogSlice";
import debounce from "../../service/debounce";

const Search = () => {
  const [localSearch, setLocalSearch] = useState("");
  const dispatch = useDispatch();
  const fetch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));

    }),
    []
  );

  const handleClick = (value) => {
    setLocalSearch(value);
    fetch(value.length >= 3 && value.length <= 50 ? value : "");
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.icon} htmlFor="search">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.75 13.5V13.6037L11.8234 13.677L16.8234 18.667L17.0002 18.8434L17.1768 18.6668L18.6668 17.1768L18.8434 17.0002L18.667 16.8234L13.677 11.8234L13.6037 11.75H13.5H13H12.8109L12.7705 11.7111C13.6973 10.5539 14.25 9.08773 14.25 7.5C14.25 3.77193 11.2281 0.75 7.5 0.75C3.77193 0.75 0.75 3.77193 0.75 7.5C0.75 11.2281 3.77193 14.25 7.5 14.25C9.08773 14.25 10.5539 13.6973 11.7111 12.7705L11.75 12.8109V13.5ZM7.5 11.75C5.14807 11.75 3.25 9.85193 3.25 7.5C3.25 5.14807 5.14807 3.25 7.5 3.25C9.85193 3.25 11.75 5.14807 11.75 7.5C11.75 9.85193 9.85193 11.75 7.5 11.75Z"
            fill="#707070"
            stroke="#727272"
            strokeWidth="0.5"
          />
        </svg>
      </label>
      <input
        className={styles.input}
        id="search"
        type="text"
        placeholder="Search products by name"
        value={localSearch}
        onChange={(e) => handleClick(e.target.value)}
      />
    </div>
  );
};

export default Search;
