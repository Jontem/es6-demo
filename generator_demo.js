require("isomorphic-fetch");

function runGen(generator) {
    const next = (iterator, data) => {

        const {value, done} = iterator.next(data);

        if (!done) {
            value.then((data) => next(iterator, data));
        }
    };

    const genObj = generator();
    next(genObj);
}


function fetchJson(url) {
    return fetch(url)
        .then((response) => {
            return response.json()
        });
}

const artists = [
    "0OdUWJ0sBjDrqHygGUXeCF",
    "2ye2Wgw4gimLv2eAKyk1NB",
    "04gDigrS5kc9YWfZHwBETP"
];

runGen(function*() {
    for (let artistId of artists) {
        const data = yield fetchJson(`https://api.spotify.com/v1/artists/${artistId}`);
        console.log("Artist name: " + data.name);
    }
});
