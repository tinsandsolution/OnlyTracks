import { connect, useSelector } from "react-redux"
import { useLocation, withRouter, NavLink } from "react-router-dom"
// import { showOdds, showSearchPrices } from "../../utils/showPrices"
import './Search.css'
import {useMusic} from '../../context/MusicContext'


const filterSongs = (terms, songs) => {

    terms = terms.map(term => term.toLowerCase())

    return Object.values(songs).filter(song => {
        for (let term of terms) {
            let nonalpha = /[^A-Za-z0-9]/g
            let songWords = [...song.description.split(" "),...song.title.split(" ")]
            songWords = songWords.map(songWord => songWord.replace(nonalpha, "").toLowerCase())
            console.log(songWords)
            if (songWords.includes(term)) return true
        }
        return false
    })
}

const makeSongs = (songArray) => songArray.map(song => {
    const {setPlayerSong} = useMusic()
    return (
        <div className="homepage-preview-card"
             key={song.id}>
            <div className="hover-thing-card">
                <img className="homepage-preview-image"
                     src={song.previewImage}
                     alt={song.title}
                     onClick={() => setPlayerSong(song.url)}
                     >
                </img>
                {/* <div className="play-button">▶️</div> */}
            </div>
            <div className="homepage-card-song-title">
                <NavLink className="homepage-card-song-title" to={"/songs/"+song.id}>{song.title}</NavLink>
            </div>
            {/* so uh, we never got around to making artists for this because a user is an artist. */}
            {/* maybe a workaround could be to seed more artists? */}
            <div className="homepage-song-description">{song.description}</div>
        </div>
    )
})

const Search = () => {
    let songs = useSelector((state) => state.songs)
    const { search } = useLocation();
    const raw = String(new URLSearchParams(search)).slice(2)
    const terms = raw.split("+")


    const filteredSongs = filterSongs(terms, songs)
    console.log(filteredSongs)
    return (
        <div className="search-results">
        {filteredSongs.length === 0 ? <div className="no-results">No results found</div> : makeSongs(filteredSongs)}
        </div>

    )
}

export default withRouter(connect()(Search))
