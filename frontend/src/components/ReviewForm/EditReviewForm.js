import './EditReviewForm.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReviewThunk } from '../../store/reviews';
import { FaStar } from 'react-icons/fa';

const EditReviewForm = ({ review }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(0);
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser.user.id;
  const [errors, setErrors] = useState([]);

  const reviewBody = review.body;
  const reviewRating = review.rating;

  const reviewId = review.id;

  const [body, setBody] = useState(reviewBody);
  const [rating, setRating] = useState(Number(reviewRating) || 0);

  useEffect(() => {
    setBody(review.body || '');
    setRating(Number(review.rating) || 0);
  }, [review.body, review.rating]);

  const updateBody = e => setBody(e.target.value);
  const updateRating = ratingValue => setRating(Number(ratingValue));

  const submitHandler = e => {
    e.preventDefault();

    setErrors([]);

    if (body.length === 0 && rating === 0) {
      setErrors(['Review and rating are required']);
    }

    const payload = {
      reviewId,
      body,
      rating,
    };

    if (errors.length === 0) {
      dispatch(editReviewThunk(payload, sessionUser.user))
        .then(() => {
          setBody("");
          setRating(0);
        })
        .catch(async response => {
          const data = await response.json();
          if (data.errors) setErrors(data.errors);
        });
    }
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

      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              className="starRating"
              name="ratingValue"
              max="5"
              min="1"
              required
              value={ratingValue}
              type="radio"
              onChange={() => updateRating(ratingValue)}
              onClick={() => setRating(ratingValue)}
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
      })}

      <button className="updateReviewBtn" type="submit">
        Update Review
      </button>
    </form>
  ) : null;
};

export default EditReviewForm;
