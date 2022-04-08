//----- This was my entire code before I broke it up into MVC (or at least did my best) -----//

// import { saveFavorites, loadFavorites } from "./localStorage.js";
// import { getJSON } from "./utilities.js"


// // display width and heigth to size layout and CSS display
// console.log(window.innerWidth + ' x ' + window.innerHeight);

// const h1 = document.querySelector('h1');

// const form = document.forms['search-form'];

// const results = document.getElementById('results');
// const details = document.getElementById('details');
// const resultTitle = document.getElementById('result-title');
// const detailTitle = document.getElementById('detail-title');

// let currentResults = [];

// let favorites = loadFavorites();
// if(favorites === null) favorites = [];

// function getKeyWord() {
//     const keyword = form.keyword.value.trim();
//     let keywords = keyword.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
//     return keywords;
// }

// function getMediaType() {
//     return form.mediaType.value;
// }

// h1.addEventListener('click', event => {
//     event.preventDefault();
//     location.reload();
// });

// form.addEventListener('submit', event => {
//     event.preventDefault();
//     const keyword = getKeyWord();
//     const mediaType = getMediaType();
//     document.getElementById('info').classList.remove('empty');    
//     getInfo(keyword, mediaType);
// });

// function getInfo(keyword, media) {

//     // toggle hidden for small screens
//     results.classList.remove('small-hide');
//     resultTitle.classList.remove('small-hide');
//     details.classList.add('small-hide');
//     detailTitle.classList.add('small-hide');

//     // set h2 innerHTML to the keyword
//     resultTitle.innerHTML = keyword;

//     // set results innerHTML to let the user know the results are coming
//     results.innerHTML = `Please wait, we are fetching results for '${keyword}'`;

//     // remove back button if it exists
//     if(document.getElementById('back-btn')) {
//         const bb = document.getElementById('back-btn');
//         bb.parentElement.innerHTML = '';
//     }

//     // if the user wants to display the favorites list then only do that
//     if(keyword === 'Favorites') {
//         buildFavoritesList(results); // CHANGE WHERE THIS HAPPENS??
//         return;
//     }
//     // otherwise keep going


//     const url = `https://images-api.nasa.gov/search?keywords=${keyword}`;
    
//     const json = getJSON(url);
//     json.then(data => {
//         let items = data.collection.items;
//         currentResults = data.collection.items;
//         if(media === 'image') {
//             items = items.filter(item => item.href.includes('/image/'));
//         } else if(media === 'video') {
//             items = items.filter(item => item.href.includes('/video/'));
//         }

//         // contains AUDIOS also...

//         buildResultList(results, items);
//     })
//     .then(() => {
//         results.onclick = event => {

//             // show description on hover??
//             if(event.target.id !== 'results' && event.target.id !== '') {

//                 const mediaType = event.target.dataset.media_type;

//                 let item = currentResults.filter(r => r.data[0].nasa_id === event.target.id);
//                 item = item[0];

//                 // const results = document.getElementById('results');
//                 // const details = document.getElementById('details');
//                 results.classList.add('small-hide');
//                 resultTitle.classList.add('small-hide');
//                 details.classList.remove('small-hide');
//                 detailTitle.classList.remove('small-hide');

//                 // let the user know the details are coming
//                 details.innerHTML = `<div class="left-txt">The details are loading for:<p>${event.target.id}</p></div>`;

//                 // Display image or video details <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<--------------------
//                 if(mediaType === 'image') {
//                     buildImageDetailsDisplay(details, item); // WENT TO THIS POINT ....................... //

//                     // don't show the favorite heart until after the image loads
//                     const imgElement = document.getElementById('img-container').firstElementChild;
//                     imgElement.addEventListener('load', event => {
//                         document.getElementById('fav-button').classList.remove('hide');
//                     });

//                     const container = document.getElementById('back-container');
//                     buildBackButton(container);

