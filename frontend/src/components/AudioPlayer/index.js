import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css'
import {useMusic} from '../../context/MusicContext'
// import { Redirect } from "react-router-dom";


function OnlyPlayer(){
    const {playerSong} = useMusic()
    // const rickRoll = "https://cdn.discordapp.com/attachments/1017492963720433868/1021902188315934780/Never_Gonna_Give_You_Up_Original.mp3"
    return (
        <AudioPlayer
        // autoPlay
        className="music-player"
        src={playerSong === "" ?
            "https://cdn.discordapp.com/attachments/1017492963720433868/1021902188315934780/Never_Gonna_Give_You_Up_Original.mp3":
            playerSong
            }
        showJumpControls={false}
        // showSkipControls="false"
        // onPlay={e => console.log("onPlay")}
        // other props here
      />
    )
}

export default OnlyPlayer;
