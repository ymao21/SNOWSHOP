const ADD_ITEM = '/cart/ADD_ITEM'
const REMOVE_ITEM = '/cart/REMOVE_ITEM'
const EDIT_QUANTITY = '/cart/EDIT_QUANTITY'
const CLEAR_CART = '/cart/CLEAR_CART'


export const addItemThunk = (productId) => {
    return {
        type: ADD_ITEM,
        productId
    }
}

