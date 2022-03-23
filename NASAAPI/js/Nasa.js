import { getJSON } from './utilities.js';


//----- NASA Model -----//
export default class Nasa {
  constructor(keyword = 'galaxy') {
    this.url = `https://images-api.nasa.gov/search?keywords=${keyword}`;
    // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._results = [];
  }

//   async getEarthQuakesByRadius(position, radius = 100) {
//     // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
//     const geoURL = this.baseUrl + `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
//     this._quakes = await getJSON(geoURL);
//     return this._quakes;
//   }
  
//   getQuakeById(id) {
//     // filter this._quakes for the record identified by id and return it
//     return this._quakes.features.filter(item => item.id === id)[0];
//   }
}