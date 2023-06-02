
const LOAD_CART = './cart/LOAD_CART'
const ADD_CART  = '/cart/ADD_CART'
const REMOVE_CART = '/cart/REMOVE_CART'
const EDIT_QUANTITY = '/cart/EDIT_QUANTITY'
const CLEAR_CART = '/cart/CLEAR_CART'


const loadToCartThunk = (products) => {
    return {
        type: LOAD_CART,
        products
    }
}

const addToCart = (product) => {
   return {
    type: ADD_CART,
    product
   }
}


export const loadAllInCart = () => async (dispatch) => {
    const response = await csrfFetch(`/api/cart`)

    console.log("items in cart", response)

    
}
