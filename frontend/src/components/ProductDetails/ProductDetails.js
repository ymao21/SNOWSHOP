import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetails.css';
import {  getProductDetailThunk, deleteProductThunk } from '../../store/products';
import {  useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import EditProductForm from '../ProductForm/EditProductForm';
import ReviewList from '../ReviewList/ReviewList'
import CreateProductForm from '../ProductForm/CreateProductForm';
import { addToCart } from '../../store/cart';

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push('/cart');
  };

  // console.log(sessionuser)

  const isOwner = sessionuser && sessionuser.user.id === product?.userId

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
      <button className="add" onClick= {handleAddToCart}>Add to Cart</button>
    </div>


    </div >
     <OpenModalButton
     productId = {productId}
     className="EditProductModal"
			modalComponent={<EditProductForm productId = {productId} />}
			buttonText="Edit Product"
			/>
     </div>


     { isOwner && <button className="DeleteBtn" onClick={deletehandler}>Delete Product</button> }
     <ReviewList/>
     </div>
    </div>
    );
}

export default ProductDetail
