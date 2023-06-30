import './ReviewCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import EditReviewForm from '../ReviewForm/EditReviewForm';

const ReviewCard = ({ review }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(Math.floor(review?.rating));
  const [isEditing, setIsEditing] = useState(false);
  const [hover, setHover] = useState(0);
  const sessionUser = useSelector((state) => state.session.user);
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

  const [userReaction, setUserReaction] = useState(localStorage.getItem(`reviewReaction_${review.id}`));
  const [hasReacted, setHasReacted] = useState(userReaction !== null);

  const handleThumbUp = () => {
    if (!hasReacted) {
      setUserReaction('thumbsUp');
      setHasReacted(true);
      localStorage.setItem(`reviewReaction_${review.id}`, 'thumbsUp');
    } else if (userReaction === 'thumbsUp') {
      setUserReaction(null);
      setHasReacted(false);
      localStorage.removeItem(`reviewReaction_${review.id}`);
    } else {
      setUserReaction('thumbsUp');
      localStorage.setItem(`reviewReaction_${review.id}`, 'thumbsUp');
    }
  };

  const handleThumbDown = () => {
    if (!hasReacted) {
      setUserReaction('thumbsDown');
      setHasReacted(true);
      localStorage.setItem(`reviewReaction_${review.id}`, 'thumbsDown');
    } else if (userReaction === 'thumbsDown') {
      setUserReaction(null);
      setHasReacted(false);
      localStorage.removeItem(`reviewReaction_${review.id}`);
    } else {
      setUserReaction('thumbsDown');
      localStorage.setItem(`reviewReaction_${review.id}`, 'thumbsDown');
    }
  };

  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      <div className="reviewUser">
      <img src="https://t3.ftcdn.net/jpg/05/26/72/48/240_F_526724825_fEKkOFrsAnTBW3G5Qc9VCZxArl3zWEdT.jpg" alt="user-icon" className="ReviewUserIcon" />
        {sessionUser.user.username}</div>

      <div className="star-rating">
        <div>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <b className="star-rating" name="rating" value={review.rating} />
                <FaStar
                  className="star"
                  color={ratingValue <= review.rating ? '#ffc107' : '#e4e5e9'}
                  size={25}
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="reviewCards">
        <div className="reviewCard">
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

<div className="reactionIcons">
  <div
    className={`thumbIcon ${userReaction === 'thumbsUp' ? 'selected' : ''}`}
    onClick={handleThumbUp}
  >
    <span role="img" aria-label="thumbs up">
      👍 Useful
    </span>
    {userReaction === 'thumbsUp' && <span className="reactionCount">1</span>}
  </div>
  <div
    className={`thumbIcon ${userReaction === 'thumbsDown' ? 'selected' : ''}`}
    onClick={handleThumbDown}
  >
    <span role="img" aria-label="thumbs down">
      👎 Dislike
    </span>
    {userReaction === 'thumbsDown' && <span className="reactionCount">1</span>}
  </div>
</div>


        </div>
      </div>

 
    </>
  );
};

export default ReviewCard;
