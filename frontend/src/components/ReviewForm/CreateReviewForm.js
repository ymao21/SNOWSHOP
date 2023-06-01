import './CreateReviewForm.css'
import { useSelector, useDispatch} from 'react-redux'
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';

const CreateReviewForm =() => {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    const productIdobj = useParams()
    const productId = productIdobj.productId

    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("");
    const [rating, setRating] = useState("");

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
            .catch(async response => {
                const data = await response.json()
                if(data.errors) setErrors(data.errors)
            })
        }
    }


    return sessionUser.user.id ? (

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
           <input className= "reviewInput"value={rating} onChange = {createRating} />

           <button className= "Reviewsubmitbtn">Submit</button>
       </form>

    ) :
    null;
}

export default CreateReviewForm
