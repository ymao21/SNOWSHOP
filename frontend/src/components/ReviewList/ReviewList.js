import './ReviewList.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getReviewsThunk} from '../../store/reviews'
import ReviewCard from '../ReviewCard/ReviewCard'

const ReviewList = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()
    const reviewObj = useSelector(state => {
        return state.reviewState
      });

console.log("reviewObj", reviewObj)

    return (
        <>Review list</>
    )
}


export default ReviewList
