import React, { useState, useEffect } from 'react';
import { useAuth0 } from "../../js/react-auth0-wrapper";
import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar(props) {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const clickWC = (e) => {
        props.setCurrentWC(e.target.getAttribute("title"))
        props.setCurrentWCID(e.target.getAttribute("wcid"))
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <a href="/" className="navbar-brand">Word Cloud Generator</a>
            {isAuthenticated && (
                <div className="d-inline-flex align-items-baseline">
                    {/* <button onClick={props.loadWcList} className="btn nav-item btn-danger">Load</button> */}
                    <div className="dropdown nav-item">
                        <Link className="nav-link dropdown-toggle" to="#" id="wordList" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <button className="btn btn-warning">
                                {props.currentWC || "Click Load to Load WordClouds..."}
                            </button>
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="wordList">
                            {props.wcList.map((wc, index) => <li className="dropdown-item" key={index} onClick={clickWC} title={wc.title} wcid={wc._id}>{wc.title}</li>)}
                        </ul>
                    </div>
                </div>
            )}

            <ul className="navbar-nav ml-auto">
                {isAuthenticated && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to="/build">
                                <button className="btn btn-warning navbar-btn">
                                    Build
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/wordCloud">
                                <button className="btn btn-warning navbar-btn">Display</button>
                            </Link>
                        </li>
                    </React.Fragment>
                )}

                {/* Login buttons */}
                <li className="nav-item">
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