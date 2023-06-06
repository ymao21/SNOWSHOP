import './ProductList.css';
import {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  getProductsThunk } from '../../store/products';
import ProductCard from '../ProductCard/ProductCard';


const ProductList = () => {

    const dispatch = useDispatch();

    const productObj = useSelector(state => state.productState)
    const productArr = Object.values(productObj)


    useEffect(() => {
        dispatch(getProductsThunk())
      }, [dispatch])

      return (
        <main className='productListContainer'>

          <div className='eachProduct'>
            {productArr.map((product) => {
            return <ProductCard key={product.id} product={product}/>
            })}
          </div>
        </main>

      );

}

export default ProductList;
