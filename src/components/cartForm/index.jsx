import React, { useState } from "react";
import styles from "./cartForm.module.scss";
import { Formik } from "formik";
import Input from "../input";
import Button from "../button";
import CountriesSelect from "../countriesSelect";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { doOrder } from "../../redux/asyncThunks";
import Portal from "../portal";
import CartConfirm from "../cartConfirm";
import Loader from "../loader";
import { clearCart } from "../../redux/slices/cartSlice";

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Mandatory info missing").nullable(),
  phone: yup.string().required("Mandatory info missing").nullable(),
  country: yup.string().required("Mandatory info missing").nullable(),
  city: yup.string().required("Mandatory info missing").nullable(),
  address: yup.string().required("Mandatory info missing").nullable(),
});

const CartForm = ({ count, totalPrice, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { orders, cart } = useSelector((state) => state);
  const { fullName, phone, country, city, address } = useSelector(
    (state) => state.account.account
  );
  const dispatch = useDispatch();

  const initialValues = {
    fullName: fullName === null ? "" : fullName,
    phone: phone === null ? "" : phone,
    country: country === null ? "" : country,
    city: city === null ? "" : city,
    address: address === null ? "" : address,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await dispatch(doOrder({ ...values }));
          await dispatch(clearCart());
        }}
      >
        {(props) => (
          <form className={styles.wrapper} onSubmit={props.handleSubmit}>
            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.fullName}
              name="fullName"
              placeholder={"Full name"}
              onBlur={props.handleBlur}
              error={props.errors.fullName}
              touched={props.touched.fullName}
            />

            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.phone}
              name="phone"
              placeholder={"Phone"}
              onBlur={props.handleBlur}
              error={props.errors.phone}
              touched={props.touched.phone}
            />

            <CountriesSelect
              value={props.values.country}
              setValue={props.setFieldValue}
              placeholder={"Country"}
              error={props.errors.country}
              touched={props.touched.country}
            />

            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.city}
              name="city"
              placeholder={"City"}
              onBlur={props.handleBlur}
              error={props.errors.city}
              touched={props.touched.city}
            />

            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.address}
              name="address"
              placeholder={"Address"}
              onBlur={props.handleBlur}
              error={props.errors.address}
              touched={props.touched.address}
            />

            <div className={styles.total}>
              <div>
                <p>Items </p>
                <span>{count}</span>
              </div>
              <div>
                <p>Total</p>
                <span>${totalPrice}</span>
              </div>
            </div>

            <Button type="submit" disabled={cart.items.length === 0}>
              Confirms the purchase
            </Button>
            <Button
              filled={false}
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              Continue shopping
            </Button>
          </form>
        )}
      </Formik>
      {orders.isLoading && <Loader />}
      <Portal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        <CartConfirm />
      </Portal>
    </>
  );
};

export default CartForm;
