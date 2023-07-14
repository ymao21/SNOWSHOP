import './Cart.css'
import { loadAllCartThunk, editQuantityThunk, deleteCartThunk } from '../../store/cart'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Cart = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)
  const cartItemsObj = useSelector((state) => state.cartState)
  const history = useHistory()

  const cartId = useSelector((state) => state.session.user.currentCart.id )
  const cartItemsArr = Object.values(cartItemsObj.cartItems)




  useEffect(() => {
    dispatch(loadAllCartThunk({cartId}))
    .then(()=> setLoaded(true))
  }, [dispatch]);


  const handleQuantityChange = async (cartItemId, newQuantity, productId, cartId) => {

    if (newQuantity < 1) {
      handleRemoveFromCart(cartId, productId);
    } else {
    await dispatch(editQuantityThunk(cartItemId, newQuantity, productId, cartId));
    }
  };

  const handleRemoveFromCart = (cartId, productId) => {
    dispatch(deleteCartThunk(cartId, productId))
  }

    const handleCheckout = () => {
      history.push('/checkedOut')
    };

    const handleClearCart = () => {
      if (cartItemsArr.length === 0) return;

      const clearCartItem = (index) => {
        const product = cartItemsArr[index];
        handleRemoveFromCart(product.cartId, product.productId);
        setTimeout(() => {
          if (index < cartItemsArr.length - 1) {
            clearCartItem(index + 1);
          }
        }, 10);
      };

      clearCartItem(0);
    };

    const handleContinueShopping = () => {
      history.push('/products')
    }


    const getTotalPriceAndCount = () => {
      let totalPrice = 0;
      let itemCount = 0;

      cartItemsArr.forEach((product) => {
        totalPrice += product?.price * product?.CartProduct?.quantity;
        itemCount += product?.CartProduct?.quantity;
      });

      return {
        totalPrice: totalPrice.toFixed(2),
        itemCount: itemCount,
      };
    };


  return loaded && (

    <>

    <div className='shoppingCartBanner'> SHOPPING BAG </div>

    {cartItemsArr.length === 0 ? (

          <div className='EmptyCart'>
       <img src="https://www.misterjonesandmisskatie.com/assets/images/empty-cart.png" alt="Empty Cart Icon" className='EmptyCartImg'></img>
          <h1 className="EmptyCartMessage">Your cart is currently empty empty</h1>
          <p className="EmptyCartMessageP">But not for long</p>
          <button className="ContinueShoppingButton" onClick={handleContinueShopping}>Discover something unique to fill it up</button>
          </div>

        ) : (

    <div className="Cart">
          {cartItemsArr?.map((product)=> (
           <div key={product?.name} className="CartItem">
        <div className="CartItem__Image">
          <img src={product?.previewImageUrl}  />
        </div>
        <h3 className="CartItem__Name">
    <a href={`/products/${product?.id}`}>{product?.name}</a>
  </h3>
        <div className="CartItem__Quantity">
  <button
    onClick={() =>
      handleQuantityChange(
        product?.CartProduct?.id,
        product?.CartProduct?.quantity - 1,
        product?.CartProduct?.productId,
        product?.CartProduct?.cartId
      )
    }
  >
    -
  </button>
  <div className="QuantityInputContainer">
    <input
      type="number"
      value={product?.CartProduct?.quantity}
      min="0"
      readOnly
      className="InputNoBorder"
    />
  </div>
  <button
    onClick={() =>
      handleQuantityChange(
        product?.CartProduct?.id,
        product?.CartProduct?.quantity + 1,
        product?.CartProduct?.productId,
        product?.CartProduct?.cartId
      )
    }
  >
    +
  </button>
</div>

          <div className="CartItem__Price">Price: ${(product?.price * product?.CartProduct?.quantity).toFixed(2)}</div>

        <button className="cartRemoveBtn" onClick={() => handleRemoveFromCart(product?.CartProduct?.cartId, product?.CartProduct?.productId)}>
                  remove
          </button>
      </div>

          ))}

<div className='orderSummary'>
  <h1>Order Summary</h1>
  <h3 className="ItemCount">{getTotalPriceAndCount().itemCount} Items</h3>
  <div>
    <div>Retail Price</div>
    <div className="price">US${getTotalPriceAndCount().totalPrice}</div>
  </div>
  <div>
    <div>Estimated Shipping Fee</div>
    <div className="price">US$0.00</div>
  </div>
  <div className="TotalPrice">
    <div>Subtotal:</div>
    <div className="price">US${getTotalPriceAndCount().totalPrice}</div>
  </div>


</div>


<div className="Cart__Buttons">

<button className="CheckoutButton" onClick={() => { handleCheckout(); handleClearCart(); }}>
  Checkout Now
</button>

  <button className="ContinueShoppingButton" onClick={handleContinueShopping}>Continue Shopping</button>
</div>

    </div>

        )}


    </>
  );
};

export default Cart;
