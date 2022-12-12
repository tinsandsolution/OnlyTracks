import './Playlists.css'
import { useSelector } from 'react-redux'


const Playlists = () => {
    // let playlists = useSelector((state) => state.songs)

    return (
        <div className="homepage-container">
            <h1>Your Playlists</h1>
            <div className="playlists-container"></div>
            <h1>Users' Playlists</h1>
            <div className="playlists-container"></div>
        </div>

    )
}

export default Playlists
