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

    const electronicSongs = songs.filter(song => song.albumId === 3 )
    // console.log(electronicSongs)
    const fiddleSongs = songs.filter(song => song.albumId === 4 )
    // console.log(fiddleSongs)
    const bluesSongs = songs.filter(song => song.albumId === 5 )
    // console.log(bluesSongs)
    const otherSongs = songs.filter(song => song.albumId !== 3 && song.albumId !==4 && song.albumId !==5)

    // const electronicCards = electronicSongs.map(song => {
    //     return (
    //         <div className="homepage-preview-card"
    //              key={song.id}>
    //             <div className="hover-thing-card">
    //                 <img className="splash-preview-image"
    //                      src={song.previewImage}
    //                      alt={song.title}
    //                      onClick={() => setPlayerSong(song.url)}
    //                      >
    //                 </img>
    //                 {/* <div className="play-button">▶️</div> */}
    //             </div>
    //             <div className="homepage-card-song-title">
    //                 <NavLink className="homepage-card-song-title" to={"/songs/"+song.id}>{song.title}</NavLink>
    //             </div>
    //             {/* so uh, we never got around to making artists for this because a user is an artist. */}
    //             {/* maybe a workaround could be to seed more artists? */}
    //             <div className="homepage-song-description">{song.description}</div>
    //         </div>
    //     )
    // })

    const makeSongs = (songArray) => songArray.map(song => {
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

    const fiddleCards = makeSongs(fiddleSongs)
    const electronicCards = makeSongs(electronicSongs)
    const bluesCards = makeSongs(bluesSongs)
    const otherCards = makeSongs(otherSongs)
    return (
        <>
        <div className='homepage-container'>
            <div className='homepage-playlist-name'>Latest New Tracks</div>
            <div className='homepage-playlist-desc'>Look at you, you're just like Missy Elliot</div>
            <div className="homepage-song-container">
                {otherCards}
            </div>

            <div className='homepage-playlist-name'>Blues!</div>
            <div className='homepage-playlist-desc'>Oh that's nice</div>
            <div className="homepage-song-container">
                {bluesCards}
            </div>

            <div className='homepage-playlist-name'>Fiddle Music!</div>
            <div className='homepage-playlist-desc'>The Devil Went Down To Georgia and you went down to OnlyTracks</div>
            <div className="homepage-song-container">
                {fiddleCards}
            </div>

            <div className='homepage-playlist-name'>Electronic Music That's Less Than A Minute</div>
            <div className='homepage-playlist-desc'>Great for when you're in a rush or hate electronic music</div>
            <div className="homepage-song-container">
                {electronicCards}
            </div>
        </div>
        </>
    )
}

export default HomePage;
