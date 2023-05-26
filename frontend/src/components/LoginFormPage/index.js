import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser.id) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demouser = { credential: 'demo@user.io', password: 'password'}
  const handleSubmitDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login( demouser ))

      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }


  return (
    <div className='Loginformcontainer'>
    <form  className="loginform" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <label className='loginusertext'>
        Username or Email
        <input   className='usernamelogin'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='loginpasswordtext'>
        Password
        <input  className='passwordlogin'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <a className='Login'>
      <button className = "userloginbtn" type="submit">Log In</button>
      </a>
    </form>
    <button className="demouserbtn" onClick={handleSubmitDemo} type="submit">Demo User</button>
    </div>
  );
}

export default LoginFormPage;
