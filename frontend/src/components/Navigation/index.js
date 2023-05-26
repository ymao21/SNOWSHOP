import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser.id) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className= "navlogin" to="/login">Log In</NavLink>
        <NavLink className= "navsignup" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (

    <ul className='Navigation'>

        <>Navigation</>
    </ul>
  );
}

export default Navigation;
