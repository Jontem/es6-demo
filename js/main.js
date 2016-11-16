import * as Store from "./store";
import * as AudioPlayer from "./audio_player";
import * as Albums from "./albums";

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", function (e) {
    const queryInput = document.getElementById("query");
    e.preventDefault();
    Albums.searchAlbums(queryInput.value);
});

function renderAlbums(state) {
    const resultsContainer = document.getElementById("results");

    const domElements = [];

    for (let i = 0; i < state.albums.length; i++) {
        const div = document.createElement("div");
        div.style = "background-image:url(" + state.albums[i].image.url + ")";
        div.className = "cover " + (state.albums[i].playing ? "playing" : "");
        div.onclick = function () {
            Store.updateState({
                type: "SET_PLAYING",
                payload: state.albums[i].id
            });

            if (state.albums[i].playing) {
                AudioPlayer.pauseSong();
            } else {
                Albums.fetchTrack(state.albums[i].id, function (url) {
                    AudioPlayer.playSong(url);
                });
            }
        };

        domElements.push(div);
    }

    resultsContainer.innerHTML = "";
    for (let i = 0; i < domElements.length; i++) {
        resultsContainer.appendChild(domElements[i]);
    }
}

Store.subscribe(renderAlbums);