document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
});

function performSearch() {
    document.getElementById('loader').style.display = 'block';  // Show loader
    const searchInput = document.getElementById('search-input').value;
    const apiKey = '39574753-1d7916569f8a04f1cc685f33f';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchInput)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayImages(data.hits))
        .catch(error => console.log(error));
} 

function displayImages(images) {
    document.getElementById('loader').style.display = 'none';  // Hide loader once images are loaded
    const imageContainer = document.getElementById('image-results');
    imageContainer.innerHTML = '';

    images.forEach(image => {
        const imageElement = document.createElement('img');
        imageElement.src = image.webformatURL;
        imageElement.className = 'image-card';

        imageContainer.appendChild(imageElement);
    });
}

