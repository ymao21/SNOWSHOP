import './HomePageProducts.css'
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../../store/products';
import ProductCard from '../ProductCard/ProductCard';

const HomePageProducts = () => {
  const dispatch = useDispatch();
  const productObj = useSelector((state) => state.productState);
  const productArr = Object.values(productObj);
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const scrollLeft = () => {
    const container = containerRef.current;
    container.scrollTo({
      left: scrollPosition - container.offsetWidth,
      behavior: 'smooth',
    });
    setScrollPosition(scrollPosition - container.offsetWidth);
  };

  const scrollRight = () => {
    const container = containerRef.current;
    container.scrollTo({
      left: scrollPosition + container.offsetWidth,
      behavior: 'smooth',
    });
    setScrollPosition(scrollPosition + container.offsetWidth);
  };

  return (
    <div className='HomePageProductsContainer'>

      <div className='HomePageProductsScrollContainer' ref={containerRef}>
        {productArr.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}

      </div>

      <div className='HomePageProductsButtons'>
        <button
          className='HomePageProductsButton'
          onClick={scrollLeft}
          disabled={scrollPosition === 0}
        >
          &lt;
        </button>
        <button
          className='HomePageProductsButton'
          onClick={scrollRight}
          disabled={scrollPosition === containerRef.current?.scrollWidth - containerRef.current?.offsetWidth}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HomePageProducts;
