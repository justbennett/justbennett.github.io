
let ball1;
let ball2;
let gravity = 0.9;
let dampening = 0.01;

function setup(){
  createCanvas(800,800);
  ball1 = new Ball(width/2, height/2);
  ball2 = new Ball(ball1.pos.x - 100, ball1.pos.y, 'orbiter');
  ball2.vel.y=-5;
  
}

function draw(){
  background(0);
  ball1.show();
  ball2.show();
  
  ball2.move();
  
  ball2.accelerate(ball1);
  
  fill(255);
  text(ball2.pos.mag(),10,14);
  text(p5.Vector.sub(ball1.pos, ball2.pos).heading(),10,26);
  
  checkKeys();

}

function checkKeys(){
 
  if(keyIsDown(LEFT_ARROW)) ball2.vel.rotate(-0.1);
  if(keyIsDown(RIGHT_ARROW)) ball2.vel.rotate(0.1);
  if(keyIsDown(UP_ARROW)) ball2.vel.setMag(ball2.vel.mag()+0.1);
  if(keyIsDown(DOWN_ARROW)) ball2.vel.setMag(ball2.vel.mag()-0.1);
}

function Ball(x, y, type = 'sun'){
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.accel = createVector(0,0);
  this.size = 20;
  this.type = type
  
  this.show = function(){
    if(this.type == 'orbiter'){
    
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.pos.heading());
      triangle(0, this.size/2, 0 ,-this.size/2, this.size, 0 );
      pop();
    } else ellipse(this.pos.x,this.pos.y, this.size,this.size);
  }
  
  this.accelerate = function(thing){
     let attraction = p5.Vector.sub(thing.pos, this.pos); //distance between
     let distance = attraction.mag();
     let strength = (gravity *2 *0.1)/ distance *distance;
     attraction.setMag(strength);
    this.accel.add(attraction);
  }
  
  this.move = function(){
    this.pos.add(this.vel);
    this.vel.add(this.accel);
    this.vel.setMag(this.vel.mag()-dampening);
    this.accel.mult(0);
  }
}
