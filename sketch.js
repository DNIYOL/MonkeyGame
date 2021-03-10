var play = 1;
var end = 0;
var gameState = 1;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  FoodGroup = new Group();
  obstacleGroup = new Group();
}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  //console.log(ground.x);


}


function draw() {
  background("green");


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

if (gameState === play) {
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime =survivalTime+ Math.ceil(getFrameRate()/60)
    text("SurvivalTime:" + survivalTime, 200, 50);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space")) {
      monkey.velocityY = -12;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8

    //spawn the bananas
    bananas();

    //spawn the obstacles
    obstacles();

    if (obstacleGroup.isTouching(monkey)) {
      gameState = end;

    }
  }


  if (monkey.collide(obstacleGroup)) {
    gameState = end;
  }


  if (monkey.collide(obstacleGroup)) {
    gameState = end;
  }

    if (gameState === end) {
    fill("black");
    text("Press R to restart!!",150,200)
    survivalTime = 0;
    monkey.velocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    stroke("black");
    textSize(20);
    fill("black");
    text("Game Over", 150, 150);
    
  }

  drawSprites();

  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
  }

  
  if (keyDown("r")) {
    reset();
    // console.log('xyz');
  }
}

function bananas() {
  if (World.frameCount % 80 === 0) {
    banana = createSprite(400, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;

    banana.y = Math.round(random(120, 200));
    banana.velocityX = -7;
    banana.lifetime = 60;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (World.frameCount % 300 === 0) {
    obstacle = createSprite(400, 328, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;

    obstacle.velocityX = -7;
    obstacle.lifetime = 60;

    obstacleGroup.add(obstacle);
  }
}

function reset() {
   gameState = play;
     ground.velocityX = 0;
    survivalTime=0;
        monkey.velocityX =0;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach()
   // }
   
 }