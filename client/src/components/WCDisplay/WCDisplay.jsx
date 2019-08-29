import React, { Component } from 'react';
import ReactCloud from "react-d3-cloud";
import API from "../../js/API"

const maxWordSize = 100000;
export default class WordCloudDisplay extends Component {

    state = {
        wordList: [{ text: "alex", value: 10000 }, { text: "is", value: 5000 }, { text: "awesome", value: 1000 }]
    }

    componentDidMount() {
        const id = "5d56f783d2ef6a609a7eab84"
        const promise = API.getWordList(id)
        promise.then(response => {
            let wordList = response.data.words;
            console.log(wordList);
            wordList = wordList.map(word => { return { text: word, value: Math.floor(Math.random() * maxWordSize) } })
            console.log(wordList);
            this.setState({ wordList })
        })
    }

    render() {
        const fontSizeMapper = word => Math.log2(word.value) * 5;
        const rotate = function () { return ~~(Math.random() * 2) * 30; };

        return (
            <div>
                <ReactCloud data={this.state.wordList} fontSizeMapper={fontSizeMapper} rotate={rotate} />
            </div>
        );
    }
}