import React from "react";
import SliderComponents from "../components/sliderComponents/SliderComponents"
import Categories from "../components/categories/Categories"
import Products from "../components/products/Products"
import Collection from "../components/collection/Collection";

const Home = () => {
  return (
    <>
      <SliderComponents />
      <Categories />
      <Products />
      <Collection/>
    </>
  );
};

export default Home;
