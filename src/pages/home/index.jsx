import React, { useEffect } from "react";
import styles from "./home.module.scss";

import List from "../../components/list";
import Search from "../../components/search";
import Categories from "../../components/categories";
import Sort from "../../components/sort";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import ErrorMessage from "../../components/errorMessage";
import EmptyPage from "../../components/emptyPage";

import { useDispatch, useSelector } from "react-redux";
import { setNextPage, setSearch } from "../../redux/slices/catalogSlice";
import {
  fetchDefaultItems,
  fetchFilteredItems,
  fetchItemsBySearch,
} from "../../redux/asyncThunks";

const Home = () => {
  const { items, isLoading, error, search, offset, sortOption, categoryId } =
    useSelector((state) => state.catalog);
  const { isLoggedIn } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      dispatch(fetchItemsBySearch());
    } else if (categoryId) {
      dispatch(fetchFilteredItems());
    } else {
      dispatch(fetchDefaultItems());
    }
  }, [search, offset, sortOption, categoryId, isLoggedIn]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.actions}>
        <Search />
        {!search && (
          <>
            <Categories />
            <Sort />
          </>
        )}
      </div>
      {error ? (
        <ErrorMessage message={error} />
      ) : items.length === 0 ? (
        <EmptyPage
          title={"No Results Found"}
          message={
            "We did not find any article that matches this search Make sure that the search text is entered correctly Try using other search criteria"
          }
        />
      ) : (
        <>
          <List items={items} />
          {isLoading ? (
            <Loader />
          ) : (
            <Pagination handleClick={() => dispatch(setNextPage())} />
          )}
        </>
      )}
    </section>
  );
};

export default Home;
