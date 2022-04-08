

//----- NASA View -----//
export default class NasaView {

    // this function notifies the user to wait for their results
    displayWaitMessage(element, message = 'Please wait while your request is completed') {
        element.innerHTML = message;
    }

    // this function hides display 1 & 3 and shows display 2 & 4
    toggleDisplay(display1, display2, display3, display4) {
        display1.classList.add('small-hide');
        display3.classList.add('small-hide');
        display2.classList.remove('small-hide');
        display4.classList.remove('small-hide');
    }

    // this function builds the innerHTML for the results element
    buildResultsList(element, items, title, keyword) {
        // results title
        title.innerHTML = keyword;

        // if no results were found, then notify the user and do nothing else
        if(items.length === 0) {
            element.innerHTML = 'There were no results for your search. Please try again.';
            return;
        }

        // reset the innerHTML
        element.innerHTML = ``;

        // iterate through the results and add them to the page
        items.forEach(item => {
            // build <li> and save pertinent info into dataset
            element.innerHTML += `
                <li class='result-link' id="${item.data[0].nasa_id}"
                data-media_type="${item.data[0].media_type}"
                title="Click to see the details"
                >${item.data[0].title}</li>`;
        });
    }
    
    // this function builds the innerHTML for the image details display
    buildImageDetailsDisplay(display, title, item) {
        // reset display
        display.innerHTML = '';

        // separate keywords by commas
        const keywords = item.data[0].keywords.toString().replaceAll(',', ', ');

        // image title
        title.innerHTML = item.data[0].title;

        // image
        const imgDiv = document.createElement('div');
        imgDiv.id = 'img-container';
        imgDiv.innerHTML = `<img src="${item.links[0].href}">`;

        // favorite button
        const favButton = document.createElement('i');
        favButton.id = 'fav-button';
        favButton.classList.add('fa', 'fa-heart-o', 'hide'); // add class of 'hide' until image loads ??

        imgDiv.appendChild(favButton);

        const detailDiv = document.createElement('div');
        detailDiv.classList.add('left-txt');
        detailDiv.innerHTML += `<h3>Details</h3><p>${item.data[0].description}</p>`;
        detailDiv.innerHTML += `<h3>Keywords</h3><p>${keywords}</p>`;

        display.appendChild(imgDiv);
        // display.appendChild(favButton);
        display.appendChild(detailDiv);

        this.buildBackButton();

        return [imgDiv.firstElementChild, favButton];
    }
    
    // this function builds the innerHTML for the video details display
    buildVideoDetailsDisplay(display, title, item) {

        // reset display
        display.innerHTML = '';

        // image title
        title.innerHTML = item.data[0].title;

        // separate keywords by commas
        const keywords = item.data[0].keywords.toString().replaceAll(',', ', ');

        // image
        const vidDiv = document.createElement('div');
        vidDiv.id = 'vid-container';
        vidDiv.innerHTML = `<video controls autoplay">
                                <source src="${item.links.slice(-1).pop()}" type="video/mp4">
                                Sorry, your browser does not support the video tag.
                            </video>`;

        // favorite button
        const favButton = document.createElement('i');
        favButton.id = 'fav-button';
        favButton.classList.add('fa', 'fa-heart-o', 'hide');

        vidDiv.appendChild(favButton);

        const detailDiv = document.createElement('div');
        detailDiv.classList.add('left-txt');
        detailDiv.innerHTML += `<h3>Details</h3><p>${item.data[0].description}</p>`;
        detailDiv.innerHTML += `<h3>Keywords</h3><p>${keywords}</p>`;

        display.appendChild(vidDiv);
        display.appendChild(detailDiv);

        this.buildBackButton();
        
        return [vidDiv.firstElementChild, favButton];
    }
    
    // this function builds the back button for the details display
    buildBackButton() {
        // get back button container
        const container = document.getElementById('back-container');

        // don't build the back button if one already exists
        if(document.getElementById('back-btn')) {
            return;
        }

        // build the button and append it to its container
        const button = document.createElement('button');
        button.id = 'back-btn';
        button.title = 'Go back'
        button.innerHTML = '<i class="fa fa-arrow-left"></i>';
        container.appendChild(button);
    }

    // this function removes the back button
    removeBackButton() {
        document.getElementById('back-container').innerHTML = '';
    }
}