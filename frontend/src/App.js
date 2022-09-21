import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import * as songActions from "./store/songs"
import Navigation from "./components/Navigation";
import SongSubmitPage from "./components/SongSubmitPage";
import SongReadPage from "./components/SongReadPage"
import OnlyPlayer from "./components/AudioPlayer"
import HomePage from "./components/HomePage";
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
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/upload">
            <SongSubmitPage />
          </Route>
          <Route path="/catalog">
            <SongReadPage />
          </Route>
        </Switch>

      )}
      {sessionUser && (<HomePage />)}
      <OnlyPlayer />
      <div className="blank-space-for-player"></div>
    </>
  );
}

export default App;
