var monkey;
var banana;
var bananas;
var obstacle_group;
var background_;
var ground;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var restart
function preload(){
  Monkey1 = loadImage("Monkey_01.png");
  Monkey2 = loadImage("Monkey_02.png");
  Monkey3 = loadImage("Monkey_03.png");
  Monkey4 = loadImage("Monkey_04.png");
  Monkey5 = loadImage("Monkey_05.png");
  Monkey6 = loadImage("Monkey_06.png");
  Monkey7 = loadImage("Monkey_07.png");
  Monkey8 = loadImage("Monkey_08.png");
  Monkey9 = loadImage("Monkey_09.png");
  Monkey10 = loadImage("Monkey_10.png");
  Jungle = loadImage("jungle.jpg");
  banana_image = loadImage("banana.png")
  stone = loadImage("stone.png")
  restart_image = loadImage("restart.png")
}
function setup() {
  createCanvas(400, 400);
  background_ = createSprite(200,200,20,20)
  background_.addImage(Jungle);

  monkey = createSprite(100,340,20,20)
  monkey.addAnimation("monkey",Monkey1,Monkey2,Monkey3,Monkey4,Monkey5,Monkey6,Monkey7,Monkey8,Monkey9,Monkey10)
   
  monkey.scale = 0.10;
  ground = createSprite(200,365,400,5);
  ground.visible = false;
  bananas  = createGroup();
  bananas  = createGroup();
  banana = createSprite(400,random(120,300),30,30);
  obstacle_group = createGroup()
  restart = createSprite(200,200,20,20);
  restart.addImage(restart_image);
  restart.scale = 0.2;
}
function draw() {
  background(300);
  if (gameState == PLAY){
    restart.visible = false;
    if (background_.x < 0){
    background_.x  = background_.width / 2
  }
  if (keyDown("space") && monkey.y > 150){
    monkey.y -= 30;
  }
  monkey.collide(ground)
  monkey.velocityY = 7;
  background_.velocityX = -3;
     if (banana.isTouching(monkey)){
    score = score + 2
    banana.destroyEach()
   } 
    
  banana_func();
  spawn_obstacles();
  
  if (obstacle_group.isTouching(monkey)){
    monkey.scale = 0.1
    gameState = END
  }    
  }
  if (gameState == END){
    background_.velocityX = 0;
    obstacle_group.setVelocityXEach(0);
    banana.setLifetime=-1;
    obstacle_group.setLifetimeEach(-1);
    restart.visible = true; 
  }
  
  if (mousePressedOver(restart)){
      reset()
  }
  drawSprites();
  monkey.collide(ground); 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score ,300,50 )
}
function spawn_obstacles(){
  if (frameCount % 80 === 0){
    obstacle = createSprite(400,340,20,20)
    obstacle.addImage(stone)
    obstacle.scale = 0.15
    obstacle_group.add(obstacle)
    obstacle_group.setVelocityXEach(-5)
    obstacle_group.setLifetimeEach(80)
  }
}

function banana_func(){ 
  if (frameCount % 60 === 0){
  banana.addImage(banana_image);
  bananas.add(banana);
  banana.scale = 0.06  
  banana.setLifetime = 80;
  }
}
  
function reset(){
  gameState = PLAY;
  score =0;
  obstacle_group.destroyEach();
  bananas.destroyEach(); 
}
