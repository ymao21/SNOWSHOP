import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetails.css';
import {  getProductDetailThunk, deleteProductThunk } from '../../store/products';
import {  useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import EditProductForm from '../ProductForm/EditProductForm';
import ReviewList from '../ReviewList/ReviewList'
import { addToCartThunk } from '../../store/cart';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const {productId} = useParams();
  const history = useHistory()
  const sessionuser = useSelector(state => state.session.user)
  const product = useSelector(state => state.productState[productId])
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() =>{
   dispatch(getProductDetailThunk(productId))
  }, [dispatch, productId])

  const deletehandler =() => {
    dispatch(deleteProductThunk(productId))
    history.push(`/products`)
  }

  const handleAddToCart = async () => {
    const cartId = sessionuser?.currentCart.id
     await dispatch(addToCartThunk({productId, cartId}))
     history.push(`/cart/${sessionUser?.currentCart.id}`)
  };

  const isOwner = sessionuser && sessionuser.user.id === product?.userId

    return (
    <div className='productBackgroundContainer'>
    <div className='productInfoName'> {product?.name} </div>
    <div className="ProductDetailContainer">
    <div className='productimgleft'>
      <img className='productimg' src = {product?.previewImageUrl} alt = "productimg" />
      </div>
      <div className='productDetRight'>
      <div className='productInfo'>
      <br/>
    <div className='productInfoPrice'>  $ {product?.price}  </div>
    <br/>
    <div className='productInfoDesc'>Description: {product?.description}</div>
    <br/>
    <div className='productInfodet'> Color: {product?.color}</div>
    <br/>

    <div className='productInfodet'>Type: {product?.type}</div>
    <br/>

      <button className="add" onClick= {handleAddToCart}>Add to Cart</button>

    </div>

    </div >
    </div>
    <div className='EditandDelete'>


{isOwner &&
<OpenModalButton
productId = {productId}
className="EditProductModal"
 modalComponent={<EditProductForm productId = {productId} />}
 buttonText="Edit Product"
 />
}

{ isOwner && <button className="DeleteBtn" onClick={deletehandler}>Delete Product</button> }
</div>


     <ReviewList/>



    </div>
    );
}

export default ProductDetail
