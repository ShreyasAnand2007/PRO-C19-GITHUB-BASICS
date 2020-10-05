var bananaImage, bananaGroup
var obstacleImage
var ObstaclesGroup
var backGround
var score=0;
var backImage
var player_running
var player

var invisibleGround
var StoneGroup
var stoneImage
var Jungle

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  backImage=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  }

function setup() {
  createCanvas(600, 400);
  backGround = createSprite(200,190,400,5);
  backGround.addImage(backImage);

  backGround.velocityX=-4;
    
  //To Create InvisibleGround
  invisibleGround = createSprite(200,395,400,5);
  invisibleGround.visible = false;
  
   //To Create player
   player = createSprite(50,270,20,50);
    player.addAnimation("player",player_running);
   player.scale=0.2; 
   player.setCollider("circle",0,0,2);
    bananaGroup = new Group();
  ObstaclesGroup = new Group();
}

function draw() {
  background("white");
  drawSprites();
  food();
  spawnStone();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score, 500,50);
  if (backGround.x < 0){
    backGround.x = backGround.width/2;
  }
  if(gameState === PLAY)
    {
      if(keyDown("space")){
      player.velocityY = -6;
      }
    //add gravity
   player.velocityY = player.velocityY + 0.8;
   player.collide(invisibleGround);
       
         if(player.isTouching(bananaGroup)){
   // bananaGroup.destroyEach();
           score=score+2;
       }
       
       switch(score)
       {
         case 10:player.scale=player.scale+0.12;
                 break;
         case 20:player.scale=player.scale+0.14;
                 break;   
         case 30:player.scale=player.scale+0.16;
                 break;
         case 40:player.scale=player.scale+0.18;
                 break; 
        default:break;       
       }
       
  if(ObstaclesGroup.isTouching(player)){
    player.scale=0.2; 
    //gameState=End;
       }
    }
    
}
  
function food() {
  //write code here to spawn the bananas
  if (frameCount % 60 === 0)  {
    var banana = createSprite(600,200,20,20);
    banana.setCollider("circle",0,0,5);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
     banana.lifetime = 134;
    
    //adjust the depth
    //banana.depth = player.depth;
    //player.depth = player.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}
  
function spawnStone() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,365,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the Stone           
    obstacle.scale = 0.3;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
    
  }
}
