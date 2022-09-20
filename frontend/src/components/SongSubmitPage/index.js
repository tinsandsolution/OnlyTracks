import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/songs";
import './SongSubmitForm.css';

function SongSubmitPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        const errors = [];

        const musicRe = /.*\.mp3$/;
        if (!file.match(musicRe)) errors.push("Audio file needs to be an .mp3")
        if (!previewImage.match(/.*\.(jpg|png|bmp|jpeg)$/)) errors.push("Image needs to be a .jpg, .png, .bmp, or a .jpeg")
        setErrors(errors)
    },[file, previewImage])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.addSong({title, description, file, previewImage}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push("/")
    }

    return (
      <>
      <form onSubmit={handleSubmit}>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
            Song File
          <input
            type="text" value={file}
            onChange={(e) => setFile(e.target.value)}
            required
          />
        </label>
        <label>
            Song Image
          <input
            type="text" value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={errors.length ? true : false}>Create New Track</button>
      </form>
      </>
    );
  }

export default SongSubmitPage;
