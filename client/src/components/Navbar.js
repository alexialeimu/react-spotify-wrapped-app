import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="py-4">
                <div className="navbar layout flex items-center justify-between">
                    <div className="font-bold">Spottariappi</div>
                    <div className="nav_items space-x-8">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="stats">My Stats</NavLink>
                        <a href="http://localhost:8000/login">
                            Sign in
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
