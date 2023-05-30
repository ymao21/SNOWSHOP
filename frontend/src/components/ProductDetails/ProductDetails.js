import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetails.css';
import {  getProductDetailThunk, deleteProductThunk, getProductsThunk, editProductThunk } from '../../store/products';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const {productId} = useParams();
  const sessionuser = useSelector(state => state.session.user)
  const product = useSelector(state => state.productState[productId])

  useEffect(() =>{
   dispatch(getProductDetailThunk(productId))
  }, [dispatch, productId])

console.log("currproduct", product)

    return (
    <div className="ProductDetailContainer">
      <>product details</>
     <div>

    {/* Name: {product.name}
    <br/>
    Price: {product.price}
    <br/>
    Color: {product.color}
    <br/>
    Type: {product.type}
    <br/>
    Description: {product.description}
    <br/> */}

     </div>
    </div>
    );
}

export default ProductDetail
