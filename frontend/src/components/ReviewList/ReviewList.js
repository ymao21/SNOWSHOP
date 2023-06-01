import './ReviewList.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getReviewsThunk} from '../../store/reviews'
import ReviewCard from '../ReviewCard/ReviewCard'
import CreateReviewForm from '../ReviewForm/CreateReviewForm'
import OpenModalButton from "../OpenModalButton";

const ReviewList = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    const reviewObj = useSelector(state => {
        return state.reviewState
      });

    const reviewArr = Object.values(reviewObj)

    const reviewFiltered = reviewArr.filter(review => {

        return review.productId == productId

    })




useEffect(() => {
    dispatch(getReviewsThunk(productId)).then(()=> setIsLoaded(true))
}, [dispatch])

    return (
        <>

        <div className='eachReviewCard'> {reviewFiltered.map(review => (
             
            <ReviewCard key={review.id} review={review}/>

        ))} </div>
        <CreateReviewForm/>


        {/* <OpenModalButton
				className="nav-form"
				modalComponent={<CreateReviewForm/>}
				buttonText="Write a Review"
										/> */}
        </>
    )
}


export default ReviewList