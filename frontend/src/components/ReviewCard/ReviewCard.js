import './ReviewCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';


const ReviewCard = ({review}) => {

  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)
  const isOwner =sessionUser && sessionUser.user.id === review.userId

  const deleteHandler = () => {
    dispatch(deleteReviewThunk(review.id))
    }

    // console.log("review", review

    return (
        <>
        <div className="reviewCard">
            <div className='reviewCard'>
            {/* <div className = "reviewUser">{review.User.username}</div> */}
            <div className = "ReviewInput">{review.body}</div>
            <div className = "ReviewInput">{review.rating}</div>
            {isOwner && <button className="deleteReviewBtn" onClick={deleteHandler}>Review Delete</button>}
            </div>
        </div>
        </>
    )
}

export default ReviewCard
