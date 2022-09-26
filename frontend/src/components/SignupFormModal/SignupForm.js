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
  const [firstName, setfirstName] = useState("defaultFirstName")
  const [lastName, setLastName] = useState("defaultLastName")
  const [previewImage, setPreviewImage] = useState("https://m.media-amazon.com/images/M/MV5BZDliZjU1NTctNTc0YS00NGVhLWI1ODUtZGYxMDFmZjM2YmU3XkEyXkFqcGdeQXVyMTI2MjA1NjA@._V1_.jpg")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName, previewImage }))
        .catch(async (res) => {
          // console.log("fasdfsadf")
          const data = await res.json();
          if (data && data.errors) {
            // console.log("you got errors")
            // console.log(data.errors)
            // console.log("here", data.errors["email"])

            let listOfErrors = []
            Object.keys(data.errors).forEach((errKey) => {
              listOfErrors.push(data.errors[errKey])
            })
            setErrors(listOfErrors);
          }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      {/* <ul> */}
        {errors.map((error, idx) => <div className="form-error" key={idx}>{error}</div>)}
      {/* </ul> */}
      <label>
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
