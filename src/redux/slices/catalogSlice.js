import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addFavorite,
  deleteFavoriteByID,
  fetchCategories,
  fetchCountries,
  fetchDefaultItems,
  fetchFilteredItems,
  fetchItemsByIds,
  fetchItemsBySearch,
} from "../asyncThunks";

const initialState = {
  offset: 0,
  limit: 20,

  items: [],
  isLoading: false,
  error: "",

  categories: [],
  categoryId: null,
  sortOption: "Popular",
  search: "",

  isPaginationEnd: false,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryId = action.payload;
      state.offset = 0;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
      state.offset = 0;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.offset = 0;
    },
    setNextPage: (state) => {
      state.offset = state.offset + state.limit;
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      .addCase(deleteFavoriteByID.fulfilled, (state, action) => {
        state.items.forEach((item) =>
          item.id === action.meta.arg.id
            ? (item.favorite = !action.payload.success)
            : item
        );
        state.isLoading = false;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.forEach((item) =>
          item.id === action.meta.arg.id
            ? (item.favorite = action.payload.success)
            : item
        );
        state.isLoading = false;
      })

      .addMatcher(
        isAnyOf(
          fetchFilteredItems.pending,
          fetchDefaultItems.pending,
          fetchItemsBySearch.pending,
          deleteFavoriteByID.pending,
          addFavorite.pending,
          fetchItemsByIds.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = "";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchFilteredItems.fulfilled,
          fetchDefaultItems.fulfilled,
          fetchItemsBySearch.fulfilled,
          fetchItemsByIds.fulfilled
        ),
        (state, action) => {
          if (state.offset === 0) {
            state.items = action.payload;
          } else {
            state.items.push(...action.payload);
          }

          if (action.payload.length < 20) {
            state.isPaginationEnd = true;
          } else {
            state.isPaginationEnd = false;
          }

          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchFilteredItems.rejected,
          fetchDefaultItems.rejected,
          fetchItemsBySearch.rejected,
          deleteFavoriteByID.rejected,
          addFavorite.rejected,
          fetchItemsByIds.rejected
        ),
        (state, action) => {
          state.error = action.payload.error;
          state.isLoading = false;
        }
      );
  },
});

export const {
  setCategory,
  setSortOption,
  setSearch,
  setNextPage,
  clearItems,
} = catalogSlice.actions;

export default catalogSlice.reducer;
