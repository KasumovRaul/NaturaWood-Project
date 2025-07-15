import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import data from "../../public/data/data.json";
import "../page/CategoryPage.css";
import categoryBanners from '../../public/CategoryBanner';
import { CiHeart  } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { addToCart } from '../slice/CartSlice';
import { addToWishList } from '../slice/WishListPage';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const key = categoryName.toLowerCase();
  const products = data[key];
  const category = categoryBanners[key];

  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [sortOrder, setSortOrder] = useState("default");
  const [OpenColumn, setOpenColumn] = useState(false);
  const [currentImageIndecs, setCurrentImageIndices] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    price: [],
    material: [],
    discount: false
  });

  useEffect(()=>{
    if(!products) return;

    let result = [...products];

    //Price filters..
    if(filters.price.length > 0){
       result = result.filter((product)=> {
        const price = parseInt(product.salePrice || product.price);
         return filters.price.some((range)=> {
           if (range === '100 - 300') return price >=100 && price <= 300;
           if (range === '300 - 600') return price >=300 && price <= 600;
           if (range === '600+') return price >= 600;
           return true;
         });
       })
     };

     //Material filter
    if(filters.material.length > 0){
      result = result.filter((product) => filters.material.includes(product.material));
    };


     // Discount filter
     if(filters.discount){
      result = result.filter((product)=> product.discount);
     };

      setFilteredProducts(result);
  },[filters, products]);

  
    //price change
   const handlePriceChange = (range) =>{
     setFilters((prev)=>({
      ...prev,
      price: prev.price.includes(range)
        ? prev.price.filter((r) => r !== range)
        : [...prev.price, range],
     }));
   };


   //Material change
    const handleMaterialChange = (mat) =>{
      setFilters((prev)=>({
        ...prev,
        material: prev.material.includes(mat)
        ? prev.material.filter((m) => m !== mat)
        : [...prev.material, mat],
      }));
    };


   //Discount price
   const handleDiscountChange = () =>{
    setFilters((prev)=>({
      ...prev,
      discount: !prev.discount,
    }));
   };

    //!create a copy of filtered products for sorting
    const sortedProducts = useMemo(()=>{
      let sorted = [...filteredProducts];

      if(sortOrder === "price-low"){
        sorted.sort((a, b)=>{
          const priceA = parseInt(a.salePrice || a.price);
          const priceB = parseInt(b.salePrice || b.price);
          return priceA - priceB;
        });
      }else if(sortOrder === "price-high"){
        sorted.sort((a, b)=>{
          const priceA = parseInt(a.salePrice || b.price);
          const priceB = parseInt(a.salePrice || b.price);
          return priceB - priceA;
        })
      }else if(sortOrder === "name"){
          sorted.sort((a, b)=> a.name.localeCompare(b.name))
      }
      return sorted;
    },[filteredProducts, sortOrder]);





     const handleSort = (order) =>{
       setSortOrder(order);
     };


  if (!products || !category) {
    return <h2>Not found this category!</h2>;
  };

  useEffect(()=>{
    if(products){
      window.scrollTo(0, 0)
    }
  },[products]);

  //Opencolumn
   const handleColumnOpen = () =>{
     setOpenColumn(prev => !prev)
   }

  useEffect(()=>{
      document.body.style.overflow = 
      OpenColumn ? "hidden" : "";
  },[OpenColumn]);

  //!NextImage
  const handleNextImage = (index, total) => {
    setCurrentImageIndices((prev)=>({
      ...prev,
      [index]: (prev[index] || 0) + 1 >= total ? 0 : (prev[index] || 0) + 1,
    }));
  }

  return (
    <div className="category__page">
      {OpenColumn && <div className="category__overlay active" onClick={handleColumnOpen}></div>}
      <div className="category__container">
        <div
          className="category__banner"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          <p>{category.title}</p>
        </div>

         
         <div className={`category__left__content ${OpenColumn ? "active" : ""}`}>
            <div className="cat__left__info">
              {
                OpenColumn && (
                  <button onClick={handleColumnOpen} className="close__filter">X</button>
                )
              }
               <div className="cat__left__head">
                 <h1>Filter Options</h1>
               </div>
                <div className="cat__cat__head">
                  <h2>Price Range</h2>
                </div>
                <ul className="price_info">
                  {["100 - 300 ", "300 - 600", "600+"].map((price)=>(
                    <li key={price}>
                      <input type="checkbox" checked={filters.price.includes(price)} onChange={() => handlePriceChange(price)} />
                        {price}
                    </li>
                  ))}
                </ul>
                  <div className="cat__status__header">
                    <h2>Product Status</h2>
                  </div>
                <ul className="cat__status">
                    <li><a href="#"><input type="checkbox" checked={filters.discount}  onChange={handleDiscountChange} /></a>discount</li>
                </ul>
                 <div className="product__material__header">
                    <h2>Material</h2>
                 </div>
                 <ul className="product__material">
                    {["Wood", "Metal","Fabric", "Leather", "Rattan"].map((mat)=> (
                      <li key={mat}>
                        <input type="checkbox" checked={filters.material.includes(mat)} onChange={()=> handleMaterialChange(mat)} />
                        {mat}
                      </li>
                    ))}
                 </ul>
            </div>
         </div>

 
       <div className="products__content">
         <div className="products__content__wrapper">
           <div className="product__section__top">
               <div className="product__col__toggle" onClick={()=>handleColumnOpen()}>
                 <b><FaBarsStaggered /> <span>Show column</span></b>
               </div>
                    <div className="product__list__count">
                       Showing {filteredProducts.length} of {products.length} products
                    </div>
                    <div className="product__sort">
                        <h4>Sort by:</h4>
                      <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                         <option value="default">Newest</option>
                         <option value="price-low">Price: Low</option>
                          <option value="price-high">Price: High</option>
                         <option value="name">Name: A-Z</option>
                      </select>

                    </div>
                  </div>
          {sortedProducts.length === 0 ? (
            <p style={{ marginTop: "20px" }}>No products match the selected filters.</p>
          ) : (
            sortedProducts.map((product, index) => {
                const images = [product.image, product.imageHoverTwo, product.imageHoverThree].filter(Boolean);
                const currentImage = images[currentImageIndecs[index] % images.length] || images[0];
                return (
              <div className="product__inner" key={index}>                
                <div className="product__image" >
                  <img src={currentImage} alt={product.title} onClick={()=> navigate(`/productsDetailPage/${product.id}`)}/>
                  { images.length > 1 && (
                    <>
                     <button className="arrow left" onClick={() => handleNextImage(index, images.length)}><IoIosArrowBack /></button>
                     <button className="arrow right" onClick={() => handleNextImage(index, images.length)}><IoIosArrowForward /></button>
                    </>
                  )}
                </div>
                {product.discount && (
                  <div className="product__sale">
                    <span>{product.discount}</span>
                  </div>
                )}
                <div className="product__heart" onClick={() => dispatch(addToWishList(product))}><span><CiHeart /></span></div>
                <div className="product__info">
                  <div className="product__title"><h3>{product.name}</h3></div>
                  <div className="product__dc">
                    <div className="product__price"><span>{product.price}</span></div>
                    {product.salePrice && (
                      <div className="product__discount__price"><h6>{product.salePrice}</h6></div>
                    )}
                    <div onClick={()=> dispatch(addToCart(product))} className="product__addBtn"><button>Add to Cart</button></div>
                  </div>
                </div>
              </div>
              )
            })
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
