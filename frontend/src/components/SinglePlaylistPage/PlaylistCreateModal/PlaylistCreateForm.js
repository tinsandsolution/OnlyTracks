import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as songActions from "../../../store/songs";
import * as playlistActions from "../../../store/playlists";
import './PlaylistCreateForm.css';

function PlaylistCreateForm({setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [name, setName] = useState("");
    const [previewImage, setPreviewImage] = useState("")

    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        const errors = [];

        if (!name.length) errors.push("Title must be greater than three characters")
        if (name.length > 250) errors.push("Please make your title shorter")
        if (!previewImage.match(/.*\.(jpg|png|bmp|jpeg)$/)) errors.push("Image needs to be a .jpg, .png, .bmp, or a .jpeg")
        setErrors(errors)
    },[previewImage, name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let newSongId = null
        let item = await dispatch(playlistActions.addPlaylist({name, previewImage}))
            .catch(async (res) => {
                // console.log("fasdfasdf")
                const data = await res.json();
                if (data && data.errors) {
                  // console.log("this hits")
                  setErrors(data.errors);
                  return("this hits")
                }
                else {
                  return("this hits2")
                }
                // else newSongId = data.id
            });
        // console.log("homm", item.songId)
        if (!errors.length) {
          // console.log("apparently there's no errors")
          // console.log(`/songs/${newSongId}`)
          await dispatch(playlistActions.getPlaylists())
          console.log("fdasfdasfads",item)
          history.push(`/playlists/${item.playlistId}`)
          setShowModal(false)
        }
    }

    return (
      <>
      <form className="modal-form" onSubmit={handleSubmit}>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        <label>
          <input
            type="text"
            placeholder="Playlist Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Playlist Image"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>
        {!errors.length ?
        <button type="submit" disabled={errors.length ? true : false}>{errors.length ? "Invalid" : "Create New Playlist"}</button> :
        <>
        <br />
        <br />
        </>
      }

      </form>
      </>
    );
  }

export default PlaylistCreateForm;
