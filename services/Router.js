// ... import your new page components ...
// import SiteHeader from '../blocks/siteHeader/siteHeader.js'; // Example path
// import SiteFooter from '../blocks/siteFooter/siteFooter.js'; // Example path
// import MenuPage from '../blocks/menuPage/menuPage.js';
// import OrderPage from '../blocks/orderPage/orderPage.js';
// import RestaurantsPage from '../blocks/restaurantsPage/restaurantsPage.js';

const Router = {
  init: () => {
    document.querySelectorAll("a.nav__link").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        Router.go(href);
      });
    });
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    // Optionally, render static parts like header/footer here if they are not in index.html directly
    // const headerContainer = document.querySelector('header'); // Or another placeholder
    // if (headerContainer) headerContainer.appendChild(document.createElement('site-header'));
    
    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    const mainContentArea = document.querySelector("main");

    // Clear previous content
    if (mainContentArea.firstElementChild) {
      mainContentArea.firstElementChild.remove();
    }

    switch (route) {
      case "/":
      case "/products": // Assuming / and /products show the same menu page
        pageElement = document.createElement("menu-page");
        break;
      case "/restaurants":
        pageElement = document.createElement("restaurants-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/products/")) {
          pageElement = document.createElement("product-detail-page"); // New component for detail
          const productId = route.substring(route.lastIndexOf("/") + 1);
          pageElement.dataset.productId = productId; // Pass ID to the component
        } else {
          pageElement = document.createElement("h1"); // Or a <not-found-page> component
          pageElement.textContent = "404 - Page Not Found";
        }
        break;
    }

    if (pageElement) {
      mainContentArea.appendChild(pageElement);
    }

    window.scrollTo(0, 0); // Corrected scroll
  },
};

export default Router;
