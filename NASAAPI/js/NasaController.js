import Nasa from './Nasa.js';
import NasaView from './NasaView.js';
import { saveFavorites, loadFavorites } from './localStorage.js';


//----- Nasa controller -----//
export default class NasaController {
    constructor(resultsId = 'results', detailsId = 'details', keyword = 'favorites', mediaType = 'image') {
      this.resultsId = resultsId;
      this.detailsId = detailsId;
      this.keyword = keyword;
      this.mediaType = mediaType;
      
      // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
      this.resultsElement = null;
      this.detailsElement = null;

      // this is how our controller will know about the model and view...we add them right into the class as members.
      this.nasa = null;     // don't init until keyword has been checked
      this.nasaView = new NasaView();

      // favorites
      this.favorites = loadFavorites();
    }
  
    async init() {
      this.resultsElement = document.querySelector(this.resultsId);
      this.detailsElement = document.querySelector(this.detailsId);
      this.nasa = new Nasa(this.keyword);
      if(this.favorites === null) this.favorites = [];
      // getResultsByKeyword()
    }

    async getResultsByKeyword(keyword, mediaType) {
      // do stuff
      // this function will get the keyword and mediaType from the View then request the results from the API/model then render the results in the View
      // this will also get the favorites based on keyword 'favorite' or 'favorites'
    }

    async getDetailsByItem() { // parameters??
      // do stuff
      // this function will get the item clicked on from the View and then display the details for it based on mediaType
    }

    addItemToFavorites(item) {
      // do stuff
      // this function will add an item to the favorites array and then save the array into localStorage
    }

    removeItemFromFavorites(item) {
      // do stuff
      // this function will remove an item from the favorites array and then save the array into lolalStorage
    }
  }