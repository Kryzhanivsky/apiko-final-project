import React, { useState } from "react";
import styles from "./ordersCard.module.scss";
import OrderModal from "../orderModal";
import Portal from "../portal";

const OrdersCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(item.updatedAt);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <>
      <div
        className={styles.wrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.container}>
          <div className={styles.block}>
            <p>Order ID: </p>
            <span className={styles.id}>{item.id}</span>
          </div>
          <div className={styles.block}>
            <p>Price:</p>
            <span>${item.totalPrice}</span>
          </div>
        </div>
        <div className={styles.block}>
          <p>Date: </p>
          <span>{`${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
          }.${year}`}</span>
        </div>
      </div>
      <Portal setIsOpen={() => setIsOpen(false)} isOpen={isOpen}>
        <OrderModal item={item} />
      </Portal>
    </>
  );
};

export default OrdersCard;
