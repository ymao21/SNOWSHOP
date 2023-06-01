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
      <div className='productBackgroundContainer'>
    <div className="ProductDetailContainer">

      <img className='productimg' src = {product?.previewImageUrl} alt = "productimg" />
      <div>
     <div className='productInfo'>

    <div className='productInfoName'> Name: {product?.name} </div>

    <br/>

    <div className='productInfoPrice'>  $ {product?.price}  </div>
    <br/>
    <div className='productInfoDesc'>Description: {product?.description}</div>
    <br/>
    <div className='productInfodet'> Color: {product?.color}</div>
    <br/>
    <div className='productInfodet'>Type: {product?.type}</div>
    <br/>

    <div className="addToCartBtn">
      <button className="add">Add to Cart</button>
    </div>


    </div>
     <OpenModalButton
			className="EditButtonModal"
			modalComponent={<EditProductForm />}
			buttonText="Edit Product"
			/>

     </div>
     { isOwner && <button className="DeleteBtn" onClick={deletehandler}>delete</button> }



     <ReviewList/>

     </div>
    </div>
    );
}

export default ProductDetail
