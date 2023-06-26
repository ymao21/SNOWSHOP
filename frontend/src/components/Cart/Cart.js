import './Cart.css'
import { loadAllCartThunk, editQuantityThunk, deleteCartThunk, clearCart } from '../../store/cart'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Cart = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)
  const cartItemsObj = useSelector((state) => state.cartState.cartItems)
  const history = useHistory()
  const cartId = useSelector((state) => state.session.user.currentCart.id )

  useEffect(() => {
    dispatch(loadAllCartThunk({cartId}))
    .then(()=> setLoaded(true))
  }, [dispatch]);


  const handleQuantityChange = (cartItemId, newQuantity,  productId, cartId) => {
    dispatch(editQuantityThunk(cartItemId, newQuantity, productId, cartId))
  };

  const handleRemoveFromCart = (cartId, productId) => {
    dispatch(deleteCartThunk(cartId, productId))

  }

    const handleCheckout = () => {
      history.push('/products')
    };

    const handleContinueShopping = () => {
      history.push('/products')
    }

    const handleClearCart = (cartId) => {
      dispatch(clearCart(cartId))
    }



  return loaded && (
    <div className="Cart">
          {cartItemsObj?.map((product)=> (

           <div key={product.Product.name} className="CartItem">
        <div className="CartItem__Image">
          <img src={product?.Product.previewImageUrl} alt={product?.Product.name} />
        </div>

        <div className="CartItem__Details">
          <h3 className="CartItem__Name">{product?.Product.name}</h3>

          <div className="CartItem__Price">Price: ${(product.Product.price * product.quantity).toFixed(2)}</div>

          <div className="CartItem__Quantity">
            Quantity:
            <input
              type="number"
              value={product.quantity}
              min = "1"
              onChange={(e) => handleQuantityChange(product.Product.id, Number(e.target.value), product.productId, product.CartId)}
            />
          </div>
          <button onClick= {handleRemoveFromCart}>Remove from cart</button>
        </div>
      </div>

          ))}


       <div className="Cart__Buttons">
        <button className="ContinueShoppingButton" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="CheckoutButton" onClick={handleCheckout}>
          Checkout Now
        </button>
      </div>

      <button className="CheckoutButton" onClick={handleClearCart}>
          clear cart
        </button>

    </div>
  );
};

export default Cart;
