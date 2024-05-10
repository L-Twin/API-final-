document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('random-image');
    const photographerName = document.getElementById('photographer-name');
    const likeButton = document.getElementById('like-button');
    const likesCounter = document.getElementById('likes-counter');
    const historyButton = document.getElementById('history-button');
    const historyContainer = document.getElementById('history-container');

    function fetchRandomImage() {
        fetch('https://api.unsplash.com/photos/random?client_id=DU-oMTtr3gFPEm7Bd3N5J63LneMzO6xJpy0gHeX9v5E')
            .then(response => response.json())
            .then(data => {
                imageContainer.src = data.urls.regular;
                photographerName.textContent = data.user.name;
                saveToHistory(data);
            })
            .catch(error => console.error(error));
    }

    function saveToHistory(imageData) {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(imageData);
        localStorage.setItem('history', JSON.stringify(history));
    }

    function showHistory() {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        historyContainer.innerHTML = ''; 
        history.forEach((data, index) => {
            let img = document.createElement('img');
            img.src = data.urls.thumb; 
            img.alt = 'Фото ' + (index + 1);
            historyContainer.appendChild(img);
        });
    }

    function handleLike() {
        let likes = parseInt(localStorage.getItem('likes')) || 0;
        likes++;
        localStorage.setItem('likes', likes);
        likesCounter.textContent = likes;
    }

    fetchRandomImage();

    likeButton.addEventListener('click', handleLike);

    historyButton.addEventListener('click', showHistory);

    likesCounter.textContent = localStorage.getItem('likes') || 0;
});