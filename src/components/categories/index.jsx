import React, { useEffect, useState } from "react";
import styles from "./categories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/slices/catalogSlice";
import { fetchCategories } from "../../redux/asyncThunks";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, categoryId } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={isOpen ? styles.btn.concat(" ", styles.active) : styles.btn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.icon}>
          <svg
            width="17"
            height="14"
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 9H4V5H0V9ZM0 14H4V10H0V14ZM0 4H4V0H0V4ZM5 9H17V5H5V9ZM5 14H17V10H5V14ZM5 0V4H17V0H5Z" />
          </svg>
        </div>
        <p className={styles.text}>
          {categoryId ? categories[categoryId - 1].name : "All"}
        </p>
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
          <li
            className={styles.category}
            onClick={() => {
              dispatch(setCategory(0));
              setIsOpen(false);
            }}
          >
            {"All"}
          </li>
          {categories.map((category) => (
            <li
              key={category.id}
              className={styles.category}
              onClick={() => {
                dispatch(setCategory(category.id));
                setIsOpen(false);
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
