const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var cannonball;
var balls = [];

var canvas, angle, tower, ground, cannon;
var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES)
  angle = 15;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  

  //var ball_options = {
    //restitution:0.95
  //}
  //ball = Bodies.circle(300,50,20,ball_options);
  //World.add(world,ball);
  
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {

  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
 //ellipse(ball.position.x,ball.position.y,20)
  for(var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i])
  }
  


  cannon.display();

}
function keyPressed() {
  if (keyCode==DOWN_ARROW){
    cannonball = new CannonBall(cannon.x,cannon.y);
    cannonball.trajectory=[]
    Matter.Body.setAngle(cannonball.body,cannon.angle);
    balls.push(cannonball);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }

}

function keyReleased() {
  if (keyCode==DOWN_ARROW) {
    balls[balls.length-1].shoot();

  }
}