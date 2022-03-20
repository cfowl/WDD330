import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';


//----- Quake controller -----//
export default class QuakesController {
  constructor(parent, startDate = '2020-03-14', endDate = '2020-03-22', radius = 100, position = null) {
    this.parent = parent;
    this.radius = radius;
    this.startDate = startDate;
    this.endDate = endDate;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };
    // this is how our controller will know about the model and view...we add them right into the class as members.
    // this.quakes = new Quake(this.startDate, this.endDate);
    this.quakes = null;     // don't init until dates have been checked
    this.quakesView = new QuakesView();
  }

  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
    this.parentElement = document.querySelector(this.parent);
    this.checkDates();
    this.quakes = new Quake(this.startDate, this.endDate);
    this.checkRadius();
    await this.initPos();
    this.getQuakesByRadius(100);
  }

  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        this.position = await getLocation();
        
        // if we get the location back then set the latitude and longitude into this.position
        this.position = {
            lat: this.position.coords.latitude,
            lon: this.position.coords.longitude
        };
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  checkDates() {
      let start = new Date(this.startDate);
      let end = new Date(this.endDate);
      if(end < start) [this.startDate, this.endDate] = [this.endDate, this.startDate];
  }

  checkRadius() {
      if(this.radius === '') this.radius = 100;
      else if(this.radius < 0) this.radius = 100;
  }

  async getQuakesByRadius(radius = 100) {
    // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.

    // remove back button if it exists
    if(document.querySelector('#backToQuakeListButton')) {
        const button = document.querySelector('#backToQuakeListButton');
        button.parentElement.removeChild(button);
    }
    //set loading message
    this.parentElement.innerHTML = 'Loading Quake List...';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(this.position, this.radius);
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.onclick = event => {
      this.getQuakeDetails(event.target.dataset.id);
    };
  }

  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided from the model, then send them to the view to be displayed
    // also add the back button
    const quake = this.quakes.getQuakeById(quakeId);
    const buttonId = this.quakesView.renderQuake(quake, this.parentElement);

    // add back button event listener
    document.getElementById(buttonId).onclick = event => {
      event.preventDefault();
      this.getQuakesByRadius();
    }
  }
}