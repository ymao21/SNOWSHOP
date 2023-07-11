import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import { useModal } from "../../context/Modal";


function LoginFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  if (sessionUser.id) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    // e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demouser = { credential: 'Demo', password: 'password'}

  const handleSubmitDemo = (e) => {

    setErrors([]);
    return dispatch(sessionActions.login( demouser ))

      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (

    <form  className="loginform" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <label className='loginlabel'>
        Username or Email
        <input   className='loginInput'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='loginlabel'>
        Password
        <input  className='loginInput'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>




      <button className = "loginBtn"type="submit" onClick={() => {
         handleSubmit();
          closeModal();
        }}>Log In</button>

      <button className="loginBtn" onClick={() => {
          handleSubmitDemo();
          closeModal();
        }} type="submit">Demo User</button>

        <div className='termsCondition'> By clicking Sign in, you agree to our Terms and Conditions and Privacy Statement. </div>
    </form>

  );
}

export default LoginFormPage;
