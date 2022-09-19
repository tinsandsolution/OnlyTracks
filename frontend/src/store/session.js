// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

// signup
export const signup = (user) => async (dispatch) => {
    const { username, email, password, firstName, lastName, previewImage } = user;
    const response = await csrfFetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        lastName,
        previewImage
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

//logout
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

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


export default sessionReducer;
