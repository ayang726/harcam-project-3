import React, { Component } from 'react';
import ReactCloud from "react-d3-cloud";
import API from "../../js/API"
import "./WCDisplay.css"

const wordSizeScale = 10;
const wordSizeOffset = 5;
export default class WordCloudDisplay extends Component {

    state = {
        wordList: [{ text: "Loading", value: 1000000 }]
    }

    componentDidMount() {
        if (!this.props.currentWCID) {
            this.props.loadWcList();
        }
        // console.log("component mounted");

        this.drawWordCloud()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentWCID !== this.props.currentWCID) {
            this.drawWordCloud()
        }
    }

    drawWordCloud = () => {
        console.log("draw function called");

        const id = this.props.currentWCID
        const promise = API.getWordCloudById(id)
        promise.then(response => {
            let words = response.data.words;
            // console.log(wordList);

            let wordList = words.map(word => {
                const size = Math.floor(Math.exp(wordSizeScale * Math.random()) * wordSizeOffset);
                // console.log(word);
                // console.log(size);
                return { text: word, value: size }
            })
            // console.log(wordList);
            this.setState({ wordList })
        })
    }

    render() {
        const fontSizeMapper = word => Math.log2(word.value) * 5;
        const rotate = function () { return ~~(Math.random() * 2) * 30; };

        return (
            <div className="row">
                <div className="col-lg-9">
                    <ReactCloud data={this.state.wordList} fontSizeMapper={fontSizeMapper} rotate={rotate} />
                </div>
                <div className="col-lg-3">
                    <button className="btn btn-danger btn-lg my-4" onClick={() => window.location.reload()}>Reload</button>
                </div>
            </div>
        );
    }
}