import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import CreateProductForm from '../ProductForm/CreateProductForm';
import logo from '../../../src/logo.png'
import SearchBar from '../SearchBar/Search';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // console.log("currentuser", sessionUser.user)

  let sessionLinks;

  if (sessionUser.user) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      </>
    );

  } else {
    sessionLinks = (
      <>
        {/* <NavLink className= "navlogin" to="/login">Log In</NavLink> */}

                 <OpenModalButton
											className="nav-form"
											modalComponent={<LoginFormPage />}
											buttonText="Log In"
										/>


        {/* <NavLink className= "navsignup" to="/signup">Register</NavLink> */}

                  <OpenModalButton
											className="nav-form"
											modalComponent={<SignupFormPage />}
											buttonText="Sign up"
										/>

      </>
    );
  }

  return (

    <ul className='Navigation'>
      <SearchBar/>
        {/* <img src={logo} alt="Logo" className='logo' /> */}
      <div className='navbaritems'>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
