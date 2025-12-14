// ==================== App State & Configuration ====================
const state = {
    currentPlaylist: {
        name: '',
        songs: []
    },
    searchResults: [],
    savedPlaylists: [],
    currentTrackIndex: 0,
    isPlaying: false
};

// Deezer API configuration (free, no API key needed for basic search)
const DEEZER_API = 'https://api.deezer.com/search?q=';

// DOM Elements
const elements = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    searchResults: document.getElementById('searchResults'),
    resultsCount: document.getElementById('resultsCount'),
    playlistName: document.getElementById('playlistName'),
    createPlaylistBtn: document.getElementById('createPlaylistBtn'),
    playlistSongs: document.getElementById('playlistSongs'),
    currentPlaylistName: document.getElementById('currentPlaylistName'),
    savePlaylistBtn: document.getElementById('savePlaylistBtn'),
    clearPlaylistBtn: document.getElementById('clearPlaylistBtn'),
    savedPlaylistsList: document.getElementById('savedPlaylistsList'),
    audioPlayer: document.getElementById('audioPlayer'),
    playBtn: document.getElementById('playBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    nowPlaying: document.getElementById('nowPlaying'),
    trackArtist: document.getElementById('trackArtist')
};

// ==================== Local Storage Functions ====================
// Load saved playlists from localStorage
function loadSavedPlaylists() {
    const saved = localStorage.getItem('musicAppPlaylists');
    if (saved) {
        state.savedPlaylists = JSON.parse(saved);
        renderSavedPlaylists();
    }
}

// Save playlists to localStorage
function savePlaylistsToStorage() {
    localStorage.setItem('musicAppPlaylists', JSON.stringify(state.savedPlaylists));
}

// ==================== Search Functionality ====================
// Fetch songs from Deezer API
async function searchSongs(query) {
    if (!query.trim()) {
        alert('Please enter a search term');
        return;
    }
    
    try {
        // Show loading state
        elements.searchResults.innerHTML = '<p class="empty-msg">Searching...</p>';
        
        // Fetch data from Deezer API
        const response = await fetch(`${DEEZER_API}${encodeURIComponent(query)}&limit=20`);
        const data = await response.json();
        
        // Process and store results
        state.searchResults = data.data || [];
        renderSearchResults();
    } catch (error) {
        console.error('Search error:', error);
        elements.searchResults.innerHTML = '<p class="empty-msg">Error searching for songs. Please try again.</p>';
    }
}

// Render search results to the UI
function renderSearchResults() {
    if (state.searchResults.length === 0) {
        elements.searchResults.innerHTML = '<p class="empty-msg">No songs found. Try a different search.</p>';
        elements.resultsCount.textContent = '(0)';
        return;
    }
    
    elements.resultsCount.textContent = `(${state.searchResults.length})`;
    
    // Create HTML for each song result
    const songsHTML = state.searchResults.map((song, index) => `
        <div class="song-item" data-index="${index}">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist.name} • ${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}</div>
            </div>
            <div class="song-controls">
                <button class="preview-btn" title="Preview" data-preview="${song.preview}">
                    <i class="fas fa-play"></i>
                </button>
                <button class="add-to-playlist-btn" title="Add to Playlist">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    elements.searchResults.innerHTML = songsHTML;
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const previewUrl = this.getAttribute('data-preview');
            playPreview(previewUrl, this.closest('.song-item'));
        });
    });
    
    document.querySelectorAll('.add-to-playlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const songIndex = this.closest('.song-item').getAttribute('data-index');
            addSongToPlaylist(parseInt(songIndex));
        });
    });
}

// ==================== Playlist Management ====================
// Create a new playlist
function createPlaylist() {
    const name = elements.playlistName.value.trim();
    
    if (!name) {
        alert('Please enter a playlist name');
        return;
    }
    
    // Set the current playlist
    state.currentPlaylist = {
        name: name,
        songs: []
    };
    
    // Update UI
    elements.currentPlaylistName.textContent = name;
    renderPlaylistSongs();
    updatePlaylistControls();
    
    // Clear input
    elements.playlistName.value = '';
}

// Add a song to the current playlist
function addSongToPlaylist(songIndex) {
    if (!state.currentPlaylist.name) {
        alert('Please create or select a playlist first');
        return;
    }
    
    const song = state.searchResults[songIndex];
    
    // Check if song is already in playlist
    if (state.currentPlaylist.songs.some(s => s.id === song.id)) {
        alert('This song is already in the playlist');
        return;
    }
    
    // Add song to playlist
    state.currentPlaylist.songs.push({
        id: song.id,
        title: song.title,
        artist: song.artist.name,
        preview: song.preview,
        duration: song.duration
    });
    
    // Update UI
    renderPlaylistSongs();
    updatePlaylistControls();
}

// Remove a song from the current playlist
function removeSongFromPlaylist(index) {
    state.currentPlaylist.songs.splice(index, 1);
    renderPlaylistSongs();
    updatePlaylistControls();
}

// Render songs in the current playlist
function renderPlaylistSongs() {
    if (state.currentPlaylist.songs.length === 0) {
        elements.playlistSongs.innerHTML = '<p class="empty-msg">No songs in this playlist yet</p>';
        return;
    }
    
    const songsHTML = state.currentPlaylist.songs.map((song, index) => `
        <div class="playlist-song-item">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-controls">
                <button class="preview-btn" title="Preview" data-preview="${song.preview}">
                    <i class="fas fa-play"></i>
                </button>
                <button class="remove-song-btn" title="Remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    elements.playlistSongs.innerHTML = songsHTML;
    
    // Add event listeners
    document.querySelectorAll('.playlist-song-item .preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const previewUrl = this.getAttribute('data-preview');
            playPreview(previewUrl, this.closest('.playlist-song-item'));
        });
    });
    
    document.querySelectorAll('.remove-song-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeSongFromPlaylist(index);
        });
    });
}

