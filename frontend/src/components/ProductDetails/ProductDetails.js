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
  const productObj = useSelector(state => state.productState)



//   console.log("product!!", productObj)

    return (
    <div className="ProductDetailContainer">
     <>HIIII</>
    </div>
    );
}

export default ProductDetail
