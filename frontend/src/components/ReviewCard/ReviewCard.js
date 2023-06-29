import './ReviewCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import {  useState } from 'react';
import { FaStar } from "react-icons/fa";
import EditReviewForm from '../ReviewForm/EditReviewForm';

const ReviewCard = ({review}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(Math.floor(review?.rating));
  const [isEditing, setIsEditing] = useState(false);
  const [hover, setHover] = useState(0);
  const sessionUser = useSelector(state => state.session.user);
  const isOwner = sessionUser && sessionUser.user.id === review.userId;

  const deleteHandler = () => {
    dispatch(deleteReviewThunk(review.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
    
      <div className='reviewUser'>{sessionUser.user.username}</div>

      <div className="star-rating">
        <div>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <b className="star-rating" name="rating" value={review.rating} />
                <FaStar
                  className="star"
                  color={ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"}
                  size={25}

                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="reviewCard">
        <div className='reviewCard'>
          <div className="ReviewInput">{review?.body}</div>

          {isOwner && (
            <button
              className="deleteReviewBtn"
              onClick={() => {
                deleteHandler();
              }}
            >
              Delete Review
            </button>
          )}

          {isEditing ? (
            <EditReviewForm
              review={review}
              onSave={handleSave}
              initialRating={rating}
              setIsEditing={setIsEditing}
            />
          ) : (
            <button className="EditReviewBtn" onClick={handleEdit}>
              Edit Review
            </button>
          )}
        </div>
      </div>

      <hr />
    </>
  );
};

export default ReviewCard;
