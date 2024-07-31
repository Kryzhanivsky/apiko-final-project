import React from "react";
import styles from "./orderModalCard.module.scss";

const OrderModalCard = ({ item }) => {
  const { product, quantity, orderedPrice } = item;

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.imgWrapper}>
          <img src={product.picture} alt="goods" />
        </div>

        <div className={styles.data}>
          <p className={styles.name}>{product.title}</p>

          <div className={styles.quantity}>
            <p>Items:</p>
            <span>{quantity}</span>
          </div>
        </div>
      </div>

      <div className={styles.total}>
        <p>Price:</p>
        <span>${orderedPrice}.43</span>
      </div>
    </div>
  );
};

export default OrderModalCard;
