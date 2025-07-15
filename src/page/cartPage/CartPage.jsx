import React, { useEffect } from 'react'
import "./CartPage.css"
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineXMark } from "react-icons/hi2";
import { removeFromCart, updateQuantity } from '../../slice/CartSlice';
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa";
import { Link } from 'react-router-dom';

const CartPage = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector((state)=> state.cart.items);

    const subTotal = (cartItems || []).reduce((sum, item) => {
      const cleanedPrice = Number((item.price || 0).toString().replace(/[^\d.]/g, ""));
      const quantity = Number(item.quantity) || 1;
      return sum + cleanedPrice * quantity;
    }, 0);

   const totalItems = (cartItems || []).reduce((sum, item) => {
     const quantity = Number(item.quantity) || 1;
      return sum + quantity;
    }, 0);



       //*update the quantity of cart item (minimum 1)
       const handleUpdateQuantity = (id, delta) =>{
        const item = cartItems.find((item)=> item.id === id)
         if(item){
          const newQuantity = Math.max(1, item.quantity + delta);
          dispatch(updateQuantity({id, quantity: newQuantity}));
         }
       };


      //remove item from the cart by id
       const removeItem = (id) => {
        dispatch(removeFromCart(id));
       }


       useEffect(()=>{
        if(cartItems){
           window.scrollTo(0,0)
        }
       },[cartItems]);

  return (
    <>
      <div className="cartPage">
        <div className="cartPage-wrapper">
          <div className="cartPage-top">
            <div className="cartPage-top-title">
              <label>Your order will be eligible for free shipping!</label>
            </div>
          </div>
          <div className="cartPage-flex">
            {cartItems.length === 0 ? (
              <div className="empty-cart-message">
                <div className="empty-cont">
                  <div className="empty-cart-icon">
                    <span>
                      <LiaCartArrowDownSolid />
                    </span>
                  </div>
                  <div className="empty-title">
                    <h1>Your Cart is empty!</h1>
                  </div>
                  <Link to="/allProducts">
                  <div className="return-market-btn">
                    <button>Return Shopping</button>
                  </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="cartPage-added-content">
                <div className="cartPage-table-section">
                  <table className="shop-table">
                    <thead>
                      <tr>
                        <th className="product-remove"></th>
                        <th className="product-thumbnail"></th>
                        <th className="product-name">Products</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subTotal">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
                        <tr className="wooCommerce-item" key={item.id}>
                          <td
                            onClick={() => removeItem(item.id)}
                            className="product-remove"
                          >
                            <span>
                              <HiOutlineXMark />
                            </span>
                          </td>
                          <Link to={`/productsDetailPage/${item.id}`}>
                          <td className="product-thumbnail">
                            <img src={item.image} alt={item.title} width={60} />
                          </td>
                          </Link>
                          <td className="product-name">
                            <span>{item.name}</span>
                          </td>
                          <td className="product-price">
                            <span className="woocommerce-amount">
                              {item.price}
                            </span>
                          </td>
                          <td className="product-quantity">
                            <div className="quantity">
                              <input
                                type="button"
                                onClick={() =>
                                  handleUpdateQuantity(item.id, -1)
                                }
                                value="-"
                                className="minus"
                              />
                              <input
                                type="number"
                                value={item.quantity}
                                readOnly={true}
                                name="number"
                                className="amount-count"
                                onChange={(e) =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: Number(e.target.value),
                                    })
                                  )
                                }
                              />
                              <input
                                type="button"
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                value="+"
                                className="plus"
                              />
                            </div>
                          </td>
                          <td className="product-subTotal">
                            <span>
                             {Number((item.price || "0").toString().replace(/[^\d.]/g, "")) * (Number(item.quantity) || 1)} ₾

                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-actions">
                    <div className="coupon-form">
                      <div className="coupon-inner">
                        <input type="text" className="coupon-input" />
                      </div>
                      <div className="coupton-add-btn">
                        <button>Coupon use</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <section className='right-section'>
              <div className="summer-elementor">
                <div className="summer-elementor_container">
                  <div className="summer-elementor_title">
                    <h2>Cart total</h2>
                  </div>
                  <div className="summer-content">
                    <table>
                      <tbody>
                        <tr className="cart-summary">
                          <th>Total item</th>
                          <td className="cart-total">{totalItems}</td>
                        </tr>
                        <tr className="order-total">
                          <th>SubTotal</th>
                          <td>
                            <strong>{subTotal}</strong> ₾
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="proceed-checkout">
                    <button className="checkout-btn">Order form</button>
                  </div>
                </div>
              </div>

              <div className="payment-method">
                <div className="payment-meth-container">
                  <div className="payment-title">
                    <h2>Payment method</h2>
                  </div>
                  <div className="method-icon">
                    <h2>
                      <RiVisaLine />
                    </h2>
                    <h2>
                      <FaCcMastercard />
                    </h2>
                    <h2>
                      <SiAmericanexpress />
                    </h2>
                    <h2>
                      <FaCcPaypal />
                    </h2>
                  </div>
                   <div className="payment-infomracy">
                     <div className="infomracy-title">
                       <h1>Delivery information:</h1>
                     </div>
                      <div className="informacy-label">
                         <span>However, we don't think you'll ever want to, 
                          we are happy to offer
                           a refund if requested within 14 days of purchase.</span>
                      </div>
                   </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage