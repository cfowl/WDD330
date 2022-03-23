import Nasa from './Nasa.js';
import NasaView from './NasaView.js';

//----- Nasa controller -----//
export default class NasaController {
    constructor(resultsId, detailsId, keyword = 'favorites') {
      this.resultsId = resultsId;
      this.detailsId = detailsId;
      this.keyword = keyword;
      
      // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
      this.parentElement = null;
      this.detailsElement = null;

      // this is how our controller will know about the model and view...we add them right into the class as members.
      this.nasa = null;     // don't init until keyword has been checked
      this.nasaView = new NasaView();
    }
  
    async init() {
      // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
      this.parentElement = document.querySelector(this.parentId);
      this.detailsElement = document.querySelector(this.detailsId);
      this.nasa = new Nasa(this.keyword);
      // this.getQuakesByRadius(100);  // CHANGE THIS STILL !!!!!!!!!!!1
    }
  
    // async getQuakesByRadius(radius = 100) {
    //   // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.
  
    //   // remove back button if it exists
    //   if(document.querySelector('#backToQuakeListButton')) {
    //       const button = document.querySelector('#backToQuakeListButton');
    //       button.parentElement.removeChild(button);
    //   }
    //   //set loading message
    //   this.parentElement.innerHTML = 'Loading Quake List...';
    //   // get the list of quakes in the specified radius of the location
    //   const quakeList = await this.quakes.getEarthQuakesByRadius(this.position, this.radius);
    //   // render the list to html
    //   this.quakesView.renderQuakeList(quakeList, this.parentElement);
    //   // add a listener to the new list of quakes to allow drill down in to the details
    //   this.parentElement.onclick = event => {
    //     this.getQuakeDetails(event.target.dataset.id);
    //   };
    // }
  
    // async getQuakeDetails(quakeId) {
    //   // get the details for the quakeId provided from the model, then send them to the view to be displayed
    //   // also add the back button
    //   const quake = this.quakes.getQuakeById(quakeId);
    //   const buttonId = this.quakesView.renderQuake(quake, this.parentElement);
  
    //   // add back button event listener
    //   document.getElementById(buttonId).onclick = event => {
    //     event.preventDefault();
    //     this.getQuakesByRadius();
    //   }
    // }
  }