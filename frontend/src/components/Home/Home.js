import './Home.css';
import { useHistory } from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { getProductsThunk } from '../../store/products';
import { useSelector, useDispatch } from 'react-redux';

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
    <div className="home-container">

    <div className="snowboardGif">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjU2dzJkeDgycGh5NXdudGx4eWo1eXk4eWI5a3NzaTR1dzFhcW95MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WpBWapAGObzXYW4kyS/giphy.gif" alt="snowboard img" />
            <div className="snowboardGifText">SNOWSHOP 2024</div>

            <button className="SHOPNOWTEXT" onClick={redirectToProduct}>SHOP NOW</button>
            <div className="snowboardGiftext">
    <p>Try at home before you decide. Free shipping and free returns</p>
  </div>
      </div>

      <div className="hero-section">

        <div className="top-banner">

          <img src="https://images.unsplash.com/photo-1523436495875-154b5f8317e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Top Banner" />
          <div className="banner-text">BUY USED SNOWBOARD, SKIS, WINTER ACCESSORIES AND MORE</div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Winter Collection</h1>
          <p className="hero-subtitle">Discover a wide range of snowboards, skis, accessories, and more</p>
          <button className="get-started-btn" onClick={redirectToProduct}>Buy Now</button>
        </div>

        <div className='eachProduct'>
        {productArr.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>

        {/* <div className="image-collage">
          <div className="collage-image top-left">
            <img src="https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80" alt="Collage Image 1" />
            <div className="image-overlay2">Get ready for the winter season</div>
          </div>
          <div className="collage-image top-right">
            <img src="https://images.unsplash.com/photo-1532124957326-34c5605398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Collage Image 2" />
            <div className="image-overlay4">Find the ultimate gift to embrace adventures</div>
          </div>
          <div className="collage-image bottom-left">
            <img src="https://images.unsplash.com/photo-1614358606268-aa86853578b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80" alt="Collage Image 3" />
            <div className="image-overlay2">Conquer the mountains</div>
          </div>
          <div className="collage-image bottom-right">
            <img src="https://images.unsplash.com/photo-1609952769887-7905b6b02c0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" alt="Collage Image 4" />
            <div className="image-overlay4">Get the best deals on snowshop</div>
          </div>
        </div> */}

      </div>



    </div>

  );
};

export default Home;
