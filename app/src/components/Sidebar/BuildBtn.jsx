import React from 'react';
import { Link } from "react-router-dom"


export default function (props) {
    let btnClasses = "btn btn-success btn-large build-btn"
    let linkClasses = ""
    if (props.buildBtnDisabled) {
        btnClasses += " disabled"
        linkClasses += "disable-link"
    }
    return (
        <Link to={"/wordCloud"} className={linkClasses}>
            <button className={btnClasses} onClick={props.submitBuild}>Build it</button>
        </Link>
    );
}