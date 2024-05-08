import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("access_token") ?? null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    start: (state) => {
      state.isLoading = true;
    },
    stop: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action?.payload?.token;
    },
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload
      };
    },
    logout: () => {
      localStorage.clear();
      return {
        ...initialState,
        token: null
      };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {login, logout, setError, start, stop, setUser, sidebar, setCurrentCategory, setFavouriteCategories, setBookmarks, setAsset } =
  appSlice.actions;

export default appSlice.reducer;