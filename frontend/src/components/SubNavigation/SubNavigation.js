import './SubNavigation.css';
import React from 'react';
import SearchBar from '../SearchBar/Search';
import CreateProductForm from '../ProductForm/CreateProductForm';
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import logo from '../../../src/logo.png'
import logotext from '../../../src/logotext.png'

const SubNavigation = () => {
  const history = useHistory();

  const redirectCart = () => {
    history.push('/cart');
  };

  return (
    <div className="subNavigationContainer">

     <img  src= {logo} className = "logo" alt="logo"></img>

      <OpenModalButton
        modalComponent={<CreateProductForm />}
        buttonText="List My Product"
      />
      <SearchBar />
      <img
          src="https://img.uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
          alt="SearchSymbol"
          className="SearchSymbol"
        />
      <button className="cartButton" onClick={redirectCart}>
        <img
          src="https://www.freeiconspng.com/thumbs/bags-icon/bag-icon-6.png"
          alt="Shopping Cart"
          className="cartIcon"
        />
      </button>
    </div>
  );
};

export default SubNavigation;
