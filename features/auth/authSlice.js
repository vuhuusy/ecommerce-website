import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.user = state.user;
    },
    loginUserFound: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    stopeLoading: (state) => {
      state.isLoading = false;
    },
    userLoggedOut: (state) => {
      document.cookie =
        "harriShop=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      state.user = null;
      state.isLoading = false;
    },
    userWishList: (state, action) => {
      const alreadyListed = state.user.wishList.find(
        (id) => id === action.payload
      );

      if (!!alreadyListed) {
        // Item already exists in the wishlist, remove it
        state.user.wishList = state.user.wishList.filter(
          (id) => id !== action.payload
        );
      } else {
        // Item doesn't exist in the wishlist, add it
        state.user.wishList.push(action.payload);
      }
    },

    userCartList: (state, action) => {
      const alreadyListed = state.user.cartList.find(
        (id) => id === action.payload
      );

      if (!!alreadyListed) {
        // Item already exists in the wishlist, remove it
        state.user.cartList = state.user.cartList.filter(
          (id) => id !== action.payload
        );
      } else {
        // Item doesn't exist in the wishlist, add it
        state.user.cartList.push(action.payload);
      }
    },
  },
});

export const {
  startLoading,
  loginUserFound,
  userLoggedOut,
  stopeLoading,
  userWishList,
  userCartList,
} = authSlice.actions;
export default authSlice.reducer;
