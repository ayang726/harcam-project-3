import React from 'react';
import "../bounce"

export default function (props) {
    return (
        <div className="word-list">
            <ul>
                {props.selectedWords.map((word, index) => {
                    return (
                        <li
                            name={word}
                            className="selected-word"
                            onClick={() => { props.wordHighlight(word) }}
                            key={index}>
                            {word}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}