define(['./fetch_data', './store'], function (fetchData, store) {

    function searchAlbums(query) {
        var url = 'https://api.spotify.com/v1/search?type=album&q=' + query;
        fetchData(url, function (data) {
            store.updateState({
                type: "UPDATE_ALBUMS",
                payload: data.albums.items
            })
        });
    }

    function fetchTrack(albumId, callback) {
        var state = store.getState();
        /*var album = state.albums.filter(function (album) {
            return album.id === albumId;
        })[0];*/

        var url = "https://api.spotify.com/v1/albums/" + albumId;

        fetchData(url, function (data) {
            callback(data.tracks.items[0].preview_url);
        });
    }

    return {
        searchAlbums: searchAlbums,
        fetchTrack: fetchTrack
    }
});