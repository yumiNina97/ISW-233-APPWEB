

const Router = {
  init: () => {
    console.log("Router init");
    document.querySelectorAll("a.nav__link").forEach(a => {
      a.addEventListener("click", event => {
        event.preventDefault();
        const route = event.target.closest("a").getAttribute("href");
        Router.go(route);
      });
    });
    
    window.addEventListener("popstate", event => {
      Router.go(event.state.route, false);
    });
    
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageContent = "";
    const main = document.querySelector("main");

    // Simple routing logic, replace with actual page rendering
    switch (route) {
      case "/":
      
        main.innerHTML = "<h1>Home</h1><p>Welcome to the homepage.</p>"; // Placeholder
        break;
      case "/products":
     
        main.innerHTML = "<h1>Menu</h1><p>Our delicious offerings.</p>"; // Placeholder, assuming menu-page is not yet fully integrated here
        break;
      case "/restaurants":
        main.innerHTML = "<h1>Restaurants</h1><p>Find our locations.</p>";
        break;
      case "/order":
        main.innerHTML = "<h1>Order</h1><p>Your current order.</p>";
        break;
      default:
        main.innerHTML = "<h1>404 - Page Not Found</h1>";
        break;
    }

    // If using pageContent string:
    // if (main) {
    //   main.innerHTML = pageContent;
    // }

    window.scrollX = 0;
    window.scrollY = 0;
  }
};

export default Router;