//                     // add to favorites
//                     const favButton = document.getElementById('fav-button');
//                     favButton.addEventListener('click', event => {
//                         event.preventDefault();
//                         const id = item.data[0].nasa_id;
//                         // const title = item.data[0].title;
//                         // const fav = {id: id, title: title};


//                         // item already saved, remove it from favorites
//                         if(favorites.some(f => f.data[0].nasa_id === id)) {
//                             event.target.classList.toggle('add-fav');
//                             event.target.classList.toggle('remove-fav');
//                             // event.target.innerHTML = 'Add to Favorites';
//                             const index = favorites.findIndex(f => {
//                                 return f.data[0].nasa_id === id;
//                             })
//                             favorites.splice(index, 1);
//                         }
//                         // add item to favorites
//                         else {
//                             event.target.classList.toggle('add-fav');
//                             event.target.classList.toggle('remove-fav');
//                             // event.target.innerHTML = 'Remove from Favorites';
//                             favorites.push(item);
//                         }
                        
//                         // save the favorites array after adding or removing
//                         saveFavorites(favorites);
//                     });
//                 }
//                 else if(mediaType === 'video') {
//                     const videoJSON = getJSON(item.href);
//                     videoJSON.then(data => {
//                         const link = data.find(i => i.includes('orig.mp4'));
//                         item.links.push(link);

//                         buildVideoDetailsDisplay(details, item);

//                         // don't show the favorite heart until after the video loads
//                         const vidElement = document.getElementById('vid-container').firstElementChild;
//                         vidElement.addEventListener('loadstart', event => {
//                             document.getElementById('fav-button').classList.remove('hide');
//                         });

//                         const container = document.getElementById('back-container');
//                         buildBackButton(container);

//                         // add to favorites
//                         const favButton = document.getElementById('fav-button');
//                         favButton.addEventListener('click', event => {
//                             event.preventDefault();
//                             const id = item.data[0].nasa_id;
//                             // const title = item.data[0].title;
//                             // const fav = {id: id, title: title};


//                             // item already saved, remove it from favorites
//                             if(favorites.some(f => f.data[0].nasa_id === id)) {
//                                 event.target.classList.toggle('add-fav');
//                                 event.target.classList.toggle('remove-fav');
//                                 // event.target.innerHTML = 'Add to Favorites';
//                                 const index = favorites.findIndex(f => {
//                                     return f.data[0].nasa_id === id;
//                                 })
//                                 favorites.splice(index, 1);
//                             }
//                             // add item to favorites
//                             else {
//                                 event.target.classList.toggle('add-fav');
//                                 event.target.classList.toggle('remove-fav');
//                                 // event.target.innerHTML = 'Remove from Favorites';
//                                 favorites.push(item);
//                             }
                            
//                             // save the favorites array after adding or removing
//                             saveFavorites(favorites);
//                         });
//                     });
//                 }
//             }

//         }
//     });
// }

// function getJSON(url) {
//     return fetch(url)
//     .then(response => {
//         if(response.ok) {
//             return response.json();
//         } else {
//             throw Error(response.statusText);
//         }
//     })
//     .catch(error => {
//         console.log(`Something went wrong with fetch ${error}`);
//     })
// }

// function buildResultList(element, items) {
//     // reset the innerHTML
//     results.innerHTML = '';

//     // iterate through the results and add them to the page
//     items.forEach(item => {
//         console.log(item);
        
//         // save pertinent info into dataset
//         element.innerHTML += `
//             <li class='result-link' id="${item.data[0].nasa_id}"
//             data-media_type="${item.data[0].media_type}"
//             title="Click to see the details"
//             >${item.data[0].title}</li>`;

        
//         // data-href="${item.href}"
//         // data-title="${item.data[0].title}"
//         // data-description="${item.data[0].description}" THIS WAS MESSING UP BECUASE OF HTML IN STRING
//         // data-keywords='${item.data[0].keywords}'
//     });

//     // if no results were added to the page then notify the user
//     if(!results.hasChildNodes()) results.innerHTML = 'There were no results for your search. Please try again.';
// }

