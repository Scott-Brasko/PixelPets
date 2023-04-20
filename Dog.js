// dog constructor (name)
class Dog {
  constructor(body, name, owner) {
    // call after user inputs
    // name prop
    this.name = name;
    // speed prop
    this.speed = 250;
    // ownerName prop
    this.owner = owner;

    // frame prop - keep track of current frame
    this.frame = 0;

    // state prop - default idle
    // idle
    // eat
    // walk
    // run
    this.state = 'idle1';

    // create img & append to HTML
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'dog');
    this.node.setAttribute('src',`src/assets/${this.state}/${this.state}-${this.frame}`);
    body.appendChild(this.node);
    // recursively call monitor method (checks state)
    // use settime out
  }

  // monitor
  // idle
  // eat
  // walk
  // run
}
