
import './ProductCard.css'
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductThunk } from '../../store/products';



const ProductCard = ({product}) => {

    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    // const deleteHandler = () => {
    //     dispatch(deleteProductThunk(product.id))
    //         }


    const isOwner =sessionUser && sessionUser.id === product.userId

        return (
            <div className='productCardContainer'>
             <a href= {`/products/${product.id}`} >   <img className='productimg' src = {product.previewImageUrl} alt = "productimg" /></a>
            <div className='productCard'>

            <Link className='titlelink' key={product.id} to={`/products/${product.id}`}>
                 {product.name} </Link>

                 </div>
        {/* { isOwner && <button className="deleteProductBttn" onClick={deleteHandler}>delete</button> } */}

        </div>

        )

}

export default ProductCard
