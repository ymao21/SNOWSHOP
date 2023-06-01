import './ReviewCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import {  useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



const ReviewCard = ({review}) => {

  const dispatch = useDispatch()
  const [rating, setRating] = useState(Math.floor(review?.rating))
  const [hover, setHover] = useState(0)
  const sessionUser = useSelector(state => state.session.user)
  const isOwner =sessionUser && sessionUser.user.id === review.userId

  const deleteHandler = () => {
    dispatch(deleteReviewThunk(review.id))

    }
    function refreshPage(){
        window.location.reload();
    }

    // console.log(sessionUser.user.username)

    return (
        <>

       <div className='reviewUser'>{sessionUser.user.username}</div>


        <div className="star-rating">
        <div >
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
            <label>
            <b
            className='star-rating'
            name='rating'
            value={ratingValue}
                        />
            <FaStar
            className='star'
            color= {ratingValue <= (rating)? "#ffc107" : "#e4e5e9"}
            size={25}
            />

            </label>
        );
      })}
      </div>
    </div>

        <div className="reviewCard">
            <div className='reviewCard'>

            <div className = "ReviewInput">{review?.body}</div>

            {isOwner && <button className="deleteReviewBtn" onClick={() => {
            deleteHandler()
            refreshPage()
            }}> Delete Review</button>}

            </div>

        </div>
        <hr/>

        </>
    )
}

export default ReviewCard
