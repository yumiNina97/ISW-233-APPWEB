
const viewRenderers = {
  "/": () => {
    const el = document.createElement("h1");
    el.textContent = "Home Page - Cards Would Go Here";
 
    return el;
  },
  "/todo": () => {
    const el = document.createElement("h1");
    el.textContent = "TODO App Page";
  
    return el;
  },
  "/404": () => {
    const el = document.createElement("h1");
    el.textContent = "404 - Page Not Found";
    return el;
  }
};

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
      Router.go(event.state ? event.state.route : location.pathname, false);
    });

    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageRenderer = viewRenderers[route] || viewRenderers["/404"];
    const pageElement = pageRenderer();

    const mainContentArea = document.querySelector("main"); 
    if (mainContentArea) {
     
      while (mainContentArea.firstChild) {
        mainContentArea.removeChild(mainContentArea.firstChild);
      }
      // Add new content
      if (pageElement) {
        mainContentArea.appendChild(pageElement);
      }
    } else {
      console.error("Router: <main> element not found in the DOM.");
    }

    window.scrollTo(0, 0); // Corrected scroll to top
  },
};

export default Router;
