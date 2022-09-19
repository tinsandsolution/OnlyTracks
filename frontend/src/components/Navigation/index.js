import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import splash from '../../assets/dream_Kandinsky.png'
import logo from '../../assets/running-track.png'
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="not-logged-in">
          <NavLink className="login-button" to="/login">Log In</NavLink>
          <NavLink className="signup-button" to="/signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  // const splasha = (<img src={splash} alt="splash"></img>)

  return (
    <div className='navbar-outer'>
      <div className='navbar-inner'>
        <div className='nav-left'>
          <img src={logo} className="navlogo" alt="logo"></img>
          <NavLink exact to="/" className="reg-nav-link">Home</NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </div>
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
