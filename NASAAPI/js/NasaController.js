import Nasa from './Nasa.js';
import NasaView from './NasaView.js';
import { saveFavorites, loadFavorites } from './localStorage.js';


//----- Nasa controller -----//
export default class NasaController {
  constructor(keyword = 'favorites', mediaType = 'image',
  resultsId = 'results', detailsId = 'details',
  resultTitleId = 'result-title', detailTitleId = 'detail-title') {
    this.resultsId = resultsId;
    this.detailsId = detailsId;
    this.resultTitleId = resultTitleId;
    this.detailTitleId = detailTitleId;
    if(keyword == '') this.keyword = 'Favorites';
    else this.keyword = keyword;
    this.mediaType = mediaType;
    
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.resultsElement = null;
    this.detailsElement = null;
    this.resultTitleElement = null;
    this.detailTitleElement = null;

    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.nasa = null;     // don't init until keyword has been checked
    this.nasaView = new NasaView();

    // favorites
    this.favorites = loadFavorites();
    if(this.favorites === null) this.favorites = [];
  }

  init() {
    this.resultsElement = document.getElementById(this.resultsId);
    this.detailsElement = document.getElementById(this.detailsId);
    this.resultTitleElement = document.getElementById(this.resultTitleId);
    this.detailTitleElement = document.getElementById(this.detailTitleId);
    this.nasa = new Nasa();
    if(this.favorites === null) this.favorites = [];
    this.getResultsByKeyword(this.keyword, this.mediaType);
  }

  // this function gets request the results from the API/model then renders the results in the View
  // and also get the favorites based on keyword 'favorites'
  async getResultsByKeyword(keyword, mediaType) {
    // remove back button if it exists
    this.nasaView.removeBackButton();

    // hide details and show results
    this.nasaView.toggleDisplay(this.detailsElement, this.resultsElement,
      this.detailTitleElement, this.resultTitleElement);

    // let the user know the results are being fetched
    let waitMessage = `Please wait, we are fetching results for '${keyword}'`;
    this.nasaView.displayWaitMessage(this.resultsElement, waitMessage);

    let items = [];
    // get image items
    if(mediaType === 'image') {
      if(keyword.toLowerCase() === 'favorites') items = this.favorites.filter(item => item.href.includes('/image/')); 
      else items =  await this.nasa.getImagesByKeyword(keyword);
    }
    // get video items
    else if(mediaType === 'video') {
      if(keyword.toLowerCase() === 'favorites') items = this.favorites.filter(item => item.href.includes('/video/'));
      else items = await this.nasa.getVideosByKeyword(keyword);
    }
    // get video items
    else if(mediaType === 'audio') {
      if(keyword.toLowerCase() === 'favorites') items = this.favorites.filter(item => item.href.includes('/audio/'));
      else items = await this.nasa.getAudiosByKeyword(keyword);
    }

    this.nasaView.buildResultsList(this.resultsElement, items, this.resultTitleElement,
      this.keyword, this.mediaType);

    // let the results be clicked on the get item's details
    this.resultsElement.onclick = event => {
      event.preventDefault();
      if(event.target.id !== 'results' && event.target.id !== '') {   // don't do anything if user doesn't click an item
        // get the mediaType for the item clicked on
        const itemMediaType = event.target.dataset.media_type;

        // hide results and show details
        this.nasaView.toggleDisplay(this.resultsElement, this.detailsElement,
          this.resultTitleElement, this.detailTitleElement);

        // let the user know the details are coming
        waitMessage = `<div class="left-txt">The details are loading for:<p>${event.target.id}</p></div>`;
        this.nasaView.displayWaitMessage(this.detailsElement, waitMessage);

        // get the item that was clicked on
        let item = items.filter(item => item.data[0].nasa_id === event.target.id)[0];

        // display details for the item based on the item's mediaType
        if(itemMediaType === 'image') {
          // render the video details and get the media and heart in return
          const media_heart = this.nasaView.buildImageDetailsDisplay(this.detailsElement, this.detailTitleElement, item);
          // add the back button event listener
          this.responsiveBackButton();
          // add heart button event listener and other responsive features
          this.responsiveHeartButton(media_heart[0], media_heart[1], item);
          // make keywords list responsive
          this.responsiveKeywordList();
        }
        else if(itemMediaType === 'video') {
          // get the video's src
          const link = this.nasa.getVideoSourceByURL(item.href);
          link.then(link => {
            // add the video's src to the item
            item.links.push(link);
            // render the video details and get the media and heart in return
            const media_heart = this.nasaView.buildVideoDetailsDisplay(this.detailsElement, this.detailTitleElement, item);
            // add back button event listener
            this.responsiveBackButton();
            // add heart button event listener and other responsive features
            this.responsiveHeartButton(media_heart[0], media_heart[1], item);
            // make keywords list responsive
            this.responsiveKeywordList();
          });
        }
        else if(itemMediaType === 'audio') {
          // get the video's src
          const link = this.nasa.getAudioSourceByURL(item.href);
          link.then(link => {
            // add the video's src to the item
            item.src = link;
            // render the video details and get the media and heart in return
            const media_heart = this.nasaView.buildAudioDetailsDisplay(this.detailsElement, this.detailTitleElement, item);
            // add back button event listener
            this.responsiveBackButton();
            // add heart button event listener and other responsive features
            this.responsiveHeartButton(media_heart[0], media_heart[1], item);
            // make keywords list responsive
            this.responsiveKeywordList();
          });
        }
      }
      // scroll to top of window to display details in view
      window.scroll(0,120);
    }
  }

