import React, { Component } from "react";
import { Sidebar, Searchbar, WordSelector, Title } from "../"
import "./WCG.css"
import axios from "axios"
import API from "../../js/API"
import { Auth0Context } from "../../js/react-auth0-wrapper";


const minWordsCount = 10;
const maxWordSize = 100000;
class WordCloudGenerator extends Component {
    // use APP.js for all props data
    state = {
        buildBtnDisabled: true,
        searchWord: "",
        searchTopic: "",
        relatedWords: {},
        selectedWords: [],
        title: ""
    }
    componentDidMount() {
        // console.log("did mount");
        this.props.loadWcList(this.props.currentWCID);
    }
    componentDidUpdate(prevProps) {
        // console.log("did update");
        // console.log(prevProps);

        if (this.props.currentWCID && (prevProps.currentWCID !== this.props.currentWCID || this.state.title === "")) {
            API.getWordCloudById(this.props.currentWCID)
                .then(response => {
                    const { title, words } = response.data;
                    this.setState({
                        title,
                        selectedWords: words
                    })
                })
        }
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

        let results = {}
        this.setState({ relatedWords: results })
        const queries = ["ml", "rel_syn", "rel_trg", "rel_jja", "rel_jjb", "rel_gen", "rel_com"];
        for (const param of queries) {
            let queryString = `${param}=${word}`;
            if (topic)
                queryString += `&topic=${topic}`;
            const url = `https://api.datamuse.com/words?${queryString}&max=10&md=f`;
            // console.log(url);
            try {
                let response = await axios.get(url)
                let list = response.data
                results[param] = list.map(object => object.word)
            } catch (e) {
                console.log("There's an error querying datamuse:");
                console.log(e);
            }
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


    titleOnChange = (e) => {
        const { value } = e.target;
        this.setState({ title: value })
    }

    // build word cloud
    buildWordCloud = (e) => {
        this.saveWordListToDB()
    }

    createNewWC = async () => {

        let userId = this.props.userId;
        let title = "New WorldCloud";

        let body = {
            userId,
            title,
            wordList: this.state.selectedWords
        };

        const response = await API.createWordCloud(body)
        // console.log(response);

        const wcID = response.data._id
        this.setState({
            searchWord: "",
            searchTopic: "",
            relatedWords: {},
            selectedWords: [],
        })
        this.props.setCurrentWC("New WordCloud");
        this.props.setCurrentWCID(wcID);
        this.props.loadWcList();
    }

    saveWordListToDB = () => {
        if (this.state.title === "")
            return alert("Title cannot be empty")
        let id = this.props.currentWCID
        this.props.setCurrentWC(this.state.title)
        if (id) {
            let body = {
                title: this.state.title,
                words: this.state.selectedWords
            }
            API.updateWordCloud(id, body).then(response => {
                this.props.loadWcList(id);
            })
        } else console.log("no wordcloud created");

    }

    render() {
        return (
            <div>
                <div className="row" >
                    <div className="col-lg-3">
                        <Sidebar
                            buildBtnDisabled={this.state.buildBtnDisabled}
                            selectedWords={this.state.selectedWords}
                            wordHighlight={this.wordSearch}
                            deleteSelectedWord={this.deleteSelectedWord}
                            submitBuild={this.buildWordCloud}
                            saveWC={this.saveWordListToDB}
                            createNewWC={this.createNewWC}
                        />
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <Title
                                    value={this.state.title}
                                    onChange={this.titleOnChange}
                                />
                            </div>
                        </div>
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
WordCloudGenerator.contextType = Auth0Context
export default WordCloudGenerator;
