import { csrfFetch } from "./csrf";

const LOAD_PRODUCTS = 'products/loadProducts'
const CREATE_PRODUCT = 'products/createProduct'
const EDIT_PRODUCT ='products/editProduct'
const DELETE_PRODUCT = 'products/deleteProduct'

export const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}

export const addOneProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product
    }
}

export const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

export const deleteProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
}

export const getProductsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/products');

    if(response.ok) {
        const products = await response.json();
        return dispatch(loadProducts(products.product))
    }
    return response
}

export const getProductDetailThunk = (productId) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${productId}`);

    if(response.ok) {
        const product = await response.json();

        return dispatch(addOneProduct(product))
    }
    return response
}

export const createProductThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/`,{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
});
    if(response.ok) {
        const newProduct = await response.json();
        dispatch(addOneProduct(newProduct));
        return newProduct
    }
    return response
}

export const editProductThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${payload.productId}`,{
    method: "PUT",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(payload)
});
    if(response.ok) {
        const product = await response.json();
        dispatch(editProduct(product));
        return product
    }
    return response
}

export const deleteProductThunk = (productId) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${productId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const deletedProduct = await response.json()
        dispatch(deleteProduct(productId))
        return deletedProduct
    }
    return response
}

const initialState = {};

const productsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOAD_PRODUCTS:
            action.products.forEach((product) => {
                newState[product.id] = product
            });
            return newState

        case CREATE_PRODUCT:
            newState = {...state}
            newState[action.id] = action.product
            return newState

        case DELETE_PRODUCT:
            newState = {...state}
            delete newState[action.productId]
            return newState

        default:
            return state;

    }
}

export default productsReducer