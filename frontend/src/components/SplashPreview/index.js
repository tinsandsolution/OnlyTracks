import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import './SplashPreview.css'
// import { Redirect } from "react-router-dom";


function SongSplashPreview(){
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(songActions.getSongs());
    },[dispatch])

    // const songs = Object.values(useSelector(state => state.songs)).map(song => <li>{song.title}</li>)
    const songs = Object.values(useSelector(state => state.songs)).filter(song => song.albumId === 3)
    const cards = songs.map(song => {
        return (
            <div className="splash-preview-card">
                <img src={song.previewImage}></img>
                <div className="splash-song-title">{song.title}</div>
                {/* so uh, we never got around to making artists for this because a user can equal an artist. */}
                {/* maybe a workaround could be to seed more artists? */}
                <div className="splash-song-description">{song.description} Lorem Ipsum</div>
            </div>
        )
    })
    console.log(songs)

    return (
        <>
        <ul className="splash-preview-container">
            {cards}
        </ul>
        </>
    )
}

export default SongSplashPreview;
