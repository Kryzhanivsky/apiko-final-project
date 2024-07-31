import React from "react";
import styles from "./authentication.module.scss";
import Button from "../button";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/slices/modalSlice";

const Authentication = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>To continue please register or log in</h2>
      <Button onClick={() => dispatch(setModal("login"))}>
        Continue to sign in
      </Button>
      <Button onClick={() => dispatch(setModal("registration"))}>
        Continue to register
      </Button>
      <Button filled={false} onClick={() => dispatch(setModal(""))}>
        Continue as guest
      </Button>
    </div>
  );
};

export default Authentication;
