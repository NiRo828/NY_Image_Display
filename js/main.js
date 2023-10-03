// ---- Variables ----
let currentPage = 1;
const apiKey = '39574753-1d7916569f8a04f1cc685f33f';

// ---- Event Listeners ----
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    currentPage = 1;
    performSearch();
});

document.getElementById('load-more').addEventListener('click', function() {
    currentPage++;
    performSearch();
});

document.querySelector('.modal-close').addEventListener('click', function() {
    document.getElementById('image-modal').classList.add('modal-hidden');
});

document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        document.getElementById('search-input').value = this.getAttribute('data-tag');
        performSearch();
    });
});

// ---- Functions ----
function performSearch() {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchInput)}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (currentPage === 1) {
                document.getElementById('image-results').innerHTML = '';
            }
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

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.innerHTML = `<h3>${image.user}</h3><p>Tags: ${image.tags}</p>`;

        const favoriteIcon = document.createElement('div');
        favoriteIcon.classList.add('favorite-icon');
        favoriteIcon.innerHTML = "&#9733;";
        favoriteIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('favorited');
        });

        imageCard.appendChild(img);
        imageCard.appendChild(overlay);
        imageCard.appendChild(favoriteIcon);
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
            modalInfo.textContent = this.querySelector('.overlay p').textContent;
            modal.classList.remove('modal-hidden');
        });
    });
}

// Initialize
addImageCardListeners();
