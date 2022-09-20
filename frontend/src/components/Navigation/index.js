import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import splash from '../../assets/robots-dancing-2.png'
import logo from '../../assets/running-track-inverted-color.png'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  let splashStuff;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-right-side'>
      <NavLink exact to="/upload" className="reg-nav-link upload-nav-link">Upload</NavLink>
      <ProfileButton user={sessionUser} />
      </div>
    );
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
      <div id='splash'>
        {sessionUser ? '' : <img src={splash} alt="splash" className='splash-image'></img>}
        <p className='splash-welcome'>Check Out Our Selection Of Legal Music!</p>
        <p> place component here </p>
      </div>
    )
  }

  // const splasha = (<img src={splash} alt="splash"></img>)

  return (
    <>
    <div className='navbar-outer'>
      <div className='navbar-inner'>
        <div className='nav-left'>
          <img src={logo} className="navlogo" alt="logo"></img>
          <NavLink exact to="/" className="reg-nav-link">Home</NavLink>
          <NavLink exact to="/catalog" className="reg-nav-link">Library</NavLink>
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
