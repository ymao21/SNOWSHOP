import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  if (sessionUser.id) return <Redirect to="/" />;

  const redirectToHome = () => {
    history.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      try {
        await dispatch(
          sessionActions.signup({
            email,
            username,
            password,
            firstName,
            about,
            lastName,
          })
        );
        redirectToHome();
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  return (
    <form className="signupform" onSubmit={handleSubmit}>
      <ul className="Errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      <label className="signuplabel">
        <span>Username</span>
        <input
          className="signupinput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel">
        <span>Email</span>
        <input
          className="signupinput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel">
        <span>First Name</span>
        <input
          className="signupinput"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel">
        <span>Last Name</span>
        <input
          className="signupinput"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel">
        <span>About yourself</span>
        <input
          className="signupinput"
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel">
        <span>Password</span>
        <input
          className="signupinput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label className="signuplabel">
        <span>Confirm Password</span>
        <input
          className="signupinput"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>

      <button className="signupBtn" type="submit">
        Sign Up
      </button>
      <div className='termsConditions'>By clicking Sign in, you agree to our Terms and Conditions and Privacy Statement.</div>

    </form>
  );
}

export default SignupFormPage;
