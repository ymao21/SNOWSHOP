import { csrfFetch } from "./csrf";

const LOAD_CART = '/cart/LOAD_CART';
const ADD_CART = '/cart/ADD_CART';
const REMOVE_CART = '/cart/REMOVE_CART';
const EDIT_QUANTITY = '/cart/EDIT_QUANTITY';
const CLEAR_CART = '/cart/CLEAR_CART'

// Action creators
export const loadToCart = (products) => {
  return {
    type: LOAD_CART,
    products,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_CART,
    product,
  };
};

export const editQuantity = (cartItemId, newQuantity) => {
  return {
    type: EDIT_QUANTITY,
    cartItemId,
    newQuantity,
  };
};

export const deleteFromCart = (cartId, productId) => {
  return {
    type: REMOVE_CART,
    productId,
    cartId
  };
};

export const clearCart = (cartId) => {
  return {
    type: CLEAR_CART,
    cartId
  }
}

export const loadAllCartThunk = ({cartId}) => async (dispatch) => {
  const response = await csrfFetch(`/api/cart/${cartId}`);

  if (response.ok) {
    const cartItems = await response.json();
    dispatch(loadToCart(cartItems));
    return cartItems;
  }
  return response;
};

export const addToCartThunk = ({cartId, productId}) => async (dispatch) => {

 const response = await csrfFetch(`/api/cart/${cartId}`, {
  method: 'POST',
  body: JSON.stringify({productId, cartId})
 });

  if (response.ok) {
    const product = await response.json();
    dispatch(addToCart(product));
    return product;
  }

  return response;
};

export const editQuantityThunk = (cartItemId, newQuantity, productId, cartId) => async (dispatch) => {

  const response = await csrfFetch(`/api/cart/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify({cartItemId, newQuantity, productId, cartId})
   });

if (response.ok) {

  const product = await response.json()
  dispatch(editQuantity(cartItemId, newQuantity ))
  return product

}
}

export const deleteCartThunk = (cartId, productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/cart/${cartId}/${productId}`, {
      method: 'DELETE'
  })

  if(response.ok) {
    const removeFromCart = await response.json()
    dispatch(deleteFromCart(cartId, productId))
    return removeFromCart
  }

  return response;
}

export const clearCartThunk = (cartId) => async (dispatch) => {
  const response = await csrfFetch(`/api/cart/${cartId}`, {
    method: 'DELETE'
})
if(response.ok) {
  const clearCart = await response.json()
  dispatch(clearCart(cartId))
  return clearCart
}

return response;


}

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        cartItems: action.products.CartProducts,
      };
    case ADD_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.product],
      };
     case EDIT_QUANTITY:
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.cartItemId) {
              return {
                ...item,
                quantity: action.newQuantity,
              };
            }
            return item;
          }),
        };

        case REMOVE_CART:
          return {
            ...state,
            cartItems: state.cartItems.filter(
              (item) => item.productId !== action.productId
            ),
          };

          case CLEAR_CART:
            return {
              ...state,
              cartItems: [],
            };

    default:
      return state;
  }
};

export default cartReducer;
