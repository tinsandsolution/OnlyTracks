import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
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

  const demoUser = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({credential : 'Demo-lition', password : 'password' }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <>
    <form className="modal-form"onSubmit={handleSubmit}>
      {/* <ul> */}
        {/* {errors} */}
        {errors.map((error, idx) => <div className="form-error" key={idx}>{error}</div>)}
        {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
      {/* </ul> */}
      <br />
      <label>
        <input
          placeholder='Username or Email'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
    <form className='modal-form-2'>
      <button onClick={demoUser}>Demo User</button>
    </form>
    </>
  );
}

export default LoginForm;
