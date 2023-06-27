import './ReviewList.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getReviewsThunk} from '../../store/reviews'
import ReviewCard from '../ReviewCard/ReviewCard'
import CreateReviewForm from '../ReviewForm/CreateReviewForm'
import OpenModalButton from "../OpenModalButton";
import { FaStar } from "react-icons/fa";

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

    const totalRating = reviewFiltered.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round(totalRating / reviewFiltered.length);

useEffect(() => {
    dispatch(getReviewsThunk(productId)).then(()=> setIsLoaded(true))
}, [dispatch])

    return (
        <>


	<div class="ratingsAndReviews">
		<h2>Reviews</h2>
		<h2>Reviews</h2>

	</div>
    <hr />
         <div className='ratingSummary'>
 

<div className="rating-summary-container">
  <h2 className='average-rating'>{averageRating} {averageRating === 1 ? 'star' : 'stars'}</h2>
  <div className="star-rating">
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <b className="star-rating" name="rating" value={averageRating} />
            <FaStar
              className="star"
              color={ratingValue <= averageRating ? "#FF6347" : "#e4e5e9"}
              size={25}
            />
          </label>
        );
      })}
    </div>
  </div>
</div>

<h2 className='number-of-reviews'>{reviewFiltered.length} {reviewFiltered.length === 1 ? 'review' : 'reviews'}</h2>

          </div>
          <hr />


        <div className='eachReviewCard'> {reviewFiltered.map(review => (
            <ReviewCard key={review.id} review={review}/>
        ))} </div>
        <CreateReviewForm/>

        </>
    )
}


export default ReviewList
