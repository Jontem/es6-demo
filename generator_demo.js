require("isomorphic-fetch");


function fetchArtist(url) {
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            return generatorObject.next(json)
        });
}

function* getArtists(artists) {
    for(let artistId of artists) {
        const data = yield fetchArtist(`https://api.spotify.com/v1/artists/${artistId}`);
        console.log("Artist name: " + data.name);
    }
}

const artists = [
    "0OdUWJ0sBjDrqHygGUXeCF",
    "2ye2Wgw4gimLv2eAKyk1NB",
    "04gDigrS5kc9YWfZHwBETP"

];

const generatorObject = getArtists(artists);
generatorObject.next();