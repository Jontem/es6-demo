import {fetchData} from "./fetch_data";
import * as Store from "./store";

export function searchAlbums(query) {
    const url = 'https://api.spotify.com/v1/search?type=album&q=' + query;
    fetchData(url, function (data) {
        Store.updateState({
            type: "UPDATE_ALBUMS",
            payload: data.albums.items
        })
    });
}

export function fetchTrack(albumId, callback) {
    const url = "https://api.spotify.com/v1/albums/" + albumId;

    fetchData(url, function (data) {
        callback(data.tracks.items[0].preview_url);
    });
}