import './SongPage.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import {useMusic} from '../../context/MusicContext'
import { Redirect, useParams, useHistory } from "react-router-dom";
import SongManageModal from "../SongManageModal"
import CommentSection from '../CommentSection';
function SongPage(){
    const dispatch = useDispatch();
    const {setPlayerSong} = useMusic()
    const history = useHistory()
    let { songId } = useParams();
    console.log("this hits")
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) history.push("/")

    const sessionUserId = useSelector((state) => state.session.user).id
    const songs = Object.values(useSelector(state => state.songs))//.find(song => song.id === songId)
    const [song, setSong] = useState(songs.find(song => +song.id === +songId))

    //console.log(sessionUserId)

    // console.log("id", songId)
    useEffect(()=> {
        dispatch(songActions.getSongs());
    },[])

    useEffect(()=> {
        // const songs = Object.values(useSelector(state => state.songs))
        setSong(songs.find(song => +song.id === +songId))
    })
    console.log(sessionUserId, song.userId)
    // const song = songs.find(song => +song.id === +songId)
    //console.log(song[0])
    // console.log(song)
    //console.log("hey")
    // songActions.checkAlbum()
    console.log(song)
    return (
        <div className='mass-container'>
        {/* <p>{song.id}</p> */}
        <p>{song.title}</p>
        <p>{song.description}</p>
        <p>{song.url}</p>
        <p>{song.previewImage}</p>
        <p></p>
        {sessionUserId === song.userId && <SongManageModal song={song} setSong={setSong}/>}
        {/* {<SongManageModal song={song}/>} */}
        <CommentSection songId={+songId}/>
        </div>
    )
}

export default SongPage;
