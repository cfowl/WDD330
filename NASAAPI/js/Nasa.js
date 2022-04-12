import { getJSON } from './utilities.js';


//----- NASA Model -----//
export default class Nasa {
  constructor() {
    this.baseUrl = `https://images-api.nasa.gov/search?keywords=`;
    this._results = [];
  }

  async getResultsByKeyword(keyword) {
    const keywordUrl = this.baseUrl + keyword;
    const results = await getJSON(keywordUrl);
    return results.collection.items;
  }

  async getImagesByKeyword(keyword) {
    const results = await this.getResultsByKeyword(keyword)
    this._results = results.filter(item => item.href.includes('/image/'));
    return this._results;
  }

  async getVideosByKeyword(keyword) {
    const results = await this.getResultsByKeyword(keyword)
    this._results = results.filter(item => item.href.includes('/video/'));
    return this._results;
  }

  async getAudiosByKeyword(keyword) {
    const results = await this.getResultsByKeyword(keyword)
    this._results = results.filter(item => item.href.includes('/audio/'));
    return this._results;
  }

  async getVideoSourceByURL(url) {
    const results = await getJSON(url);
    return results.find(i => i.includes('orig.mp4'));
  }

  async getAudioSourceByURL(url) {
    const results = await getJSON(url);
    return results.find(i => i.includes('~orig.'));
  }
}