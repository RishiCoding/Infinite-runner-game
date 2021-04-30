var ghost, ghost_standing_Image;
var tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  ghost_standing_Image=loadImage("ghost-standing.png");
  ghost_jumping_Image=loadImage("ghost-jumping.png");
  towerImage=loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
}

function setup(){
  createCanvas(600, 800);
  
  tower=createSprite(300, 200, 20, 20);
  tower.addImage(towerImage);
  tower.scale=1;
  
  ghost=createSprite(200, 200, 10, 10);
  ghost.addImage("ghost_jumping",ghost_jumping_Image);
  ghost.scale=0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background("black");
  if(gameState=="play"){
  camera.position.y=displayHeight/2;  
  camera.position.x=displayWidth/2;
  if (keyDown("space")){
    ghost.velocityY=-4;
  }
  
  if (keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-4;
  }
  
  if (keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+4;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  tower.velocityY=7;
  if(tower.y>400){
    tower.y=300;
  }
  spawnDoors();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    gameState="end";
    ghost.destroy();
  }
    drawSprites();
}
  else if(gameState=="end"){
    fill("yellow");
    stroke("yellow");
    textSize(50)
    text("GAME OVER", 150, 300);
  }
  
}  

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

