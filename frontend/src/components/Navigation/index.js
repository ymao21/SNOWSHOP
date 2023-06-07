import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import logo from '../../../src/logo.png'
import SearchBar from '../SearchBar/Search';
import CreateProductForm from '../ProductForm/CreateProductForm';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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

                 <OpenModalButton
											className="nav-form"
											modalComponent={<LoginFormPage />}
											buttonText="Log In"
										/>

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
      <div className='navbaritems'>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
