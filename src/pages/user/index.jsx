import React, { useEffect, useState } from "react";
import styles from "./user.module.scss";
import { useSelector } from "react-redux";
import MainInformation from "../../components/mainInformation";
import PasswordChanging from "../../components/passwordChanging";
import Favourites from "../../components/favourites";
import OrdersList from "../../components/ordersList";
import { useLocation } from "react-router-dom";

const sections = [
  { title: "Edit Account", value: "edit" },
  { title: "Orders History", value: "orders" },
  { title: "Favourites", value: "favourites" },
];

const User = () => {
  const location = useLocation();
  const { account } = useSelector((state) => state.account);
  const [currentSection, setCurrentSection] = useState("edit");

  useEffect(() => {
    if (location.state?.section) {
      setCurrentSection(location.state?.section);
    }
  }, [location]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          {account.fullName
            .split(" ")
            .map((string) => string.charAt(0).toUpperCase())}
        </div>
        <p className={styles.name}>{account.fullName}</p>
      </div>
      <div className={styles.navigation}>
        {sections.map((section, index) => (
          <button
            key={index}
            className={
              section.value === currentSection
                ? styles.navBtn.concat(" ", styles.active)
                : styles.navBtn
            }
            onClick={() => setCurrentSection(section.value)}
          >
            {section.title}
          </button>
        ))}
        <svg
          className={styles.activeBtn}
          width="163"
          height="82"
          viewBox="0 0 163 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.65 73.4578V0.65H162.35V73.4578L90.1575 73.45L89.9202 73.45L89.7386 73.6029L81.4783 80.5608L72.2569 73.5817L72.0828 73.45L71.8645 73.45L0.65 73.4578Z"
            fill="#FD7114"
            stroke="#DEDEE0"
            strokeWidth="1.3"
          />
        </svg>
      </div>
      {currentSection === "edit" && (
        <>
          <MainInformation />
          <PasswordChanging />
        </>
      )}
      {currentSection === "orders" && <OrdersList />}
      {currentSection === "favourites" && <Favourites />}
    </section>
  );
};

export default User;
