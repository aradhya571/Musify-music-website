// Example songs array
const songs = [
    { id: 1, title: "Nonsense", cover: "./images/cover/s1.png" },
    { id: 2, title: "I Knew You Were Trouble", cover: "./images/cover/s2.png" },
    { id: 3, title: "Obsessed", cover: "./images/cover/s3.png" },
    { id: 4, title: "Pehle bhi Main", cover: "./images/cover/s4.png" },
    { id: 5, title: "7 rings", cover: "./images/cover/s5.png" },
    { id: 6, title: "Song 6", cover: "./images/cover/s6.png" },
    { id: 7, title: "Song 7", cover: "./images/cover/s7.png" },
    { id: 8, title: "Song 8", cover: "./images/cover/s8.png" },
    { id: 9, title: "Song 9", cover: "./images/cover/s9.png" },
    { id: 10, title: "Song 10", cover: "./images/cover/s10.png" }
];

document.addEventListener('DOMContentLoaded', function() {
    const sidebarFavBtn = document.getElementById('sidebarFavBtn');
    if (sidebarFavBtn) {
        sidebarFavBtn.addEventListener('click', showFavorites);
    }
});

let favorites = JSON.parse(localStorage.getItem('musifyFavorites') || '[]');

function isFavorite(songId) {
    return favorites.includes(Number(songId));
}

function toggleFavorite(songId) {
    songId = Number(songId);
    if (isFavorite(songId)) {
        favorites = favorites.filter(id => id !== songId);
    } else {
        favorites.push(songId);
    }
    localStorage.setItem('musifyFavorites', JSON.stringify(favorites));
    updateMasterFavIcon(songId);
}

// Attach event to master play bar SVG
document.addEventListener('DOMContentLoaded', function() {
    const masterFavBtn = document.getElementById('masterFavBtn');
    if (masterFavBtn) {
        masterFavBtn.addEventListener('click', function(e) {
            toggleFavorite(currSongIndex); // currSongIndex should be your current song's index/id
            e.stopPropagation();
        });
    }
});


// Only one definition!
function updateMasterFavIcon(songId) {
    const masterFavPath = document.getElementById('masterFavPath');
    if (masterFavPath) {
        masterFavPath.setAttribute('fill', isFavorite(songId) ? 'red' : '#fff');
    }
}

// Call this whenever the song changes:
function onSongChange(index) {
    const song = songs[index];
    if (song) {
        updateMasterFavIcon(song.id);
        // Also update currSongIndex if needed:
        currSongIndex = index;
    }
}

// In your masterFavBtn click handler, use:
toggleFavorite(songs[currSongIndex].id);

// In your player controls (next/prev), always call:
onSongChange(newIndex);

document.addEventListener('DOMContentLoaded', function() {
    const sidebarFavBtn = document.getElementById('sidebarFavBtn');
    if (sidebarFavBtn) {
        sidebarFavBtn.addEventListener('click', showFavorites);
    }
});

function showFavorites() {
    const container = document.querySelector('.container .row');
    if (!container) return;
    // Assuming you have a global `favorites` array and a `songs` array/object
    const favSongs = favorites.map(id => songs.find(song => song.id === id)).filter(Boolean);
    container.innerHTML = favSongs.length
        ? favSongs.map(song => `
            <div class="col-sm">
                <div class="card" style="width: 18rem;" data-id="${song.id}">
                    <img src="${song.cover}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${song.title}</h5>
                        <img class="play-img" src="./images/play.png" alt="play" id="${song.id}">
                    </div>
                </div>
            </div>
        `).join('')
        : '<div style="color:white;text-align:center;padding:2em;">No favorites yet.</div>';
}