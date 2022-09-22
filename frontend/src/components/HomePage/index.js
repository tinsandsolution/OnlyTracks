import './HomePage.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import {useMusic} from '../../context/MusicContext'
import { NavLink } from "react-router-dom";

const badTracks = [
    "Last Great American Dynasty",
    "Look What You Made Me Do",
    "Call Me Maybe",
    // "test",
    "test2",
    "test3",
    "33sfsdfa234",
    "33sfsdfa234df",
    "testdfsf",
    "testsafasd",
    "testsetsfdsf",
    "ghfhdfhfdhdgfh"
]
function HomePage(){
    const dispatch = useDispatch();
    const {setPlayerSong} = useMusic()

    useEffect(()=> {
        dispatch(songActions.getSongs());
    },[dispatch])

    const songs = Object.values(useSelector(state => state.songs)).filter((song)=>{
        return !badTracks.includes(song.title)
    })

    const cards = songs.map(song => {
        return (
            <div className="homepage-preview-card"
                 key={song.id}>
                <div className="hover-thing-card">
                    <img className="splash-preview-image"
                         src={song.previewImage}
                         alt={song.title}
                         onClick={() => setPlayerSong(song.url)}
                         >
                    </img>
                    {/* <div className="play-button">▶️</div> */}
                </div>
                <div className="homepage-card-song-title">
                    <NavLink className="homepage-card-song-title" to={"/songs/"+song.id}>{song.title}</NavLink>
                </div>
                {/* so uh, we never got around to making artists for this because a user is an artist. */}
                {/* maybe a workaround could be to seed more artists? */}
                <div className="homepage-song-description">{song.description}</div>
            </div>
        )
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
