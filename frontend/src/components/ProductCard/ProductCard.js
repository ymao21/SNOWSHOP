import {React, useState} from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';


const ProductCard = ({ product }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const isOwner = sessionUser && sessionUser.user;


  console.log("productCard", product)

  const handleClick = () => {
    if (isOwner) {
      history.push(`/products/${product.id}`);
    } else {
      alert('Please log in to view details');

    }
  };

  return (
    <div className='productCardContainer'>
      {isOwner ? (
        <a className='productImgTag' href={`/products/${product.id}`}>
          <img className='productimg' src={product?.previewImageUrl} alt='productimg' />
        </a>
      ) : (
        <div className='productImgTag'>
          <img onClick={handleClick} className='productimg' src={product?.previewImageUrl} alt='productimg' />
        </div>
      )}

      {isOwner ? (


        <Link className='titlelink' key={product?.id} to={`/products/${product.id}`}>
        <div className='productPriceOnCard'>  ${product.price}</div>
        <br></br>
         {product.name}
        </Link>


      ) : (
        <div className='titlelink' onClick={handleClick}>
          {product.name}
        </div>
      )}

    </div>
  );
};

export default ProductCard;
