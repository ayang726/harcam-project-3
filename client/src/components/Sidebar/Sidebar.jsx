import React from 'react';
import "./Sidebar.css"
import "./Buttons.css"
import "./WordList.css"
import WordList from "./WordList"
import { Link } from "react-router-dom"

export default function Sidebar(props) {
    let btnClasses = "btn btn-success btn-large sidebar-btn"
    let buildLinkClasses = ""
    let buildBtnClasses = btnClasses + " build-btn"
    if (props.buildBtnDisabled) {
        buildBtnClasses += " disabled"
        buildLinkClasses += " disable-link"
    }

    return (
        <div className="sidebar">
            <div className="button-group">
                <div>
                    <button className={btnClasses} onClick={props.createNewWC}>Create</button>
                    <button className={btnClasses} onClick={props.saveWC}>Save</button>
                </div>
                <div>
                    <Link to={"/wordCloud"} className={buildLinkClasses}>
                        <button className={buildBtnClasses} onClick={props.submitBuild}>Build it</button>
                    </Link>
                </div>
            </div>
            <WordList
                selectedWords={props.selectedWords}
                wordHighlight={props.wordHighlight}
                deleteSeletedWord={props.deleteSelectedWord} />
        </div>
    );
}