// Update playlist control buttons state
function updatePlaylistControls() {
    const hasSongs = state.currentPlaylist.songs.length > 0;
    const hasName = state.currentPlaylist.name !== '';
    
    elements.savePlaylistBtn.disabled = !(hasSongs && hasName);
    elements.clearPlaylistBtn.disabled = !hasSongs;
}

// Save the current playlist
function saveCurrentPlaylist() {
    if (!state.currentPlaylist.name || state.currentPlaylist.songs.length === 0) {
        alert('Playlist must have a name and at least one song');
        return;
    }
    
    // Check if a playlist with this name already exists
    const existingIndex = state.savedPlaylists.findIndex(p => p.name === state.currentPlaylist.name);
    
    if (existingIndex !== -1) {
        // Update existing playlist
        state.savedPlaylists[existingIndex] = {...state.currentPlaylist};
    } else {
        // Add new playlist
        state.savedPlaylists.push({...state.currentPlaylist});
    }
    
    // Save to localStorage and update UI
    savePlaylistsToStorage();
    renderSavedPlaylists();
    
    alert(`Playlist "${state.currentPlaylist.name}" saved!`);
}

// Clear the current playlist
function clearCurrentPlaylist() {
    if (!confirm('Clear the current playlist? This cannot be undone.')) return;
    
    state.currentPlaylist.songs = [];
    renderPlaylistSongs();
    updatePlaylistControls();
}

