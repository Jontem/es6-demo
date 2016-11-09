define(['./albums', './store', './audio_player'], function (albums, store, audioPlayer) {
    var searchBtn = document.getElementById("search");

    searchBtn.addEventListener("click", function (e) {
        var queryInput = document.getElementById("query");
        e.preventDefault();
        albums.searchAlbums(queryInput.value);
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
                    store.updateState({
                        type: "SET_PLAYING",
                        payload: state.albums[index].id
                    });

                    if (state.albums[index].playing) {
                        audioPlayer.pauseSong();
                    } else {
                        albums.fetchTrack(state.albums[index].id, function (url) {
                            audioPlayer.playSong(url);
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

    store.subscribe(renderAlbums);
});