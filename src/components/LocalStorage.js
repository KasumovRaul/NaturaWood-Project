
export const saveState = (state) =>{
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error("Could not save cart!", error);
  }
};

export const loadState = () =>{
  try {
    const serializedState = localStorage.getItem('cart');
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load cart state', error);
    return undefined;
  }
}

//!For Wishlist
export const saveWishlistState = (state) =>{
  try {
    localStorage.setItem('wislist', JSON.stringify(state));
  } catch (error) {
        console.error('Could not load wishlist state', error);

  }
}


export const loadWishlistState = () =>{
  try {
    const serializedState = localStorage.getItem('wishlist');
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load wishlist state', error);
    return undefined;
  }
}