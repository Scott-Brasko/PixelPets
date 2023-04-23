// dog constructor (name)
class Dog {
  constructor(body, name, owner) {
    // call after user inputs
    // name prop
    this.name = name;
    // speed prop
    this.SPEED = 100;
    // ownerName prop
    this.owner = owner;
    this.leftPosition = 0;
    this.currentDirection = 'right';
    this.directions = ['right', 'left'];

    // frame prop - keep track of current frame
    this.frame = 1;

    // number of frames before switching to next idle animation
    this.randomizerFrameCounter = 0;
    this.randomizerFrameMax = 50;

    // how far dog moves during each frame
    this.moveDistance = 6;

    // state prop - default idle
    // idle
    // eat
    // walk
    // run
    this.state = 'idle1';
    this.petState = false;
    this.regularStateArray = ['idle1', 'idle2'];

    // feed sequence
    this.feedStateArray = ['sit', 'sniff', 'sniff', 'sniff', 'sniff'];

    // pet sequence
    this.petStateArray = ['sit', 'sat', 'sat', 'sat'];
    this.specialIndex = 0;

    // how long to stay idle before walking
    this.idleDuration = 80;

    // walk duration
    this.timeToWalk = false;
    this.timeToWalkIncrement = 0;
    // walk duration randomizer min and max
    this.walkDurationMax = 80;
    this.walkDurationMin = 40;
    this.timeToWalkMax = this.calculateWalkDuration();

    // set how long heart sticks around after pet
    this.heartMax = 100;
    this.heartCounter = 0;
    this.heartOn = false;

    // choose random move animation for move array
    this.moveIndex = Math.floor(Math.random() * 3);
    this.moveArray = ['sniffwalk', 'run', 'walk'];

    // is dog chasing toy?
    this.chaseToyState = false;
    this.toyDestination = null;
    this.toyBeingChased = null;

    // dog offset (width of dog)
    this.dogOffset = 90;

    this.stateMaxFrames = {
      idle1: 5,
      idle2: 5,
      jump: 11,
      run: 8,
      sit: 9,
      sat: 6,
      sniff: 8,
      sniffwalk: 8,
      walk: 5,
    };

    // create div that dog img exists within
    this.div = document.createElement('div');
    this.div.setAttribute('id', 'dog-div');

    // create img & append to HTML
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'dog');
    this.node.setAttribute(
      'src',
      `./assets/${this.state}/${this.state}-${this.frame}.png`
    );
    body.appendChild(this.div);
    this.div.appendChild(this.node);

