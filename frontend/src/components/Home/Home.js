import './Home.css';
import { useHistory } from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { getProductsThunk } from '../../store/products';
import { useSelector, useDispatch } from 'react-redux';
import HomePageProducts from '../HomePageProducts/HomePageProducts';
import Footer from '../Footer/Footer';

const Home = () => {
  const history = useHistory();
  const productObj = useSelector((state) => state.productState);
  const productArr = Object.values(productObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const redirectToProduct = () => {
    history.push('/products');
  };

  return (
    <>
    <div className="home-container">

    <div className="snowboardGif">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjU2dzJkeDgycGh5NXdudGx4eWo1eXk4eWI5a3NzaTR1dzFhcW95MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WpBWapAGObzXYW4kyS/giphy.gif" alt="snowboard img" />
            <div className="snowboardGifText">SNOWSHOP 2024</div>

            <button className="SHOPNOWTEXT" onClick={redirectToProduct}>SHOP NOW</button>
            <div className="snowboardGiftext">
    <p>Try at home before you decide. Free shipping and free returns</p>
  </div>
      </div>


        <div className="top-banner">

          <img src="https://images.unsplash.com/photo-1523436495875-154b5f8317e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Top Banner" />
          <div className="banner-text">BUY USED SNOWBOARD, SKIS, WINTER ACCESSORIES AND MORE</div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Winter Collection</h1>
          <p className="hero-subtitle">Discover a wide range of snowboards, skis, accessories, and more</p>
          <button className="get-started-btn" onClick={redirectToProduct}>Buy Now</button>

      </div>


    </div>


    <HomePageProducts/>
   <Footer/>

</>

  );
};

export default Home;
