import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteFavoriteByIDAndRemove,
  fetchFavorites,
  getNextFavoritesPage,
} from "../asyncThunks";

const initialState = {
  offset: 0,
  limit: 20,
  items: [],
  isPaginationEnd: false,
  isLoading: false,
  error: "",
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialState,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;

        if (action.payload.length < 20) {
          state.isPaginationEnd = true;
        } else {
          state.isPaginationEnd = false;
          state.offset += state.limit;
        }

        state.isLoading = false;
      })
      .addCase(getNextFavoritesPage.fulfilled, (state, action) => {
        state.items.push(...action.payload);

        if (action.payload.length < 20) {
          state.isPaginationEnd = true;
        } else {
          state.isPaginationEnd = false;
          state.offset += state.limit;
        }

        state.isLoading = false;
      })
      .addCase(deleteFavoriteByIDAndRemove.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.meta.arg.id
        );
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchFavorites.pending,
          getNextFavoritesPage.pending,
          deleteFavoriteByIDAndRemove.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = "";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchFavorites.rejected,
          getNextFavoritesPage.rejected,
          deleteFavoriteByIDAndRemove.rejected
        ),
        (state, action) => {
          state.error = action.payload.error;
          state.isLoading = false;
        }
      ),
});

export const { setOffset } = favoriteSlice.actions;

export default favoriteSlice.reducer;
