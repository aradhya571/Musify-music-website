let songIndex = 0;
let currSongIndex=0;
let audioElement = new Audio('audio/1.mp3');
let imgPlay = document.getElementsByClassName('play-img');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myplaybar');
let lastClickedImgPlay = null;
let nextSong = document.getElementById('nextSong');
let prevSong = document.getElementById('prevSong');
let playingImg = document.getElementById('playingImg');
let songName = document.getElementById('songName');


// Function to play the audio 
function playAudio(clickedIndex) {
    audioElement.src = `audio/${clickedIndex}.mp3`;
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

// Function to update play/pause images
function updatePlayImage(clickedImg) {
    for (let i = 0; i < imgPlay.length; i++) {
        if (imgPlay[i] !== clickedImg) {
            imgPlay[i].src = './images/play.png';
            myProgressBar.value = 0.1;
        }
    }
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        clickedImg.src = './images/pause.png';
        masterPlay.src = './images/play-bar-icons/pause.png';
        lastClickedImgPlay = clickedImg; // Store the last clicked imgPlay
        // Update playingImg src
        playingImg.src = `images/s${songIndex}.jpg`;
        updateSongName(songIndex);

    } else {
        audioElement.pause();
        clickedImg.src = './images/play.png';
        masterPlay.src = './images/play-bar-icons/play-button.png';
    }
}

// Event listener for play-img elements
Array.from(document.getElementsByClassName("play-img")).forEach(element => {
    element.addEventListener('click', (e) => {
        const clickedElement = e.target;
        console.log("hi",clickedElement);
        songIndex = clickedElement.id;
        currSongIndex = songIndex;
        // audioElement.src = `audio/${element.id}.mp3`;
        playAudio(songIndex); 
        updatePlayImage(clickedElement);
    });
});

// Event listener for masterPlay
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        if (lastClickedImgPlay) {
            lastClickedImgPlay.src = './images/pause.png';
        }
        masterPlay.classList.remove("play");
        masterPlay.src = './images/play-bar-icons/pause.png';
    } else {
        audioElement.pause();
        if (lastClickedImgPlay) {
            lastClickedImgPlay.src = './images/play.png';
        }
        masterPlay.src = './images/play-bar-icons/play-button.png';
    }
});


nextSong.addEventListener('click', () => {
    const currentImg = imgPlay[currSongIndex];
    currSongIndex++; // Increment the current song index
    if (currSongIndex >= imgPlay.length) {
        currSongIndex = 0; // Reset the index to 0 if it exceeds the length of the songs list
    }
     // Get the current HTML element
    playAudio(currSongIndex);
    updatePlayImage(currentImg);
    // Update playingImg src
    playingImg.src = `images/s${currSongIndex}.jpg`;
    updateSongName(currSongIndex);
});

prevSong.addEventListener('click', () => {
    
    currSongIndex--; // Increment the current song index
    if (currSongIndex >= imgPlay.length) {
        currSongIndex = 0; // Reset the index to 0 if it exceeds the length of the songs list
    }
    const currentImg = imgPlay[currSongIndex-1];
     // Get the current HTML element
    playAudio(currSongIndex);
    updatePlayImage(currentImg);
    // Update playingImg src
    playingImg.src = `images/s${currSongIndex}.jpg`;
    updateSongName(currSongIndex);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

function updateProgressBar() {
    const duration = audioElement.duration;
    const currentTime = audioElement.currentTime;
    const progress = (currentTime / duration) * 100;
    myProgressBar.value = progress;
}

// Event listener to update progress bar as the audio plays
audioElement.addEventListener('timeupdate', () => {
    updateProgressBar();
});

// Function to update the song name
function updateSongName(currSongIndex) {
    var titleElements = document.querySelectorAll(".card-title");
    var titleData = titleElements[currSongIndex-1].textContent;
    console.log(titleData);
    document.getElementById("songName").textContent = titleData;
}
