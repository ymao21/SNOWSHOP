import './Navigation.css';
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser.user) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
       <div className='Navigation'>
        <p className='navtext'>Free shipping! Free return! All the time on all orders!</p>
      <div className='navbaritems'>
        {isLoaded && sessionLinks}
      </div>
      </div>
  );
}

export default Navigation;
