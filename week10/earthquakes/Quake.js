import { getJSON } from './utilities.js';


//----- Quake Model -----//
export default class Quake {
  constructor(startDate = '2020-03-14', endDate = '2020-03-22') {
    this.baseUrl =
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}`;
    // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }

  async getEarthQuakesByRadius(position, radius = 100) {
    // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
    const geoURL = this.baseUrl + `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
    this._quakes = await getJSON(geoURL);
    return this._quakes;
  }
  
  getQuakeById(id) {
    // filter this._quakes for the record identified by id and return it
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}