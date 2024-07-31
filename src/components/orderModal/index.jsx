import React from "react";
import styles from "./orderModal.module.scss";
import OrderModalCard from "../orderModalCard";

const OrderModal = ({ item }) => {
  const { id, items, shipment, totalPrice, updatedAt } = item;

  const date = new Date(updatedAt);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Order details ID {id}</h1>
      <div className={styles.list}>
        {items.map((item) => (
          <OrderModalCard item={item} key={item.product.id} />
        ))}
      </div>
      <div className={styles.container}>
        <div className={styles.block}>
          <p>Date:</p>
          <span>{`${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
          }.${year}`}</span>
        </div>
        <div className={styles.block}>
          <p>Items:</p>
          <span>{items.reduce((acc, value) => acc + value.quantity, 0)}</span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.block}>
          <p>Address: </p>
          <span>{`${shipment.address}, ${shipment.city}, ${shipment.country}`}</span>
        </div>
        <div className={styles.block}>
          <p>Total: </p>
          <span>{totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
