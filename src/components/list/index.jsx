import React from "react";
import styles from "./list.module.scss";

import CatalogCard from "../catalogCard";

const List = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <CatalogCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
