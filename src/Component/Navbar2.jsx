import React from 'react'
import { Link } from 'react-router-dom';
import {signOut } from "firebase/auth"
import {auth} from "../Firebase"

 const Navbar2 = () => {

    let logoutHandler=async ()=>{
        await signOut(auth);
        console.log("signout");
    
      }
    

  return (
    <div>
        <nav className="navbar navbar-dark bg-dark ">
  <Link className="navbar-brand mx-5" to="/Feed"><strong>Reels</strong></Link>
  <form className="form-inline">
  <a className="navbar-brand mx-5" href="/Profile"><strong>Profile</strong></a>
    <button className="btn btn-outline-danger my-2 my-sm-0 mx-5" onClick={ logoutHandler }type="submit">Log-Out</button>
  </form>
</nav>
    </div>
  )
}


export default Navbar2;
