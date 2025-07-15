import React from "react";
import "./Footer.css";
import { PiInstagramLogoLight } from "react-icons/pi";
import { BiLogoFacebook } from "react-icons/bi";
import { IoLogoPinterest } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="furniture-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for new products and special offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Instagram"><PiInstagramLogoLight /></a>
              <a href="#" aria-label="Facebook"><BiLogoFacebook /></a>
              <a href="#" aria-label="Pinterest"><IoLogoPinterest /></a>
              <a href="#" aria-label="Twitter"><RiTwitterXFill /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-column">
            <h4>Our Stores</h4>
            <ul>
              <li><a href="#">New York</a></li>
              <li><a href="#">Los Angeles</a></li>
              <li><a href="#">Chicago</a></li>
              <li><a href="#">Miami</a></li>
              <li><a href="#">All Locations</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li><a href="#">Living Room</a></li>
              <li><a href="#">Bedroom</a></li>
              <li><a href="#">Dining Room</a></li>
              <li><a href="#">Kids Room</a></li>
              <li><a href="#">Office Furniture</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Free Shipping</a></li>
              <li><a href="#">Assembly Service</a></li>
              <li><a href="#">Design Consultation</a></li>
              <li><a href="#">Warranty Info</a></li>
              <li><a href="#">Customer Service</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column contact-info">
            <h4>Contact Us</h4>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> 123 Furniture Ave, Tbilisi</li>
              <li><i className="fas fa-phone"></i> (+995) 123-4567</li>
              <li><i className="fas fa-envelope"></i> info@NaturaWood.ge</li>
              <li><i className="fas fa-clock"></i> Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="payment-methods">
            <span>Secure Payments:</span>
            <h2><RiVisaLine /></h2>
            <h2><FaCcMastercard /></h2>
            <h2><SiAmericanexpress /></h2>
            <h2><FaCcPaypal /></h2>
          </div>

          <div className="copyright">
            <p>&copy; 2025 NaturaWood. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
