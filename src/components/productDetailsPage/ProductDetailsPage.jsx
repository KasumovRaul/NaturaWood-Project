import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../../public/data/data.json";
import "./ProductDetailsPage.css";
import { CiHeart } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slice/CartSlice";
import DetailRelatedProducts from "../detailRelatedProducts/DetailRelatedProducts";
import Review from "../reviewSection/Review";
import { addToWishList } from "../../slice/WishListPage";
import PhotoZoom from "../photoZoom/PhotoZoom";

const ProductDetailsPage = () => {
  const [openAccordian, setOpenAccordian] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let foundProduct = null;
    const productIdNum = parseInt(id); // ID'yi sayıya dönüştür

    //* data.json içindeki tüm anahtar-değer çiftlerini dolaş (kategoriler)
    for (const categoryKey in data) {
      if (Array.isArray(data[categoryKey])) {
        foundProduct = data[categoryKey].find(
          (item) => item.id === productIdNum
        );
        if (foundProduct) {
          break; 
        }
      }
    }
    setProduct(foundProduct);
  }, [id]);


  useEffect(()=>{
    if(product){
       setSelectedImage(product.image);
       window.scrollTo(0,0);
    }
  },[product]);


  if (!product) {
    return <div>Not found product, or loading...</div>;
  }


  const handleAccordian = () => {
    setOpenAccordian((prev) => !prev);
  };

  const handleOpen = () => {
    setOpenNote((prev) => !prev);
  };

  return (
    <>
      <div className="product-details">
        <div className="product-details-container">
          <div className="product-details-left-section">
            <div className="product-left-content">
            {(product.imageHoverOne || product.imageHoverTwo || product.imageHoverThree) && (
              <div className="product-left-image-hover">
             {product.imageHoverOne && (
                <img src={product.imageHoverOne} alt="Hover One" onClick={() => setSelectedImage(product.imageHoverOne)}/>
             )}
             {product.imageHoverTwo && (
               <img src={product.imageHoverTwo} alt="Hover Two" onClick={() => setSelectedImage(product.imageHoverTwo)}/>
              )}
             {product.imageHoverThree && (
               <img src={product.imageHoverThree} alt="Hover Three" onClick={() => setSelectedImage(product.imageHoverThree)}/>
             )}
           </div>
            )}
             <PhotoZoom 
                product={product} 
                selectedImage={selectedImage} 
                setSelectedImage={setSelectedImage} 
              />
            </div>
            <div className="product-right-info">
              <div className="product-right-name">
                <p>{product.name}</p>
              </div>
              <div className="product-right-category">
                <span>Category: {product.category}</span>
              </div>
                <div className="product-right-size">
                  {
                    product.sizes && (
                      <div className="product-size">
                        <span>Size: {product.sizes}</span>
                      </div>
                    )
                  }
                </div>
              <div className="product-right-price">
                {product.salePrice ? (
                  <>
                     {product.discount && <h5 className="product-price-discounted">{product.salePrice}</h5>} 
                      <span className="product-price-original">{product.price}</span>
                      {product.discount && <span className="product-discount">{product.discount}</span>}
                  </>
                ) : (
                  <h5>{product.price}</h5>
                )
              }
              </div>
              <div className="product-right-desc">
                <span>{product.description}</span>
              </div>
              <div className="product-right-btn">
                <div className="product-right-add">
                  <button className="addBtn" onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
                </div>
                <div className="product-right-wish-btn" onClick={() => dispatch(addToWishList(product))}>
                  <span>{<CiHeart />}</span>
                </div>
              </div>
              <div className="wd-right-accordian">
                <div className="wd-accordian-delivery">
                  <div
                    className="wd-accordian-delivery-wd"
                    onClick={() => handleAccordian()}
                  >
                    <div className="wd-accordian-delivery-text">
                      <span>Delivery</span>
                    </div>
                    <div
                      className={`wd-accordian-delivery-icon ${
                        openAccordian === true ? "scale" : ""
                      }`}
                    >
                      <span>
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                  <div
                    className={`wd-accordian-delivery-content ${
                      openAccordian === true ? "active" : ""
                    }`}
                  >
                    <p>
                      ‘Furniture delivery’ is the transfer of furniture after
                      ordering to the address specified by the customer
                      (loading, moving, unloading, delivery to the address).
                      Delivery of furniture to the address is considered a free
                      service, which is provided by a company that has the
                      necessary equipment, vehicles and personnel. It is
                      recommended to use this service when purchasing furniture,
                      because damage to the furniture or any loss of the package
                      or details that may occur during independent delivery of
                      the furniture will not be compensated by the warranty
                      service.
                      <h4>
                        <strong>Delivery time:</strong> Orders are delivered
                        throughout Georgia within 2-3 business days.
                      </h4>
                      <h4>
                        <strong>Tariff:</strong> Delivery is free in areas where
                        Embawood branches are located.
                      </h4>
                    </p>
                  </div>
                </div>
              </div>

              <div className="wd-right-Note">
                <div className="wd-accordian-Note">
                  <div
                    className="wd-accordian-Note-wd"
                    onClick={() => handleOpen()}
                  >
                    <div className="wd-accordian-Note-text">
                      <span>Note</span>
                    </div>
                    <div
                      className={`wd-accordian-Note-icon ${
                        openNote === true ? "scale" : ""
                      }`}
                    >
                      <span>
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                  <div
                    className={`wd-accordian-Note-content ${
                      openNote === true ? "active" : ""
                    }`}
                  >
                    <p>
                      In order to receive your order without any problems, it is
                      necessary to fill in the requested information completely
                      and accurately when registering. Please note that if you
                      provide an incomplete address, the parcel will be delayed
                      in the warehouse and will not be sent until you provide us
                      with the correct information. In such a case, we will send
                      you a letter to the specified e-mail address or contact
                      you at the contact number you provided.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
        <DetailRelatedProducts/>
        <Review/>
    </>
  );
};

export default ProductDetailsPage;
