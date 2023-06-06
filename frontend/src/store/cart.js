import { csrfFetch } from "./csrf";

const LOAD_CART = '/cart/LOAD_CART';
const ADD_CART = '/cart/ADD_CART';
const REMOVE_CART = '/cart/REMOVE_CART';
const EDIT_QUANTITY = '/cart/EDIT_QUANTITY';
const CLEAR_CART = '/cart/CLEAR_CART';

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

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const loadAllCartThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/cart');

  if (response.ok) {
    const cartItems = await response.json();
    dispatch(loadToCart(cartItems));
    return cartItems;
  }
  return response;
};

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        cartItems: action.products,
      };
    case ADD_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.product],
      };
    case EDIT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.cartItemId ? { ...item, quantity: action.newQuantity } : item
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
