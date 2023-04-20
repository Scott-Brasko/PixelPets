document.addEventListener('DOMContentLoaded', main);

function main() {
  // create container div
  // create 3 buttons: feed, pet, throwToy
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.setAttribute('id', 'container');

  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', 'buttonContainer');

    // add start button
  const startBtn = document.createElement('button');
  startBtn.setAttribute('id', 'startBtn');
  startBtn.classList.add('btn');
  startBtn.textContent = 'Start';

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

  container.appendChild(startBtn);
  container.appendChild(feedBtn);
  container.appendChild(petBtn);
  container.appendChild(throwToyBtn);
  body.appendChild(container);

  // collect owner and pet name at game start
  let gameStart = false;
  let petName;
  let ownerName;

  const startButton = document.querySelector('#startBtn');

  startButton.addEventListener('click', ()=>{
    if (!gameStart){
      ownerName = prompt('What\'s your name?', 'Chewberry Mudman');
      petName = prompt('How would you like to name your pet?', 'Jimmy Chew');
      gameStart = true;
      chrome.storage.sync.set({
        ownerName,
        petName,
        gameStart
      })
    }
  })

  function updatePetName (){
    chrome.storage.local.get(["petName"], (res) => {
      const petName = res.petName ?? 'Bark Twain'
      const title = document.querySelector('h1');
      title.innderHTML = `Hi ${ownerName}, I'm your furry friend ${petName}`;
    })
  }

  // updatePetName() -> breaks code :(

  // updated petName & ownerName once storage sync works
  const dog = new Dog(container, `Bark Twain`, `Chewberry Mudman`);
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

  // add event listeners to petBtn & feedBtn
  petBtn.addEventListener('click', () => {
    dog.petState = true;
  });

  feedBtn.addEventListener('click', () => {
    dog.feedState = true;
  });

  throwToyBtn.addEventListener('click', () => {
    new Toy(body);

  });
  container.appendChild(buttonContainer);
  buttonContainer.appendChild(startBtn);
  buttonContainer.appendChild(feedBtn);
  buttonContainer.appendChild(petBtn);
  buttonContainer.appendChild(throwToyBtn);
}