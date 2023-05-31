import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetails.css';
import {  getProductDetailThunk, deleteProductThunk, getProductsThunk, editProductThunk } from '../../store/products';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import EditProductForm from '../ProductForm/EditProductForm';
import ReviewList from '../ReviewList/ReviewList'

const ProductDetail = () => {
  const dispatch = useDispatch();
  const {productId} = useParams();
  const history = useHistory()
  const sessionuser = useSelector(state => state.session.user)
  const product = useSelector(state => state.productState[productId])

  useEffect(() =>{
   dispatch(getProductDetailThunk(productId))
  }, [dispatch, productId])


  const deletehandler =() => {
    dispatch(deleteProductThunk(productId))
    history.push(`/products`)
  }

  const isOwner =sessionuser && sessionuser.user.id === product?.userId


    return (
    <div className="ProductDetailContainer">

      <img className='productimg' src = {product?.previewImageUrl} alt = "productimg" />
     <div>
    Name: {product?.name}
    <br/>
    Price: {product?.price}
    <br/>
    Color: {product?.color}
    <br/>
    Type: {product?.type}
    <br/>
    Description: {product?.description}
    <br/>

     <OpenModalButton
			className="nav-form"
			modalComponent={<EditProductForm />}
			buttonText="Edit Product"
			/>

     </div>
     { isOwner && <button className="deletesongbtndetail" onClick={deletehandler}>delete</button> }
     
     <ReviewList/>

    </div>
    );
}

export default ProductDetail
