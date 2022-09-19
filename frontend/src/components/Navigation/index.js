import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import splash from '../../assets/dream_Kandinsky.png'
import logo from '../../assets/otlogo2.png'
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
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </div>
      </>
    );
  }

  const splash = (<img src={splash} alt="splash"></img>)

  return (
    <>
    <ul className='navbar'>
      <li><img src={logo} className="navlogo" alt="logo"></img></li>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
    {sessionUser && splash}
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
