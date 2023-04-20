// prompt (pet name & owner name)
// buttons - feed, pet, throw toy

let ownerName = prompt('What\'s your name?', 'Chewberry Mudman');
let petName = prompt('How would you like to name your pet?', 'Jimmy Chew');

const body = document.querySelector('body');

const feedBtn = document.createElement('button');
feedBtn.setAttribute('id', 'feedBtn');
feedBtn.classList.add('btn');
const petBtn = document.createElement('button');
petBtn.setAttribute('id', 'petBtn');
petBtn.classList.add('btn');
const throwToyBtn = document.createElement('button');
throwToyBtn.setAttribute('id', 'throwToyBtn');
throwToyBtn.classList.add('btn');