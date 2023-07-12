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

  if (sessionUser?.id) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (!credential) {
      setErrors(prevErrors => [...prevErrors, "Username cannot be empty"]);
      return;
    }

    if (!password) {
      setErrors(prevErrors => [...prevErrors, "Password cannot be empty"]);
      return;
    }

    dispatch(sessionActions.login({ credential, password }))
    .then(() => {
      closeModal();
    })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demouser = { credential: 'Demo', password: 'password' };

  const handleSubmitDemo = () => {
    setErrors([]);
    dispatch(sessionActions.login(demouser))
    .then(()=>{
      closeModal()
    })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <form className="loginform" onSubmit={handleSubmit}>
      <ul className='Errors'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <label className='loginlabel'>
        Username or Email
        <input
          className='loginInput'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='loginlabel'>
        Password
        <input
          className='loginInput'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button className="loginBtn" type="submit">Log In</button>

      <button className="loginBtn" onClick={handleSubmitDemo} type="button">Demo User</button>

      <div className='termsCondition'>By clicking Sign in, you agree to our Terms and Conditions and Privacy Statement.</div>
    </form>
  );
}

export default LoginFormPage;
