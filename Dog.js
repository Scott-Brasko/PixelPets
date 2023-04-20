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
    this.randomizerFrameCounter = 0;
    this.randomizerFrameMax = 50;
    // state prop - default idle
    // idle
    // eat
    // walk
    // run
    this.state = 'idle1';
    this.petState = false;
    this.regularStateArray = ['idle1', 'idle2'];

    this.feedStateArray = ['sit', 'sniff', 'sniff', 'sniff', 'sniff'];

    this.petStateArray = ['sit', 'sat', 'sat', 'sat'];
    this.specialIndex = 0;

    this.timeToWalk = false;
    this.timeToWalkIncrement = 0;
    this.timeToWalkMax = 80;

    // set how long heart sticks around after pet
    this.heartMax = 100;
    this.heartCounter = 0;
    this.heartOn = false;

    this.moveIndex = Math.floor(Math.random() * 3);
    this.moveArray = ['sniffwalk', 'run', 'walk'];

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
    // use settime out
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

    this.timeToWalkCheck();
    this.heartCheck();

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
    this.heartCheck();

    if (this.petState === true || this.feedState === true) {
      // this.timeToWalk = false;

      return this.monitor();
    }

    // randomly jump if running
    if (
      this.moveArray[this.moveIndex] === 'run' &&
      this.frame === 3 &&
      Math.floor(Math.random() * 4) === 0
    ) {
      this.frame++;
      return setTimeout(this.jump.bind(this), this.SPEED);
    }

    this.timeToWalkCheck();

    if (this.timeToWalk === false) {
      this.frame = 1;
      this.state = 'idle1';
      this.moveIndex = Math.floor(Math.random() * 3);
      return setTimeout(this.monitor.bind(this), this.SPEED);
    }

    if (this.frame === this.stateMaxFrames[this.moveArray[this.moveIndex]])
      this.frame = 1;
    else this.frame++;

    if (this.currentDirection === 'right') {
      this.div.style.transform = 'scaleX(1)';
      this.div.style.left = `${(this.leftPosition += 6)}px`;
    }

    if (this.currentDirection === 'left') {
      this.div.style.transform = 'scaleX(-1)';
      this.div.style.left = `${(this.leftPosition -= 6)}px`;
    }

    // console.log(this.node.getAttribute('src'));
    this.node.setAttribute(
      'src',
      `./assets/${this.moveArray[this.moveIndex]}/${
        this.moveArray[this.moveIndex]
      }-${this.frame}.png`
    );

    setTimeout(this.move.bind(this), this.SPEED);
  }

  timeToWalkCheck() {
    if (this.timeToWalkIncrement === this.timeToWalkMax) {
      this.timeToWalk = !this.timeToWalk;
      this.timeToWalkIncrement = 0;
    }
    this.timeToWalkIncrement++;
  }

  jump(num) {
    if (num === undefined) num = 11;
    if (num === 0) {
      return setTimeout(this.monitor.bind(this), this.SPEED);
    }
    this.node.setAttribute('src', `./assets/jump/jump-${num}.png`);
    if (this.currentDirection === 'right') {
      this.div.style.transform = 'scaleX(1)';
      this.div.style.left = `${(this.leftPosition += 8)}px`;
    }

    if (this.currentDirection === 'left') {
      this.div.style.transform = 'scaleX(-1)';
      this.div.style.left = `${(this.leftPosition -= 8)}px`;
    }
    num--;
    setTimeout(this.jump.bind(this), this.SPEED, num);
  }

  heartCheck() {
    if (this.heartOn === true) {
      this.heartCounter++
      if (this.heartCounter >= this.heartMax) {
        const heart = document.querySelector('#heart');
        heart.remove();
        this.heartOn = false;
      }
    }
  }
}
