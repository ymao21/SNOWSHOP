import './SubNavigation.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar/Search';
import CreateProductForm from '../ProductForm/CreateProductForm';
import OpenModalButton from '../OpenModalButton';
import logo from '../../../src/logo.png';
import logotext from '../../../src/logotext.png';

const SubNavigation = () => {
  const location = useLocation();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const cartItemsObj = useSelector((state) => state.cartState.cartItems)
  const cartItemsArr = Object.values(cartItemsObj)

  const isOwner = sessionUser.user


  const redirectCart = () => {
    history.push(`/cart/${sessionUser.currentCart.id}`);
  };

  const redirectToRoot = () => {
    history.push('/');
  };

  const isRootRoute = location.pathname === '/';

  return (
    <div className="subNavigationContainer">
      {isRootRoute ? (
        <img src={logo} className="logo" alt="logo" />
      ) : (
        <a href="/" className="logotext" onClick={redirectToRoot}>
          <img src={logotext} alt="logotext" />
        </a>
      )}


      {isOwner ? (
           <>
        <OpenModalButton modalComponent={<CreateProductForm />} buttonText="List My Product" />
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
        </>
      ) : (
        <span class="LogInToSell">PLEASE LOG IN TO SELL AND EXPLORE</span>

      )}


    </div>
  );
};

export default SubNavigation;
