const song = document.querySelector('#song');
const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title'); 
const progressBar = document.querySelector('#progress-bar');
let pPause = document.querySelector('#play-pause');

songIndex = 0;
songs = ['/music/dbz/cha.mp3', '/music/dbz/mak.mp3', '/music/dbz/soul.mp3', '/music/dbz/dan.mp3','/music/dbz/gen.mp3'];
songArtists = ['Hironobu Kageyama', 'Hiroki Takahashi',
'Takayoshi Tanimoto','Field Of View','Kiyoshi Hikawa'];
songTitles = ["Cha-La Head-Cha-La", "Makafushigi Adventure!", 
"Dragon Soul", "Dan Dan Kokoro Hiraketeku", "Genkai Toppa X Survivor"];

let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song');
        pPause.src = "/assets/pause.png"
        song.play();
        playing = false;
    } else {
        pPause.src = "/assets/play.png"
        song.pause();
        playing = true;
    }
}

song.addEventListener('ended', function(){
    nextSong();
});

function nextSong() {
    songIndex++;
    if (songIndex > 5) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];
    playing = true;
    playPause();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 5;
    };
    song.src = songs[songIndex];
    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];
    playing = true;
    playPause();
}

function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    song.currentTime = progressBar.value;
};