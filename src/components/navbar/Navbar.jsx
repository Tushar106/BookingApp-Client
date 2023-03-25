import "./navbar.css"
import React, { useContext } from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Profile from "../profile/Profile";
function Navbar(){
    const {user}=useContext(AuthContext);
    const navigate=useNavigate();
    function login(){
        navigate("/login");
    }
    function register(){
        navigate("/register")
    }
    return(<div className="navbar">
        <div className="navContainer">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo" ><h1>BookEasy!</h1></span>
            </Link>
            {user ? <Profile/>:<div className="navItems">
                <button className="navButton" onClick={register}>Register</button>
                <button className="navButton" onClick={login}>Login</button>
            </div>}
        </div>

    </div>)
}
export default Navbar