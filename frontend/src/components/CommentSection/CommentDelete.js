import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory} from "react-router-dom";
import * as commentActions from "../../store/comments";

function CommentDelete({commentId, songId}) {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        // setErrors([]);
        // let updatedSong = await dispatch(songActions.editSong({title, description, file, previewImage, songId}))
        // // console.log("fasdfasd" , updatedSong)
        // // console.log("fasdfdsafasdsa" , updatedSong.statusText)
        // if (updatedSong.statusText === "OK") {
        //   // console.log("happening")
        //   setShowModal(false)
        //   //console.log("happening")
        // }
        dispatch(commentActions.deleteComment({commentId, songId}))
        // console.log("attempting to delete")
        // history.push("/")
     }
    return (
        <button className="comment-delete-button" type="delete" onClick={handleDelete}>Delete Comment</button>
    )
}

export default CommentDelete;
