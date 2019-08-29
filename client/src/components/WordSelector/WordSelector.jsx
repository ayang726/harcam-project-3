import React from 'react';
import "./WordSelector.css"


export default function (props) {

    let { relatedWords } = props
    let keys = Object.keys(relatedWords)
    // let elementCounter = 0;

    return (
        <div className="word-selector">
            <h3 className="chosen-word word">{props.searchWord}</h3>
            <button
                className="btn btn-danger btn-sm float-right"
                onClick={props.deleteBtnClicked}>
                &times;
            </button>
            <ul>
                {
                    // console.log(relatedWords)

                    keys.map((key) => {
                        return (
                            // classes = "word " + key
                            relatedWords[key].map((word, index) => {

                                return (
                                    <li className={"word " + key}
                                        onClick={() => { props.wordClick(word) }}
                                        key={index}
                                        name={word}>
                                        {word}
                                    </li>
                                )
                            })
                        )
                    })
                }
            </ul>
        </div >
    );
}