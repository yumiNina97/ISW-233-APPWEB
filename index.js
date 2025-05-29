import { Router } from "./services/Router.js";

globalThis.app = {};
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
});
