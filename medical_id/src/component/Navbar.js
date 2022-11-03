import React from 'react'
import { Link} from 'react-router-dom'
import navbarCss from './Navbar.module.css'


function Navbar() {

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    window.location.replace("/login")
    alert('loged out')
  }

  return (
    <nav className={navbarCss.navbar}>
        <ul>
          <div className={navbarCss.title}>
            {/* <i className="fa-solid fa-users-medical"></i> */}
            <i className="fa fa-users"></i>
            <a href="/">Health Id</a>
          </div>
          {!localStorage.getItem('token')?<li><Link to="/login">Login</Link></li> : <li><Link onClick={handleLogout}>Logout</Link></li>}
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/about">About me</Link></li>
          <li><Link to="/myreport">Reports</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar