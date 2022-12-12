var jogger, jogger_collided, jogger_img, edges

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var track_background, trackimage

var obstacleGroup, trackobstacle1
var trackObstacle 
var canvas

var score

var energy, energyimg, energyGroup

var energyscore

var  you_loseImg, you_lose


function preload(){
trackimage = loadImage("Track_Background.jpg");
jogger_img = loadImage("runner.png");
jogger_collided = loadAnimation("jogger_collided.png")
trackobstacle1 = loadImage("trackobstacle1.png");
energyimg = loadImage("energy_ball.png");

you_loseImg = loadImage("you_lose.png")
}

function setup(){
  canvas = createCanvas(600, 600);
  
  jogger = createSprite(50,100,20,50);
  jogger.addImage(jogger_img);
  jogger.addAnimation("collided", jogger_collided)

  edges = createEdgeSprites();


  track_background = createSprite(300,180,600,20);
  track_background.addImage(trackimage);
  track_background.velocityX = -4
  track_background.x = track_background.width/2



  you_lose = createSprite(300,70,50,50);
  you_lose.addImage(you_loseImg);
  you_lose.scale = 0.25
  

  jogger.scale = 0.25

 
  obstacleGroup = createGroup();
  jogger.setCollider("circle",0,0,85)

  score = 0;

  energyscore = 0;
  
  energyGroup = new Group();

  
}

function draw(){
  background("white");

  
  

  fill("blue");

  textSize(20);

  text("Point Value:" + score, 400, 20);


  fill("green");

  textSize(20);

  text("Orb Score:" + energyscore, 100, 20);      




  if(track_background.x<140){
    track_background.x = track_background.width/2
  }
  

  jogger.collide(track_background);
  
  



  if(gameState === PLAY){
    if(keyDown("space")){
      jogger.velocityY = -5;
    }
     
    jogger.velocityY = jogger.velocityY + 0.35;

    spawnObstacles();
    if(obstacleGroup.isTouching(jogger)){
      gameState = END
    }
    
    track_background.velocityX = -(4*score/100);

    you_lose.visible = false;

    score = score + Math.round(frameCount/60);

    if(jogger.isTouching(energyGroup)){
      energy.visible = false;
      energyscore += 0.25*10;
    }
    
  }
   else if(gameState === END){
    jogger.changeAnimation("collided", jogger_collided);
    track_background.velocityX = 0;
    trackObstacle.velocityX = 0;

    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);

    you_lose.visible = true;
  
   }



  createEnergy();

  drawSprites();
  
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
    trackObstacle = createSprite(400,104,10,40);
    //trackObstacle.debug = true;
    obstacleGroup.add(trackObstacle);
    trackObstacle.addImage(trackobstacle1);
    trackObstacle.velocityX = -6 

             
     trackObstacle.scale = 0.1;
     trackObstacle.lifetime = 300;
   
  }
}
function createEnergy(){
  if(frameCount % 60 == 0){
    energy = createSprite(50,200,600,20);
    energy.y = Math.round(random(120,50));
    energy.addImage(energyimg);
    energy.scale = 0.05;
    energyGroup.add(energy);
    energy.velocityX = -4
  }
}


