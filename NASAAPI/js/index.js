import NasaController from "./NasaController.js";
import { saveFavorites, loadFavorites } from "./localStorage.js";
import { formatKeyword } from "./utilities.js";

// reload page when h1 title is clicked on
const h1 = document.querySelector('h1');
h1.addEventListener('click', event => {
    event.preventDefault();
    location.reload();
});


// this gets the keyword and mediaType that the user entered
// then initilizes the controller
const form = document.forms['search-form'];
form.addEventListener('submit', event => {
    event.preventDefault();
    const keyword = formatKeyword(form.keyword.value);
    const mediaType = form.mediaType.value;

    // create controller and initialize it
    const nasaController = new NasaController(keyword, mediaType);
    nasaController.init();
});