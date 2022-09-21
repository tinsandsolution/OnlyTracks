import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/songs";
import './SongSubmitForm.css';

function SongSubmitForm({setShowModal}) {
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
        if (title.length > 250) errors.push("Please make your title shorter")
        if (description.length > 250) errors.push("Please make your description Shorter")
        if (!file.match(musicRe)) errors.push("Audio file needs to be an .mp3")
        if (!previewImage.match(/.*\.(jpg|png|bmp|jpeg)$/)) errors.push("Image needs to be a .jpg, .png, .bmp, or a .jpeg")
        setErrors(errors)
    },[file, previewImage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let newSongId = null
        let item = await dispatch(sessionActions.addSong({title, description, file, previewImage}))
            .catch(async (res) => {

                const data = await res.json();
                if (data && data.errors) {
                  // console.log("this hits")
                  setErrors(data.errors);
                }
                else {
                  return data
                }
                // else newSongId = data.id
            });
        console.log("homm", item)
        if (!errors.length) {
          setShowModal(false)
          // history.push(`/songs/${newSongId}`)
        }
    }

    return (
      <>
      <form className="modal-form"onSubmit={handleSubmit}>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        <label>
          Song Title <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description <br />
          <input
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
            Song File<br />
          <input
            type="text" value={file}
            onChange={(e) => setFile(e.target.value)}
            required
          />
        </label>
        <label>
            Song Image <br />
          <input
            type="text" value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={errors.length ? true : false}>{errors.length ? "Invalid" : "Create New Track"}</button>
      </form>
      </>
    );
  }

export default SongSubmitForm;
