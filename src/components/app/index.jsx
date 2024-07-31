import React, { useEffect } from "react";
import styles from "./app.module.scss";
import Header from "../header";
import Footer from "../footer";
import { Routes, Navigate, Route } from "react-router-dom";
import Home from "../../pages/home";
import User from "../../pages/user";
import NotFound from "../../pages/notFound";
import { useDispatch, useSelector } from "react-redux";
import Portal from "../portal";
import { setModal } from "../../redux/slices/modalSlice";
import Login from "../login";
import Registration from "../registration";
import Authentication from "../authentication";
import { authenticate } from "../../redux/asyncThunks";
import Cart from "../../pages/cart";

const App = () => {
  const { modal, account } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (account.token) {
      dispatch(authenticate(account.token));
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route
            path={"/user"}
            element={
              account.isLoggedIn ? <User /> : <Navigate to="/" replace />
            }
          />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      <Portal isOpen={modal.modal} setIsOpen={() => dispatch(setModal(""))}>
        {modal.modal === "login" && <Login />}
        {modal.modal === "registration" && <Registration />}
        {modal.modal === "authenticated" && <Authentication />}
      </Portal>
    </div>
  );
};

export default App;
