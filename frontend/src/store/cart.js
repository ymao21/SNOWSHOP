import { csrfFetch } from "./csrf";

const LOAD_CART = './cart/LOAD_CART'
const ADD_CART  = '/cart/ADD_CART'
const REMOVE_CART = '/cart/REMOVE_CART'
const EDIT_QUANTITY = '/cart/EDIT_QUANTITY'
const CLEAR_CART = '/cart/CLEAR_CART'


//action creators
export const loadToCart = (products) => {
    return {
        type: LOAD_CART,
        products
    }
}

export const addToCart = (product) => {
   return {
    type: ADD_CART,
    product
   }
}


export const loadAllCartThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/cart')

    if(response.ok){
        const cartItem = await response.json();
        dispatch(loadToCart(cartItem))
        // console.log("thunkResponse", cartItem)
        return cartItem
    }
    return response

}


const initialState = {};

const cartReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case LOAD_CART:
            newState = {...state}
            // console.log(newState)

            // action.cart.forEach((product)=>{
            //     newState[product.id] = product
            // });
            return newState


        default:
            return state;




    }

}

export default cartReducer
