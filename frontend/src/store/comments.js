import { csrfFetch } from './csrf';

// actions
const LOAD_COMMENTS = 'session/loadComments'
// const ADD_SONG = 'session/uploadSong'
// const EDIT_SONG= 'session/editSong'

const loadComments = (comments) => {
  //you don't actually need to pass in songs but we'll keep it here because i'm lazy
    return {
      type: LOAD_COMMENTS,
      comments
    }
  }

// const uploadSong = (song) => {
//     return {
//       type: ADD_SONG,
//       song
//     }
// }


// reducers
const initialState = [];

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      // songs returns an entire thing describing what page you're on, etc etc
      // page:
      // size:
      // songs:
      // so what you want to do is basically just get the songs part of that
      // console.log(action.songs)
      return {...action.comments};
    // case ADD_SONG:
    //   return { ...state, action}
    //   // console.log("asfddsafadsfasdfdasf")
    //   // console.log(state)
    //   return state
    default:
      return state;
  }
};


// functions

// export const getSongs = () => async (dispatch) => {

//   const response = await csrfFetch("/api/songs",{
//     method: "GET"
//   })

//   const data = await response.json()
//   // console.log("printing song data")
//   // console.log(data)
//   dispatch(loadSongs(data))
//   // console.log("test")
//   return data
// }

// // AHHHHHH

export const getComments = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`,{
        method: "GET"
    });
    const data = await response.json()
    console.log(data)
    dispatch(loadComments(data))

}

export const addComment = ({songId, comment}) => async (dispatch) => {
  // console.log("addcoment section", comment)
  // console.log("fasdfdsafsd",songId)
  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: comment
      }),
  })
  const data = await response.json()
  dispatch(getComments(songId))
}

export const deleteComment = ({songId, commentId}) => async (dispatch) => {
  // console.log("addcoment section", comment)
  // console.log("fasdfdsafsd",songId)
  const response = await csrfFetch(`/api/comments/${commentId}`, {
      method: "DELETE",
  })
  const data = await response.json()
  dispatch(getComments(songId))
}

// // should be renamed to add song
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

// export const addSong = (user) => async (dispatch) => {
//     const {title, description, file, previewImage} = user
//     const response = await csrfFetch("/api/users/current", {
//       method: "GET"
//     });
//     const data = await response.json()

//     const userId = data.id
//     const albumId = 1
//     const url = file
//     const response2 = await csrfFetch(`/api/albums/1`, {
//       method: "POST",
//       body: JSON.stringify({
//         albumId,
//         title,
//         description,
//         url,
//         previewImage
//       }),
//     });

//     const data2 = await response2.json();
//     dispatch(uploadSong(data2))
//     // console.log("now here's the data2 from heeere", data2)
//     // console.log(typeof response2)
//     response2["musicdata"] = data2
//     // console.log("here is data2", data2)
//     //again you don't actually need to reload anything
//     return response2;


//     // const createdSong = await Song.create({
//     //   userId: albumOwnerId,
//     //   albumId: albumId,
//     //   title: title,
//     //   description: description,
//     //   url: url,
//     //   previewImage: previewImage,
//     // })
//   }

//   export const deleteSong = (data) => async (dispatch) => {
//     const {songId} = data

//     const response = await csrfFetch(`/api/songs/${songId}`, {
//       method: "DELETE",
//     });

//     const data2 = await response.json();
//     // console.log("trying to get all songs again")
//     dispatch(getSongs())// dispatch(loadSongs(data2))
//     //again you don't actually need to reload anything
//     return response;
//   }

//   export const editSong = (data) => async (dispatch) => {
//     console.log("editSong")
//     const {title, description, file, previewImage, songId} = data
//     console.log("editSong")
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
export default commentReducer;
