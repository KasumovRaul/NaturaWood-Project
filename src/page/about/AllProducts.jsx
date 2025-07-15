import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from "../../../public/data/data.json";
import { CiHeart } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slice/CartSlice';
import { addToWishList } from '../../slice/WishListPage';

const AllProducts = () => {
       // Combine all products (except categories)
       const getAllProducts = () =>{
        const allProducts = [];
        Object.keys(data).forEach(key=>{
         if(key !== 'categories' && Array.isArray(data[key])){
              allProducts.push(...data[key]);
         }
        });
        return allProducts;
       }

        const allProducts = getAllProducts();

        const [filteredProducts, setFilteredProducts] = useState(allProducts);
        const [sortOrder, setSortOrder] = useState("default");
        const [OpenColumn, setOpenColumn] = useState(false);
        const [currentImageIndices, setCurrentImageIndices] = useState({});
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const [filters, setFilters] = useState({
          price: [],
          material: [],
          discount: false,
          category: []
       });

       const categories = [...new Set(allProducts.map(product => product.category))];

       useEffect(()=>{
         let result = [...allProducts];

         if(filters.price.length > 0){
              result = result.filter((product)=>{
                const price = parseInt(product.salePrice || product.price);
                return filters.price.some((range)=>{
                  if(range === '100 - 300') return price >= 100 && price <= 300;  
                  if (range === '300 - 600') return price >= 300 && price <= 600;
                  if (range === '600+') return price >= 600;     
                  return true;
               });
            });
         }

         if(filters.material.length > 0){
              result = result.filter((product)=> filters.material.includes(product.material));
         }

         if(filters.discount){
              result = result.filter((product)=> product.discount);
         }

         if(filters.category.length > 0 ){
              result = result.filter((product) => filters.category.includes(product.category));
         }

          setFilteredProducts(result);
       },[filters, allProducts]);


       useEffect(()=>{
        window.scrollTo({
          top: 120,
          behavior:"smooth"
        })
       },[filters])


       const handlePriceChange = (range) =>{
          setFilters((prev)=>({
            ...prev,
            price: prev.price.includes(range)
            ? prev.price.filter((r)=> r !== range)
            : [...prev.price, range]
          }));
       };

       const handleMaterialChange = (mat) =>{
          setFilters((prev)=>({
              ...prev,
              material: prev.material.includes(mat)
              ? prev.material.filter((m)=> m !== mat)
              : [...prev.material, mat]
          }))
       }

       const handleDiscountChange = () =>{
           setFilters((prev)=>({
                 ...prev,
                 discount: !prev.discount,
           }));
       };

       const handleCategoryChange = (cat) =>{
            setFilters((prev)=>({
              ...prev,
              category: prev.category.includes(cat)
              ? prev.category.filter((c)=> c !== cat)
              : [...prev.category, cat]
         }));
       };


       const sortedProducts = useMemo(()=>{
         let sorted = [...filteredProducts];

         if(sortOrder === "price-low"){
              sorted.sort((a, b)=>{
                 const priceA = parseInt(a.salePrice || a.price);    
                 const priceB = parseInt(b.salePrice || b.price);
                 return priceA - priceB;
              })
         }else if(sortOrder === "price-high"){
                sorted.sort((a, b) => {
                const priceA = parseInt(a.salePrice || a.price);
                const priceB = parseInt(b.salePrice || b.price);
                return priceB - priceA;
          });
         } else if (sortOrder === "name"){
              sorted.sort((a,b)=> a.name.localeCompare(b.name))
         }
         return sorted;
       },[filteredProducts, sortOrder]);

       const handleSort = (order) =>{
          setSortOrder(order);
       }

       useEffect(()=>{
          window.scrollTo(0, 0);
       },[]);

       const handleColumnOpen = () =>{
         setOpenColumn(prev=> !prev);
       };

       useEffect(()=>{
           document.body.style.overflow = OpenColumn ? "hidden" : ""          
       },[OpenColumn]);

       const handleNextImage = (index, total) =>{
          setCurrentImageIndices((prev)=>({
              ...prev,
              [index]: (prev[index] || 0) + 1 >= total ? 0 : (prev[index] || 0) + 1 
          }))    
       }

  return (
    <>
    <div className="category__page">
      {OpenColumn && <div className="category__overlay active" onClick={handleColumnOpen}></div>}
      <div className="category__container">
        {/* Banner */}
        <div
          className="category__banner"
          style={{
            backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          <p>All Products</p>
        </div>

        {/* Sol filtre paneli */}
        <div className={`category__left__content ${OpenColumn ? "active" : ""}`}>
          <div className="cat__left__info">
            {OpenColumn && (
              <button onClick={handleColumnOpen} className="close__filter">X</button>
            )}
            
            <div className="cat__left__head">
              <h1>Filter Options</h1>
            </div>

            {/* Fiyat Aralığı */}
            <div className="cat__cat__head">
              <h2>Price Range</h2>
            </div>
            <ul className="price_info">
              {["100 - 300", "300 - 600", "600+"].map((price) => (
                <li key={price}>
                  <input 
                    type="checkbox" 
                    checked={filters.price.includes(price)} 
                    onChange={() => handlePriceChange(price)} 
                  />
                  {price}
                </li>
              ))}
            </ul>

            {/* Kategori Filtresi */}
            <div className="cat__status__header">
              <h2>Categories</h2>
            </div>
            <ul className="cat__status">
              {categories.map((cat) => (
                <li key={cat}>
                  <input 
                    type="checkbox" 
                    checked={filters.category.includes(cat)} 
                    onChange={() => handleCategoryChange(cat)} 
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              ))}
            </ul>

            {/* Ürün Durumu */}
            <div className="cat__status__header">
              <h2>Product Status</h2>
            </div>
            <ul className="cat__status">
              <li>
                <input 
                  type="checkbox" 
                  checked={filters.discount} 
                  onChange={handleDiscountChange} 
                />
                Discount
              </li>
            </ul>

            {/* Malzeme */}
            <div className="product__material__header">
              <h2>Material</h2>
            </div>
            <ul className="product__material">
              {["Wood", "Metal", "Fabric", "Leather", "Rattan"].map((mat) => (
                <li key={mat}>
                  <input 
                    type="checkbox" 
                    checked={filters.material.includes(mat)} 
                    onChange={() => handleMaterialChange(mat)} 
                  />
                  {mat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ürünler bölümü */}
        <div className="products__content">
          <div className="products__content__wrapper">
            <div className="product__section__top">
              <div className="product__col__toggle" onClick={handleColumnOpen}>
                <b><FaBarsStaggered /> <span>Show Filters</span></b>
              </div>
              <div className="product__list__count">
                Showing {filteredProducts.length} of {allProducts.length} products
              </div>
              <div className="product__sort">
                <h4>Sort by:</h4>
                <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                  <option value="default">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>

            {/* Ürün listesi */}
            {sortedProducts.length === 0 ? (
              <p style={{ marginTop: "20px", textAlign: "center", fontSize: "1.2rem" }}>
                No products match the selected filters.
              </p>
            ) : (
              sortedProducts.map((product, index) => {
                const images = [product.image, product.imageHoverTwo, product.imageHoverThree].filter(Boolean);
                const currentImage = images[currentImageIndices[index] % images.length] || images[0];
                
                return (
                  <div className="product__inner" key={product.id}>
                    <div className="product__image">
                      <img 
                        src={currentImage} 
                        alt={product.name} 
                        onClick={() => navigate(`/productsDetailPage/${product.id}`)}
                      />
                      {images.length > 1 && (
                        <>
                          <button 
                            className="arrow left" 
                            onClick={() => handleNextImage(index, images.length)}
                          >
                            <IoIosArrowBack />
                          </button>
                          <button 
                            className="arrow right" 
                            onClick={() => handleNextImage(index, images.length)}
                          >
                            <IoIosArrowForward />
                          </button>
                        </>
                      )}
                    </div>
                    
                    {product.discount && (
                      <div className="product__sale">
                        <span>{product.discount}</span>
                      </div>
                    )}
                    
                    <div className="product__heart" onClick={() => dispatch(addToWishList(product))}>
                      <span><CiHeart /></span>
                    </div>
                    
                    <div className="product__info">
                      <div className="product__title">
                        <h3>{product.name}</h3>
                      </div>
                      <div className="product__category">
                        <span style={{ 
                          fontSize: "0.8rem", 
                          color: "#666", 
                          textTransform: "capitalize" 
                        }}>
                          {product.category}
                        </span>
                      </div>
                      <div className="product__dc">
                        <div className="product__price">
                          <span>{product.price}</span>
                        </div>
                        {product.salePrice && (
                          <div className="product__discount__price">
                            <h6>{product.salePrice}</h6>
                          </div>
                        )}
                        <div 
                          onClick={() => dispatch(addToCart(product))} 
                          className="product__addBtn"
                        >
                          <button>Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AllProducts