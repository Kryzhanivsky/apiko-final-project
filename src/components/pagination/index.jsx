import React from "react";
import styles from "./pagination.module.scss";

const Pagination = ({ isPaginationEnd, handleClick }) => {
  return (
    !isPaginationEnd && (
      <div className={styles.wrapper}>
        <button className={styles.btn} onClick={handleClick}>
          Load more...
        </button>
      </div>
    )
  );
};

export default Pagination;
