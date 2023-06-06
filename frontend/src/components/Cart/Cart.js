import './Cart.css'
import {loadAllCartThunk} from '../../store/cart'

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


const Cart = ({product}) => {

    const dispatch = useDispatch()

    const cartItem = useSelector(state => state.cartState)

    // console.log("componentResponse", cartItem)

    useEffect(() => {
        dispatch(loadAllCartThunk())
      }, [dispatch])



    return (

        <>cartstuff</>
    )

}


export default Cart
