var PLAY=1;
var END=0;
var gameState=PLAY;
var jumpsound,diesound,checkpointsound;

var gameover,gamoverimg,restart,restartimg
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsgroup,cloudimage,cloud;
var obstaclegroup,ob1,ob2,ob3,ob4,ob5,ob6,obstacle;
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  
  jumpsound=loadSound("jump.mp3")
  diesound=loadSound("die.mp3")
  checkpointsound=loadSound("checkPoint.mp3")
  
  cloudimage=loadImage("cloud.png")
  gamoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  

 
  gameover=createSprite(300,80)
  gameover.addImage("gameisover",gamoverimg )
  gameover.scale=0.5
  
  restart=createSprite(300,110)
  restart.addImage("restart",restartimg)
  restart.scale=0.5
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  score=0;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsgroup=new Group();
  obstaclesgroup=new Group();
  gameover.visible=false;
  restart.visible=false;

}

function draw() {
  background("white");
  
  if(gameState===PLAY){
  
  if(keyDown("space")&& trex.y>=160) {
    trex.velocityY = -12;
    jumpsound.play();
  }
    
    if(score>0&&score%100===0){
     checkpointsound.play();
    }
    
    
  score=score+Math.round(getFrameRate()/60)
  textSize(20)
  text("score:"+score,380,50)
  

  
  //trex.debug=true;
  //ob1.debug=true
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    ground.velocityX = -(6 + 3*score/100);
  }
  
  spawnClouds();
  spawnObstacles()
  
  trex.collide(invisibleGround);
    
    if(obstaclesgroup.isTouching(trex)){
        gameState = END;
      diesound.play();
    }
  }
    
    else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    obstaclesgroup.setLifetimeEach(-1)
    cloudsgroup.setLifetimeEach(-1)
    trex.changeAnimation("collided",trex_collided)
    gameover.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
    reset();
    }
      
    
    }
    
  
    
  drawSprites();
}

function reset(){
  
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  trex.changeAnimation("running",trex_running)
  score=0;
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloudsgroup.add(cloud)
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
  console.log(trex.y)
  
 
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);
      break;
      case 2:obstacle.addImage(ob2);
      break;
      case 3:obstacle.addImage(ob3);
      break;
      case 4:obstacle.addImage(ob4);
      break;
      case 5:obstacle.addImage(ob5);
      break;
      case 6:obstacle.addImage(ob6);
      break;
      default:break;
    }                     
                         
    obstaclesgroup.add(obstacle)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
  }
}