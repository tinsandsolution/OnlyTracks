import './SongReadPage.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs"
// import { Redirect } from "react-router-dom";

function SongReadPage(){
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(songActions.getSongs());
    },[dispatch])

    const songs = Object.values(useSelector(state => state.songs)).map(song => <li>{song.title}</li>)

    console.log("printing songs")
    console.log(songs)

    return (
        <>
        <p>dasdasd</p>
        <ul>
            {songs}
        </ul>
        </>
    )
}

export default SongReadPage;
