import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css'
// import { Redirect } from "react-router-dom";


function OnlyPlayer(){
    return (
        <AudioPlayer
        // autoPlay
        className="music-player"
        src="https://cdn.discordapp.com/attachments/1017492963720433868/1021868528242003968/Speak_Of_The_Bass.mp3"
        onPlay={e => console.log("onPlay")}
        // other props here
      />
    )
}

export default OnlyPlayer;
