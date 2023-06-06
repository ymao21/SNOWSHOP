import './EditReviewForm.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { editReviewThunk } from '../../store/reviews';
import { FaStar } from "react-icons/fa";


const EditReviewForm = ({review}) => {

    const dispatch = useDispatch()
    const [hover, setHover] = useState(0)
    const sessionUser = useSelector(state => state.session.user);
    const sessionUserId = sessionUser.user.id
    const [errors, setErrors] = useState([]);

    // console.log("reviews", review.id )

    const reviewBody = review.body
    const reviewRating = review.rating
    const reviewId = review.id

    const [body, setBody] = useState(reviewBody)
    const [rating, setRating] = useState(reviewRating)


    const updateBody = (e) => setBody(e.target.value)
    const updateRating = (e) => setRating(e.target.value)

        function refreshPage(){
        window.location.reload();
    }

    const submitHandler = (e) => {
        e.preventDefault()

        setErrors([])

       if((body.length === 0) && (rating.length === 0)) {
        setErrors(['Review and ratingis required'])
       }

       const payload = {
        reviewId,
        body,
        rating
       }

       if (errors.length === 0) {
        dispatch(editReviewThunk(payload, sessionUser.user))
        .then(() => setBody(''))
        .then(() => setRating(''))
        .catch(async response => {
            const data = await response.json()
            if(data.errors) setErrors(data.errors)
        })
    }
    }

    return sessionUserId ?(


             <form className="editReviewForm" onSubmit={submitHandler}>
              {errors.length > 0 && errors.map((error, i) => {
                return <div key={i} >{error}</div>
            })}

<input  className='reviewEditInput'
              type="text"
              placeholder="review body"
              value={body}
              onChange={updateBody} />

{[...Array(5)].map((star, index) => {
  const ratingValue = index + 1;

  return (

      <label>
      <input
      className = "starRating"
      name='rating'
      max='5'
      min='1'
      required
      value={Math.floor(ratingValue)}
      onChange = {updateRating}
      onClick={() => setRating(Math.floor(ratingValue))}
      />
      <FaStar
      className='EditReviewstar'
      color= {ratingValue <= (hover || rating)? "#ffc107" : "#e4e5e9"}
      size={25}
      onMouseEnter={ () => setHover(ratingValue)}
      onMouseLeave={ () => setHover(null) }
      />
      </label>

            );
            })}



            <button className= "updateReviewBtn" type="submit" onClick={() => {

            refreshPage()
            }}>Update Review</button>
            </form>

    ):
    null;
}


export default EditReviewForm
