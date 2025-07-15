import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import { loadState, loadWishlistState, saveState, saveWishlistState } from "../components/LocalStorage";
import wishListReducer from "./WishListPage"

// Read data from localStorage
const preloadedState  = {
  cart: loadState() || {items: []},
  wishlist: loadWishlistState() || {items: []}
};

export const store = configureStore({
       reducer:{
         cart: cartReducer,
         wishlist: wishListReducer
       },
      preloadedState,
}) ;


store.subscribe(()=>{
  const state = store.getState();
  saveState(state.cart);
  saveWishlistState(state.wishlist)
})

export default store;