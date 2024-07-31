import React from "react";
import Button from "../button";
import { Formik } from "formik";
import styles from "./login.module.scss";
import Input from "../input";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { setModal } from "../../redux/slices/modalSlice";
import {login} from "../../redux/asyncThunks";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Mandatory info missing")
    .email("Email must be a valid email"),
  password: yup.string().required("Mandatory info missing"),
});

const Login = () => {
  const { isLoading, error } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors }) => {
          const result = await dispatch(
            login({
              email: values.email,
              password: values.password,
            })
          );
          if (result.type === "login/fulfilled") {
            dispatch(setModal(""));
          }
        }}
      >
        {(props) => (
          <form className={styles.wrapper} onSubmit={props.handleSubmit}>
            <h1 className={styles.title}>Login</h1>

            <Input
              type="text"
              onChange={props.handleChange}
              value={props.values.email}
              name="email"
              placeholder={"Email"}
              onBlur={props.handleBlur}
              error={props.errors.email}
              touched={props.touched.email}
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
            />

            {error === "INCORRECT_EMAIL_OR_PASSWORD" && (
              <p className={styles.error}>Incorrect email or password</p>
            )}

            <Button type="submit">Login</Button>
          </form>
        )}
      </Formik>

      <div className={styles.remark}>
        <p>
          I have no account,
          <span onClick={() => dispatch(setModal("registration"))}>
            Register now
          </span>
        </p>
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default Login;
