import { addToCart } from "../../services/Order.js";

let cardObserver = null;

const mutationObserverCallback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'characterData') {
      console.log('Text content changed:');
      console.log('Old value:', mutation.oldValue); 
      console.log('New value:', mutation.target.textContent);
      console.log('Target element:', mutation.target.parentElement); 
     
    }
  }
};
if (!globalThis.app) globalThis.app = {};
if (!globalThis.app.cardObserver) {
  globalThis.app.cardObserver = new MutationObserver(mutationObserverCallback);
  console.log("MutationObserver initialized.");
}

export default class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.editableDescriptionElement = null; 
  }

  connectedCallback() {
    const template = document.getElementById("product-card-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h3").textContent = product.name;
    this.querySelector("img").src = `${product.imageUrl}`;
    
    this.editableDescriptionElement = this.querySelector("p.product-card__description");
    this.editableDescriptionElement.textContent = `${product.description}`;
    this.editableDescriptionElement.setAttribute("contenteditable", "true"); 
    
    this.querySelector("p.product-card__price").textContent = `${product.price}`;

    
    if (this.editableDescriptionElement && globalThis.app.cardObserver) {
      globalThis.app.cardObserver.observe(this.editableDescriptionElement, {
        characterData: true, 
        subtree: true,      
        characterDataOldValue: true 
      });
      console.log(`Observing product: ${product.name}`);
    }

    this.querySelector(".product-card").addEventListener("click", (event) => {

      if (event.target.tagName.toLowerCase() == "button") {
        addToCart(product.id);
      } else if (!event.target.hasAttribute('contenteditable')) { 
        app.router.go(`/products/${product.id}`);
      }
      // event.preventDefault(); 
    });
  }

  disconnectedCallback() {
   
  }
}

customElements.define("product-item", ProductItem);
