import React from "react";
import styles from "./passwordChanging.module.scss";
import { Formik } from "formik";
import Input from "../input";
import Button from "../button";
import * as yup from "yup";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required("Mandatory info missing"),
  newPassword: yup
    .string()
    .required("Mandatory info missing")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/,
      "Password must contain at least 1 letter, 1 number and 1 special character"
    ),
  confirmPassword: yup
    .string()
    .required("Mandatory info missing")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

const PasswordChanging = () => {
  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {(props) => (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Change password</h2>
          <form className={styles.inputs} onSubmit={props.handleSubmit}>
            <Input
              type="password"
              visibility={false}
              onChange={props.handleChange}
              value={props.values.currentPassword}
              name="currentPassword"
              onBlur={props.handleBlur}
              placeholder={"Current password"}
              error={props.errors.currentPassword}
              touched={props.touched.currentPassword}
            />
            <Input
              type="password"
              visibility={false}
              onChange={props.handleChange}
              value={props.values.newPassword}
              name="newPassword"
              onBlur={props.handleBlur}
              placeholder={"New password"}
              error={props.errors.newPassword}
              touched={props.touched.newPassword}
            />
            <Input
              type="password"
              visibility={false}
              onChange={props.handleChange}
              value={props.values.confirmPassword}
              name="confirmPassword"
              onBlur={props.handleBlur}
              placeholder={"Confirm password"}
              error={props.errors.confirmPassword}
              touched={props.touched.confirmPassword}
            />
            <Button type="submit">Change password</Button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default PasswordChanging;
