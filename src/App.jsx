import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import CategoryPage from './page/CategoryPage'
import { Provider } from 'react-redux';
import store from './slice/store';
import ProductDetailsPage from './components/productDetailsPage/ProductDetailsPage';
import CartPage from './page/cartPage/CartPage';
import WishPage from './page/wishPage/WishPage';
import Arrow from './components/arrow/Arrow';
import AboutUs from './page/about/AboutUs';
import Contact from './page/contact/Contact';
import Login from './page/login/Login';
import ShowRoom from './page/showRoom/ShowRoom';
import AllProducts from './page/allProductsSection/AllProducts';

function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:categoryName' element={<CategoryPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/productsDetailPage/:id' element={<ProductDetailsPage />} />
          <Route path='/wishListPage' element={<WishPage/>}/>
          <Route path='/allProducts' element={<AllProducts />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Showroom' element={<ShowRoom />} />

        </Routes>
        <Arrow/>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
