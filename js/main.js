const links = [
    {
        label: 'Week 01 Code & Notes',
        url: 'week1/' //index.html is automatic
    },
    {
        label: 'Week 02 Code',
        url: 'week2/'
    },
    {
        label: 'Week 03 Code & Notes',
        url: 'week3/'
    },
    {
        label: 'Week 04 Code & Notes',
        url: 'week4/'
    },
    {
        label: 'Week 05 Code & Notes',
        url: 'week5/'
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