    // recursively call monitor method (checks state)
    setTimeout(this.monitor.bind(this), this.SPEED);
  }

  // monitor
  // idle
  // eat
  // walk
  // run
  monitor() {
    if (this.petState === true)
      return setTimeout(this.pet.bind(this), this.SPEED);

    if (this.feedState === true)
      return setTimeout(this.feed.bind(this), this.SPEED);

    // check if it's time to talk or to remove the heart
    this.timeToWalkCheck();
    this.heartCheck();

    if (this.chaseToyState === true) {
      return this.chaseToySetup(this.toy);
    }

    if (this.timeToWalk === true) {
      this.currentDirection = this.directions[Math.floor(Math.random() * 2)];
      return setTimeout(this.move.bind(this), this.SPEED);
    }

    if (this.randomizerFrameCounter >= this.randomizerFrameMax) {
      this.state = this.regularStateArray[Math.floor(Math.random() * 2)];
      this.randomizerFrameCounter = 0;

      this.frame = 1;
    } else {
      this.randomizerFrameCounter++;
      if (this.frame === this.stateMaxFrames[this.state]) this.frame = 1;
      else this.frame++;
    }

    this.node.setAttribute(
      'src',
      `./assets/${this.state}/${this.state}-${this.frame}.png`
    );

    setTimeout(this.monitor.bind(this), this.SPEED);
  }

  pet() {
    if (!document.getElementById('heart')) {
      const heart = document.createElement('img');
      heart.setAttribute('id', 'heart');
      heart.setAttribute('src', `./assets/heart.gif`);
      this.div.appendChild(heart);
      this.heartOn = true;
    }

    if (this.frame === this.stateMaxFrames[this.state]) {
      this.frame = 1;
      this.specialIndex++;
      if (this.specialIndex === this.petStateArray.length) {
        this.frame = 1;
        this.state = 'idle1';
        this.specialIndex = 0;
        this.petState = false;
        this.stand();
        return setTimeout(this.monitor.bind(this), this.SPEED);
      }
      this.state = this.petStateArray[this.specialIndex];

      this.node.setAttribute(
        'src',
        `./assets/${this.state}/${this.state}-${this.frame}.png`
      );
      return setTimeout(this.pet.bind(this), this.SPEED);
    } else {
      this.state = this.petStateArray[this.specialIndex];
      this.frame++;
      this.node.setAttribute(
        'src',
        `./assets/${this.state}/${this.state}-${this.frame}.png`
      );

      return setTimeout(this.pet.bind(this), this.SPEED);
    }
  }

  feed() {
    if (!document.getElementById('spaghetti')) {
      const spaghetti = document.createElement('img');
      spaghetti.setAttribute('id', 'spaghetti');
      spaghetti.setAttribute('src', `./assets/spaghetti.png`);
      this.div.appendChild(spaghetti);
    }
    if (this.frame === this.stateMaxFrames[this.state]) {
      this.frame = 1;
      this.specialIndex++;
      if (this.specialIndex === this.feedStateArray.length) {
        this.frame = 1;
        this.state = 'idle1';
        this.specialIndex = 0;
        this.feedState = false;
        const spaghetti = document.querySelector('#spaghetti');
        spaghetti.remove();
        return setTimeout(this.monitor.bind(this), this.SPEED);
      }
      this.state = this.feedStateArray[this.specialIndex];

      this.node.setAttribute(
        'src',
        `./assets/${this.state}/${this.state}-${this.frame}.png`
      );
      return setTimeout(this.feed.bind(this), this.SPEED);
    } else {
      this.state = this.feedStateArray[this.specialIndex];
      this.frame++;
      this.node.setAttribute(
        'src',
        `./assets/${this.state}/${this.state}-${this.frame}.png`
      );

      return setTimeout(this.feed.bind(this), this.SPEED);
    }
  }

  stand(num) {
    if (num === undefined) num = 3;
    if (num === 0) return;
    this.node.setAttribute('src', `./assets/sit/sit-${num}.png`);

    num--;
    setTimeout(this.stand.bind(this), this.SPEED, num);
  }

  move() {
    // check if heart should stick around
    this.heartCheck();

    // stop our run if feed or pet or chaseToy is true
    if (this.petState === true || this.feedState === true || this.chaseToyState === true) {
      // this.timeToWalk = false;

      return this.monitor();
    }

    // randomly jump if running and not chasing toy
    if (
      this.moveArray[this.moveIndex] === 'run' &&
      this.frame === 3 &&
      Math.floor(Math.random() * 15) === 0 &&
      this.chaseToyState === false
    ) {
      this.frame++;
      return setTimeout(this.jump.bind(this), this.SPEED);
    }

    // check if we're done walking
    this.timeToWalkCheck();

    // stop walking
    if (this.timeToWalk === false) {
      this.frame = 1;
      this.state = 'idle1';
      this.moveIndex = Math.floor(Math.random() * 3);
      return setTimeout(this.monitor.bind(this), this.SPEED);
    }

    this.moveAndSetImg()

    // run recursively until timeToWalk is false
    setTimeout(this.move.bind(this), this.SPEED);
  }

  moveAndSetImg() {
    // check if we need to start our animation over
    if (this.frame === this.stateMaxFrames[this.moveArray[this.moveIndex]])
      this.frame = 1;
    else this.frame++;

    // if right, move right
    if (this.currentDirection === 'right') {
      this.div.style.transform = 'scaleX(1)';
      this.div.style.left = `${(this.leftPosition += this.moveDistance)}px`;
    }

    // if left, move left
    if (this.currentDirection === 'left') {
      this.div.style.transform = 'scaleX(-1)';
      this.div.style.left = `${(this.leftPosition -= this.moveDistance)}px`;
    }

    // moveIndex and frame are updated, select new image for current frame
    this.node.setAttribute(
      'src',
      `./assets/${this.moveArray[this.moveIndex]}/${
        this.moveArray[this.moveIndex]
      }-${this.frame}.png`
    );
  }

  timeToWalkCheck() {
    // if idle and we've waited idle duration, flip to run
    if (
      this.timeToWalk === false &&
      this.timeToWalkIncrement === this.idleDuration
    ) {
      this.timeToWalk = true;
      this.timeToWalkMax = this.calculateWalkDuration();
      this.timeToWalkIncrement = 0;
    }

    // stop walking once we've hit our walk max
    else if (
      this.timeToWalk === true &&
      this.timeToWalkIncrement === this.timeToWalkMax
    ) {
      this.timeToWalk = false;
      this.timeToWalkIncrement = 0;
    }

    this.timeToWalkIncrement++;
  }

  calculateWalkDuration() {
    return Math.floor(
      Math.random() * (this.walkDurationMax - this.walkDurationMin + 1) +
        this.walkDurationMin
    );
  }

  jump(num) {
    if (num === undefined) num = 11;
    if (num === 0) {
      return setTimeout(this.monitor.bind(this), this.SPEED);
    }
    this.node.setAttribute('src', `./assets/jump/jump-${num}.png`);
    if (this.currentDirection === 'right') {
      this.div.style.transform = 'scaleX(1)';
      this.div.style.left = `${(this.leftPosition += this.moveDistance)}px`;
    }

    if (this.currentDirection === 'left') {
      this.div.style.transform = 'scaleX(-1)';
      this.div.style.left = `${(this.leftPosition -= this.moveDistance)}px`;
    }
    num--;
    setTimeout(this.jump.bind(this), this.SPEED, num);
  }

  heartCheck() {
    if (this.heartOn === true) {
      this.heartCounter++;
      if (this.heartCounter >= this.heartMax) {
        const heart = document.querySelector('#heart');
        heart.remove();
        this.heartCounter = 0;
        this.heartOn = false;
      }
    }
  }

  chaseToySetup(toy) {
    // round destination to closest move multiple
    this.toyDestination = Math.ceil(toy.leftPosition/this.moveDistance)*this.moveDistance;

    if (this.leftPosition < this.toyDestination) {
      this.currentDirection = 'right';
    } else this.currentDirection = 'left';

    this.moveIndex = 1;

    return this.chaseToy();
  }

  chaseToy() {
    // if moving right, need offset to account for dog width
    const offset = this.currentDirection === 'right' ? this.dogOffset : 0;

    // to-do: do some sort of check to see if bone has landed 

    if (this.leftPosition === this.toyDestination - offset)  {
      this.chaseToyState = false;
      // reset walk increment so dog doesn't immediately walk
      this.timeToWalkIncrement = 0;
      // reset frame
      this.frame = 1;
      // randomize next move;
      this.moveIndex = Math.floor(Math.random() * 3);
      // reset toy
      this.toy = null;

      // to-do: sit here and eventually trigger toy deletion

      return setTimeout(this.monitor.bind(this), this.SPEED);
    }
    this.moveAndSetImg()

    setTimeout(this.chaseToy.bind(this), this.SPEED);
  }

  setToy(toy) {
    this.toy = toy;
  }
}
