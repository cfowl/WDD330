import { getJSON } from './utilities.js';
import { loadFavorites, saveFavorites } from './localStorage.js';


//----- NASA Model -----//
export default class Nasa {
  constructor() {
    this.baseUrl = `https://images-api.nasa.gov/search?keywords=`;
    this._results = [];
  }

  async getResultsByKeyword(keyword) {
    const keywordUrl = this.baseUrl += keyword;
    const results = await getJSON(keywordUrl);
    return results.collection.items;
  }

  async getImagesByKeyword(keyword) {
    console.log('function getImagesByKeyword() called!');
    const results = await this.getResultsByKeyword(keyword)
    this._results = results.filter(item => item.href.includes('/image/'));
    return this._results;
  }

  async getVideosByKeyword(keyword) {
    console.log('function getVideosByKeyword() called!');
    const results = await this.getResultsByKeyword(keyword)
    this._results = results.filter(item => item.href.includes('/video/'));
    return this._results;
  }

  async getVideoSourceByURL(url) {
    console.log('function getVideoSourceByURL() called!');
    const results = await getJSON(url);
    return results.find(i => i.includes('orig.mp4'));
  }
}