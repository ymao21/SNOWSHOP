import './ProductList.css';
import {  useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  getProductsThunk } from '../../store/products';
import ProductCard from '../ProductCard/ProductCard';


const ProductList = () => {

   const [activeFilter, setActiveFilter] = useState('all');
    const dispatch = useDispatch();

    const productObj = useSelector(state => state.productState)
    const productArr = Object.values(productObj)


    const filteredProducts = productArr.filter((product) => {

      if (activeFilter === 'all') {
        return true;
      } else if (activeFilter === 'women') {
        return product.category.toLowerCase() === 'women';
      } else if (activeFilter === 'men') {
        return product.category.toLowerCase() === 'men';
      }
      return false;
    });



const handleFilterChange = (filter) => {
  setActiveFilter(filter);
};

    useEffect(() => {
        dispatch(getProductsThunk())
      }, [dispatch])

      return (
        // <main className='productListContainer'>

        //   <div className='eachProduct'>
        //     {productArr.map((product) => {
        //     return <ProductCard key={product?.id} product={product}/>
        //     })}
        //   </div>
        // </main>

        <main className='productListContainer'>
        <div className='filterButtons'>
          <button onClick={() => handleFilterChange('all')}>All</button>
          <button onClick={() => handleFilterChange('women')}>Women</button>
          <button onClick={() => handleFilterChange('men')}>Men</button>
        </div>

        <div className='eachProduct'>
          {filteredProducts.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </main>

      );

}

export default ProductList;
