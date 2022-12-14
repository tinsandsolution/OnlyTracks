import './Playlists.css'
import { useSelector } from 'react-redux'
import * as playlistActions from "../../store/playlists"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PlaylistCreateFormModal from './PlaylistCreateModal'
const Playlists = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(playlistActions.getPlaylists());

    },[dispatch])

    const playlists = useSelector((state) => state.playlists)
    const sessionUser = useSelector(state => state.session.user);


    const currentUserPlaylists = playlists.filter((playlist) => playlist.userId === sessionUser.id)
    const otherUserPlaylists = playlists.filter((playlist) => playlist.userId !== sessionUser.id)


    return (
        <div className="homepage-container">
            <span className='your-playlists-wrapper'>
                <h1>Your Playlists</h1>
                <PlaylistCreateFormModal/>
            </span>
            <div className="playlists-container">
                {currentUserPlaylists.map
                  ((playlist) =>
                    {
                        return (
                            <div className="playlist-card" key={playlist.id}>
                                <div className="hover-thing-card">
                                    <img className="homepage-preview-image playlist-preview-image"
                                        src={playlist.previewImage}
                                        alt={playlist.title}
                                        onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}
                                        // onClick={() => setPlayerSong(song.url)}
                                        >
                                    </img>
                                    {/* <div className="play-button">▶️</div> */}
                                </div>
                                <div className="homepage-card-song-title">
                                    <NavLink className="homepage-card-song-title" to={"/playlists/"+playlist.id}>{playlist.name}</NavLink>
                                </div>
                            </div>
                        )
                    }
                  )
                }
            </div>
            <h1>Other Users' Playlists</h1>
            <div className="playlists-container">
                {otherUserPlaylists.map
                  ((playlist) =>
                    {
                        return (
                            <div className="playlist-card" key={playlist.id}>
                                <div className="hover-thing-card">
                                    <img className="homepage-preview-image playlist-preview-image"
                                        src={playlist.previewImage}
                                        alt={playlist.title}
                                        onError={e => { e.currentTarget.src = "https://i.imgur.com/v4C8Lvf.png"; }}
                                        // onClick={() => setPlayerSong(song.url)}
                                        >
                                    </img>
                                    {/* <div className="play-button">▶️</div> */}
                                </div>
                                <div className="homepage-card-song-title">
                                    <NavLink className="homepage-card-song-title" to={"/playlists/"+playlist.id}>{playlist.name}</NavLink>
                                </div>
                            </div>
                        )
                    }
                  )
                }
            </div>

        </div>

    )
}

export default Playlists
