import { csrfFetch } from './csrf';

// actions
const LOAD_PLAYLISTS = 'session/loadPlaylists'
const ADD_PLAYLIST = 'session/uploadPlaylist'
const REMOVE_PLAYLIST = "session/removePlaylist"

const loadPlaylists = (playlists) => {
  //you don't actually need to pass in songs but we'll keep it here because i'm lazy
    return {
      type: LOAD_PLAYLISTS,
      playlists
    }
  }

// const uploadPlaylist = (playlist) => {
//     return {
//       type: ADD_PLAYLIST,
//       playlist
//     }
// }

const removePlaylist = (playlistId) => {
  return {
    type: REMOVE_PLAYLIST,
    playlistId
  }
}

// reducers
const initialState = [];

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PLAYLISTS:
      // songs returns an entire thing describing what page you're on, etc etc
      // page:
      // size:
      // songs:
      // so what you want to do is basically just get the songs part of that
      // console.log(action.songs)
      // console.log("damn")
      // console.log("damn" ,{...action.songs.songs})
      // console.log({ ...state, ...action.songs.songs})
      return [...action.playlists.playlists];
    // case ADD_SONG:
    //   return { ...state, action}
    //   // console.log("asfddsafadsfasdfdasf")
    //   // console.log(state)
    //   return {...state, ...action.song}
    // case REMOVE_SONG:
    //   // console.log("here is the remove song", state)
    //   // console.log(action.songId)
    //   const newState = Object.values(state).filter(song => song.id !== action.songId)
    //   return {...newState}
    default:
      return state;
  }
};


// functions

export const getPlaylists = () => async (dispatch) => {

  const response = await csrfFetch("/api/playlists",{
    method: "GET"
  })

  const data = await response.json()
  // console.log("fasdfdasfasdfads", data)
  // console.log("printing song data")
  // console.log(data)
  dispatch(loadPlaylists(data))
  // console.log("test")
  return data
}

// AHHHHHH


// should be renamed to add song
// export const checkAlbum = async () => {
//   // get the current user
//   const response = await csrfFetch("/api/users/current", {
//     method: "GET"
//   });
//   const data = await response.json()
//   const userId = data.id

//   //figure out if the user has an album
//   const response2 = await csrfFetch("/api/albums")
//   const data2 = await response2.json()
//   // console.log(typeof data2.Albums)
//   const found = data2.Albums.find(album => album.userId === userId)
//   //console.log(found)
//   // console.log((found === undefined))
//   if (found) {
//     // console.log("blah")
//     return found.id
//   }
//   else if ((found === undefined)) {
//     const response3 = await csrfFetch("/api/albums", {
//       method: "POST",
//       body: JSON.stringify({
//         title : "Generic"
//       }),
//     })
//     const data3 = await response3.json()
//     // console.log(data3)
//     return data3.id
//   }
//     //if does, return album id
//     //if not, create an album
//       //then return album id
// }

export const addPlaylist = (playlistData) => async (dispatch) => {
    const {name, previewImage} = playlistData
    const response = await csrfFetch("/api/users/current", {
      method: "GET"
    });
    const data = await response.json()

    const userId = data.id


    const response2 = await csrfFetch(`/api/playlists/`, {
      method: "POST",
      body: JSON.stringify({
        name,
        userId,
        previewImage
      }),
    });

    const data2 = await response2.json();
    // console.log("trying to get all songs again")
    // console.log(response2)
    response2.playlistId = data2.id
    dispatch(getPlaylists())
    return response2;


    // const createdSong = await Song.create({
    //   userId: albumOwnerId,
    //   albumId: albumId,
    //   title: title,
    //   description: description,
    //   url: url,
    //   previewImage: previewImage,
    // })
  }

export const RemoveSongFromPlaylist = (data) => async (dispatch) => {
  const {songId, playlistId} = data
  // console.log("attempting to delete from songs.js")
  const response = await csrfFetch(`/api/playlists/${playlistId}/songs/${songId}`, {
    method: "DELETE",
  });
  dispatch(getPlaylists())
  return response;
}


//   export const deleteSong = (data) => async (dispatch) => {
//     const {songId} = data

//     // console.log("attempting to delete from songs.js")
//     const response = await csrfFetch(`/api/songs/${songId}`, {
//       method: "DELETE",
//     });

//     const data2 = await response.json();
//     // console.log("trying to get all songs again")
//     dispatch(removeSong(songId))// dispatch(loadSongs(data2))
//     //again you don't actually need to reload anything
//     return response;
//   }

//   export const editSong = (data) => async (dispatch) => {
//     // console.log("editSong")
//     const {title, description, file, previewImage, songId} = data
//     // console.log("editSong")
//     const url = file
//     const response = await csrfFetch(`/api/songs/${songId}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         title,
//         description,
//         url,
//         previewImage
//       }),
//     });

//     const data2 = await response.json();
//     // console.log("trying to get all songs again")
//     dispatch(getSongs())// dispatch(loadSongs(data2))
//     //again you don't actually need to reload anything
//     return response;
//   }
  export default playlistReducer;
