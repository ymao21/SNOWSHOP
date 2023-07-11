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
        <>
        <img src={logo} className="logo" alt="logo" />

        {/* <div className= "WelcomeBackUser">Welcome Back {isOwner?.username}</div> */}
        </>
      ) : (
        <a  className="logotext" onClick={redirectToRoot}>
          <img src={logotext} alt="logotext" />
        </a>
      )}


      {isOwner ? (
           <>

        <div className= "WelcomeBackUser">Welcome Back {isOwner?.username}</div>
        <OpenModalButton modalComponent={<CreateProductForm />} buttonText="List My Product" />
        <SearchBar />
        <img
        src = "https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png"
        alt="SearchSymbol"
        className="SearchSymbol"/>

           <button className="cartButton" onClick={redirectCart}>
        <img
          src="https://www.freeiconspng.com/thumbs/bags-icon/bag-icon-6.png"
          alt="Shopping Cart"
          className="cartIcon"
        />
      </button>
        </>
      ) : (
        <span class="LogInToSell">PLEASE LOG IN TO EXPLORE</span>

      )}


    </div>
  );
};

export default SubNavigation;
