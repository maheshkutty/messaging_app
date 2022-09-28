import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const Header = () => {

	return (
		<div className='navbar'>
			<span className="logo">Branch International</span>
			<div className="user">
				{/* <img src={currentUser.photoURL} alt="" /> */}
				<Link to="/login" className="linkButton">Login</Link>
				<Link to="/register" className="linkButton">Register</Link>
			</div>
		</div>
	)
}

export default Header