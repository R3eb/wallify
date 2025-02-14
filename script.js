const API_KEY = 'CmZipkt7hCNhUaik0OqUhDBn1qhOw3ND26IV3WLQ67L37JaDfcVAxk6e';
const BASE_URL = 'https://api.pexels.com/v1';

async function fetchWallpapers(query = 'neon', perPage = 100) {
    const url = `${BASE_URL}/search?query=${query}&per_page=${perPage}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: API_KEY,
            },
        });
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        return [];
    }
}

function loadWallpapers(photos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 

    photos.forEach(photo => {
        const wallpaperDiv = document.createElement('div');
        wallpaperDiv.classList.add('wallpaper');

        const img = document.createElement('img');
        img.src = photo.src.large; 
        img.alt = photo.photographer; 

        const downloadLink = document.createElement('a');
        downloadLink.href = photo.src.original; 
        downloadLink.download = `wallpaper-${photo.id}.jpg`; 
        downloadLink.classList.add('download-btn');
        downloadLink.innerText = "Download";

        wallpaperDiv.appendChild(img);
        wallpaperDiv.appendChild(downloadLink);

        gallery.appendChild(wallpaperDiv);
    });
}

async function handleSearch(query) {
    const photos = await fetchWallpapers(query);
    loadWallpapers(photos);
}

document.querySelector('.search-button').addEventListener('click', () => {
    const query = document.querySelector('.search-input').value;
    handleSearch(query);
});

document.querySelector('.search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = document.querySelector('.search-input').value;
        handleSearch(query);
    }
});

document.querySelector('.explore .filter.styled-select').addEventListener('change', (event) => {
    const query = event.target.value; 
    handleSearch(query);
});

document.addEventListener('DOMContentLoaded', async () => {
    const photos = await fetchWallpapers('neon'); 
    loadWallpapers(photos);
});