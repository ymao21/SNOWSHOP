
import { csrfFetch } from "./csrf";


const LOAD_REVIEWS = 'reviews/loadReviews'
const CREATE_REVIEW = 'reviews/createReview'
const EDIT_REVIEW = 'reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'



const loadReviews = (reviews) => {
    return {
    type: LOAD_REVIEWS,
    reviews
    }
}

const createReview = (review) => {
    return {
    type: CREATE_REVIEW,
    review
    }
}

const editReview = (review) => {
    return {
    type: EDIT_REVIEW,
    review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}


export const getReviewsThunk = (productId) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${productId}/reviews`);

    if(response.ok){
        const reviews = await response.json();
        dispatch(loadReviews(reviews))
        return reviews
    }
}

export const createReviewThunk = (payload, sessionUser) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if(response.ok) {
        const review = await response.json()
        review.User = sessionUser
        dispatch(createReview(review));
        return review
    }
    return response
}

export const editReviewThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${payload.reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
    });

    if(response.ok) {
        const review = await response.json();
        dispatch(editReview(review))
        return review
    }

}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const deleteReview = await response.json()
        dispatch(deleteReview(reviewId))
        return deleteReview
    }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {

    let newState = {...state};
    switch(action.type){
        case LOAD_REVIEWS:
            action.reviews.forEach((review) => {
                newState[review.id] = review
            });
            return newState

        case CREATE_REVIEW:
            newState = {...state}
            newState[action.id] = action.review
            return newState

        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.reviewId]
            return newState

        default:
            return state;
    }
}

export default reviewsReducer
