import React, { Component } from 'react';
import "./Searchbar.css";

export default class SearchBar extends Component {
    clearInput = (e) => {
        e.target.value = "";
    }
    render() {
        return (
            <div className="search-bar" >
                <form className="form-inline"
                    onSubmit={this.props.onSubmit}>
                    <input name="searchWord"
                        value={this.props.searchWord}
                        onChange={this.props.onChange}
                        // onFocus={this.clearInput}
                        className="form-control"
                        id="search-word-input"
                        type="search"
                        placeholder="Search Word"
                        aria-label="Search Word" />
                </form>
                <form className="form-inline"
                    onSubmit={this.props.onSubmit}>
                    <input name="searchTopic"
                        value={this.props.searchTopic}
                        onChange={this.props.onChange}
                        // onFocus={this.clearInput}
                        className="form-control"
                        id="search-topic-input"
                        type="search"
                        placeholder="Search Topic (optional)"
                        aria-label="Search Topic" />
                </form>
            </div>
        );
    }
}