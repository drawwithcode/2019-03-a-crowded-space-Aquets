var hairs = [];

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  angleMode(DEGREES);

  //radius of the outer crest
  var radius = 150;
  //radius of the inner crest
  var radius2 = 130;

  //position of the hairs of the two crests
  for (var i = 0; i < 360; i+=15) {
    var tempX = cos(i)*radius;
    var tempY = sin(i)*radius;
    tempHair = new Hair(windowWidth/2 + tempX, windowHeight/2 + tempY, 100, "#ec852f");
    hairs.push(tempHair);
    tempX = cos(i+15/2)*radius2;
    tempY = sin(i+15/2)*radius2;
    tempHair2 = new Hair(windowWidth/2 + tempX, windowHeight/2 + tempY, 60, "#eec448");
    hairs.push(tempHair2);
  }
}

function draw() {
  background("#f9f8f7");

  //DRAW THE LION'S FACE

  //head
  fill("#fcda47")
  noStroke();
  ellipse(windowWidth/2,windowHeight/2,230)

  //mouth
  strokeWeight(5);
  stroke("#5f595b");
  noFill();
  arc(windowWidth/2+15,windowHeight/2+30,30,30,30,180);
  arc(windowWidth/2-15,windowHeight/2+30,30,30,0,150);

  //eyes
  fill("#5f595b");
  ellipse(windowWidth/2 + 40,windowHeight/2,8)
  ellipse(windowWidth/2 - 40,windowHeight/2,8)

  //nose
  fill("#257d94");
  stroke("#5f595b");
  triangle(windowWidth/2,windowHeight/2+30,windowWidth/2 - 15,windowHeight/2+15,windowWidth/2 + 15,windowHeight/2+15)

  //DRAW THE TWO CRESTS
  for (var i = 0; i < hairs.length; i++) {
    b=hairs[i];
    b.display();
    b.noisy();
  }


}

//object HAIR of the crest
function Hair(_x, _y, _length, _color) {
  //PROPERTIES
  this.x = _x;
  this.y = _y;
  this.length = _length;
  this.color = _color;
  /*
  when a new hair is created it gets a random value for the noise seed,
  so that every hair has a different noise
  */
  this.noiseSeed = random();
  this.noise

  //METHODS

  /*
  the DISPLAY function draws the hair with the first
  point fixed and the other one opposite to the mouse position
  */
  this.display = function (i, xin, yin) {
    //distance mouse-first point
    dx = mouseX - this.x;
    dy = mouseY - this.y;
    //calculate the angle opposite to the nouse position (and add the noise)
    angle1 = atan2(dy, dx) + 180 + this.noise;
    //draw the segment
    segment(this.x, this.y, angle1, this.color, this.length);
  }

  //the NOISY function refresh the NOISE value of the hair
  this.noisy = function (){
    this.noise = 45*noise(frameCount/100 + this.noiseSeed);
  }

}


// the SEGMENT function drwas the hair
function segment(x, y, a, color, length) {
  push();
  translate(x, y);
  rotate(a);
  stroke(color);
  strokeWeight(8);
  line(0, 0, length, 0);
  pop();
}
