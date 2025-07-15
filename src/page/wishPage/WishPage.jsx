import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./WishPage.css"
import { RiDeleteBin7Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { addToCart } from '../../slice/CartSlice';
import { removeFromWishList } from '../../slice/WishListPage';

const WishPage = () => {

    const wishItems = useSelector((state)=> state.wishlist.items);

    const dispatch = useDispatch();

    useEffect(()=>{
      window.scrollTo(0,0)
    },[]);

  return (
    <>
       <div className="wishlist-page">
         <h1>My Wishlist</h1>

  {wishItems.length === 0 ? (
    <p className="empty-wishlist-message">
      Your wishlist is currently empty. Start adding some items!
    </p>
  ) : (
    <div className="wishlist-grid">
      {wishItems.map((item) => (
        <div key={item.id} className="wishlist-item">
          <Link to={`/productsDetailPage/${item.id}`}>
          <img src={item.image} alt={item.name} className="item-image" />
          </Link>
          <div className="item-details">
            <h2>{item.name}</h2>
            <p className="item-description">{item.description}</p>
            <div className="item-actions">
              <span className="item-price">${item.price}</span>
               <div className="wish-jdc">
              <button 
                onClick={() => dispatch(removeFromWishList(item.id))}
                className="remove-button"
              >
                <RiDeleteBin7Line />
              </button>
              <div className="wish-add-cart">
                <button className="add-cart" onClick={() => dispatch(addToCart(item))}>Add to cart</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </>
  )
}

export default WishPage