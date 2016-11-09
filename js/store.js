define(function () {
    var initialState = {
        albums: []
    };

    var spotifyState = initialState;

    var subscribers = [];

    function getState() {
        return spotifyState;
    }

    function updateState(action) {
        console.log("ACTION: " + action.type, action.payload);
        spotifyState = reducer(action, getState());
        notifySubscribers(spotifyState);
    }

    function reducer(action, state) {
        if (action.type === "UPDATE_ALBUMS") {

            const albums = action.payload
                .map(function (album) {
                    return {
                        id: album.id,
                        artist: album.artists[0],
                        image: album.images[0],
                        playing: false
                    }
                });

            return Object.assign({}, getState(), {
                albums: albums
            });
        }

        if (action.type === "SET_PLAYING") {
            var updatedAlbums = getState()
                .albums
                .map(function (album) {

                    var playing = (album.id === action.payload) && !album.playing;
                    return Object.assign({}, album, {
                        playing: playing
                    })
                });

            return Object.assign({}, getState(), {
                albums: updatedAlbums
            });
        }

        return state;
    }

    function notifySubscribers() {
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i](spotifyState)
        }
    }

    function subscribe(subscriber) {
        subscribers.push(subscriber);
    }

    window.getState = getState;

    return {
        updateState: updateState,
        getState: getState,
        subscribe: subscribe
    }
});