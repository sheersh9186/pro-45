var earthImg, backgroundImg;
var spaceShipImg, villanImg;
var space, earth, spaceShip, villan;
var bombImg, bomb;
var bomb2Img, bomb2;
var bombGroup, bomb2Group;

function preload () {
earthImg = loadImage("/assets/earth.png");
backgroundImg = loadImage("/assets/space.png");
spaceShipImg = loadImage("/assets/spaceShip.png");
villanImg = loadImage("/assets/villan.png");
bombImg = loadImage("/assets/bomb.png");
bomb2Img = loadImage("/assets/bomb2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  space = createSprite(width/2, height/2, width, height);
  space.addImage(backgroundImg);
  space.scale = 2.8  ;

  earth = createSprite(width/2-700, height/2);
  earth.addImage(earthImg);
  earth.scale = 2.8;

  spaceShip = createSprite(width/2-350, height/2);
  spaceShip.addImage(spaceShipImg); 
  spaceShip.scale = .5;

  villan = createSprite(width/2+500, height/2);
  villan.velocityY=5;
  villan.addImage(villanImg); 
  villan.scale = 1.3;

 bombGroup = new Group();
 bomb2Group = new Group();
  
  edges=createEdgeSprites();

  
}

function draw() {
  background(0);
  
  if(keyDown(UP_ARROW)){
   spaceShip.y-=10;
  }

  if(keyDown(DOWN_ARROW)){
    spaceShip.y+=10;
   }

   if(keyDown("space")){
    spawnbomb();
   }

   spawnbomb2();

   bomb2Group.overlap(bombGroup, function(collector, collected) {
    collector.remove();
    collected.remove();
  });


 spaceShip.bounce(edges[2]);
 spaceShip.bounce(edges[3]);
 villan.bounceOff(edges[2]);
 villan.bounceOff(edges[3]);

  drawSprites();

  if(bombGroup.isTouching(earth)){
    textSize(70);
    fill("#FF0000");
    text("Game Over", windowWidth/2-150, windowHeight/2-300);

    textSize(50);
    fill("#FFFF00");
    text("Press ctontrol+shift+r [For Windows]", windowWidth/2-350, windowHeight/2-200);
    
    textSize(50);
    fill("#FFFF00");
    text("Press commant+shift+r [For MAC]", windowWidth/2-350, windowHeight/2-100);

    textSize(50);
    fill("#FFFF00");
    text("For Playing Again", windowWidth/2-200, windowHeight/2);

    villan.velocityY=0
    villan.velocityX=0
   }
}

function spawnbomb(){
  bomb2 = createSprite(width/2-350, height/2+75);
  bomb2.addImage(bombImg); 
  bomb2.scale = .4;
  bomb2.velocityX=10;
  bomb2Group.add(bomb2);
  bomb2.lifetime=100;
  bomb2.y=spaceShip.y+50;
}

function spawnbomb2(){
  if(frameCount % 50 === 0){
  bomb = createSprite(villan.x, villan.y+50);
  bomb.addImage(bomb2Img); 
  bomb.scale = .5 ;
  bomb.velocityX=-15;
  bombGroup.add(bomb);
  bomb.lifetime=130;
}
}