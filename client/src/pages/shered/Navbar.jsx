import React from 'react';
import { IoMenuSharp } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router';
import ProFastLogo from './ProFastLogo';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const {user,logOut}=useAuth()
     const navigate = useNavigate();
    const navLink = <>
        <li><NavLink>Services</NavLink></li>
        <li><NavLink to='coverage'>Coverage</NavLink></li>
        <li><NavLink to='sendPercel'>Send A Percel</NavLink></li>
        <li><NavLink to='rider'>Be A Rider</NavLink></li>

        {
            user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("Logged out");
            })
            .catch(err => {
                console.error("Logout error:", err);
            });
    };
    return (
        <div className="navbar bg-base-100 shadow-sm fixed w-11/12 z-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="p-2 link lg:hidden">
                        <IoMenuSharp size={30}/>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLink}
                    </ul>
                </div>
                <ProFastLogo />
                
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-md">
                                <img src={user.photoURL || "https://i.ibb.co/2kRZ3mZ/default-user.png"} alt="user" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><span className="font-semibold">{user.displayName || "User"}</span></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <button onClick={() => navigate('/logIn')} className="px-6 py-2 border border-[#D8F046]  font-semibold rounded-md hover:bg-[#D8F046] hover:text-black transition">Sign In</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;