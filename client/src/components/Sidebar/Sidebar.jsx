import React from 'react';
import "./Sidebar.css"
import "./BuildBtn.css"
import "./WordList.css"
import BuildBtn from "./BuildBtn"
import WordList from "./WordList"

export default function Sidebar(props) {
    return (
        <div className="sidebar">
            <BuildBtn
                buildBtnDisabled={props.buildBtnDisabled}
                submitBuild={props.submitBuild} />
            <WordList
                selectedWords={props.selectedWords}
                wordHighlight={props.wordHighlight}
                deleteSeletedWord={props.deleteSelectedWord} />
        </div>
    );
}