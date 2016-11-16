let audioPlayer;

export function playSong(songUrl) {
    if (audioPlayer) {
        pauseSong();
    }
    audioPlayer = new Audio(songUrl);
    audioPlayer.play();
}

export function pauseSong() {
    audioPlayer.pause();
}