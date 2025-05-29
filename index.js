const cardsData = [
    {
        image: "https://via.placeholder.com/300x200/FF0000/FFFFFF?Text=Card+1",
        title: "Spider-Man: No Way Home",
        overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a superhero.",
        release_date: "2021-12-15",
        vote_average: "8.3"
    },
    {
        image: "https://via.placeholder.com/300x200/00FF00/FFFFFF?Text=Card+2",
        title: "Black Panther: Wakanda Forever",
        overview: "Queen Ramonda, Shuri, M’Baku and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.",
        release_date: "2022-11-11",
        vote_average: "7.4"
    },
    {
        image: "https://via.placeholder.com/300x200/0000FF/FFFFFF?Text=Card+3",
        title: "Avatar: The Way of Water",
        overview: "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns, he must fight a difficult war to protect their people.",
        release_date: "2022-12-14",
        vote_average: "7.8"
    }
];

function createCardComponent(cardData) {
    const cardTemplate = document.getElementById('card-template');
    if (!cardTemplate) {
        console.warn("Card template not found. Skipping card creation.");
        return null;
    }

    const cardClone = cardTemplate.content.cloneNode(true);
    const cardElement = cardClone.querySelector('.card');

    if (!cardElement) {
        console.warn("'.card' element not found in template. Skipping card creation.");
        return null;
    }

    const img = cardElement.querySelector('.card__image');
    const title = cardElement.querySelector('.card__title');
    const overview = cardElement.querySelector('.card__overview');
    const releaseDate = cardElement.querySelector('.card__release-date');
    const voteAverage = cardElement.querySelector('.card__vote-average');

    if (img) img.src = cardData.image || 'https://via.placeholder.com/300x200?text=No+Image';
    if (img) img.alt = cardData.title || 'Card image';
    if (title) title.textContent = cardData.title || 'No Title';
    if (overview) overview.textContent = cardData.overview || 'No overview available.';
    if (releaseDate) releaseDate.textContent = `Release Date: ${cardData.release_date || 'N/A'}`;
    if (voteAverage) voteAverage.textContent = `Vote Average: ${cardData.vote_average || 'N/A'}`;

    return cardElement;
}

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    if (!cardContainer) {
        console.warn("Card container '.card-container' not found.");
        return;
    }

    cardsData.forEach(card => {
        const cardComponent = createCardComponent(card);
        if (cardComponent) {
            cardContainer.appendChild(cardComponent);
        }
    });
});
