import { csrfFetch } from "./csrf";

const LOAD_CART = '/cart/LOAD_CART';
const ADD_CART = '/cart/ADD_CART';
const REMOVE_CART = '/cart/REMOVE_CART';
const EDIT_QUANTITY = '/cart/EDIT_QUANTITY';

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


export const loadAllCartThunk = ({cartId}) => async (dispatch) => {
  const response = await csrfFetch(`/api/cart/${cartId}`);

  if (response.ok) {
    const cartItems = await response.json();
    dispatch(loadToCart( cartItems));
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
  console.log(product)
  dispatch(editQuantity(cartItemId, product.quantity ))
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
}

const initialState = {
  cartItems: {CartProduct: {}},

};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
    console.log("action", action.products )
      const normalizedCartItems = action.products.Products.reduce(
        (acc, item) => {
          acc[item.CartProduct.id] = item;
          return acc;
        },
        {}
      );
      return {
        ...state,
        cartItems: normalizedCartItems,
        cartId: action.cartId
      };
    case ADD_CART:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.product.productId]: action.product,
        },
      };
    case EDIT_QUANTITY:
      const newState = {...state}
      newState.cartItems[action.cartItemId].CartProduct.quantity = action.newQuantity
      return newState
    case REMOVE_CART:
      const { [action.productId]: _, ...updatedCartItems } = state.cartItems;
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    default:
      return state;
  }
};


export default cartReducer;
