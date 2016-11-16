import * as Store from "./store";
import * as AudioPlayer from "./audio_player";
import * as Albums from "./albums";

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", function (e) {
    const queryInput = document.getElementById("query");
    e.preventDefault();
    Albums.searchAlbums(queryInput.value);
});

Store.subscribe(renderAlbums);

function renderAlbums(state) {
    const domElements = state.albums
        .map((album) => createAlbumNode(album));

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
    domElements.forEach((node) => resultsContainer.appendChild(node));
}

function createAlbumNode({id, image, playing}) {
    const div = document.createElement("div");
    div.style = "background-image:url(" + image.url + ")";
    div.className = "cover " + (playing ? "playing" : "");
    div.onclick = () => {
        Store.updateState({
            type: "SET_PLAYING",
            payload: id
        });

        if (playing) {
            AudioPlayer.pauseSong();
        } else {
            Albums.fetchTrack(id, function (url) {
                AudioPlayer.playSong(url);
            });
        }
    };

    return div;
}