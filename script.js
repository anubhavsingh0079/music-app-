const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const muteBtn = document.getElementById("muteBtn");
const volumeHighIcon = document.getElementById("volumeHighIcon");
const volumeMuteIcon = document.getElementById("volumeMuteIcon");

const songs = {
  song1: {
    title: "Chemma Y Intro",
    artist: "chemma Y",
    cover: "https://i.scdn.co/image/ab67616d0000aa547a7cc8411fe9e9e3ac5487f5",
    audio: "m1.mp3"
  },

  song2: {
    title: "Love Salary",
    artist: "chemma Y",
    cover: "https://i.scdn.co/image/ab67616d0000aa547a7cc8411fe9e9e3ac5487f5",
    audio: "m2.mp3"
  },

  song3: {
    title: "Young GOAT ",
    artist: "chemma Y",
    cover: "https://i.scdn.co/image/ab67616d0000aa547a7cc8411fe9e9e3ac5487f5",
    audio: "m3.mp3"
    
  },

  song4: {
    title: "Workout",
    artist: "Various Artists",
    cover: "https://cover.mr-jatt.im/thumb/498100/Gym-De-Shokeen-1.jpg",
    audio: "m4.mp3"
  },
  song5: {
    title: "Money 2x",
    artist: "chemma Y",
    cover: "https://i.scdn.co/image/ab67616d0000aa547a7cc8411fe9e9e3ac5487f5",
    audio: "m5.mp3"
  },
   song6: {
    title: "Thodi se daru",
    artist: "AP dillon & sherya ghosal",
    cover: "https://cover.mr-jatt.im/thumb/514130/Thodi-Si-Daaru-1.jpg",
    audio: "m6.mp3"
  },
   song7: {
    title: "Billionaire-Baazaar",
    artist: "Yo Yo Honey singh",
    cover: "https://cover.vlcmusic.com.se/481069/Billionaire-Baazaar.webp",
    audio: "m7.mp3"
  },
   song8: {
    title: "ON TOP",
    artist: "Karan Aujla",
    cover: "https://cover.mr-jatt.im/thumb/503230/On-Top-1669295239.jpg",
    audio: "m8.mp3"
  },
  
  song9: {
   title: "Winning speech",
   artist: "Karan Aujla",
   cover: "https://cover.mr-jatt.im/thumb/510172/Winning-Speech-1.jpg",
   audio: "m9.mp3"
 },
  song10: {
   title: "Softly",
   artist: "Karan Aujla",
   cover: "https://cover.mr-jatt.im/thumb/503847/Take-It-Easy-1.jpg",
   audio: "m10.mp3"
 },
  song11: {
   title: "Levels",
   artist: " Sidhu Moosewala",
   cover: "https://cover.mr-jatt.im/thumb/501834/Levels-1.jpg",
   audio: "m11.mp3"
 },
};

let currentSong = null;
let lastVolume = volume.value;

audio.volume = volume.value / 100;

function updateVolumeIcon() {
  const muted = volume.value == 0;
  muteBtn.setAttribute("aria-label", muted ? "Unmute" : "Mute");
  volumeHighIcon.style.display = muted ? "none" : "block";
  volumeMuteIcon.style.display = muted ? "block" : "none";
}

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
  audio.muted = false;
  if (volume.value > 0) lastVolume = volume.value;
  updateVolumeIcon();
});

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;

  if (audio.muted) {
    lastVolume = volume.value || lastVolume;
    volume.value = 0;
  } else {
    volume.value = lastVolume || 70;
  }

  audio.volume = volume.value / 100;
  updateVolumeIcon();
});

function playSong(songId) {
  const song = songs[songId];

  currentSong = songId;

  document.getElementById("song-title").textContent = song.title;
  document.getElementById("artist").textContent = song.artist;
  document.getElementById("cover").src = song.cover;

  audio.src = song.audio;
  audio.play();

  playBtn.textContent = "⏸";
}

function togglePlay() {
  if (!currentSong) {
    playSong("song1");
    return;
  }

  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value =
      (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime =
      (progress.value / 100) * audio.duration;
  }
});

function nextSong() {
  if (currentSong === "song1") playSong("song2");
  else if (currentSong === "song2") playSong("song3");
  else if (currentSong === "song3") playSong("song4");
  else playSong("song1");
}

function previousSong() {
  if (currentSong === "song4") playSong("song3");
  else if (currentSong === "song3") playSong("song2");
  else if (currentSong === "song2") playSong("song1");
  else playSong("song4");
}

function findSong(query) {
  const cards = document.querySelectorAll(".card");
  const term = query.trim().toLowerCase();

  cards.forEach((card)=>{
    const name = card.querySelector("h3").textContent.toLowerCase();
    const genre = card.querySelector("p").textContent.toLowerCase();

    card.style.display =
      !term || name.includes(term) || genre.includes(term) ? "" : "none";
  });

  document.querySelector(".content h1").textContent =
    term ? `Results for "${query.trim()}"` : "Good Evening";
}