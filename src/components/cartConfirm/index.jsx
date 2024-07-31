import React from "react";
import styles from "./carConfirm.module.scss";
import Button from "../button";
import { useNavigate } from "react-router-dom";

const CartConfirm = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h1>Thank you for your purchase</h1>
      <p>We will send you a notification when your order arrives to you</p>
      <Button filled={false} onClick={() => navigate("/")}>
        Continue shopping
      </Button>
      <Button
        filled={false}
        onClick={() => navigate("/user", { state: { section: "orders" } })}
      >
        View order history
      </Button>
    </div>
  );
};

export default CartConfirm;
