import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory} from "react-router-dom";
import * as playlistActions from "../../../store/playlists";

function RemoveSongFromPlaylist({playlistId, songId}) {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        // dispatch(commentActions.deleteComment({playlistId, songId}))
     }
    return (
        <button className="comment-delete-button" type="delete" onClick={handleDelete}>Remove Song</button>
    )
}

export default RemoveSongFromPlaylist;
