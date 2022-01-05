const links = [
    {
        label: 'Week01 Notes',
        url: 'week1/index.html'
    }
];

let toc = document.getElementById('toc');

links.forEach(link => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', `${link.url}`);
    a.textContent = `${link.label}`;
    li.appendChild(a);
    toc.appendChild(li);
});