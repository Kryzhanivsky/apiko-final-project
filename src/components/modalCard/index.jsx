import React, { useState } from "react";
import styles from "./modalCard.module.scss";
import Button from "../button";
import { useNavigate } from "react-router-dom";

const svg = (
  <svg
    width="19"
    height="13"
    viewBox="0 0 19 13"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 1.08765L17.846 0L6.65537 10.7988L1.15395 5.49004L0 6.57769L6.65537 13L19 1.08765Z"
      fill="white"
    />
  </svg>
);

const ModalCard = ({ item, handleLike, handleAdd, isInCart }) => {
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <div className={styles.imgWrapper}>
          <img src={item.picture} alt="goods" />
        </div>
        <div className={styles.text}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <div className={styles.price}>
            <p>Price</p>
            <span>${item.price}</span>
          </div>
          <div className={styles.amount}>
            <button
              disabled={!(amount - 1)}
              onClick={() =>
                setAmount((prev) => (prev - 1 > 0 ? prev - 1 : prev))
              }
            >
              <span></span>
            </button>
            <span>{amount}</span>
            <button onClick={() => setAmount((prev) => prev + 1)}>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className={styles.total}>
            <p>Items:</p>
            <span>{amount}</span>
          </div>
          <div className={styles.total}>
            <p>Total:</p>
            <span>${amount * item.price}</span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div>
          <Button
            filled={isInCart}
            onClick={() =>
              handleAdd({
                productId: item.id,
                quantity: amount,
              })
            }
          >
            ADD TO CART {isInCart ? svg : ""}
          </Button>
          <Button filled={item.favorite} onClick={() => handleLike(item)}>
            ADD TO FAVORITES {item.favorite ? svg : ""}
          </Button>
        </div>
        <Button
          onClick={() => {
            handleAdd({
              productId: item.id,
              quantity: amount,
            });
            navigate("/cart");
          }}
        >
          Buy now
        </Button>
      </div>
    </div>
  );
};

export default ModalCard;
