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


//Search functionality (does not properly work)
const searchInput = document.querySelector('.search-input');
const notFoundMsg = document.getElementById('not-found-msg');

if (searchInput && notFoundMsg) {
    // Position the not-found message below the search bar
    searchInput.parentElement.style.position = 'relative';
    //notFoundMsg.style.position = 'absolute';
    notFoundMsg.style.left = '0';
    notFoundMsg.style.right = '0';

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.home-col');
        let found = false;
        cards.forEach(card => {
            const title = card.querySelector('.card-title');
            if (title && title.textContent.toLowerCase().includes(query)) {
                card.style.display = '';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });
        // Show or hide the "Song not found" message below the search bar
        notFoundMsg.style.display = (query && !found) ? 'block' : 'none';
    });
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

// ...existing code...

// Repeat functionality
let repeatMode = 0; // 0 = off, 1 = repeat once, 2 = repeat twice
let repeatCounter = 0;
const repeatBtn = document.getElementById('repeatBtn');
const repeatCount = document.getElementById('repeatCount');

if (repeatBtn && repeatCount) {
    repeatBtn.addEventListener('click', () => {
        repeatMode = (repeatMode + 1) % 3;
        repeatCounter = repeatMode;
        if (repeatMode === 0) {
            repeatCount.style.display = 'none';
            repeatBtn.style.filter = '';
        } else {
            repeatCount.textContent = repeatMode;
            repeatCount.style.display = 'inline';
            repeatBtn.style.filter = 'brightness(0.5) sepia(1) hue-rotate(90deg)';
        }
    });
}

audioElement.addEventListener('ended', () => {
    if (repeatMode > 0 && repeatCounter > 1) {
        repeatCounter--;
        audioElement.currentTime = 0;
        audioElement.play();
        repeatCount.textContent = repeatCounter;
    } else if (repeatMode === 1 && repeatCounter === 1) {
        repeatCounter = 0;
        repeatCount.style.display = 'none';
        repeatBtn.style.filter = '';
        nextSong.click();
    } else {
        nextSong.click();
    }
});



// User Profile Area with name update
document.addEventListener('DOMContentLoaded', function() {
    const userProfileArea = document.getElementById('user-profile-area');
    const user = JSON.parse(localStorage.getItem('musifyUser'));

    if (user && user.name) {
        const firstName = user.name.split(' ')[0];
        userProfileArea.innerHTML = `
            <div id="profile-menu-wrapper" style="position:relative;display:flex;align-items:center;gap:10px;cursor:pointer;">
                <span style="display:inline-block;width:36px;height:36px;border-radius:50%;background:#999;overflow:hidden;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#999"/>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
                    </svg>
                </span>
                <span style="color:white;font-weight:bold;">Hello, ${firstName}</span>
                <div id="profile-dropdown" style="display:none;position:absolute;top:48px;right:0;background:#222;color:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);min-width:120px;z-index:100;">
                    <button id="logout-btn" style="width:100%;background:none;border:none;color:white;padding:10px 16px;text-align:left;cursor:pointer;">Logout</button>
                </div>
            </div>
        `;

        // Dropdown toggle logic
        const wrapper = document.getElementById('profile-menu-wrapper');
        const dropdown = document.getElementById('profile-dropdown');
        wrapper.addEventListener('click', function(e) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            e.stopPropagation();
        });
        document.addEventListener('click', function() {
            dropdown.style.display = 'none';
        });

        // Logout logic
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('musifyUser');
            window.location.href = 'login.html';
        });
    } else {
        userProfileArea.innerHTML = `
            <a href="login.html" style="text-decoration: none; color: white;">
                <button type="button" class="btn btn-outline-light me-2">Login</button>
                <button type="button" class="btn btn-danger">Sign-up</button>
            </a>
        `;
    }
    
});