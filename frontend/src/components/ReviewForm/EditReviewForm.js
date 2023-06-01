import './EditReviewForm.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { editReviewThunk } from '../../store/reviews';



const EditReview = () => {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    const reviewIdObj = useParams()


    console.log("reviewId",reviewIdObj )

    return (
        <>
        </>
    )
}


export default EditReview
