define(function () {
   var audioPlayer;

    function playSong(songUrl) {
        if(audioPlayer) {
            pauseSong();
        }
        audioPlayer = new Audio(songUrl);
        audioPlayer.play();
    }

    function pauseSong() {
        audioPlayer.pause();
    }

    return {
        playSong: playSong,
        pauseSong: pauseSong,
    };
});