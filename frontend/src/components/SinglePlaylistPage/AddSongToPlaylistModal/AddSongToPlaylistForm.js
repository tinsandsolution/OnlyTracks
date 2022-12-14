import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as songActions from "../../../store/songs";
import * as playlistActions from "../../../store/playlists";
// import './PlaylistCreateForm.css';

const filterSongs = (terms, songs) => {

    terms = terms.map(term => term.toLowerCase())

    return Object.values(songs).filter(song => {
        for (let term of terms) {
            if (term === "") continue
            let nonalpha = /[^A-Za-z0-9]/g
            let songWords = [...song.title.split(" ")]
            songWords = songWords.map(songWord => songWord.replace(nonalpha, "").toLowerCase())
            console.log(songWords)
            if (songWords.includes(term)) return true
        }
        return false
    })
}

const makeSongs = (songArray, playlistId, setShowModal, dispatch) => songArray.map(song => {
    // const {setPlayerSong} = useMusic()
    const songId = song.id
    return (
        <div className="astpf-preview-card"
             key={song.id}
             onClick={() => {
                dispatch(playlistActions.AddSongToPlaylist({songId, playlistId}))
                setShowModal(false)
             }}
             >
            <div className="astpf-thing-card">
                <img className="astpf-preview-image"
                     src={song.previewImage}
                     alt={song.title}
                     onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}
                     >
                </img>
                {/* <div className="play-button">▶️</div> */}
            </div>
            <div className="astpf-card-song-title">
                {song.title}
            </div>
        </div>
    )
})


const Search = (query, playlistId, setShowModal, dispatch) => {
    let songs = useSelector((state) => state.songs)
    const terms = query.split(" ")


    const filteredSongs = filterSongs(terms, songs)
    console.log(filteredSongs)
    return (
        <>
        {filteredSongs.length === 0 ? <div className="no-results">No results found</div> : makeSongs(filteredSongs, playlistId, setShowModal, dispatch)}
        </>

    )
}

function AddSongToPlaylistForm({setShowModal, playlistId}) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [query, setQuery] = useState("");
    const [songResults, setSongResults] = useState([])

    return (
      <div className="modal-form">
        <label>
          <input
            type="text"
            placeholder="Search for a song"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="search-results-playlist-songs">{Search(query, playlistId, setShowModal, dispatch)}</div>

        <br />
        <br />
      </div>
    );
  }

export default AddSongToPlaylistForm;
