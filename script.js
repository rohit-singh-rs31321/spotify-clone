console.log("welcome to spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let previous = Array.from(document.getElementById("previous"));
let next = Array.from(document.getElementById("next"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
  {
    songName: "Ram Ram - MC Square",
    filePath: "song/1.mp3",
    coverPath: "  covers/1.jpg",
  },
  {
    songName: "4 Din - MC Square",
    filePath: "song/2.mp3",
    coverPath: "  covers/2.png",
  },
  {
    songName: "Chhore NCR Aale - MC Square",
    filePath: "song/3.mp3",
    coverPath: "  covers/3.jpg",
  },
  {
    songName: "Naina Ki Talwar - MC Square",
    filePath: "song/4.mp3",
    coverPath: "  covers/4.jpg",
  },
  {
    songName: "Chehre - MC Square",
    filePath: "song/5.mp3",
    coverPath: "  covers/5.jpg",
  },
  {
    songName: "Badmos Chora - MC Square",
    filePath: "song/6.mp3",
    coverPath: "  covers/6.jpg",
  },
  {
    songName: "Aadha Gyaan - MC Square",
    filePath: "song/7.mp3",
    coverPath: "  covers/7.jpg",
  },
  {
    songName: "101 - MC Square",
    filePath: "song/8.mp3",
    coverPath: "  covers/8.jpg",
  },
  {
    songName: "2 Woofer - MC Square",
    filePath: "song/9.mp3",
    coverPath: "  covers/9.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.setAttribute("src", "");
    masterPlay.setAttribute("src", "img/pause.png");
    gif.style.opacity = 1;
    songItemPlay();
  } else {
    audioElement.pause();
    masterPlay.setAttribute("src", "");
    masterPlay.setAttribute("src", "img/play.png");
    gif.style.opacity = 0;
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  songItemPlay.forEach((element) => {
    element.setAttribute("src", "");
    element.setAttribute("src", "img/play.png");
  });
};

songItemPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    songIndex = parseInt(e.target.id);

    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.currentTime = 0;
      makeAllPlays();
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.play();
      e.target.setAttribute("src", "");
      e.target.setAttribute("src", "img/pause.png");
      gif.style.opacity = 1;
      masterSongName.innerText = songs[songIndex].songName;
      masterPlay.setAttribute("src", "");
      masterPlay.setAttribute("src", "img/pause.png");
    } else {
      makeAllPlays();
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.pause();
      e.target.setAttribute("src", "");
      e.target.setAttribute("src", "img/play.png");
      gif.style.opacity = 0;
      masterPlay.setAttribute("src", "");
      masterPlay.setAttribute("src", "img/play.png");
    }
  });
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 8) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  gif.style.opacity = 1;
  audioElement.play();
  masterPlay.setAttribute("src", "");
  masterPlay.setAttribute("src", "img/pause.png");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  gif.style.opacity = 1;
  audioElement.play();
  masterPlay.setAttribute("src", "");
  masterPlay.setAttribute("src", "img/pause.png");
});
