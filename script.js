const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const img = document.querySelector('img');
const title = document.querySelector('#title');
const artistName = document.querySelector('#artist');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('#progress-bar');
const durationElement = document.querySelector('#duration');
const currentTimeElement = document.querySelector('#current-time');

const song = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army(Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Good Night, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row(Remix)',
    artist: 'Jacinto Design',
  }
]

let isPlaying = false;
let onLoadSong = 2;

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}
function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

function prevSong() {
  onLoadSong--;
  if (onLoadSong < 0) {
    onLoadSong = song.length - 1;
  }
  loadSong(song[onLoadSong]);
  playMusic();
}
function nextSong() {
  onLoadSong++;
  if (onLoadSong > song.length - 1) {
    onLoadSong = 0;
  }
  loadSong(song[onLoadSong]);
  playMusic();
}
//Update the DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artistName.textContent = song.artist;
  img.src = `img/${song.name}.jpg`;
  music.src = `music/${song.name}.mp3`
}

function updateProgressBar(e) {

  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100
    progressBar.style.width = `${progressPercent}%`;


    //update duration
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`
    }
    if (durationSec) {
      durationElement.textContent = `${durationMin}:${durationSec}`;
    }

    // update Current Time
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    currentTimeElement.textContent = `${currentMin}:${currentSec}`
  }
}
function jumpCurentTime(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// On load
loadSong(song[onLoadSong]);

//event 
playBtn.addEventListener('click', () => isPlaying ? pauseMusic() : playMusic());
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpCurentTime);


