import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser.id) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName,lastName }))
        .catch(async (res) => {
          const data = await res.json();
          // console.log("data", data)
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (

    <form className="signupform" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <label className="signuplabel">
        Username
        <input className="signupinput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel">
        Email
        <input className="signupinput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel" >
        First Name
        <input className="signupinput"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label  className="signuplabel">
        Last Name
        <input className="signupinput"
          type="text"
          value={lastName}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </label>

      <label  className="signuplabel">
        About yourself
        <input className="signupinput"
          type="text"
          value={about}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>


      <label className="signuplabel">
        Password
        <input className="signupinput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="signuplabel">
        Confirm Password
        <input className="signupinput"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <a   >
      <button className="signupBtn"  type="submit">Sign Up</button>
      </a>
    </form>

  );
}

export default SignupFormPage;
