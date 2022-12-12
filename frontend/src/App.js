import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import * as songActions from "./store/songs"
import Navigation from "./components/Navigation";
import OnlyPlayer from "./components/AudioPlayer"
import HomePage from "./components/HomePage";
import SongPage from "./components/SongPage";
import Search from './components/Search/Search';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/search/">
            <Search />
          </Route>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            {sessionUser && <HomePage />}
          </Route>
          {/* <Route path="/upload">
            <SongSubmitPage />
          </Route> */}
          <Route path="/songs/:songId">
            <SongPage />
          </Route>
          {/* <Route path="/catalog">
            <SongReadPage />
          </Route> */}
        </Switch>

      )}
      {/* {sessionUser && (<HomePage />)} */}
      <OnlyPlayer />
      <div className="blank-space-for-player"></div>
    </>
  );
}

export default App;
