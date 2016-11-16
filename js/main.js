import * as Store from "./store";
import * as AudioPlayer from "./audio_player";
import * as Albums from "./albums";

var searchBtn = document.getElementById("search");
console.log("hello world 15");
searchBtn.addEventListener("click", function (e) {
    var queryInput = document.getElementById("query");
    e.preventDefault();
    Albums.searchAlbums(queryInput.value);
});

function renderAlbums(state) {
    var resultsContainer = document.getElementById("results");

    var domElements = [];

    for (var i = 0; i < state.albums.length; i++) {
        var div = document.createElement("div");
        div.style = "background-image:url(" + state.albums[i].image.url + ")";
        div.className = "cover " + (state.albums[i].playing ? "playing" : "");
        div.onclick = (function (index) {

            return function () {
                Store.updateState({
                    type: "SET_PLAYING",
                    payload: state.albums[index].id
                });

                if (state.albums[index].playing) {
                    AudioPlayer.pauseSong();
                } else {
                    Albums.fetchTrack(state.albums[index].id, function (url) {
                        AudioPlayer.playSong(url);
                    });
                }
            };

        })(i);
        domElements.push(div);
    }

    resultsContainer.innerHTML = "";
    for (var i = 0; i < domElements.length; i++) {
        resultsContainer.appendChild(domElements[i]);
    }
}

Store.subscribe(renderAlbums);