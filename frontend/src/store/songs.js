import { csrfFetch } from './csrf';

// actions
const LOAD_SONGS = 'session/loadSongs'

const loadSongs = (songs) => {
    return {
      type: LOAD_SONGS,
      songs
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
      return { ...state, ...action.songs.songs};
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
  console.log("printing song data")
  console.log(data)
  dispatch(loadSongs(data))
  // console.log("test")
  return data
}

// AHHHHHH


// should be renamed to add song
export const addSong = async (user) => {
    const {title, description, file, previewImage} = user
    const response = await csrfFetch("/api/users/current", {
      method: "GET"
    });
    const data = await response.json()

    const userId = data.id
    const albumId = 1
    const url = file
    const response2 = await csrfFetch("/api/albums/1", {
      method: "POST",
      body: JSON.stringify({
        albumId,
        title,
        description,
        url,
        previewImage
      }),
    });
    //const data2 = await response2.json();
    //dispatch(setUser(data.user));
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

  export default songReducer;
