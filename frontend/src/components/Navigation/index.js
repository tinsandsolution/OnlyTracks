import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import splash from '../../assets/robots-dancing-2.png'
import logo from '../../assets/running-track-inverted-color.png'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SongSubmitModal from '../SongSubmitModal';
import SongSplashPreview from '../SplashPreview';
import { useLocation } from "react-router-dom"
import Searchbar from './Searchbar';


function Navigation({ isLoaded }){
  const location = useLocation();

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  let splashStuff;
  let navLeft
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-right-side'>
      {/* <NavLink exact to="/upload" className="reg-nav-link">Upload</NavLink> */}
      <SongSubmitModal />
      <ProfileButton user={sessionUser} />
      </div>
    );
    navLeft = (
      <>
      <NavLink exact to="/" className="reg-nav-link">Home</NavLink>
      <NavLink exact to="/playlists" className="reg-nav-link">Playlists</NavLink>
      <Searchbar />
      {/* <NavLink exact to="/catalog" className="reg-nav-link">Library</NavLink> */}
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div className="not-logged-in">
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </>
    );
    splashStuff = (
      <div className='splash'>
        {sessionUser ? '' : <img src={splash} alt="splash" id='splash-image'></img>}
        <p className='splash-welcome'>Check Out Our Selection Of Legal Music!</p>
        <span id='splash-upload'><LoginFormModal isSplash="true"/></span>
        <SongSplashPreview />
        <p></p>
      </div>
    )
  }

  // const splasha = (<img src={splash} alt="splash"></img>)
  // console.log(location.pathname)
  if (location.pathname !== "/") splashStuff = (<></>)
  return (
    <>
    <div className='navbar-outer'>
      <div className='navbar-inner'>
        <div className='nav-left'>
          <NavLink exact to="/"><img src={logo} className="navlogo" alt="logo"></img></NavLink>
          {navLeft}
        </div>
        {isLoaded && sessionLinks}
      </div>
    </div>
    {splashStuff}
    </>
  );
}

export default Navigation;

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import SongSubmitPage from '../SongSubmitPage';
// import './Navigation.css';
// import { logout } from '../../store/session'

// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <>
//       <ProfileButton user={sessionUser} />
//       <NavLink to="/upload">Add Song</NavLink>
//       </>
//     );
//   } else {
//     sessionLinks = (
//       <>
//         <NavLink to="/login">Log In</NavLink>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </>
//     );
//   }

//   return (
//     <ul>
//       <li>
//         <NavLink exact to="/">Home</NavLink>
//         {isLoaded && sessionLinks}
//         <NavLink to="/catalog">Catalog</NavLink>
//       </li>
//     </ul>
//   );
// }

// export default Navigation;
