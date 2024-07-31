import React from "react";
import styles from "./mainInformation.module.scss";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import Input from "../input";
import Button from "../button";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Mandatory info missing"),
  email: yup
    .string()
    .required("Mandatory info missing")
    .email("Email must be a valid email"),
  phone: yup
    .number("Must be numeric")
    .required("Mandatory info missing")
    .positive()
    .integer(),
  country: yup.string(),
  city: yup.string(),
  address: yup.string(),
});

const MainInformation = () => {
  const { account } = useSelector((state) => state.account);

  const initialValues = {
    fullName: account.fullName === null ? "" : account.fullName,
    email: account.email === null ? "" : account.email,
    phone: account.phone === null ? "" : account.phone,
    country: account.country === null ? "" : account.country,
    city: account.city === null ? "" : account.city,
    address: account.address === null ? "" : account.address,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {(props) => (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Main information</h2>
          <form className={styles.inputs} onSubmit={props.handleSubmit}>
            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.fullName}
              name="fullName"
              onBlur={props.handleBlur}
              placeholder={"Full Name"}
              error={props.errors.fullName}
              touched={props.touched.fullName}
            />
            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.email}
              name="email"
              onBlur={props.handleBlur}
              placeholder={"Email"}
              error={props.errors.email}
              touched={props.touched.email}
            />
            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.phone}
              name="phone"
              onBlur={props.handleBlur}
              placeholder={"Phone Number"}
              error={props.errors.phone}
              touched={props.touched.phone}
            />
            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.country}
              name="country"
              onBlur={props.handleBlur}
              placeholder={"Country"}
              error={props.errors.country}
              touched={props.touched.country}
            />
            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.city}
              name="city"
              onBlur={props.handleBlur}
              placeholder={"City"}
              error={props.errors.city}
              touched={props.touched.city}
            />
            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.address}
              name="address"
              onBlur={props.handleBlur}
              placeholder={"Address"}
              error={props.errors.address}
              touched={props.touched.address}
            />
            <Button type="submit">Save</Button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default MainInformation;
