import './Cart.css'
import { loadAllCartThunk, editQuantity, deleteCartThunk } from '../../store/cart'
import { getProductsThunk } from '../../store/products';
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

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(deleteCartThunk(cartItemId));
    } else {
      dispatch(editQuantity(cartItemId, newQuantity));
    }
  };

  const handleCheckout = () => {
  history.push('/products')
  };


  // const cartItems = cartItemsArr.map((cartItem) => {
  //   // const product = productArr.find((product) => product.id === cartItem.productId);
  //   const totalPrice = (product?.price * cartItem.quantity).toFixed(2);

  //   return  (
  //     <div key={cartItem.id} className="CartItem">
  //       <div className="CartItem__Image">
  //         <img src={product?.previewImageUrl} alt={product?.name} />
  //       </div>
  //       <div className="CartItem__Details">
  //         <h3 className="CartItem__Name">{product?.name}</h3>
  //         <div className="CartItem__Price">Price: ${totalPrice}</div>
  //         <div className="CartItem__Quantity">
  //           Quantity:
  //           <input
  //             type="number"
  //             value={cartItem.quantity}
  //             onChange={(e) => handleQuantityChange(cartItem.id, Number(e.target.value))}
  //             min="1"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });



  const getPrices = (arr) => {
    let price = 0;
    arr.forEach((product)=> {
      price += product.Product.price;
    })
    return price;
  }

    // console.log("cartItemsObj", cartItemsObj.CartProducts[0].Product.price)

    // console.log("quantity", cartItemsObj.CartProducts[0].id)

  // const totalPrice = cartItemsObj.CartProducts.reduce((total, cartItem) => {
  //   const product = productArr.find((product) => product.id === cartItem.productId);
  //   const itemPrice = (product?.price * cartItem.quantity);
  //   return total + itemPrice;
  // }, 0);

//  const totalPrice = cartItemsObj.CartProducts[0]

//  console.log(totalPrice)


  return loaded && (
    <div className="Cart">
          {cartItemsObj.CartProducts.map((product)=> (

           <div key={product.Product.name} className="CartItem">
        <div className="CartItem__Image">
          <img src={product?.Product.previewImageUrl} alt={product?.Product.name} />
        </div>
        <div className="CartItem__Details">
          <h3 className="CartItem__Name">{product?.Product.name}</h3>

          <div className="CartItem__Price">Price: ${product.Product.price * product.quantity}</div>

          <div className="CartItem__Quantity">
            Quantity:
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
      </div>

          ))}

      {/* <h2 className="Cart__Total">Total: ${totalPrice.toFixed(2)}</h2>
      <div className="Cart__Buttons">
        <button className="ContinueShoppingButton" onClick={handleCheckout}>Continue Shopping</button>
        <button className="CheckoutButton" onClick={handleCheckout}>
          Checkout Now
        </button>
      </div> */}

    </div>
  );
};

export default Cart;
