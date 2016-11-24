require("isomorphic-fetch");


function fetchArtist(url) {
    return fetch(url)
        .then((response) => {
            return response.json();
        });
}

function* getArtists(artists) {
    for(let artistId of artists) {
        yield fetchArtist(`https://api.spotify.com/v1/artists/${artistId}`);
    }
}

const artists = [
    "0OdUWJ0sBjDrqHygGUXeCF",
    "2ye2Wgw4gimLv2eAKyk1NB",
    "04gDigrS5kc9YWfZHwBETP"

];

// Not allowed to await in the global scope.
(async function () {
    const generatorObject = getArtists(artists);
    for (const dataPromise of generatorObject) {

        const data = await dataPromise;

        console.log("Artist name: " + data.name);
    }
})()