  // this function
  responsiveKeywordList() {
    const list = document.getElementById('keyword-list');

    list.addEventListener('click', event => {
      event.preventDefault();
      if(event.target.id === 'keyword-list') return;
      const keyword = event.target.innerHTML;
      this.keyword = keyword.trim();
      this.setKeywordInput(this.keyword);
      this.getResultsByKeyword(this.keyword, this.mediaType);
    });
  }

  // this function adds responsiveness to the back button with clicks
  responsiveBackButton() {
    // get back button
    const backButton = document.getElementById('back-btn');
    // back button event listener
    backButton.addEventListener('click', event => {
      event.preventDefault();
      // hide details and show results
      this.nasaView.toggleDisplay(this.detailsElement, this.resultsElement,
        this.detailTitleElement, this.resultTitleElement);
      // remove back button
      this.nasaView.removeBackButton();
    });
  }

  // this function give the heart button some responsiveness with clicks and css
  responsiveHeartButton(media, heart, item) {
    // don't show the heart until after the image loads
    media.addEventListener('load', () => {
      heart.classList.remove('hide');
    });
    // don't show the heart until after the video loads
    media.addEventListener('loadstart', () => {
      heart.classList.remove('hide');
    });

    // color the heart red or grey
    if(this.favorites.some(f => f.data[0].nasa_id === item.data[0].nasa_id)) heart.classList.add('remove-fav');
    else heart.classList.add('add-fav');

    // favorite button event listener
    heart.addEventListener('click', event => {
      event.preventDefault();
      // toggle heart button's css class
      event.target.classList.toggle('add-fav');
      event.target.classList.toggle('remove-fav');
      // update favorites
      this.updateFavorites(event, item);
      if(this.keyword.toLowerCase() === 'favorites') {
        this.nasaView.buildResultsList(this.resultsElement, this.favorites,
          this.resultTitleElement, this.keyword);
      }
    });
  }

  // this function will add an item to the favorites array
  // and save the array into localStorage
  updateFavorites(event, item) {
    if(this.favorites.some(f => f.data[0].nasa_id === item.data[0].nasa_id)) { // item is in favorites
      // find the index for the item
      const index = this.favorites.findIndex(f => {
        return f.data[0].nasa_id === item.data[0].nasa_id;
      })
      // remove the item from favorites
      this.favorites.splice(index, 1);
    }
    // item not in favorites so add it
    else this.favorites.push(item);
    // save the updated favorites array
    saveFavorites(this.favorites);
  }

  // this function
  setKeywordInput(keyword) {
    document.forms['search-form'].keyword.value = keyword;
  }
} // END OF NasaController Class //