import React from 'react';
import { useAuth0 } from "../../js/react-auth0-wrapper";
import { Link } from "react-router-dom";
import "./Navbar.css"


export default function Navbar(props) {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <a href="/" className="navbar-brand">Word Cloud Generator</a>

            <ul class="navbar-nav ml-auto">
                {isAuthenticated && (
                    <React.Fragment>
                        <li class="nav-item">
                            <Link to="/build">
                                <button className="btn btn-warning navbar-btn">
                                    Build
                            </button>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/wordCloud">
                                <button className="btn btn-warning navbar-btn">Display</button>
                            </Link>
                        </li>
                    </React.Fragment>
                )}

                {/* Login buttons */}
                <li class="nav-item">
                    {/* if not authenticated render login button*/}
                    {!isAuthenticated && (
                        <button className="btn btn-info navbar-btn"
                            onClick={() =>
                                loginWithRedirect({})
                            }
                        >
                            Log in
                        </button>
                    )}

                    {/* if authendicated render logout button */}
                    {isAuthenticated &&
                        <button className="btn btn-info navbar-btn" onClick={() => logout()}>
                            Log out
                        </button>
                    }
                </li>
            </ul>
        </nav>
    );
}