// function buildBackButton(container) {
//     // don't build the back button if one already exists
//     if(document.getElementById('back-btn')) {
//         return;
//     }
//     // build the button and append it to its container
//     const button = document.createElement('button');
//     button.id = 'back-btn';
//     button.title = 'Go back'
//     button.innerHTML = '<i class="fa fa-arrow-left"></i>';
//     container.appendChild(button);

//     // back button event listener
//     button.addEventListener('click', event => {
//         event.preventDefault();
//         const keyword = getKeyWord();
//         const mediaType = getMediaType();
//         getInfo(keyword, mediaType);
//     });
// }

// function buildImageDetailsDisplay(display, item) {
//     // reset display
//     display.innerHTML = '';

//     // separate keywords by commas
//     const keywords = item.data[0].keywords.toString().replaceAll(',', ', ');

//     // image title
//     document.getElementById('detail-title').innerHTML = item.data[0].title;
//     // image
//     const imgDiv = document.createElement('div');
//     imgDiv.id = 'img-container';
//     imgDiv.innerHTML = `<img src="${item.links[0].href}">`;
//     // display.innerHTML = `<img src="${item.links[0].href}">`;

//     // favorite button
//     const favButton = document.createElement('i');
//     favButton.id = 'fav-button';
//     favButton.classList.add('fa', 'fa-heart-o', 'hide');
//     if(favorites.some(f => f.data[0].nasa_id === item.data[0].nasa_id)) {
//         favButton.classList.add('remove-fav');
//         // favButton.innerHTML = 'Remove from Favorites';
//     } else {
//         favButton.classList.add('add-fav');
//         // favButton.innerHTML = 'Add to Favorites';
//     }

//     imgDiv.appendChild(favButton);

//     const detailDiv = document.createElement('div');
//     detailDiv.classList.add('left-txt');
//     detailDiv.innerHTML += `<h3>Details</h3><p>${item.data[0].description}</p>`;
//     detailDiv.innerHTML += `<h3>Keywords</h3><p>${keywords}</p>`;

//     display.appendChild(imgDiv);
//     // display.appendChild(favButton);
//     display.appendChild(detailDiv);
// }

// function buildVideoDetailsDisplay(display, item) { // Display video details <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<------------
//     console.log('building video display');
//     console.log(item);

//     // reset display
//     display.innerHTML = '';

//     // separate keywords by commas
//     const keywords = item.data[0].keywords.toString().replaceAll(',', ', ');

//     // image title
//     document.getElementById('detail-title').innerHTML = item.data[0].title;
//     // image
//     const vidDiv = document.createElement('div');
//     vidDiv.id = 'vid-container';
//     vidDiv.innerHTML = `<video controls autoplay">
//                             <source src="${item.links.slice(-1).pop()}" type="video/mp4">
//                             Sorry, your browser does not support the video tag.
//                         </video>`;

//     // favorite button
//     const favButton = document.createElement('i');
//     favButton.id = 'fav-button';
//     favButton.classList.add('fa', 'fa-heart-o', 'hide');
//     if(favorites.some(f => f.data[0].nasa_id === item.data[0].nasa_id)) {
//         favButton.classList.add('remove-fav');
//     } else {
//         favButton.classList.add('add-fav');
//     }

//     vidDiv.appendChild(favButton);

//     const detailDiv = document.createElement('div');
//     detailDiv.classList.add('left-txt');
//     detailDiv.innerHTML += `<h3>Details</h3><p>${item.data[0].description}</p>`;
//     detailDiv.innerHTML += `<h3>Keywords</h3><p>${keywords}</p>`;

//     display.appendChild(vidDiv);
//     display.appendChild(detailDiv);
// }

// function buildFavoritesList(display) {
//     if(favorites.length === 0) {
//         display.innerHTML = 'You haven not saved anything to your favorites. Please try again.';
//         return;
//     }

//     // reset the innerHTML
//     display.innerHTML = '';

