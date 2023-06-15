import './ProductList.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../../store/products';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeWomenCategory, setActiveWomenCategory] = useState('all');
  const [activeMenCategory, setActiveMenCategory] = useState('all');
  const dispatch = useDispatch();

  const productObj = useSelector((state) => state.productState);
  const productArr = Object.values(productObj);

  const filteredProducts = productArr.filter((product) => {
    if (activeFilter === 'all') {
      return true;
    } else if (activeFilter === 'women') {
      if (activeWomenCategory === 'all') {
        return product.category.toLowerCase() === 'women';
      } else {
        return (
          product.category.toLowerCase() === 'women' &&
          product.type.toLowerCase() === activeWomenCategory
        );
      }
    } else if (activeFilter === 'men') {
      if (activeMenCategory === 'all') {
        return product.category.toLowerCase() === 'men';
      } else {
        return (
          product.category.toLowerCase() === 'men' &&
          product.type.toLowerCase() === activeMenCategory
        );
      }
    }
    return false;
  });

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleWomenCategoryChange = (category) => {
    setActiveWomenCategory(category);
  };

  const handleMenCategoryChange = (category) => {
    setActiveMenCategory(category);
  };

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <main className='productListContainer'>
      <div className='filterButtonsContainer'>
        <button className='filterButtons' onClick={() => handleFilterChange('all')}>All Products</button>
        <button  className='filterButtons' onClick={() => handleFilterChange('women')}>Women</button>
        {activeFilter === 'women' && (
          <div className='subFilters'>
            <button onClick={() => handleWomenCategoryChange('jackets')}>Jackets</button>
            <button onClick={() => handleWomenCategoryChange('pants')}>Pants</button>
            <button onClick={() => handleWomenCategoryChange('goggles')}>Goggles</button>
            <button onClick={() => handleWomenCategoryChange('fleece')}>Fleece</button>
            <button onClick={() => handleWomenCategoryChange('snowboards')}>Snowboards</button>
            <button onClick={() => handleWomenCategoryChange('skis')}>Skis</button>
            <button onClick={() => handleWomenCategoryChange('boots')}>Boots</button>
            <button onClick={() => handleWomenCategoryChange('other')}>Other</button>
          </div>
        )}
        <button className='filterButtons' onClick={() => handleFilterChange('men')}>Men</button>
        {activeFilter === 'men' && (
          <div className='subFilters'>
            <button onClick={() => handleMenCategoryChange('jackets')}>Jackets</button>
            <button onClick={() => handleMenCategoryChange('pants')}>Pants</button>
            <button onClick={() => handleMenCategoryChange('goggles')}>Goggles</button>
            <button onClick={() => handleMenCategoryChange('fleece')}>Fleece</button>
            <button onClick={() => handleMenCategoryChange('snowboards')}>Snowboards</button>
            <button onClick={() => handleMenCategoryChange('skis')}>Skis</button>
            <button onClick={() => handleMenCategoryChange('boots')}>Boots</button>
            <button onClick={() => handleMenCategoryChange('other')}>Other</button>
          </div>
        )}
      </div>

      <div className='eachProduct'>
        {filteredProducts.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductList;