// Render saved playlists
function renderSavedPlaylists() {
    if (state.savedPlaylists.length === 0) {
        elements.savedPlaylistsList.innerHTML = '<p class="empty-msg">No saved playlists yet</p>';
        return;
    }
    
    const playlistsHTML = state.savedPlaylists.map((playlist, index) => `
        <div class="saved-playlist-item">
            <div class="saved-playlist-info">
                <div class="saved-playlist-name">${playlist.name}</div>
                <div class="saved-playlist-song-count">${playlist.songs.length} songs</div>
            </div>
            <div class="saved-playlist-controls">
                <button class="load-playlist-btn" data-index="${index}" title="Load Playlist">
                    <i class="fas fa-folder-open"></i>
                </button>
                <button class="delete-playlist-btn" data-index="${index}" title="Delete Playlist">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    elements.savedPlaylistsList.innerHTML = playlistsHTML;
    
    // Add event listeners
    document.querySelectorAll('.load-playlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            loadPlaylist(index);
        });
    });
    
    document.querySelectorAll('.delete-playlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deletePlaylist(index);
        });
    });
}

// Load a saved playlist
function loadPlaylist(index) {
    if (index < 0 || index >= state.savedPlaylists.length) return;
    
    state.currentPlaylist = {...state.savedPlaylists[index]};
    
    // Update UI
    elements.currentPlaylistName.textContent = state.currentPlaylist.name;
    renderPlaylistSongs();
    updatePlaylistControls();
}

// Delete a saved playlist
function deletePlaylist(index) {
    if (!confirm(`Delete playlist "${state.savedPlaylists[index].name}"?`)) return;
    
    state.savedPlaylists.splice(index, 1);
    savePlaylistsToStorage();
    renderSavedPlaylists();
}

// ==================== Audio Player Functions ====================
// Play a song preview
function playPreview(previewUrl, songElement) {
    if (!previewUrl) {
        alert('No preview available for this song');
        return;
    }
    
    // Update audio player source
    elements.audioPlayer.src = previewUrl;
    
    // Update now playing info
    const songTitle = songElement.querySelector('.song-title').textContent;
    const songArtist = songElement.querySelector('.song-artist').textContent.split('•')[0].trim();
    
    elements.nowPlaying.textContent = songTitle;
    elements.trackArtist.textContent = songArtist;
    
    // Play the audio
    elements.audioPlayer.play();
    state.isPlaying = true;
    updatePlayButton();
    
    // Highlight the playing song
    document.querySelectorAll('.song-item, .playlist-song-item').forEach(el => {
        el.style.background = '';
    });
    songElement.style.background = 'rgba(76, 201, 240, 0.2)';
}

// Update play/pause button
function updatePlayButton() {
    const icon = elements.playBtn.querySelector('i');
    if (state.isPlaying) {
        icon.className = 'fas fa-pause';
    } else {
        icon.className = 'fas fa-play';
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (!elements.audioPlayer.src) return;
    
    if (state.isPlaying) {
        elements.audioPlayer.pause();
    } else {
        elements.audioPlayer.play();
    }
    
    state.isPlaying = !state.isPlaying;
    updatePlayButton();
}

// Play next track in playlist (if available)
function playNextTrack() {
    if (state.currentPlaylist.songs.length === 0) return;
    
    state.currentTrackIndex = (state.currentTrackIndex + 1) % state.currentPlaylist.songs.length;
    const nextSong = state.currentPlaylist.songs[state.currentTrackIndex];
    
    if (nextSong.preview) {
        // Simulate clicking the play button for the next song
        const playlistItems = document.querySelectorAll('.playlist-song-item');
        if (playlistItems.length > state.currentTrackIndex) {
            const playBtn = playlistItems[state.currentTrackIndex].querySelector('.preview-btn');
            if (playBtn) playBtn.click();
        }
    }
}

// Play previous track in playlist
function playPreviousTrack() {
    if (state.currentPlaylist.songs.length === 0) return;
    
    state.currentTrackIndex = state.currentTrackIndex > 0 ? state.currentTrackIndex - 1 : state.currentPlaylist.songs.length - 1;
    const prevSong = state.currentPlaylist.songs[state.currentTrackIndex];
    
    if (prevSong.preview) {
        const playlistItems = document.querySelectorAll('.playlist-song-item');
        if (playlistItems.length > state.currentTrackIndex) {
            const playBtn = playlistItems[state.currentTrackIndex].querySelector('.preview-btn');
            if (playBtn) playBtn.click();
        }
    }
}

// ==================== Event Listeners ====================
// Search button click
elements.searchBtn.addEventListener('click', () => {
    searchSongs(elements.searchInput.value);
});

// Enter key in search input
elements.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchSongs(elements.searchInput.value);
    }
});

// Create playlist button
elements.createPlaylistBtn.addEventListener('click', createPlaylist);

// Enter key in playlist name input
elements.playlistName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createPlaylist();
    }
});

// Save playlist button
elements.savePlaylistBtn.addEventListener('click', saveCurrentPlaylist);

// Clear playlist button
elements.clearPlaylistBtn.addEventListener('click', clearCurrentPlaylist);

// Audio player controls
elements.playBtn.addEventListener('click', togglePlayPause);
elements.prevBtn.addEventListener('click', playPreviousTrack);
elements.nextBtn.addEventListener('click', playNextTrack);

// Audio player events
elements.audioPlayer.addEventListener('play', () => {
    state.isPlaying = true;
    updatePlayButton();
});

elements.audioPlayer.addEventListener('pause', () => {
    state.isPlaying = false;
    updatePlayButton();
});

elements.audioPlayer.addEventListener('ended', () => {
    state.isPlaying = false;
    updatePlayButton();
    // Auto-play next track if available
    if (state.currentPlaylist.songs.length > 0) {
        setTimeout(playNextTrack, 1000);
    }
});

// ==================== Initialize App ====================
// Load saved playlists when app starts
loadSavedPlaylists();

// Set default playlist name
elements.playlistName.value = `My Playlist ${new Date().getDate()}-${new Date().getMonth()+1}`;