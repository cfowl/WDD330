

// this function gets a JSON object based on the URL
export function getJSON(url) {
    return fetch(url)
    .then(response => {
        if(response.ok) return response.json();
        else throw Error(response.statusText);
    })
    .catch(error => console.log(error))
}

// this function capitalizes each keyword
export function formatKeyword(keyword = 'favorites') {
    if(keyword !== '') {
        const keywords = keyword.trim().split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
        return keywords;
    }
    else return 'Favorites';
}