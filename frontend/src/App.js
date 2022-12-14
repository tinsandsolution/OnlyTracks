import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as songActions from "./store/songs"
import Navigation from "./components/Navigation";
import OnlyPlayer from "./components/AudioPlayer"
import HomePage from "./components/HomePage";
import SongPage from "./components/SongPage";
import Search from './components/Search/Search';
import Playlists from "./components/Playlists";
import SinglePlaylist from "./components/SinglePlaylistPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(songActions.getSongs())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/search/">
            <Search />
          </Route>
          <Route path="/playlists/:playlistId">
            <SinglePlaylist />
          </Route>
          <Route path="/playlists">
            <Playlists />
          </Route>
          <Route exact path="/">
            {sessionUser && <HomePage />}
          </Route>
          <Route path="/songs/:songId">
            <SongPage />
          </Route>
        </Switch>

      )}
      {/* {sessionUser && (<HomePage />)} */}
      <OnlyPlayer />
      <div className="blank-space-for-player"></div>
    </>
  );
}

export default App;
