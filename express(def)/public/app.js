import { initRouter } from "./src/router.js";
initRouter();

window.addEventListener("popstate", () => { //(?)
    router(location.pathname);
});