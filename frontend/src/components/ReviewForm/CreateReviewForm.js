import './CreateReviewForm.css'
import { useSelector, useDispatch} from 'react-redux'
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import { FaStar } from "react-icons/fa";

const CreateReviewForm =() => {

    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const sessionUser = useSelector(state => state.session.user);

    const productIdobj = useParams()
    const productId = productIdobj.productId

    console.log("frontendProductid",productIdobj )

    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("");


    const createBody = (e) => setBody(e.target.value)
    const createRating = (e) => setRating(e.target.value)

    // console.log(productId.productId)

    const submitHandler = (e) => {
        e.preventDefault();

       setErrors([])

       if((body.length === 0) && (rating.length === 0)) {
        setErrors(['Review and ratingis required'])
      }

        const payload = {
            productId,
            body,
            rating
        }

        if (errors.length === 0) {
            dispatch(createReviewThunk(payload, sessionUser.user))
            .then(() => setBody(''))
            .then(() => setRating(''))
            .catch(async response => {
                const data = await response.json()
                if(data.errors) setErrors(data.errors)
            })
        }
    }


    return sessionUser.user.id ? (
        <>

         <form className = "reviewForm" onSubmit = {submitHandler}>

            <div className='RevieError'>
        {errors.length > 0 && errors.map((error, i) => {
               return <div key={i} >{error}</div>

           })}
            </div>

           <label className='reviewText' >
               Write a Review:
           </label>

           <input className= "reviewInput"value={body} onChange = {createBody} />
           <label className='reviewText' >
               Rate:
           </label>

           <div className="star-rating">

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
      onChange = {createRating}
      onClick={() => setRating(Math.floor(ratingValue))}
      />
      <FaStar
      className='star'
      color= {ratingValue <= (hover || rating)? "#ffc107" : "#e4e5e9"}
      size={25}
      onMouseEnter={ () => setHover(ratingValue)}
      onMouseLeave={ () => setHover(null) }
      />

      </label>

            );
            })}

           <button className= "Reviewsubmitbtn">Submit</button>
           </div>
       </form>

       </>

    ) :
    null;

}

export default CreateReviewForm
