document.addEventListener('DOMContentLoaded', main);

function main() {
  // let ownerName = prompt('What\'s your name?', 'Chewberry Mudman');
  // let petName = prompt('How would you like to name your pet?', 'Jimmy Chew');

  // create container div
  // create 3 buttons: feed, pet, throwToy
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.setAttribute('id', 'container');

  const dog = new Dog(body, 'Bark Twain', 'Chewberry Mudman');
  const title = document.querySelector('h1');
  title.setAttribute('style', `font-family: 'Press Start 2P'`);
  title.innerHTML = dog.name;

  const dogWallCheck = () => {
    if (dog.leftPosition > (Number(getComputedStyle(container).width.replace('px', ''))-100)) {
      dog.currentDirection = 'left';
      return;
    }

    if (dog.leftPosition < 0) {
      dog.currentDirection = 'right';
      return;
    }
  };

  const dogWallCheckObs = new MutationObserver(dogWallCheck);
  const config = { attributeFilter: ['style'] };
  dogWallCheckObs.observe(dog.div, config);

  const feedBtn = document.createElement('button');
  feedBtn.setAttribute('id', 'feedBtn');
  feedBtn.classList.add('btn');
  feedBtn.textContent = 'Feed';

  const petBtn = document.createElement('button');
  petBtn.setAttribute('id', 'petBtn');
  petBtn.classList.add('btn');
  petBtn.textContent = 'Pet';

  const throwToyBtn = document.createElement('button');
  throwToyBtn.setAttribute('id', 'throwToyBtn');
  throwToyBtn.classList.add('btn');
  throwToyBtn.textContent = 'Throw Toy';

  container.appendChild(feedBtn);
  container.appendChild(petBtn);
  container.appendChild(throwToyBtn);
  body.appendChild(container);

  // add event listener to petBtn
  petBtn.addEventListener('click', () => {
    dog.petState = true;
  });

  // add event listener to petBtn
  feedBtn.addEventListener('click', () => {
    dog.feedState = true;
    
  });
}
