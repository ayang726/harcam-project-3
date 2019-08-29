import axios from "axios"

export default async function (word, topic) {
    console.log('function called');

    const queries = ["ml", "rel_syn", "rel_trg", "rel_jja", "rel_jjb", "rel_gen", "rel_com"];
    let results = {};
    await queries.forEach(async param => {
        let queryString = `${param}=${word}`;
        if (topic)
            queryString += "&topics=" + topic;
        results[param] = [];
        let url = `https://api.datamuse.com/words?${queryString}&max=10&md=f`
        console.log(url)
        let response = await axios.get(url)
        response.data.forEach(word => {
            console.log("inloop1")
            results[param].push(word.word)
            console.log("inloop")
        })
        // .then(response => {
        //     response.data.forEach(word => {
        //         results[param].push(word)
        //     })

        //     confirms--;
        //     console.log(confirms);
        //     if (!confirms) {
        //         console.log('completed');
        //         return results;
        //     }
        // });
    });
    console.log('before return');

    return results;
    // const timeout = 1000;
    // timer = setTimeout(() => {
    //     console.log('timed out');
    //     return results;
    // }, timeout);
}
