import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../service/api";

//account slice

export const login = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await api.login(email, password);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async ({ fullName, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      return await api.registration(fullName, email, phoneNumber, password);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const authenticate = createAsyncThunk(
  "authenticate",
  async (token, { rejectWithValue }) => {
    try {
      return await api.authentication(token);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//catalog slice

export const fetchDefaultItems = createAsyncThunk(
  "fetchDefaultItems",
  async (_, { getState, rejectWithValue }) => {
    const { catalog, account } = getState();
    try {
      return await api.defaultItems(
        catalog.offset,
        catalog.limit,
        catalog.sortOption.toLowerCase(),
        account.token
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchFilteredItems = createAsyncThunk(
  "fetchFilteredItems",
  async (_, { getState, rejectWithValue }) => {
    const { catalog, account } = getState();
    try {
      return await api.filteredItems(
        catalog.categoryId,
        catalog.offset,
        catalog.limit,
        catalog.sortOption.toLowerCase(),
        account.token
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchItemsBySearch = createAsyncThunk(
  "fetchItemsBySearch",
  async (_, { getState, rejectWithValue }) => {
    const { catalog, account } = getState();
    try {
      return await api.itemsBySearch(
        catalog.search,
        catalog.offset,
        catalog.limit,
        account.token
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteFavoriteByID = createAsyncThunk(
  "deleteFavoriteByID",
  async (item, { getState, rejectWithValue }) => {
    const { token } = getState().account;
    try {
      return await api.deleteFavoritesByID(item.id, token);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteFavoriteByIDAndRemove = createAsyncThunk(
  "deleteFavoriteByIDAndRemove",
  async (item, { getState, rejectWithValue }) => {
    const { token } = getState().account;
    try {
      return await api.deleteFavoritesByID(item.id, token);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "addFavourite",
  async (item, { getState, rejectWithValue }) => {
    const { token } = getState().account;
    try {
      return await api.addFavorite(item.id, token);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchItemsByIds = createAsyncThunk(
  "fetchItemsByIds",
  async (ids, { getState, rejectWithValue }) => {
    const { token } = getState().account;
    try {
      return await api.itemsByIds(ids, token);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async () => await api.categories()
);

export const fetchCountries = createAsyncThunk(
  "fetchCountries",
  async () => await api.countries()
);

//favorite slice

export const fetchFavorites = createAsyncThunk(
  "fetchFavorites",
  async (_, { getState, rejectWithValue }) => {
    const { account, favorite } = getState();
    try {
      return await api.fetchFavorites(
        account.token,
        favorite.offset,
        favorite.limit
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getNextFavoritesPage = createAsyncThunk(
  "getNextFavoritesPage",
  async (_, { getState, rejectWithValue }) => {
    const { account, favorite } = getState();
    try {
      return await api.fetchFavorites(
        account.token,
        favorite.offset,
        favorite.limit
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//orders slice

export const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    const { account, orders } = getState();
    try {
      return await api.fetchOrders(account.token, orders.offset, orders.limit);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const doOrder = createAsyncThunk(
  "doOrder",
  async (shipment, { getState, rejectWithValue }) => {
    const { account, cart } = getState();
    try {
      return await api.doOrder(cart.items, shipment, account.token);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
