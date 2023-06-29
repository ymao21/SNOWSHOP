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

  const cartItemsArr = Object.values(cartItemsObj)


  useEffect(() => {
    dispatch(loadAllCartThunk({cartId}))
    .then(()=> setLoaded(true))
  }, [dispatch]);


  const handleQuantityChange = (cartItemId, newQuantity, productId, cartId) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(cartId, productId);
    } else {
      dispatch(editQuantityThunk(cartItemId, newQuantity, productId, cartId));
    }
  };

  const handleRemoveFromCart = (cartId, productId) => {
    dispatch(deleteCartThunk(cartId, productId))
  }

    const handleCheckout = () => {
      history.push('/checkedOut')
    };

    const handleContinueShopping = () => {
      history.push('/products')
    }

    const handleClearCart = (cartId) => {
      dispatch(clearCart(cartId))
    }

    const getTotalPriceAndCount = () => {
      let totalPrice = 0;
      let itemCount = 0;

      cartItemsArr.forEach((product) => {
        totalPrice += product.Product.price * product.quantity;
        itemCount += product.quantity;
      });

      return {
        totalPrice: totalPrice.toFixed(2),
        itemCount: itemCount,
      };
    };


  return loaded && (

    <>

    <div className='shoppingCartBanner'> SHOPPING BAG </div>
    <div className="Cart">
          {cartItemsArr?.map((product)=> (

           <div key={product.Product.name} className="CartItem">

        <div className="CartItem__Image">
          <img src={product?.Product.previewImageUrl} alt={product?.Product.name} />
        </div>
        <h3 className="CartItem__Name">{product?.Product.name}</h3>

        <div className="CartItem__Quantity">
              Quantity:
              <button onClick={() => handleQuantityChange(product.Product.id, product.quantity - 1, product.productId, product.CartId)}>-</button>
              <input
                type="number"
                value={product.quantity}
                min="0"
                onChange={(e) => handleQuantityChange(product.Product.id, Number(e.target.value), product.productId, product.CartId)}
              />
              <button onClick={() => handleQuantityChange(product.Product.id, product.quantity + 1, product.productId, product.CartId)}>+</button>
            </div>

        <div className="CartItem__Details">


          <div className="CartItem__Price">Price: ${(product.Product.price * product.quantity).toFixed(2)}</div>



          <button onClick={() => handleRemoveFromCart(product.cartId, product.productId)}>
                  Remove from cart
          </button>
        </div>
      </div>

          ))}

          <div className='orderSummary'>
          <h1>Order Summary</h1>

            <div>Retail Price US${getTotalPriceAndCount().totalPrice}   </div>

            <div>Estimated Shipping Fee US$0.00  </div>

     <div className="TotalPrice">Subtotal: US${getTotalPriceAndCount().totalPrice}</div>
    <div className="ItemCount">{getTotalPriceAndCount().itemCount} Items</div>


    </div>
    <div className="Cart__Buttons">
        <button className="ContinueShoppingButton" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="CheckoutButton" onClick={handleCheckout}>
          Checkout Now
        </button>
      </div>


        <button className="CheckoutButton" onClick={() => handleClearCart(cartId)}>
          clear cart
        </button>


    </div>

    </>
  );
};

export default Cart;
