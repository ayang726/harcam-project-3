import axios from "axios"


export default {
    updateWordCloud: function (id, body) {
        return axios.put("/api/word-cloud/" + id, body)
    },

    createWordCloud: function (body) {
        return axios.post("/api/word-cloud/", body)
    },

    getWordClouds: function (userId) {
        return axios.get("/api/word-cloud/all/" + userId)
    },

    getWordCloudById: function (wcid) {
        return axios.get(`/api/word-cloud/${wcid}`)
    }

    // buildWordCloud: function (wordList) {
    //     return axios.post("/api/word-cloud/create", wordList)
    // }
}