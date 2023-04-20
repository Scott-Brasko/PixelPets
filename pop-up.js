
let ownerName = prompt('What\'s your name?', 'Chewberry Mudman');
let petName = prompt('How would you like to name your pet?', 'Jimmy Chew');

// create container div
// create 3 buttons: feed, pet, throwToy
const body = document.querySelector('body');
const container = document.createElement('div');
container.setAttribute('id', 'container');

const feedBtn = document.createElement('button');
feedBtn.setAttribute('id', 'feedBtn');
feedBtn.classList.add('btn');
const petBtn = document.createElement('button');
petBtn.setAttribute('id', 'petBtn');
petBtn.classList.add('btn');
const throwToyBtn = document.createElement('button');
throwToyBtn.setAttribute('id', 'throwToyBtn');
throwToyBtn.classList.add('btn');

container.appendChild(feedBtn);
container.appendChild(petBtn);
container.appendChild(throwToyBtn);
body.appendChild(container);