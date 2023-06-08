import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const redirectToHome = () => {
    history.push('/')
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profilebutton" onClick={openMenu}>
      </button>

      {showMenu && (
        <ul className="profile-dropdown">
          <li >{sessionUser.user.username}</li>
          <li>{sessionUser.user.email}</li>
          <li>
            <button className= "logoutbtn"onClick={()=> {
              logout();
              redirectToHome();
            }}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
