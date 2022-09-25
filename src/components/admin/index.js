import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
import { Link } from "react-router-dom"
import { Grid } from '@mui/material'

const AdminPanel = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Grid container sx={{ height: "100vh" }} alignItems="flex-start" justifyContent="center">
      <Grid item xs="12">
        <div className='navbar'>
          <span className="logo">Branch International</span>
          <div className="user">
            {/* <img src={currentUser.photoURL} alt="" /> */}
            <span>{currentUser.displayName}</span>
            <Link to="/admin/request">Request</Link>
            <Link to="/admin/process">Support</Link>
            <button onClick={() => signOut(auth)}>logout</button>
          </div>
        </div>
      </Grid>
      {children}
    </Grid>
  )
}

export default AdminPanel;