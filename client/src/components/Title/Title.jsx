import React from 'react';
import "./Title.css"

export default function (props) {
    return (
        <form className="form-inline"
            onSubmit={(e) => e.preventDefault()}>
            <input name="title"
                value={props.value}
                onChange={props.onChange}
                className="form-control text-center"
                type="input"
                id="title-input"
                placeholder="Press Create For New WordCloud"
                aria-label="Title" />
        </form>
    );
}