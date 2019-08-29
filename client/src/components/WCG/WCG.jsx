import React, { Component } from "react";
import { Navbar, Sidebar, Searchbar, WordSelector } from "../"
import "./WCG.css"
import axios from "axios"
import API from "../../js/API"
import { useAuth0 } from "../../js/react-auth0-wrapper";

const minWordsCount = 10;
const maxWordSize = 100000;
class WordCloudGenerator extends Component {

    state = {
        buildBtnDisabled: true,
        searchWord: "",
        searchTopic: "",
        relatedWords: {},
        selectedWords: [],
        currentWordCloudID: ""
    }

    // initializing document
    componentDidMount() {
        let body = {
            title: "wordlist",
            wordList: this.state.wordList
        }
        API.createWordList(body)
    }

    searchBarUpdate = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    searchBarSubmit = (e) => {
        e.preventDefault();
        const { searchWord, searchTopic } = this.state
        // console.log(searchWord + " " + searchTopic);

        this.addToSelectedList(searchWord, searchTopic)
        this.wordSearch(searchWord, searchTopic);
    }

    deleteSelectedWord = (e) => {
        let selectedWords = this.state.selectedWords.filter(word => word !== this.state.searchWord)
        this.setState({ selectedWords, relatedWords: {}, searchWord: "" })
        this.verifyBuiltButtonState();
    }

    addToSelectedList = (word, topic) => {
        if (!this.state.selectedWords.includes(word)) {
            let selectedWords = this.state.selectedWords;
            selectedWords.push(word);
            this.setState({ selectedWords });
            this.wordHighlight(word);
        }
    }

    wordSearch = async (word, topic) => {
        // add the new work" to word list
        // console.log(word + " " + topic);

        let results = {}
        this.setState({ relatedWords: results })
        const queries = ["ml", "rel_syn", "rel_trg", "rel_jja", "rel_jjb", "rel_gen", "rel_com"];
        for (const param of queries) {
            let queryString = `${param}=${word}`;
            if (topic)
                queryString += `&topic=${topic}`;
            const url = `https://api.datamuse.com/words?${queryString}&max=10&md=f`;
            console.log(url);

            let response = await axios.get(url)
            let list = response.data
            results[param] = list.map(object => object.word)
        }

        this.setState({ relatedWords: results })
        this.wordHighlight(word);
    }

    wordHighlight = (word) => {
        this.setState({ searchWord: word })
        this.verifyBuiltButtonState();
    }

    verifyBuiltButtonState = () => {
        if (this.state.selectedWords.length >= minWordsCount)
            this.setState({ buildBtnDisabled: false })
        else
            this.setState({ buildBtnDisabled: true })
    }

    // build word cloud
    buildWordCloud = (e) => {
        // console.log("message-201")
        // const wordList = this.state.selectedWords.map(word => { return { text: word, value: Math.floor(Math.random() * maxWordSize) } })
        // console.log(wordList);
        this.saveWordListToDB();
    }

    saveWordListToDB = () => {
        let id = "5d56f783d2ef6a609a7eab84"
        let body = {
            words: this.state.selectedWords
        }
        API.updateWordList(id, body)
    }

    render() {
        const { user } = useAuth0()
        console.log(user);

        return (
            <div>
                < div className="row" >
                    <div className="col-lg-3">
                        <Sidebar
                            buildBtnDisabled={this.state.buildBtnDisabled}
                            selectedWords={this.state.selectedWords}
                            wordHighlight={this.wordSearch}
                            deleteSelectedWord={this.deleteSelectedWord}
                            submitBuild={this.buildWordCloud}
                            saveBtn={this.saveWordListToDB} />
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <Searchbar
                                    searchWord={this.state.searchWord}
                                    onChange={this.searchBarUpdate}
                                    onSubmit={this.searchBarSubmit}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <WordSelector
                                    deleteBtnClicked={this.deleteSelectedWord}
                                    searchWord={this.state.searchWord}
                                    relatedWords={this.state.relatedWords}
                                    wordClick={this.addToSelectedList} />
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        );
    }
}

export default WordCloudGenerator;
