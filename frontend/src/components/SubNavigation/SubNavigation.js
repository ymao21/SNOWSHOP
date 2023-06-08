import './SubNavigation.css';
import React from 'react';
import SearchBar from '../SearchBar/Search';
import CreateProductForm from '../ProductForm/CreateProductForm';
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import logo from '../../../src/logo.png'

const SubNavigation = () => {
  const history = useHistory();

  const redirectCart = () => {
    history.push('./cart');
  };

  return (
    <div className="subNavigationContainer">
     <img src= {logo} className = "logo" alt="logo"></img>

      <OpenModalButton
        className="listProductButton"
        modalComponent={<CreateProductForm />}
        buttonText="List My Product"
      />

      <SearchBar />

      <button className="cartButton" onClick={redirectCart}>
        <img
          src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png"
          alt="Shopping Cart"
          className="cartIcon"
        />
      </button>
    </div>
  );
};

export default SubNavigation;
