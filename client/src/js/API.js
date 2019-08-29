import axios from "axios"


export default {
    updateWordList: function (id, body) {
        return axios.put("/api/word-list/" + id, body)
    },

    createWordList: function (body) {
        return axios.post("/api/word-list/", body)
    },

    getWordList: function (id) {
        return axios.get("/api/word-list/" + id)
    },

    // buildWordCloud: function (wordList) {
    //     return axios.post("/api/word-cloud/create", wordList)
    // }
}