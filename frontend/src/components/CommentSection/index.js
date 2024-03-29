import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as commentActions from "../../store/comments"
// import { Redirect } from "react-router-dom";
import './CommentSection.css'
import CommentDelete from "./CommentDelete";

function CommentSection({ songId }) {
    // in this section we need to pass in the ID for the song.
    // not really sure how to do that
    //
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const sessionUserId = useSelector((state) => state.session.user).id
    const [comment, setComment] = useState("")
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(commentActions.getComments(songId)).then(() => setIsLoaded(true));
    }, [dispatch])

    const comments = useSelector(state => state.comments)
    // console.log(Object.values(comments)[0]["User"])

    let timePhrase = (dateTimeString) => {
        let unixTime = Date.now()-Date.parse(dateTimeString)
        // console.log(Date(dateTimeString))

        if (unixTime >= 86400000) {
            let phrase = "day"
            let properUnit = (Math.round(unixTime / 86400000))
            if (properUnit >= 2) phrase = "days"
            return `${properUnit} ${phrase} ago`
        }
        else if (unixTime >= 3600000) {
            let phrase = "hour"
            let properUnit = (Math.round(unixTime / 3600000))
            if (properUnit >= 2) phrase = "hours"
            return `${properUnit} ${phrase} ago`
        }
        else if (unixTime >= 60000) {
            let phrase = "minute"
            let properUnit = (Math.round(unixTime / 60000))
            if (properUnit >= 2 * 60000) phrase = "minutes"
            return `${properUnit} ${phrase} ago`
        }
        else {
            return "Moments ago"
        }

    }

    let currentComments = (
        <></>
    )
    if (isLoaded) {
        currentComments = Object.values(comments).map((comment, idx) => {
            let username = "Anonymous User"
            let pfp = "https://media.discordapp.net/attachments/1017492963720433868/1022637299189694524/women-queen-elizabeth-ii-wallpaper-preview.jpg"
            if (Object.values(comments)[idx]["User"] !== null) {
                username = Object.values(comments)[idx]["User"]["username"]
                pfp = Object.values(comments)[idx]["User"]["previewImage"]
            }
            // console.log(comment)
            return (
                <>
                    <div key={idx} className="individual-comment">

                        <div className="comment-left">
                            <div className="comment-pfp">
                                <img
                                    src={pfp}
                                >

                                </img>
                            </div>
                            <div className="comment-right">
                                <div className="comment-heading">
                                    <div className="comment-username">
                                        {username}
                                    </div>
                                    <div className="comment-delete-container">
                                        <span className="comment-date">
                                            {`${timePhrase(comment.updatedAt)} `}
                                        </span>
                                        {comment.userId === sessionUserId ?
                                            <CommentDelete className="comment-delete-button" commentId={comment.id} songId={comment.songId} /> :
                                            ""}
                                    </div>
                                </div>
                                <div className="comment-text">
                                    {comment.body}
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <div className="comment-delete-container">
                    {comment.userId === sessionUserId ?
                    <CommentDelete commentId={comment.id} songId={comment.songId}/> :
                    "" }
                </div> */}
                </>
            )
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("index.js", comment)
        dispatch(commentActions.addComment({ songId, comment }))
    }

    return (
        <div className="comment-section">
            <p>Join the peanut gallery!</p>
            <div className="posted-comments">
                {currentComments}
            </div>
            <form className="comment-form" onSubmit={handleSubmit}>
                What are your thoughts? (Please be gentle)
                <br />
                <br />
                <textarea
                    maxlength="250"
                    type="text"
                    placeholder="Please be polite!"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <br />
                {comment.length < 4 ? "" : <button className="send-comment-button" type="submit" disabled={comment.length < 4 ? true : false}>Send Comment</button>}

            </form>
        </div>
    )
}

export default CommentSection;
