// 1. Seleccione el container y la plantilla
const container = document.getElementById('container');
const cardTemplate = document.getElementById('card-template');

// Datos de ejemplo para las tarjetas
const cardsData = [
  {
    title: "Tarjeta Alpha",
    imageUrl: "https://via.placeholder.com/300x150/4CAF50/FFFFFF?Text=Alpha",
    body: "Descripción detallada de la tarjeta Alpha. Explorando nuevas posibilidades."
  },
  {
    title: "Tarjeta Beta",
    imageUrl: "https://via.placeholder.com/300x150/2196F3/FFFFFF?Text=Beta",
    body: "Información sobre la tarjeta Beta. Innovación y desarrollo continuo."
  },
  {
    title: "Tarjeta Gamma",
    imageUrl: "https://via.placeholder.com/300x150/FFC107/000000?Text=Gamma",
    body: "Características de la tarjeta Gamma. Diseño y funcionalidad optimizados."
  }
];

// 2. cree una funcion createCardComponent utilizando la plantilla.
/*
 * @param {string} title
 * @param {string} imageUrl
 * @param {string} body
 *
 * @return {Node} DocumentFragment o HTMLElement | null
 */
function createCardComponent(title, imageUrl, body) {
  // Es importante verificar que cardTemplate exista y sea un elemento template
  if (!cardTemplate || cardTemplate.tagName !== 'TEMPLATE') {
    console.error("La plantilla con id 'card-template' no fue encontrada o no es un elemento <template>.");
    return null;
  }
  // Clonar el contenido de la plantilla
  const cardClone = cardTemplate.content.cloneNode(true);

  // Modificar los elementos clonados
  const titleElement = cardClone.querySelector('.card__title');
  if (titleElement) {
    titleElement.textContent = title;
  } else {
    console.warn("Elemento '.card__title' no encontrado en la plantilla.");
  }

  const imageElement = cardClone.querySelector('.card__body__image');
  if (imageElement) {
    imageElement.style.backgroundImage = `url(${imageUrl})`;
  } else {
    console.warn("Elemento '.card__body__image' no encontrado en la plantilla.");
  }

  const bodyElement = cardClone.querySelector('.card__body__content');
  if (bodyElement) {
    bodyElement.textContent = body;
  } else {
    console.warn("Elemento '.card__body__content' no encontrado en la plantilla.");
  }

  return cardClone;
}

// 3. Cree componentes y 4. Agregue estos nuevos componentes al container
// Asegurarse de que el script se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Re-seleccionar container y cardTemplate dentro del DOMContentLoaded 
  // para asegurar que estén disponibles, aunque ya deberían estarlo si el script está al final del body.
  const currentContainer = document.getElementById('container');
  const currentCardTemplate = document.getElementById('card-template');

  if (currentContainer && currentCardTemplate) {
    if (cardsData && cardsData.length > 0) {
      cardsData.forEach(cardData => {
        const cardNode = createCardComponent(cardData.title, cardData.imageUrl, cardData.body);
        if (cardNode) {
          currentContainer.appendChild(cardNode);
        }
      });
    } else {
      console.warn("No hay datos en 'cardsData' para mostrar.");
    }
  } else {
    if (!currentContainer) console.error("El elemento 'container' no fue encontrado en el DOM.");
    if (!currentCardTemplate) console.error("El elemento 'card-template' no fue encontrado en el DOM.");
  }
});