//     // iterate through the results and add them to the page
//     favorites.forEach(fav => {
//         display.innerHTML += `
//             <li class='image-link' id="${fav.data[0].nasa_id}"
//             data-media_type="${fav.data[0].media_type}"
//             title="Click to see more details"
//             >${fav.data[0].title}</li>`;
//     });

//     display.onclick = event => {
//         event.preventDefault();
        
//         if(event.target.id !== 'results' && event.target.id !== '') {

//             const mediaType = event.target.dataset.media_type;
            
//             let item = favorites.filter(r => r.data[0].nasa_id === event.target.id);
//             item = item[0];

//             // const results = document.getElementById('results');
//             // const details = document.getElementById('details');
//             results.classList.add('small-hide');
//             resultTitle.classList.add('small-hide');
//             details.classList.remove('small-hide');
//             detailTitle.classList.remove('small-hide');

//             if(mediaType === 'image') {
//                 buildImageDetailsDisplay(details, item);

//                 // don't show the favorite heart until after the image loads
//                 const imgElement = document.getElementById('img-container').firstElementChild;
//                 imgElement.addEventListener('load', event => {
//                     document.getElementById('fav-button').classList.remove('hide');
//                 });

//                 const container = document.getElementById('back-container');
//                 buildBackButton(container);

//                 // add to favorites
//                 const favButton = document.getElementById('fav-button');
//                 favButton.addEventListener('click', event => {
//                     event.preventDefault();
//                     const id = item.data[0].nasa_id;
//                     // const title = item.data[0].title;
//                     // const fav = {id: id, title: title};


//                     // remove item from favorites if it's in the list
//                     if(favorites.some(f => f.data[0].nasa_id === id)) {
//                         event.target.classList.toggle('add-fav');
//                         event.target.classList.toggle('remove-fav');
//                         // event.target.innerHTML = 'Add to Favorites';
//                         const index = favorites.findIndex(f => {
//                             return f.data[0].nasa_id === id;
//                         })
//                         favorites.splice(index, 1);
//                     }
//                     // add item to favorites if it's not in the list
//                     else {
//                         event.target.classList.toggle('add-fav');
//                         event.target.classList.toggle('remove-fav');
//                         // event.target.innerHTML = 'Remove from Favorites';
//                         favorites.push(item);
//                     }
                    
//                     // save the favorites array after adding or removing
//                     saveFavorites(favorites);
//                 });
//             }
//             else if(mediaType === 'video') {
//                 buildVideoDetailsDisplay(details, item);

//                 // don't show the favorite heart until after the image loads
//                 const vidElement = document.getElementById('vid-container').firstElementChild;
//                 vidElement.addEventListener('loadstart', event => {
//                     document.getElementById('fav-button').classList.remove('hide');
//                 });

//                 const container = document.getElementById('back-container');
//                 buildBackButton(container);

//                 // add to favorites
//                 const favButton = document.getElementById('fav-button');
//                 favButton.addEventListener('click', event => {
//                     event.preventDefault();
//                     const id = item.data[0].nasa_id;
//                     // const title = item.data[0].title;
//                     // const fav = {id: id, title: title};

//                     // remove item from favorites if it's in the list
//                     if(favorites.some(f => f.data[0].nasa_id === id)) {
//                         event.target.classList.toggle('add-fav');
//                         event.target.classList.toggle('remove-fav');
//                         // event.target.innerHTML = 'Add to Favorites';
//                         const index = favorites.findIndex(f => {
//                             return f.data[0].nasa_id === id;
//                         })
//                         favorites.splice(index, 1);
//                     }
//                     // add item to favorites if it's not in the list
//                     else {
//                         event.target.classList.toggle('add-fav');
//                         event.target.classList.toggle('remove-fav');
//                         // event.target.innerHTML = 'Remove from Favorites';
//                         favorites.push(item);
//                     }
                    
//                     // save the favorites array after adding or removing
//                     saveFavorites(favorites);
//                 });
//             } 
//         }
//     }
// }