import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from "../../../public/data/data.json"; 
import "./DetailRelatedProducts.css";
import { CiHeart  } from "react-icons/ci";
import { addToWishList } from '../../slice/WishListPage';
import { useDispatch } from 'react-redux';

const DetailRelatedProducts = () => {
     const {id} = useParams();
     const [relatedProducts, setRelatedProducts] = useState([]);
     const [currentProductCategory, setCurrentProductCategory] = useState(null);
     const dispatch = useDispatch();

     useEffect(()=>{
       let foundProduct = null;
       const productNum = parseInt(id);

       for (const categoryKey in data){
         if(Array.isArray(data[categoryKey])){
           foundProduct = data[categoryKey].find((item)=> item.id === productNum);
           if(foundProduct){
              setCurrentProductCategory(foundProduct.category);
              break;
           }
         }
       }
     },[id]);




     useEffect(()=>{
       if(!currentProductCategory) return;

       const related = [];
       const maxRelated = 4;

       for (const categoryKey in data){
         if(Array.isArray(data[categoryKey])){
         // Sadece aynı kategorideki ürünleri değerlendir
         if(categoryKey.toLowerCase() === currentProductCategory.toLowerCase()){
           for(const item of data[categoryKey]){
              if(item.id !== parseInt(id)){
                related.push(item);
                if(related.length >= maxRelated){
                 break;
                }
              }
           }
         }
           if(related.length >= maxRelated)
              break;   
         }
       }
       setRelatedProducts(related);
     },[currentProductCategory, id]);

     if(relatedProducts.length === 0){
       return null;
     }

   

  return (
    <>
       <div className="related-products-section">
          <div className="related-products-section-container">
            <div className="related-products-section-head">
                 <h1>Related Products</h1>
              </div>  
              <div className="related-products-section-grid">
            { 
              relatedProducts.map((product) => (
                      <div key={product.id} className="related-product-card">
                       <Link to={`/productsDetailPage/${product.id}`}>
                              <div className="related-image">
                               <img src={product.image} alt={product.name} />
                             </div>
                         </Link>

                        <div className="related-name">
                        <p>{product.name}</p>
                      </div>
                     {product.salePrice ? (
                       <div className="related-price">
                              <span className="related-product-sale-price">{product.salePrice}</span>
                             <span className="related-product-original-price">{product.price}</span>
                            </div>
                      ) : (
                       <div className="related-product-price">{product.price}</div>
                     )}
                       <div className="heart-icon" onClick={()=>dispatch(addToWishList(product.id))}>
                        <span><CiHeart/></span>
                       </div>
                      </div>
                      ))
                     }

              </div>
          </div>
       </div>
    </>
  )
}

export default DetailRelatedProducts