// ignore this for now

//import { csrfFetch } from './csrf';

// let songs = {"test" : "test"}


// //action part
// const LOAD_SONGS = 'dog';

// export const loadSongs = () => {
//   return {
//     type: LOAD_SONGS,
//     songs
//   };
// };



// //reducer part
// const initialState = { entries: [], isLoading: true };

// const songReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_SONGS:
//       return { ...state, entries: [...action.songs] };
//     default:
//       return state;
//   }
// };

// export default songReducer;


// AHHHHHH

const LOAD_SONGS = 'session/loadSongs'

const loadSongs = (songs) => {
    return {
      type: LOAD_SONGS,
      songs
    }
  }

//should be renamed to add song
export const testCase = async (user) => {
    console.log(user)
    console.log("fasdfasdf")
    const {title, description, file, previewImage} = user
    console.log(title)
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

  export const getSongs = async () => {

    const response = await csrfFetch("/api/songs",{
      method: "GET"
    })

    const data = await response.json()
    console.log(data)
    return data
  }
