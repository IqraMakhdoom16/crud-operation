import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  user: null,
  error: null,
  token: localStorage.getItem("access_token") ?? null,
  isLoading: false,
  isSidebar: false,
  currentCategory: null,
  favouriteCategories: [],
  bookmarks: [],
  currentAsset: {}
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
    sidebar: (state) => {
      state.isSidebar = !state.isSidebar;
    },
      setCurrentCategory: (state, action) => {
          return {
              ...state,
              currentCategory: action.payload
          };
      },
    setFavouriteCategories: (state, action) => {
      state.favouriteCategories = action.payload
    },
    setBookmarks:(state,action) =>{
      state.bookmarks = action.payload
    },
    setAsset:(state,action) =>{
      return {
        ...state,
        currentAsset: action.payload
      };
    }
  },
});

export const {login, logout, setError, start, stop, setUser, sidebar, setCurrentCategory, setFavouriteCategories, setBookmarks, setAsset } =
  appSlice.actions;

export default appSlice.reducer;