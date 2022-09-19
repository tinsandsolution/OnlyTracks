//import { csrfFetch } from './csrf';

let songs = {"test" : "test"}


//action part
const LOAD_SONGS = 'dog';

export const loadSongs = () => {
  return {
    type: LOAD_SONGS,
    songs
  };
};



//reducer part
const initialState = { entries: [], isLoading: true };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS:
      return { ...state, entries: [...action.songs] };
    default:
      return state;
  }
};

export default songReducer;
