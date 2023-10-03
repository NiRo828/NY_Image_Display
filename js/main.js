// Variables
let currentPage = 1;

// Event Listeners
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
});

document.getElementById('load-more').addEventListener('click', function() {
    currentPage++;
    performSearch();
});

document.querySelector('.modal-close').addEventListener('click', function() {
    document.getElementById('image-modal').classList.add('modal-hidden');
});

// Functions
function performSearch() {
    document.getElementById('loader').style.display = 'block'; 
    const searchInput = document.getElementById('search-input').value;
    const apiKey = '39574753-1d7916569f8a04f1cc685f33f';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchInput)}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
            addImageCardListeners();
        })
        .catch(error => console.log(error));
} 

function displayImages(imageData) {
    const imageContainer = document.getElementById('image-results');

    imageData.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;

        const imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');
        imageInfo.innerHTML = `<h3>${image.user}</h3><p>Tags: ${image.tags}</p>`;

        imageCard.appendChild(img);
        imageCard.appendChild(imageInfo);
        imageContainer.appendChild(imageCard);
    });
}

function addImageCardListeners() {
    document.querySelectorAll('.image-card').forEach(card => {
        card.addEventListener('click', function() {
            const modal = document.getElementById('image-modal');
            const modalImage = document.getElementById('modal-image');
            const modalInfo = document.getElementById('modal-info');

            modalImage.src = this.querySelector('img').src;
            modalInfo.textContent = this.querySelector('.image-info p').textContent;
            modal.classList.remove('modal-hidden');
        });
    });
}

// Initialize
addImageCardListeners();
