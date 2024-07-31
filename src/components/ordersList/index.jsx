import React, { useEffect } from "react";
import styles from "./ordersList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import ErrorMessage from "../errorMessage";
import EmptyPage from "../emptyPage";
import OrdersCard from "../ordersCard";
import { fetchOrders } from "../../redux/asyncThunks";

const OrdersList = () => {
  const { items, isLoading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className={styles.wrapper}>
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <Loader modal={false} />
      ) : items.length === 0 ? (
        <EmptyPage
          title={"No Results Found"}
          message={"It looks like you've never placed an order before."}
        />
      ) : (
        items.map((item) => <OrdersCard key={item.id} item={item} />)
      )}
    </div>
  );
};

export default OrdersList;
