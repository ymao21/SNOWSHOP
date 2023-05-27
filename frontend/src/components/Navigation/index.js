import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // console.log("currentuser", sessionUser.user)

  let sessionLinks;

  if (sessionUser.user) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className= "navlogin" to="/login">Log In</NavLink>
        <NavLink className= "navsignup" to="/signup">Register</NavLink>
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
