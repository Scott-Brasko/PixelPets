// dog constructor (name)
class Toy {
  constructor(body) {
    // this.div = document.createElement('img');
    // this.div.setAttribute('id', 'dog-div');
    const container = document.querySelector('#container');
    this.SPEED = 60;
    this.moving = true;

    // how long bone should remain on ground before deleting itself
    this.onGroundMax = 50;
    this.onGroundCounter = 0;

    this.peaked = false;
    this.topPosition = 100;
    this.leftPosition = Math.floor(Math.random() * Number(getComputedStyle(container).width.replace('px', '')));
    this.rotateVal = 0;


    // create img & append to HTML
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'bone');
    this.node.setAttribute(
      'src',
      `./assets/bone.png`
    );

    this.node.style.top = `${this.topPosition}px`;
    this.node.style.left = `${this.leftPosition}px`;

    body.appendChild(this.node);


    // recursively call move method (checks state)
    // use settime out
    setTimeout(this.move.bind(this), this.SPEED);
  }

  move() {
    if (this.moving === false) {
      if (this.onGroundCounter >= this.onGroundMax) {
        this.node.remove();
        return;
      }
      this.onGroundCounter++;
      return setTimeout(this.move.bind(this), this.SPEED);
    }

    if (this.topPosition >= 160) {
      this.moving = false;
      // this.node.style.transform = `rotate(0deg)`;
      return setTimeout(this.move.bind(this), this.SPEED);
    }

    if (this.peaked === true || this.topPosition <= 55) {
      this.peaked = true;
      this.node.style.top = `${this.topPosition += 5}px`;
      this.node.style.transform = `rotate(${this.rotateVal += 20}deg)`;
      return setTimeout(this.move.bind(this), this.SPEED);      
    }

    else if (this.peaked === false) {
      this.node.style.top = `${this.topPosition -= 3}px`;
      this.node.style.transform = `rotate(${this.rotateVal += 20}deg)`;
      return setTimeout(this.move.bind(this), this.SPEED);
    }
  
  }

}