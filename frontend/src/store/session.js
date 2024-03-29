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
  // console.log( credential, password )
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
    // console.log("well, at least we got here")
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
    // console.log("test")
    //console.log(response.json())
    // console.log("well, at least wde got the response")
    const data = await response.json();
    // console.log("here is the response", data)
    if(!data.errors) dispatch(setUser(data.user));
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

export default sessionReducer;
