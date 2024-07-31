import React, { useEffect } from "react";
import styles from "./favourites.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteByIDAndRemove,
  fetchFavorites,
  getNextFavoritesPage,
} from "../../redux/asyncThunks";
import ErrorMessage from "../errorMessage";
import Loader from "../loader";
import Pagination from "../pagination";
import List from "../list";
import EmptyPage from "../emptyPage";
import { setOffset } from "../../redux/slices/favoriteSlice";

const Favourites = () => {
  const { items, isLoading, error, isPaginationEnd } = useSelector(
    (state) => state.favorite
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(setOffset(0));
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  } else if (items.length === 0) {
    return <EmptyPage />;
  } else {
    return (
      <div className={styles.wrapper}>
        <List
          items={items}
          handleLike={(item) =>
            dispatch(deleteFavoriteByIDAndRemove(item))
          }
        />
        {isLoading ? (
          <Loader />
        ) : (
          <Pagination
            isPaginationEnd={isPaginationEnd}
            handleClick={() => dispatch(getNextFavoritesPage())}
          />
        )}
      </div>
    );
  }
};

export default Favourites;
