import React from 'react';
import "./Products.css";
import data from "../../../public/data/data.json"
import { CiSearch } from "react-icons/ci";
import { LuGitCompareArrows } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { IoGitCompareOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slice/CartSlice';
import { Link } from 'react-router-dom';
import { addToWishList } from '../../slice/WishListPage';


  const beds = data.beds;


const Products = () => {

  const dispatch = useDispatch();

  return (
  <>
      <div className="products">
         <div className="products-container">
            <div className="products-header">
                <div className="products-hd">
               <h1>Best Sellers</h1>
               </div>
                <div className="product-lf">
                  <span>View more</span>
                </div>
            </div>
            <div className="products-content">
               {
                  beds.map((bed)=> (
                <div key={bed.id} className="products-grid-inner">
                  <Link to={`/productsDetailPage/${bed.id}`}>
                  <div className="products-img">
                     <img src={bed.image} alt={bed.title} />
                  </div>
                  </Link>
                  <div className="product-heart" onClick={()=> dispatch(addToWishList(bed))}>
                     <span><CiHeart/></span>
                  </div>
                  
                  <div className="products-info">
                     <div className="prod-title">
                        <h3>{bed.name}</h3>
                     </div>
                     <div className="prod-price">
                        <span>{bed.price}</span>
                     </div>
                      {/* <div className="product__discount">
                     <h5>{bed.discount}</h5>
                  </div> */}
                  </div>
                  <div className="product-see">
                       <div className="product-compare">
                        <span><IoGitCompareOutline /></span>
                     </div>
                     <div className="product-add-btn">
                        <button onClick={()=> dispatch(addToCart(bed))}>Add to cart</button>
                     </div>
                  </div>
               </div>
                  ))
               }
            </div>
         </div>
      </div>
  </>
  );
};

export default Products;
