var canvas;
var player;
var obstacle;
var path;
var blade,bladeGroup;

function preload() {
player_running = loadAnimation("./assets/1.PNG","./assets/2.PNG","./assets/3.PNG","./assets/4.PNG",
"./assets/5.PNG","./assets/6.PNG","./assets/7.PNG","./assets/8.PNG",);
blade_Img = loadImage("./assets/ninja blade.png");
}

function setup() {
  canvas = createCanvas(windowWidth-100, windowHeight-100);

  player = createSprite(500,472,25,25);
  player.addAnimation("running",player_running);
  player.shapeColor = "red";
  
  obstacle = createSprite(1000,475,15,15);
  obstacle.shapeColor = "red";
  obstacle.setVelocity(-5,0);
  
  path = createSprite(width/2,500,windowWidth*3,30);
  path.shapeColor = "black";
  path.velocityX = 4;

  bladeGroup = new Group();
}

function draw() {
  background(100);

  if(keyIsDown(LEFT_ARROW)){
    player.position.x -= 5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.position.x += 5;
  }
  if(keyDown("space") && player.position.y>405){
    player.position.y -= 20;
    player.position.x +=3;
  }
  if(keyIsDown(UP_ARROW)){
    spawnBlade();
  }
  if(bladeGroup.collide(obstacle)){
    bladeGroup.destroyEach();
  }
  
  player.position.y += 8;
  if(path.x < 0){
    path.x = width/2;
  }
  if(player.collide(obstacle) || obstacle.collide(player)){
    player.position.x = 500;
    player.position.y = 472;
    obstacle.position.x = 1000;
    obstacle.position.y = 470;
  } 

  player.collide(path);
  obstacle.collide(path);
  player.collide(obstacle);
  obstacle.collide(player);

  drawSprites();
}

function spawnBlade(){
  blade = createSprite(player.position.x,player.position.y);
  blade.addImage(blade_Img);
  blade.scale = 0.25;
  blade.lifetime = 80;
  blade.setVelocity(5,0);
  bladeGroup.add(blade);
}