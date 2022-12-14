// boilerplate code for a react component
// import React, { useState } from 'react';
// import { Modal } from '../../../context/Modal';
import { useSelector } from "react-redux";
import { useMusic } from "../../context/MusicContext";
import { NavLink } from "react-router-dom";
import RemoveSongFromPlaylist from "./SongRemoveFromPlaylist";

function SongsOfPlaylist({playlist}) {
    // grabs songs from the redux store under the key 'songs'
    const {setPlayerSong} = useMusic()
    console.log(playlist.Songs)
    return (
        <div className='songs-of-playlist'>
            {playlist.Songs.map(song => {
                return (
                    <div className="homepage-preview-card"
                        key={song.id}>
                        <div className="hover-thing-card">
                            <img className="playlist-preview-image"
                                src={song.previewImage}
                                alt={song.title}
                                onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}
                                onClick={() => setPlayerSong(song.url)}
                                >
                            </img>
                            {/* <div className="play-button">▶️</div> */}
                        </div>
                        <div className="homepage-card-song-title">
                            <NavLink className="homepage-card-song-title" to={"/songs/"+song.id}>{song.title}</NavLink>
                        </div>
                        <RemoveSongFromPlaylist playlistId={playlist.id} songId={song.id}/>
                    </div>
                )
                })}
        </div>
    )
}

export default SongsOfPlaylist;
