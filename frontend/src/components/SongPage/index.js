import './SongPage.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import {useMusic} from '../../context/MusicContext'
// import { Redirect } from "react-router-dom";

function SongPage(){
    const dispatch = useDispatch();
    const {setPlayerSong} = useMusic()
    useEffect(()=> {
        dispatch(songActions.getSongs());
    },[dispatch])

    const songs = Object.values(useSelector(state => state.songs)).filter((song)=>{
        return !badTracks.includes(song.title)
    })

    return (
        <>
        <div className='homepage-container'>
            <div className='homepage-playlist-name'>Electronic Music That's Less Than A Minute</div>
            <div className='homepage-playlist-desc'>Great for when you're in a rush or hate electronic music</div>
            <div className="homepage-song-container">
                {cards}
            </div>
        </div>
        </>
    )
}

export default HomePage;
