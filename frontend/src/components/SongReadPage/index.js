import './SongReadPage.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

// import { Redirect } from "react-router-dom";

function SongReadPage(){
    console.log("dddddd")
    const dispatch = useDispatch();

    //const data = "sdad"
    //const data = dispatch(sessionActions.showSongs({}))
    console.log("done with dispatch")
    return (
        <>
        <p>dasdasd</p>
        </>
    )
}

export default SongReadPage;
