import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const NavBar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">Branch International</span>
      <div className="user">
        {/* <img src={currentUser.photoURL} alt="" /> */}
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default NavBar