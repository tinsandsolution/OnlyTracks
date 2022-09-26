import './SongPage.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import {useMusic} from '../../context/MusicContext'
import { Redirect, useParams, useHistory } from "react-router-dom";
import SongManageModal from "../SongManageModal"
import CommentSection from '../CommentSection';
import play from '../../assets/transparentplaybutton.png'

function SongPage(){
    const dispatch = useDispatch();
    const {setPlayerSong} = useMusic()
    const history = useHistory()
    let { songId } = useParams();
    // console.log("this hits")
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) history.push("/")

    const sessionUserId = useSelector((state) => state.session.user).id
    const songs = Object.values(useSelector(state => state.songs))//.find(song => song.id === songId)
    const [song, setSong] = useState(songs.find(song => +song.id === +songId))
    // setPlayerSong(song.url)
    useEffect(()=> {
        dispatch(songActions.getSongs());
    },[])

    useEffect(()=> {
        // const songs = Object.values(useSelector(state => state.songs))
        setSong(songs.find(song => +song.id === +songId))
    })
    // console.log(Date.now()-Date.parse(song.updatedAt))
    let timePhrase = (dateTimeString) => {
        let unixTime = Date.now()-Date.parse(dateTimeString)
        // console.log(Date(dateTimeString))

        if (unixTime >= 86400000) {
            let phrase = "day"
            if (unixTime >= 2 * 86400000) phrase = "days"
            let properUnit = (Math.round(unixTime / 86400000))
            return `${properUnit} ${phrase} ago`
        }
        else if (unixTime >= 3600000) {
            let phrase = "hour"
            if (unixTime >= 2 * 3600000) phrase = "hours"
            let properUnit = (Math.round(unixTime / 3600000))
            return `${properUnit} ${phrase} ago`
        }
        else if (unixTime >= 60000) {
            let phrase = "minute"
            if (unixTime >= 2 * 60000) phrase = "minutes"
            let properUnit = (Math.round(unixTime / 60000))
            return `${properUnit} ${phrase} ago`
        }
        else {
            return "Moments ago"
        }

    }

    if(!song) return (<></>)

    // console.log(timePhrase(song.updatedAt))
    // if (recency > 3600000)
    return (
        <div className="mass-container">
            <div className='song-page-container'>
                <div className='song-page-left'>
                    <span className="song-page-title">{song.title}</span>
                    <span className="song-page-description">{song.description}</span>
                    <div className='song-page-play-button' onClick={() => setPlayerSong(song.url)}>
                        <img src={play} alt="play" ></img>
                    </div>

                </div>

                {/* <p>{song.id}</p> */}
                {/* <p>{song.url}</p> */}
                <div className='song-page-right'>
                    <div className='song-page-time'>
                        {timePhrase(song.updatedAt)}
                    </div>
                    <img className='song-page-preview-image'
                        src={song.previewImage}
                        alt={song.title}
                        >
                    </img>
                </div>
            </div>
            {sessionUserId === song.userId && <SongManageModal song={song} setSong={setSong}/>}
            <CommentSection songId={+songId}/>
        </div>
    )
}

export default SongPage;
