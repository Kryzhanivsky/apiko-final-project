import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import styles from "./registration.module.scss";
import Input from "../input";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { setModal } from "../../redux/slices/modalSlice";
import { register } from "../../redux/asyncThunks";

const initialValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Mandatory info missing"),
  email: yup
    .string()
    .required("Mandatory info missing")
    .email("Email must be a valid email"),
  phoneNumber: yup
    .number()
    .typeError("Must be numeric")
    .required("Mandatory info missing")
    .positive()
    .integer(),
  password: yup
    .string()
    .required("Mandatory info missing")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/,
      "Password must contain at least 1 letter, 1 number and 1 special character"
    ),
});

const Registration = () => {
  const { isLoading, error } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors }) => {
          const result = await dispatch(
            register({
              fullName: values.fullName,
              email: values.email,
              password: values.password,
              phoneNumber: values.phoneNumber,
            })
          );
          if (result.type === "registration/fulfilled") {
            dispatch(setModal(""));
          }
          if (error === "EMAIL_ALREADY_USED") {
            setErrors({ email: "Such email is already used" });
          }
        }}
      >
        {(props) => (
          <form className={styles.wrapper} onSubmit={props.handleSubmit}>
            <h1 className={styles.title}>Register</h1>
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
              value={props.values.phoneNumber}
              name="phoneNumber"
              onBlur={props.handleBlur}
              placeholder={"Phone number"}
              error={props.errors.phoneNumber}
              touched={props.touched.phoneNumber}
            />

            <Input
              type="password"
              onChange={props.handleChange}
              value={props.values.password}
              name="password"
              onBlur={props.handleBlur}
              placeholder={"Password"}
              error={props.errors.password}
              touched={props.touched.password}
              message={
                "The password has to be at least at least 1 letter, 1special symbol, 1 number"
              }
            />
            <Button type="submit">Registration</Button>
          </form>
        )}
      </Formik>

      <div className={styles.remark}>
        <p>
          I already have an account,
          <span onClick={() => dispatch(setModal("login"))}>Log In</span>
        </p>
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default Registration;
