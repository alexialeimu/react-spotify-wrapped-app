import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav>
                <div class="container">
                    <h1>Spottariappi</h1>
                    <div class="nav_items">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="toplists">Top Lists</NavLink>
                        <a href="http://localhost:8000/login">
                            Sign in
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
