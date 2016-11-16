const initialState = {
    albums: []
};

let spotifyState = initialState;

const subscribers = [];

export function getState() {
    return spotifyState;
}

export function updateState(action) {
    console.log("ACTION: " + action.type, action.payload);
    spotifyState = reducer(getState(), action);
    notifySubscribers(spotifyState);
}

export function subscribe(subscriber) {
    subscribers.push(subscriber);
}

function reducer(state, action) {
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
        const updatedAlbums = getState()
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
    for (let i = 0; i < subscribers.length; i++) {
        subscribers[i](spotifyState)
    }
}