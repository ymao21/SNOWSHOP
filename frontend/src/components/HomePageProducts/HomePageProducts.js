import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../../store/products';
import ProductCard from '../ProductCard/ProductCard';

const HomePageProducts = () => {
    const dispatch = useDispatch();

    const productObj = useSelector((state) => state.productState);
    const productArr = Object.values(productObj);

    useEffect(() => {
      dispatch(getProductsThunk());
    }, [dispatch]);

    return (
      <main className='HomeEachProductListContainer'>
        <div className='eachProduct'>
          {productArr.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </main>
    );
};

export default HomePageProducts;
