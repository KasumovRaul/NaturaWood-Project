import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: "wishlist",
    initialState: {
       items: [],
    },
    reducers: {

       addToWishList: (state, action) =>{
         const item = action.payload;
         if(!state.items.some((existingItem)=> existingItem.id === item.id)){
              state.items.push(item);
         }   
       },

       //remove item from wishlist
       removeFromWishList: (state, action) =>{
           state.items = state.items.filter((item)=> item.id !== action.payload);   
       }
    }
});

export const {addToWishList, removeFromWishList} = wishListSlice.actions;
export default wishListSlice.reducer;