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

  async init() {
    this.resultsElement = document.getElementById(this.resultsId);
    this.detailsElement = document.getElementById(this.detailsId);
    this.resultTitleElement = document.getElementById(this.resultTitleId);
    this.detailTitleElement = document.getElementById(this.detailTitleId);
    this.nasa = new Nasa();
    if(this.favorites === null) this.favorites = [];
    this.getResultsByKeyword(this.keyword, this.mediaType);
  }

  // this function gets request the results from the API/model then renders the results in the View, and then more
  async getResultsByKeyword(keyword, mediaType) {
    // this will also get the favorites based on keyword 'favorite' or 'favorites'
    console.log('function getResultsByKeyword() called!');

    // remove back button if it exists
    this.nasaView.removeBackButton();

    // hide details and show results
    this.nasaView.toggleDisplay(this.detailsElement, this.resultsElement, this.detailTitleElement, this.resultTitleElement);

    // let the user know the results are being fetched
    let waitMessage = `Please wait, we are fetching results for '${keyword}'`;
    this.nasaView.displayWaitMessage(this.resultsElement, waitMessage);

    let items = [];
    if(keyword.toLowerCase() === 'favorites') items = this.favorites;
    else if(mediaType === 'image') items =  await this.nasa.getImagesByKeyword(keyword);
    else if (mediaType === 'video') items = await this.nasa.getVideosByKeyword(keyword);

    this.nasaView.buildResultsList(this.resultsElement, items, this.resultTitleElement, this.keyword);

    // let the results be clicked on the get details
    this.resultsElement.onclick = event => {
      event.preventDefault();
      if(event.target.id !== 'results' && event.target.id !== '') {

        const itemMediaType = event.target.dataset.media_type;

        // hide results and show details
        this.nasaView.toggleDisplay(this.resultsElement, this.detailsElement, this.resultTitleElement, this.detailTitleElement);

        // let the user know the details are coming
        waitMessage = `<div class="left-txt">The details are loading for:<p>${event.target.id}</p></div>`;
        this.nasaView.displayWaitMessage(this.detailsElement, waitMessage);

        let item = items.filter(item => item.data[0].nasa_id === event.target.id)[0];

        // display details for the item based on the item's mediaType
        let imgFav;
        if(itemMediaType === 'image') {
          imgFav = this.nasaView.buildImageDetailsDisplay(this.detailsElement, this.detailTitleElement, item);

          // don't show the favorite heart until after the image loads
          imgFav[0].addEventListener('load', event => {
            imgFav[1].classList.remove('hide');
          });
          imgFav[0].addEventListener('loadstart', event => {
            imgFav[1].classList.remove('hide');
          });
          
          // back button event listener
          const backButton = document.getElementById('back-btn');
          backButton.addEventListener('click', event => {
            event.preventDefault();
            // hide details and show results
            this.nasaView.toggleDisplay(this.detailsElement, this.resultsElement, this.detailTitleElement, this.resultTitleElement);
            // remove back button
            this.nasaView.removeBackButton();
          });

          // check if item exists in favorites or not
          if(this.favorites.some(f => f.data[0].nasa_id === item.data[0].nasa_id)) {
            imgFav[1].classList.add('remove-fav');
            // favButton.innerHTML = 'Remove from Favorites';
          } else {
            imgFav[1].classList.add('add-fav');
          }

          // favorite button event listener
          imgFav[1].addEventListener('click', event => {
            event.preventDefault();
            const id = item.data[0].nasa_id;

            // remove item from favorites if it's in the list
            if(this.favorites.some(f => f.data[0].nasa_id === id)) {
              event.target.classList.toggle('add-fav');
              event.target.classList.toggle('remove-fav');
              // event.target.innerHTML = 'Add to Favorites';
              const index = this.favorites.findIndex(f => {
                return f.data[0].nasa_id === id;
              })
              this.favorites.splice(index, 1);
            }
            // add item to favorites if it's not in the list
            else {
              event.target.classList.toggle('add-fav');
              event.target.classList.toggle('remove-fav');
              this.favorites.push(item);
            }
            
            // save the favorites array after adding or removing
            saveFavorites(this.favorites);
          });
        }
        else if(itemMediaType === 'video') {
          const link = this.nasa.getVideoSourceByURL(item.href);
          link.then(link => {
            item.links.push(link);
            imgFav = this.nasaView.buildVideoDetailsDisplay(this.detailsElement, this.detailTitleElement, item);
            
            // don't show the favorite heart until after the image loads
            imgFav[0].addEventListener('load', event => {
              imgFav[1].classList.remove('hide');
            });
            imgFav[0].addEventListener('loadstart', event => {
              imgFav[1].classList.remove('hide');
            });

            // bakc button event listener
            const backButton = document.getElementById('back-btn');
            backButton.addEventListener('click', event => {
              event.preventDefault();
              // hide details and show results
              this.nasaView.toggleDisplay(this.detailsElement, this.resultsElement, this.detailTitleElement, this.resultTitleElement);
              // remove back button
              this.nasaView.removeBackButton();
            });

            // check if item exists in favorites or not
            if(this.favorites.some(f => f.data[0].nasa_id === item.data[0].nasa_id)) {
              imgFav[1].classList.add('remove-fav');
              // favButton.innerHTML = 'Remove from Favorites';
            } else {
              imgFav[1].classList.add('add-fav');
            }
            
            // favorite button event listener
            imgFav[1].addEventListener('click', event => {
              event.preventDefault();
              const id = item.data[0].nasa_id;

              // remove item from favorites if it's in the list
              if(this.favorites.some(f => f.data[0].nasa_id === id)) {
                event.target.classList.toggle('add-fav');
                event.target.classList.toggle('remove-fav');
                // event.target.innerHTML = 'Add to Favorites';
                const index = this.favorites.findIndex(f => {
                  return f.data[0].nasa_id === id;
                })
                this.favorites.splice(index, 1);
              }
              // add item to favorites if it's not in the list
              else {
                event.target.classList.toggle('add-fav');
                event.target.classList.toggle('remove-fav');
                this.favorites.push(item);
              }
              
              // save the favorites array after adding or removing
              saveFavorites(this.favorites);
            });

          });
        }
      }
    }
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