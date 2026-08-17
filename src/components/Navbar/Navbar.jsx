import React,{useEffect, useRef} from "react";
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bellIcon from '../../assets/bell_icon.svg'
import profileIcon from '../../assets/profile_img.png'
import caretIcon from '../../assets/caret_icon.svg'
import { logout } from "../../firebase";
function Navbar(){

    const navRef=useRef()
    useEffect(()=>{
         const handleScroll = () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add("nav-dark");
            } else {
                navRef.current.classList.remove("nav-dark");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },[])
    return (
    <div ref={navRef} className="navbar">
        <div className="navbar-left">
            <img src={logo} alt="" />
            <ul>
                <li>Home</li>
                <li>Tv Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>browse by Languages</li>
            </ul>
        </div>
        <div className="navbar-right">
            <img src={search} alt="" className="icons"/>
            <p>Childern</p>
            <img src={bellIcon} alt="" className="icons"/>
            <div className="navbar-profile">
                <img src={profileIcon} alt="" className="profile"/>
                <img src={caretIcon} alt="" />
                <div className="dropdown">
                    <p onClick={()=>{logout()}}>Sign Out</p>
                </div>
            </div>
        </div>
    </div>
)
}

export default Navbar