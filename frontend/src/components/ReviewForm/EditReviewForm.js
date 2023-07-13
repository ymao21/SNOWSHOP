import './EditReviewForm.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReviewThunk } from '../../store/reviews';
import { FaStar } from 'react-icons/fa';

const EditReviewForm = ({ review, setIsEditing, onReviewUpdate }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser.user.id;
  const [errors, setErrors] = useState([]);

  const [body, setBody] = useState(review.body);
  const [rating, setRating] = useState(Number(review.rating) || 0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setBody(review.body || '');
    setRating(Number(review.rating) || 0);
  }, [review.body, review.rating, review.id]); // Add 'review.id' to the dependency array

  const updateBody = e => setBody(e.target.value);
  const updateRating = ratingValue => setRating(Number(ratingValue));

  const submitHandler = e => {
    e.preventDefault();

    setErrors([]);

    if (body.length === 0 && rating === 0) {
      setErrors(['Review and rating are required']);
    }

    const payload = {
      reviewId: review.id,
      body,
      rating,
    };

    if (errors.length === 0) {
      dispatch(editReviewThunk(payload, sessionUser.user))
        .then(updatedReview => {
          setBody('');
          setRating(0);
          setIsEditing(false);
          onReviewUpdate(updatedReview); // Pass the updated review data to the callback
        })
        .catch(async response => {
          const data = await response.json();
          if (data.errors) setErrors(data.errors);
        });
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((star, index) => {
      const ratingValue = index + 1;

      return (
        <label key={index}>
          <input
            className="starRating"
            max="5"
            min="1"
            required
            value={rating}
            type="radio"
            onChange={() => updateRating(ratingValue)}
            onClick={() => {
              if (rating === ratingValue) {
                setRating(0);
              } else {
                setRating(ratingValue);
              }
            }}
          />
          <FaStar
            className="EditReviewstar"
            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            size={25}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      );
    });
  };

  return sessionUserId ? (
    <form className="editReviewForm" onSubmit={submitHandler}>
      {errors.length > 0 &&
        errors.map((error, i) => {
          return <div key={i}>{error}</div>;
        })}

      <input
        className="reviewEditInput"
        type="text"
        placeholder="Review body"
        value={body}
        onChange={updateBody}
      />

      {renderStars()}

      <button className="updateReviewBtn" type="submit">
        Update Review
      </button>
    </form>
  ) : null;
};

export default EditReviewForm;
