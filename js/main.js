const links = [
    {
        label: 'Week01 Code & Notes',
        url: 'week1/' //index.html is automatic
    }
];

let list = document.getElementById('toc');

links.forEach(link => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', link.url);
    a.textContent = link.label;
    li.appendChild(a);
    list.appendChild(li);
});