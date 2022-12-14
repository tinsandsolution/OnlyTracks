import './PlaylistPage.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import * as playlistActions from "../../store/playlists"

import SongsOfPlaylist from './SongsOfPlaylist';
import AddSongToPlaylistModal from './AddSongToPlaylistModal';

import {useMusic} from '../../context/MusicContext'
import { Redirect, useParams, useHistory } from "react-router-dom";
import play from '../../assets/transparentplaybutton.png'

// todo: add a delete button to each song in the playlist
// todo: add an add song button to each playlist
// todo: add a delete playlist button to each playlist

// CREATE: Done

// READ:
// display songs from the playlist: done

// Update:
// delete song from playlist: done
// add song to playlist

// Delete:
// delete playlist entirely

// this function deletes the playlist and redirects you to the playlists page
function deletePlaylist(playlistId, history, dispatch) {
    dispatch(playlistActions.DeletePlaylist({playlistId}))
    history.push('/playlists')
}


function PlaylistPage(){
    const dispatch = useDispatch();
    const {setPlayerSong} = useMusic()
    const history = useHistory()
    let { playlistId } = useParams();

    const sessionUser = useSelector(state => state.session.user);

    const sessionUserId = useSelector((state) => state.session.user).id
    const playlists = useSelector((state) => state.playlists)
    const [playlist, setPlaylist] = useState(playlists.find(playlist => +playlist.id === +playlistId))

    useEffect(()=> {
        dispatch(playlistActions.getPlaylists());
    },[])

    useEffect(()=> {
        // const playlists = useSelector((state) => state.playlists)
        setPlaylist(playlists.find(playlist => +playlist.id === +playlistId))
    })

    // console.log(Date.now()-Date.parse(song.updatedAt))
    let timePhrase = (dateTimeString) => {
        let unixTime = Date.now()-Date.parse(dateTimeString)
        // console.log(Date(dateTimeString))

        if (unixTime >= 86400000) {
            let phrase = "day"
            let properUnit = (Math.round(unixTime / 86400000))
            if (properUnit >= 2) phrase = "days"
            return `${properUnit} ${phrase} ago`
        }
        else if (unixTime >= 3600000) {
            let phrase = "hour"
            let properUnit = (Math.round(unixTime / 3600000))
            if (properUnit >= 2) phrase = "hours"
            return `${properUnit} ${phrase} ago`
        }
        else if (unixTime >= 60000) {
            let phrase = "minute"
            let properUnit = (Math.round(unixTime / 60000))
            if (properUnit >= 2 * 60000) phrase = "minutes"
            return `${properUnit} ${phrase} ago`
        }
        else {
            return "Moments ago"
        }

    }

    if(!playlist) return (<></>)

    // console.log(timePhrase(song.updatedAt))
    // if (recency > 3600000)
    return (
        <div className="mass-container">
            <div className='song-page-container playlist-page-container'>
                <div className='song-page-left'>
                    <span className="song-page-title">{playlist.name}</span>
                    <AddSongToPlaylistModal playlistId={playlistId}/>
                    <br/>
                    <button className='create-playlist add-songs-to-playlist' onClick={() => deletePlaylist(playlistId, history, dispatch)}>Delete Playlist</button>
                    {/* <AddSongToPlaylistModal /> */}
                    {/* <span className="song-page-description">{song.description}</span> */}
                    {/* <div className='song-page-play-button' onClick={() => setPlayerSong(song.url)}>
                        <img src={play} alt="play" ></img>
                    </div> */}

                </div>

                {/* <p>{song.id}</p> */}
                {/* <p>{song.url}</p> */}
                <div className='song-page-right'>
                    <div className='song-page-time'>
                        {timePhrase(playlist.updatedAt)}
                    </div>
                    <img className='song-page-preview-image'
                        src={playlist.previewImage}
                        onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}
                        alt={playlist.name}
                        >
                    </img>
                </div>
            </div>
            <SongsOfPlaylist playlist={playlist}/>
        </div>
    )
}

export default PlaylistPage;
