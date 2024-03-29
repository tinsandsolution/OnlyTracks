import { csrfFetch } from './csrf';

// actions
const LOAD_SONGS = 'session/loadSongs'
const ADD_SONG = 'session/uploadSong'
const EDIT_SONG= 'session/editSong'
const REMOVE_SONG = "session/removeSong"

const loadSongs = (songs) => {
  //you don't actually need to pass in songs but we'll keep it here because i'm lazy
    return {
      type: LOAD_SONGS,
      songs
    }
  }

const uploadSong = (song) => {
    return {
      type: ADD_SONG,
      song
    }
}

const removeSong = (songId) => {
  return {
    type: REMOVE_SONG,
    songId
  }
}

// reducers
const initialState = [];

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS:
      // songs returns an entire thing describing what page you're on, etc etc
      // page:
      // size:
      // songs:
      // so what you want to do is basically just get the songs part of that
      // console.log(action.songs)
      // console.log("damn")
      // console.log("damn" ,{...action.songs.songs})
      // console.log({ ...state, ...action.songs.songs})
      return {...action.songs.songs};
    case ADD_SONG:
      return { ...state, action}
      // console.log("asfddsafadsfasdfdasf")
      // console.log(state)
      return {...state, ...action.song}
    case REMOVE_SONG:
      // console.log("here is the remove song", state)
      // console.log(action.songId)
      const newState = Object.values(state).filter(song => song.id !== action.songId)
      return {...newState}
    default:
      return state;
  }
};


// functions

export const getSongs = () => async (dispatch) => {

  const response = await csrfFetch("/api/songs",{
    method: "GET"
  })

  const data = await response.json()
  // console.log("fasdfdasfasdfads", data)
  // console.log("printing song data")
  // console.log(data)
  dispatch(loadSongs(data))
  // console.log("test")
  return data
}

// AHHHHHH


// should be renamed to add song
export const checkAlbum = async () => {
  // get the current user
  const response = await csrfFetch("/api/users/current", {
    method: "GET"
  });
  const data = await response.json()
  const userId = data.id

  //figure out if the user has an album
  const response2 = await csrfFetch("/api/albums")
  const data2 = await response2.json()
  // console.log(typeof data2.Albums)
  const found = data2.Albums.find(album => album.userId === userId)
  //console.log(found)
  // console.log((found === undefined))
  if (found) {
    // console.log("blah")
    return found.id
  }
  else if ((found === undefined)) {
    const response3 = await csrfFetch("/api/albums", {
      method: "POST",
      body: JSON.stringify({
        title : "Generic"
      }),
    })
    const data3 = await response3.json()
    // console.log(data3)
    return data3.id
  }
    //if does, return album id
    //if not, create an album
      //then return album id
}

export const addSong = (user) => async (dispatch) => {
    const {title, description, file, previewImage} = user
    const response = await csrfFetch("/api/users/current", {
      method: "GET"
    });
    const data = await response.json()

    const userId = data.id
    // console.log("current user id", data.id)
    const albumId = 1
    const url = file
    const response2 = await csrfFetch(`/api/albums/1`, {
      method: "POST",
      body: JSON.stringify({
        albumId,
        title,
        description,
        url,
        userId,
        previewImage
      }),
    });

    const data2 = await response2.json();
    // console.log("fadsfasdf", data2)
    dispatch(uploadSong(data2))
    response2.songId = data2.id
    // console.log(data2)
    // console.log("here is data2", data2)
    //again you don't actually need to reload anything
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

  export const deleteSong = (data) => async (dispatch) => {
    const {songId} = data

    // console.log("attempting to delete from songs.js")
    const response = await csrfFetch(`/api/songs/${songId}`, {
      method: "DELETE",
    });

    const data2 = await response.json();
    // console.log("trying to get all songs again")
    dispatch(removeSong(songId))// dispatch(loadSongs(data2))
    //again you don't actually need to reload anything
    return response;
  }

  export const editSong = (data) => async (dispatch) => {
    // console.log("editSong")
    const {title, description, file, previewImage, songId} = data
    // console.log("editSong")
    const url = file
    const response = await csrfFetch(`/api/songs/${songId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
        url,
        previewImage
      }),
    });

    const data2 = await response.json();
    // console.log("trying to get all songs again")
    dispatch(getSongs())// dispatch(loadSongs(data2))
    //again you don't actually need to reload anything
    return response;
  }
  export default songReducer;
