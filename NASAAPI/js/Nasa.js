import { getJSON } from './utilities.js';


//----- NASA Model -----//
export default class Nasa {
  constructor(keyword = 'galaxy') {
    this.url = `https://images-api.nasa.gov/search?keywords=${keyword}`;
    // this is where we will store the last batch of retrieved results in the model. I don't always do this... in this case the api doesn't have an endpoint to request one quake.
    this._results = []; // do we need this?? see comments above...
    this._favorites = []; // ??
  }

  async getImagesByKeyword(keyword) {
    // do stuff
  }

  async getVideosByKeyword(keyword) {
    // do stuff
  }

  async getVideoSourceByURL(url) {
    // do stuff
  }
}