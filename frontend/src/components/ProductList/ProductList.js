import './ProductList.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import {  deleteProductThunk, getProductsThunk } from '../../store/products';
import ProductCard from '../ProductCard/ProductCard';


const ProductList = () => {

    const dispatch = useDispatch();

    const productObj = useSelector(state => state.productState)
    const productArr = Object.values(productObj)


    useEffect(() => {
        dispatch(getProductsThunk())
      }, [dispatch])

      return (
        <main className='productListContainer'>

          <div className='eachProduct'>
            {productArr.map((product) => {
            return <ProductCard key={product.id} product={product}/>
            })}
          </div>
          {/* <button className = "addProduct" type="button" >add product</button> */}
        </main>

      );

}

export default ProductList;
