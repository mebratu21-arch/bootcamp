// =================== CONFIGURATION ===================
const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const API_BASE_URL = "https://api.giphy.com/v1/gifs";

// DOM Elements
const gifForm = document.getElementById("gifForm");
const searchInput = document.getElementById("searchInput");
const gifContainer = document.getElementById("gifContainer");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// State
let gifs = JSON.parse(localStorage.getItem("giphyGifs")) || [];
let isLoading = false;

// =================== INITIALIZATION ===================
document.addEventListener("DOMContentLoaded", function() {
    // Load saved GIFs from localStorage
    loadSavedGifs();
    
    // Set up event listeners
    setupEventListeners();
    
    // Focus on search input
    searchInput.focus();
});

// =================== EVENT LISTENERS ===================
function setupEventListeners() {
    // Form submission
    gifForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        await fetchRandomGif();
    });
    
    // Delete all GIFs
    deleteAllBtn.addEventListener("click", deleteAllGifs);
    
    // Enter key for search
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            gifForm.dispatchEvent(new Event("submit"));
        }
    });
    
    // Clear search input on Escape
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            this.value = "";
            this.focus();
        }
    });
}

// =================== API FUNCTIONS ===================

/**
 * Fetches a random GIF from Giphy API based on search term
 */
async function fetchRandomGif() {
    const searchTerm = searchInput.value.trim();
    
    // Validate input
    if (!searchTerm) {
        showError("Please enter a search term (e.g., cat, dog, funny)");
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Construct API URL
        const apiUrl = `${API_BASE_URL}/random?api_key=${API_KEY}&tag=${encodeURIComponent(searchTerm)}&rating=g`;
        
        // Fetch data from API
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if GIF data exists
        if (!data.data || !data.data.images) {
            throw new Error("No GIF found for this category");
        }
        
        // Extract GIF data
        const gifData = {
            id: data.data.id,
            url: data.data.images.original.url,
            title: data.data.title || searchTerm,
            category: searchTerm,
            timestamp: new Date().toISOString()
        };
        
        // Add GIF to collection and display
        addGifToCollection(gifData);
        
        // Clear search input
        searchInput.value = "";
        
    } catch (error) {
        console.error("Error fetching GIF:", error);
        showError(`Failed to fetch GIF: ${error.message}`);
    } finally {
        // Hide loading state
        setLoadingState(false);
    }
}

// =================== GIF MANAGEMENT FUNCTIONS ===================

/**
 * Adds a GIF to the collection and updates display
 */
function addGifToCollection(gifData) {
    // Add to local array
    gifs.unshift(gifData); // Add to beginning for newest first
    
    // Limit collection size (optional, remove or adjust as needed)
    if (gifs.length > 50) {
        gifs = gifs.slice(0, 50);
    }
    
    // Save to localStorage
    saveGifsToStorage();
    
    // Update display
    renderGifs();
}

/**
 * Removes a specific GIF from the collection
 */
function removeGif(gifId) {
    // Filter out the GIF with matching ID
    gifs = gifs.filter(gif => gif.id !== gifId);
    
    // Save to localStorage
    saveGifsToStorage();
    
    // Update display
    renderGifs();
}

/**
 * Deletes all GIFs from the collection
 */
function deleteAllGifs() {
    // Confirm deletion
    if (gifs.length === 0) {
        showMessage("No GIFs to delete!");
        return;
    }
    
    if (confirm(`Are you sure you want to delete all ${gifs.length} GIFs?`)) {
        // Clear GIFs array
        gifs = [];
        
        // Clear localStorage
        localStorage.removeItem("giphyGifs");
        
        // Update display
        renderGifs();
        
        // Show confirmation
        showMessage("All GIFs have been deleted!");
    }
}

// =================== RENDERING FUNCTIONS ===================

/**
 * Renders all GIFs in the collection
 */
function renderGifs() {
    // Clear container
    gifContainer.innerHTML = "";
    
    // Show empty state if no GIFs
    if (gifs.length === 0) {
        showEmptyState();
        return;
    }
    
    // Create and append GIF elements
    gifs.forEach(gif => {
        const gifElement = createGifElement(gif);
        gifContainer.appendChild(gifElement);
    });
}

/**
 * Creates a DOM element for a GIF
 */
