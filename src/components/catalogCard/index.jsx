import React, { useCallback, useState } from "react";
import styles from "./catalogCard.module.scss";
import Portal from "../portal";
import ModalCard from "../modalCard";
import { addCartItem, deleteCartItem } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalMessage from "../modalMessage";
import { addFavorite, deleteFavoriteByID } from "../../redux/asyncThunks";
import { setModal } from "../../redux/slices/modalSlice";

const CatalogCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMessage, setIsMessage] = useState(false);

  const { cart, account } = useSelector((state) => state);
  const dispatch = useDispatch();
  const isInCart = !!cart.items.find((value) => value.productId === item.id);

  const handleAdd = useCallback((item) => {
    if (isInCart) {
      dispatch(deleteCartItem(item));
    } else {
      dispatch(addCartItem(item));
      setIsMessage(true);
    }
    setIsOpen(false);
  }, []);

  const handleLike = useCallback((item) => {
    if (account.isLoggedIn) {
      if (item.favorite) {
        dispatch(deleteFavoriteByID(item));
      } else {
        dispatch(addFavorite(item));
      }
    } else {
      dispatch(setModal("authenticated"));
    }
  }, []);

  return (
    <>
      <div
        className={styles.wrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.imgContainer}>
          <img className={styles.img} src={item.picture} alt={item.title} />
        </div>
        <button
          className={
            item.favorite ? styles.btn.concat(" ", styles.active) : styles.btn
          }
          onClick={(e) => {
            e.stopPropagation();
            handleLike(item);
          }}
        >
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.3944 2.68343C15.3737 0.561572 12.1524 0.444781 10 2.33751C7.84849 0.445673 4.62717 0.561572 2.60557 2.68343C1.56972 3.7711 1 5.21628 1 6.75507C1 8.29386 1.56972 9.73993 2.60557 10.8267L9.03972 17.5828C9.30462 17.8609 9.65274 18 10 18C10.3473 18 10.6954 17.8609 10.9603 17.5828L17.3944 10.8267C18.4303 9.73993 19 8.29475 19 6.75507C19 5.21628 18.4303 3.77021 17.3944 2.68343Z" />
          </svg>
        </button>
        <div className={styles.description}>
          <p className={styles.title}>{item.title}</p>
          <span className={styles.price}>${item.price}</span>
        </div>
      </div>

      <Portal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        <ModalCard
          item={item}
          handleLike={handleLike}
          handleAdd={handleAdd}
          isInCart={isInCart}
        />
      </Portal>

      {isMessage && (
        <ModalMessage
          isOpen={isMessage}
          name={item.title}
          setIsOpen={() => setIsMessage(false)}
        />
      )}
    </>
  );
};

export default CatalogCard;
