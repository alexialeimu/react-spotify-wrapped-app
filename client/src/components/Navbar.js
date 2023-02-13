import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [navToggled, setNavToggled] = React.useState(false);

    return (
        <>
            <nav>
                <div className="navbar">
                    <h1>Spottariappi</h1>
                    <div class="nav_items">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="toptracks">Top Tracks</NavLink>
                        <NavLink to="topartists">Top Artists</NavLink>
                        <a href="http://localhost:8000/login">
                            Sign in
                        </a>
                    </div>
                    <div id="menu-btn" class="hamburger">
                        <span class="hamburger-top"></span>
                        <span class="hamburger-middle"></span>
                        <span class="hamburger-bottom"></span>
                    </div>
                </div>
                <div className="mobile-menu">
                    <div id="menu">
                        {/* TO-DO */}
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="toptracks">Top Tracks</NavLink>
                        <NavLink to="topartists">Top Artists</NavLink>
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
