import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from 'react-router-dom';
function Navbar() {
    return (

        <div>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <NavLink to="/Converter" className="nav-link" >Converter</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/CryptoList" className="nav-link" >Crypto</NavLink>
                    </li>
                </ul>
            </nav>
        </div>

    );
}

export default Navbar;