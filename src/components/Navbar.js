import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import notebook from "./notebook.png"


export default function Navbar() {
  let navigate = useNavigate();

  const handlelogout = ()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  
  const location = useLocation()

  useEffect(()=>{
  },[location])
   return(<>
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img id="notebook" src={notebook} alt="" /> <span id="note">NoteVault</span></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      { localStorage.getItem("token")?
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>:""}
    </div>
  </div>
  { !localStorage.getItem("token")? <>
  <Link type="button" to="/login" className="btn btn-primary mx-1">Login</Link>
  <Link type="button" to="/signup" className="btn btn-primary mx-1">Signup</Link>
  </>:<button onClick={handlelogout} className="btn btn-primary mx-1" type="button">Logout</button>}
</nav>
   </>
  )
}
