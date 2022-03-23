

//----- NASA View -----//
export default class NasaView {
    buildFavoritesList(display) {
        if(favorites.length === 0) {
            display.innerHTML = 'You haven not saved anything to your favorites. Please try again.';
            return;
        }
    
        // reset the innerHTML
        display.innerHTML = '';
    
        // iterate through the results and add them to the page
        favorites.forEach(f => {
            display.innerHTML += `<li class='image-link' id="${f.data[0].nasa_id}">${f.data[0].title}</li>`;
        });
    
        display.onclick = event => {
            event.preventDefault();
            
            if(event.target.id !== 'results' && event.target.id !== '') {
                
                let item = favorites.filter(r => r.data[0].nasa_id === event.target.id);
                item = item[0];
    
                // const results = document.getElementById('results');
                // const details = document.getElementById('details');
                results.classList.add('hidden');
                details.classList.remove('hidden');
    
                buildDetailsDisplay(details, item);
    
                const container = document.getElementById('back-container');
                buildBackButton(container);
    
                // add to favorites                     SAVE FAV AS THE ENTIRE ITEM SO WE CAN CLICK ON IT AND DO SOMETHING!!
                const favButton = document.getElementById('fav-button');
                favButton.addEventListener('click', event => {
                    event.preventDefault();
                    const id = item.data[0].nasa_id;
                    // const title = item.data[0].title;
                    // const fav = {id: id, title: title};
    
    
                    // item already saved, remove it from favorites
                    if(favorites.some(f => f.data[0].nasa_id === id)) {
                        event.target.classList.toggle('add-fav');
                        event.target.classList.toggle('remove-fav');
                        event.target.innerHTML = 'Add to Favorites';
                        const index = favorites.findIndex(f => {
                            return f.data[0].nasa_id === id;
                        })
                        favorites.splice(index, 1);
                    }
                    // add item to favorites
                    else {
                        event.target.classList.toggle('add-fav');
                        event.target.classList.toggle('remove-fav');
                        event.target.innerHTML = 'Remove from Favorites';
                        favorites.push(item);
                    }
                    
                    // save the favorites array after adding or removing
                    saveFavorites(favorites);
                });
            }
        }
    }

    buildResultList(element, items) {
        // reset the innerHTML
        results.innerHTML = '';
    
        // iterate through the results and add them to the page
        items.forEach(item => {
            //console.log(item.links[0].href);
            console.log(item);
            //if(item.data[0].media_type === 'image') {       // do something for video and audio ???????????????????????
            element.innerHTML += `
                <li class='image-link' id="${item.data[0].nasa_id}">${item.data[0].title}
                    <!--href ="${item.links[0].href}" COMMENTED OUT OF LINK-->
                    <!--${item.data[0].description} COMMENTED OUT-->
                    <!--<img src="${item.links[0].href}" class="image"> COMMENTED OUT-->
                </li>`;
        });
    
        // if no results were added to the page then notify the user
        if(!results.hasChildNodes()) results.innerHTML = 'There were no results for your search. Please try again.';
    }
    
    buildBackButton(container) {
        // build the button and append it to its container
        const button = document.createElement('button');
        button.id = 'back-btn';
        button.innerHTML = 'Back';
        container.appendChild(button);
    
        // back button event listener
        button.addEventListener('click', event => {
            event.preventDefault();
            const keyword = getKeyWord();
            getInfo(keyword);                            
        });
    }
    
    buildDetailsDisplay(display, item) {
        const keywords = item.data[0].keywords.toString().replaceAll(',', ', ');
        console.log(item);
    
        document.getElementById('result-title').innerHTML = item.data[0].title;
    
        display.innerHTML = `<img src="${item.links[0].href}">`;
    
        const favButton = document.createElement('button');
        favButton.id = 'fav-button';
        if(favorites.some(f => f.data[0].nasa_id === item.data[0].nasa_id)) {
            favButton.classList.add('remove-fav');
            favButton.innerHTML = 'Remove from Favorites';
        } else {
            favButton.classList.add('add-fav');
            favButton.innerHTML = 'Add to Favorites';
        }
    
        const div = document.createElement('div');
        div.classList.add('align-left');
        div.innerHTML += `<h3>Details</h3><p>${item.data[0].description}</p>`;
        div.innerHTML += `<h3>Keywords</h3><p>${keywords}</p>`;
    
        display.appendChild(favButton);
        display.appendChild(div);
    }
}