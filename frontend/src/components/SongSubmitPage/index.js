import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as songActions from "../../store/songs";
import './SongSubmitForm.css';

function SongSubmitPage() {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState()
    const [previewImage, setPreviewImage] = useState()

    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        // dispatch the info to the database stuff
        //
    }
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    // //   if (password === confirmPassword) {
    // //     setErrors([]);
    // //     return dispatch(sessionActions.signup({ email, username, password, firstName, lastName, previewImage }))
    // //       .catch(async (res) => {
    // //         const data = await res.json();
    // //         if (data && data.errors) setErrors(data.errors);
    // //       });
    // //   }
    // //   return setErrors(['Confirm Password field must be the same as the Password field']);
    // };

    //requirements
    //file must be mp3

    return (
      <>
      <form>
        <label>
          Song Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="textarea"
            value={description}
            onChange={(e) => setFile(e.target.value)}
            required
          />
        </label>
        <label>
            Song File
          <input
            type="file" name="songFile"
            onChange={(e) => setFile(e.target.value[0])}
            required
          />
        </label>
        <label>
            Song Image
          <input
            type="file" name="imageFile"
            onChange={(e) => setPreviewImage(e.target.value[0])}
            required
          />
        </label>
        <button type="submit">Create New Track</button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Enter Title
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form> */}
      </>
    );
  }

export default SongSubmitPage;