function createGifElement(gif) {
    const gifBox = document.createElement("div");
    gifBox.className = "gif-box";
    gifBox.dataset.gifId = gif.id;
    
    // Create image element
    const img = document.createElement("img");
    img.src = gif.url;
    img.alt = gif.title;
    img.loading = "lazy"; // Lazy loading for performance
    
    // Create category label
    const categoryLabel = document.createElement("div");
    categoryLabel.className = "category-label";
    categoryLabel.textContent = gif.category.toUpperCase();
    
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-gif-btn";
    deleteBtn.textContent = "DELETE";
    deleteBtn.title = "Delete this GIF";
    
    // Add click event to delete button
    deleteBtn.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent event bubbling
        removeGif(gif.id);
    });
    
    // Add double-click to enlarge (optional feature)
    gifBox.addEventListener("dblclick", function() {
        openGifInModal(gif.url);
    });
    
    // Assemble the GIF box
    gifBox.appendChild(img);
    gifBox.appendChild(deleteBtn);
    gifBox.appendChild(categoryLabel);
    
    return gifBox;
}

/**
 * Loads saved GIFs from localStorage on page load
 */
function loadSavedGifs() {
    if (gifs.length > 0) {
        renderGifs();
    } else {
        showEmptyState();
    }
}

/**
 * Shows empty state message
 */
function showEmptyState() {
    gifContainer.innerHTML = `
        <div class="empty-state">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎬</div>
            <h3>No GIFs Yet</h3>
            <p>Search for a category to get started!</p>
            <p style="color: #95a5a6; margin-top: 10px; font-size: 0.9rem;">
                Try: cat, dog, funny, sun, reaction
            </p>
        </div>
    `;
}

// =================== UI HELPER FUNCTIONS ===================

/**
 * Shows a loading state
 */
function setLoadingState(loading) {
    isLoading = loading;
    
    if (loading) {
        // Disable form elements
        gifForm.querySelector("button").disabled = true;
        searchInput.disabled = true;
        
        // Show loading indicator if no GIFs yet
        if (gifs.length === 0) {
            gifContainer.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>Fetching GIF from Giphy...</p>
                </div>
            `;
        }
    } else {
        // Re-enable form elements
        gifForm.querySelector("button").disabled = false;
        searchInput.disabled = false;
    }
}

/**
 * Shows an error message
 */
function showError(message) {
    // Create error element
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    
    // Insert at top of container
    gifContainer.insertBefore(errorElement, gifContainer.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

/**
 * Shows a temporary message
 */
function showMessage(message) {
    // Create message element
    const messageElement = document.createElement("div");
    messageElement.className = "error-message";
    messageElement.style.background = "#d4edda";
    messageElement.style.color = "#155724";
    messageElement.style.borderLeftColor = "#155724";
    messageElement.textContent = message;
    
    // Insert at top of container
    gifContainer.insertBefore(messageElement, gifContainer.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 3000);
}

/**
 * Opens a GIF in a modal (optional feature)
 */
function openGifInModal(gifUrl) {
    // Create modal overlay
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.8)";
    modal.style.zIndex = "1000";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    
    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.style.maxWidth = "90%";
    modalContent.style.maxHeight = "90%";
    
    // Create GIF image
    const modalImg = document.createElement("img");
    modalImg.src = gifUrl;
    modalImg.style.maxWidth = "100%";
    modalImg.style.maxHeight = "100%";
    modalImg.style.borderRadius = "10px";
    
    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "20px";
    closeBtn.style.background = "#e74c3c";
    closeBtn.style.color = "white";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "50%";
    closeBtn.style.width = "50px";
    closeBtn.style.height = "50px";
    closeBtn.style.fontSize = "1.5rem";
    closeBtn.style.cursor = "pointer";
    
    // Close modal on button click
    closeBtn.addEventListener("click", function() {
        document.body.removeChild(modal);
    });
    
    // Close modal on background click
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Assemble modal
    modalContent.appendChild(modalImg);
    modal.appendChild(modalContent);
    modal.appendChild(closeBtn);
    
    // Add modal to page
    document.body.appendChild(modal);
}

/**
 * Saves GIFs to localStorage
 */
function saveGifsToStorage() {
    try {
        localStorage.setItem("giphyGifs", JSON.stringify(gifs));
    } catch (error) {
        console.error("Failed to save GIFs to localStorage:", error);
        showError("Could not save GIFs (localStorage may be full)");
    }
}

// =================== UTILITY FUNCTIONS ===================

/**
 * Debounce function for limiting API calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optional: Auto-refresh random GIF every 10 seconds (commented out)
// setInterval(() => {
//     if (searchInput.value.trim()) {
//         fetchRandomGif();
//     }
// }, 10000);

// Export for testing if needed
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        fetchRandomGif,
        removeGif,
        deleteAllGifs,
        createGifElement
    };
}