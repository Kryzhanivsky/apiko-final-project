import React, { useEffect, useState } from "react";
import styles from "./cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/cartItem";
import { fetchItemsByIds } from "../../redux/asyncThunks";
import CartForm from "../../components/cartForm";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage";
import Loader from "../../components/loader";
import EmptyPage from "../../components/emptyPage";
import { clearItems } from "../../redux/slices/catalogSlice";

const Cart = () => {
  const { cart, catalog } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.items.reduce((acc, item) => {
    const foundItem = catalog.items.find(
      (value) => value.id === item.productId
    );
    if (foundItem) {
      return acc + foundItem.price * item.quantity;
    } else {
      return acc;
    }
  }, 0);

  useEffect(() => {
    if (cart.items.length > 0) {
      const ids = cart.items.map((item) => item.productId);
      console.log(ids);
      dispatch(fetchItemsByIds(ids));
    } else {
      console.log(cart.items);
      dispatch(clearItems());
    }
  }, [cart.items.length]);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>My cart</h1>
      <div className={styles.container}>
        <div className={styles.list}>
          {catalog.error ? (
            <ErrorMessage message={catalog.error} />
          ) : catalog.isLoading ? (
            <Loader modal={false} />
          ) : catalog.items.length > 0 ? (
            catalog.items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <EmptyPage
              title={"No Results Found"}
              message={
                "Maybe you haven't added any products to the cart yet. Visit the product catalog to make a purchase."
              }
            />
          )}
        </div>
        <CartForm
          count={cart.items.reduce((acc, item) => acc + item.quantity, 0)}
          totalPrice={totalPrice}
          handleClick={() => navigate("/")}
        />
      </div>
    </section>
  );
};

export default Cart;
