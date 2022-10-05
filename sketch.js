var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  doorsGroup=new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
  ghost.setCollider("rectangle",0,20,200,250);

}

function draw() {
  background(200);
  if(gameState==="play"){
    if(tower.y > 400){
        tower.y = 300
      }
    ghost.velocityY=ghost.velocityY + 0.9;
    if (keyDown("SPACE")){
      ghost.velocityY=-18;
    }
    if (keyDown("right_arrow")){
      ghost.x=ghost.x+5;
    }
    if (keyDown("left_arrow")){
      ghost.x=ghost.x-5;
    }
    spawnDoorAndClimbers();
    ghost.collide(climbersGroup);
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>750){
      gameState = "end";
    }
  }
  if (gameState ==="end"){
    tower.velocityY=0;
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
    invisibleBlockGroup.setVelocityYEach(0);
    ghost.velocityY=0;
  }

  drawSprites();

}
function spawnDoorAndClimbers(){
  if (frameCount%150===0){
    door =  createSprite(random(100,200),-50);
    door.addImage(doorImg);
    climber = createSprite(door.x,door.y+50);
    climber.addImage(climberImg);
    invisibleBlock = createSprite(door.x-2,door.y+60,80,10);
    invisibleBlock.visible = false;
    door.velocityY=2;
    climber.velocityY=2;
    invisibleBlock.velocityY=2;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    climber.setCollider("rectangle",0,0,100,20);
    door.depth=ghost.depth;
    climber.depth=ghost.depth+1;
    ghost.depth=ghost.depth+2;
  }
}