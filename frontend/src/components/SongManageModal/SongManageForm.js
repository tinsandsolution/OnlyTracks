import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory} from "react-router-dom";
import * as songActions from "../../store/songs";
import './SongManageForm.css';


function SongManageFormPage({song, setShowModal}) {
  const dispatch = useDispatch();
  // console.log(song)
  // const sessionUser = useSelector((state) => state.session.user);
  if (song.description === null) song.description = ""
  const history = useHistory()
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [file, setFile] = useState(song.url)
  const [previewImage, setPreviewImage] = useState(song.previewImage)

  let songId = song.id
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
      let updatedSong = await dispatch(songActions.editSong({title, description, file, previewImage, songId}))
      // console.log("fasdfasd" , updatedSong)
      // console.log("fasdfdsafasdsa" , updatedSong.statusText)
      if (updatedSong.statusText === "OK") {
        // console.log("happening")
        setShowModal(false)
        //console.log("happening")
      }
      // return dispatch(songActions.editSong({title, description, file, previewImage, songId}))
      //     .catch(async (res) => {
      //         const data = await res.json();
      //         console.log("afasdfasdsa")
      //         if (data && data.errors) setErrors(data.errors);
      //         else {
      //           console.log("happening")
      //           history.push(`/songs/${songId}`)
      //         }
      //     });
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    // setErrors([]);
    // let updatedSong = await dispatch(songActions.editSong({title, description, file, previewImage, songId}))
    // // console.log("fasdfasd" , updatedSong)
    // // console.log("fasdfdsafasdsa" , updatedSong.statusText)
    // if (updatedSong.statusText === "OK") {
    //   // console.log("happening")
    //   setShowModal(false)
    //   //console.log("happening")
    // }
    dispatch(songActions.deleteSong({songId}))
    // console.log("attempting to delete")
    history.push("/")
 }

  return (
    <>
    <form onSubmit={handleSubmit} className="modal-form">
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
          Song File <br />
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
      <button type="submit" disabled={errors.length ? true : false}>Update Track</button>
      <button type="delete" onClick={handleDelete}>Delete Song (Irreversible)</button>
    </form>
    </>
  );
}

export default SongManageFormPage;
