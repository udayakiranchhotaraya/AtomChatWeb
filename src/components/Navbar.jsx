import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { Button } from "react-bootstrap";

const Navbar = () => {
  const currentUser = useContext(AuthContext)

  return (
      <div className="navbar">
        <span className="logo">Atom Chat</span>
        <div className="user">
          <span>John Doe</span>
          <Button className='justify-content-center' variant='primary' type="submit" onClick={()=>signOut(auth)}>Logout</Button>
          {/* <button type="submit" class="btn btn-primary" onClick={()=>signOut(auth)}>Logout</button> */}
        </div>
      </div>
  )
}

export default Navbar