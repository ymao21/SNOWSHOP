import './Cart.css'
import { loadAllCartThunk, editQuantity, deleteCartThunk } from '../../store/cart'
import { getProductsThunk } from '../../store/products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Cart = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)
  const [cartItems, setCartItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItemsObj = useSelector((state) => state.cartState.cartItems)
  const history = useHistory()
  const cartId = useSelector((state) => state.session.user.currentCart.id )

  useEffect(() => {
    dispatch(loadAllCartThunk({cartId}))
    .then(()=> setLoaded(true))
  }, [dispatch]);

  useEffect(() => {
    if (cartItems) {
      const totalPrice = cartItems.reduce((total, product) => {
        return total + product.Product.price * product.quantity;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [cartItems]);

  useEffect(() => {
    if (loaded) {
      setCartItems(cartItemsObj.CartProducts);
    }
  }, [loaded]);

  // const handleQuantityChange = (cartItemId, newQuantity) => {
  //   if (newQuantity <= 0) {
  //     dispatch(deleteCartThunk(cartItemId));
  //   } else {
  //     dispatch(editQuantity(cartItemId, newQuantity));
  //   }
  // };

    const handleCheckout = () => {

    };

    const handleContinueShopping = () => {
      history.push('/products')
    }

  return loaded && (
    <div className="Cart">
          {cartItemsObj.CartProducts.map((product)=> (

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
              // onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
      </div>

          ))}

       <div className="TotalPrice">Total Price: ${totalPrice.toFixed(2)}</div>

       <div className="Cart__Buttons">
        <button className="ContinueShoppingButton" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="CheckoutButton" onClick={handleCheckout}>
          Checkout Now
        </button>
      </div>

    </div>
  );
};

export default Cart;
