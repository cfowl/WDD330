export function getJSON(url) {
    return fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else {
            throw Error(response.statusText);
        }
    })
    .catch(error => console.log(error))
}