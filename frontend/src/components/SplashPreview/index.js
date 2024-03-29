import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"

import './SplashPreview.css'
import {useMusic} from '../../context/MusicContext'
// import { Redirect } from "react-router-dom";


function SongSplashPreview(){
    const dispatch = useDispatch();
    const {setPlayerSong} = useMusic()
    useEffect(()=> {
        dispatch(songActions.getSongs());
    },[dispatch])


    // const songs = Object.values(useSelector(state => state.songs)).map(song => <li>{song.title}</li>)
    const songs = Object.values(useSelector(state => state.songs)).filter(song => song.albumId === 3)
    const cards = songs.map(song => {
        return (
            <div className="splash-preview-card"
                 key={song.id}
            >
                <div className="hover-thing-card">
                    <img className="splash-preview-image"
                         src={song.previewImage}
                         alt={song.title}
                         onClick={() => setPlayerSong(song.url)}
                         >
                    </img>
                    {/* <div className="play-button">▶️</div> */}
                </div>
                <div className="splash-song-title">{song.title}</div>
                {/* so uh, we never got around to making artists for this because a user is an artist. */}
                {/* maybe a workaround could be to seed more artists? */}
                <div className="splash-song-description">{song.description === "" || song.description === null ? "Lorem Ipsum" : song.description }</div>
            </div>
        )
    })
    // console.log(songs)

    return (
        <>
        <div className="splash-preview-container">
            {cards}
        </div>
        </>
    )
}

export default SongSplashPreview;
