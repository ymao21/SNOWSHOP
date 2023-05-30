import './EditProductForm.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductThunk } from '../../store/products';
import { Link, useParams, useHistory } from 'react-router-dom';


const EditProductForm = () => {
    const dispatch = useDispatch()
    const { productId } = useParams();
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user)

    const productName = useSelector(state => state.productState)

console.log("productinfo", productName)

return (

    <>
edit form
    </>
)


}


export default EditProductForm
