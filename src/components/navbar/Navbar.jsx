import React, { useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiHeart, FiUser, FiMail, FiFacebook, FiInstagram, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItems = useSelector((state)=> state.cart?.items || []);
  const wishlistItems = useSelector((state)=> state.wishlist?.items || []);

    const subTotal = (cartItems || []).reduce((sum, item) => {
  const cleanedPrice = Number((item.price || 0).toString().replace(/[^\d.]/g, ""));
  const quantity = Number(item.quantity) || 1;
  return sum + cleanedPrice * quantity;
}, 0);

const totalItems = (cartItems || []).reduce((sum, item) => {
  const quantity = Number(item.quantity) || 1;
  return sum + quantity;
}, 0);


  //wishItems
  const totalWishItems = wishlistItems.length;

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <span className="logo-highlight">N</span>aturaWood
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop">
          <ul className="nav-links">
            <li><Link to="/AllProducts">Products</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/Showroom">Showroom</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Right Side Icons */}
        <div className="navbar-actions">
          <div className="action-icons">
            <Link to="/login">
            <button className="icon-btn" aria-label="Account">
                <span id='user'><FiUser /></span>
              <span className="sr-only">Account</span>
            </button>
            </Link>
            <Link to="/wishListPage">
            <button className="icon-btn" aria-label="Wishlist">
              <FiHeart />
             {totalWishItems > 0 && <span className="badge">{totalWishItems}</span> } 
            </button>
            </Link>
            <Link to="/cart">
            <button className="icon-btn cart-btn" aria-label="Cart">
              <FiShoppingCart />
               <div className="cart">
              <span className="badge">{totalItems}</span>
              <span className="cart-total">{subTotal} ₾</span>
              </div>
            </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="navbar-mobile">
            <nav>
              <ul className="mobile-links">
                <li><Link to="/AllProducts" onClick={toggleMenu}>Products</Link></li>
                <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                <li><Link to="/Showroom" onClick={toggleMenu}>Showroom</Link></li>
                <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
              </ul>
            </nav>

            <div className="mobile-social">
              <a href="#" aria-label="Email"><FiMail /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Help"><FiHelpCircle /></a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;