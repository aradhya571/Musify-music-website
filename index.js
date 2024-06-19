let songIndex = 0;
let audioElement = new Audio('audio/1.mp3');
let imgPlay = document.getElementsByClassName('play-img');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myplaybar');
let lastClickedImgPlay = null;
let nextSong = document.getElementById('nextSong');

// let songs = [
//     {songName: "i knew you were trouble", filePath: "audio/1.mp3", coverPath: "images/cover/s1.jpg" },
//     {songName: "nonsense", filePath: "audio/2.mp3", coverPath: "images/cover/s2.jpg" },
//     {songName: "obsessed", filePath: "audio/3.mp3", coverPath: "images/cover/s3.jpg" },
//     {songName: "Pehle Bhi Main", filePath: "audio/4.mp3", coverPath: "images/cover/s4.jpg" },
//     {songName: "wolves", filePath: "audio/5.mp3", coverPath: "images/cover/s5.jpg" },
//     {songName: "you belong with me", filePath: "audio/6.mp3", coverPath: "images/cover/s6.jpg" },
//     {songName: "you need to calm down", filePath: "audio/7.mp3", coverPath: "images/cover/s7.jpg" },
//     {songName: "you're not sorry", filePath: "audio/8.mp3", coverPath: "images/cover/s8.jpg" },   

// ] 

// Function to play the audio and update play/pause images
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
        imgPlay[i].addEventListener('click', () => {
            for (let j = 0; j < imgPlay.length; j++) {
                if (i !== j) {
                    imgPlay[j].src = './images/play.png';
                    myProgressBar.value = 0.1;
                }
            }
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                imgPlay[i].src = './images/pause.png';
                masterPlay.src = './images/play-bar-icons/pause.png';
                lastClickedImgPlay = imgPlay[i]; // Store the last clicked imgPlay
            } else {
                audioElement.pause();
                imgPlay[i].src = './images/play.png';
                masterPlay.src = './images/play-bar-icons/play-button.png';
            }
        });
    }
}

// Event listener for play-img elements
Array.from(document.getElementsByClassName("play-img")).forEach(element => {
    element.addEventListener('click', (e) => {
        const clickedElement = e.target;
        songIndex = clickedElement.id;
        audioElement.src = `audio/${element.id}.mp3`;
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
    songIndex = (songIndex + 1) % 10;
    audioElement.src = `audio/${songIndex}.mp3`;
    playAudio(songIndex);
    updatePlayImage(songIndex);
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
