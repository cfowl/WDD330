import QuakesController from "./QuakesController.js";


// this gets the dates and radius that the user entered
// then initilizes the controller
const form = document.forms['searchParams'];
form.addEventListener('submit', event => {
    event.preventDefault();
    const startDate = form['startDate'].value;
    const endDate = form['endDate'].value;
    const radius = form['userRadius'].value;

    // create controller and initialize it
    const quakeController = new QuakesController('#quakeList', startDate, endDate, radius);
    quakeController.init();
});