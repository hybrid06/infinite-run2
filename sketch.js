var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var pinkCG, redCG,yellowCG;
var pinkCyclistAnimation, redCyclistAnimation, yellowCysclistAnimation;
var pinkCyclistFall, redCyclistFall, yellowCyclistFall;
var obstacleImg1,obstacleImg2,obstacleImg3;
var obstacleG1,obstacleG2,obstacleG3;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var gameOver, gameOverImage;
var cycleBell;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkCyclistAnimation = loadAnimation("images/opponent1.png","images/opponent2.png");
  pinkCyclistFall = loadAnimation("images/opponent3.png");
    yellowCyclistAnimation = loadAnimation("images/opponent4.png","images/opponent5.png");
  yellowCyclistFall = loadAnimation("images/opponent6.png");
    redCyclistAnimation = loadAnimation("images/opponent7.png","images/opponent8.png");
  redCyclistFall = loadAnimation("images/opponent9.png");
  gameOverImage = loadImage("images/gameOver.png");
  //cycleBell = loadSound("sound/bell.mp3");
  obstacleImg1 = loadImage("images/obstacle1.png");
  obstacleImg2 = loadImage("images/obstacle2.png");
  obstacleImg3 = loadImage("images/obstacle3.png");
  
  
}

function setup(){
  
console.log("DisplayWidth :  " + displayWidth);
console.log("DisplayHeight :  " + displayHeight);
createCanvas(displayWidth-20,displayHeight-400);
  
// Moving background
path=createSprite(0,150);
path.addImage(pathImg);
path.x = path.width/2


//creating boy running
mainCyclist  = createSprite(0,0,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
obstacleG1 = new Group();
obstacleG2 = new Group();
obstacleG3 = new Group();
  
gameOver = createSprite(camera.position.x+600,displayHeight-550);
gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
}

function draw() {
  background("pink");

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,camera.position.x,30);
 
  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/60);
    
    mainCyclist.y = World.mouseY;
   
    camera.position.x = mainCyclist.x+500;
   
  
    path.velocityX =-2
    
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
     //path.velocityX = -5;
      
    if(keyDown("space")) {
      //cycleBell.play();
    }
    
    obstacles();
    opponentCyclists();

      
    if(pinkCG.isTouching(mainCyclist)){
      gameState = END;
      pinkC.velocityY = 0;
      pinkC.changeAnimation("pinkCyclistFall",pinkCyclistFall);
      }
      
      if(yellowCG.isTouching(mainCyclist)){
        gameState = END;
        yellowC.velocityY = 0;
        yellowC.changeAnimation("yellowCyclistFall",yellowCyclistFall);
      }
      
      if(redCG.isTouching(mainCyclist)){
        gameState = END;
        redC.velocityY = 0;
        redC.changeAnimation("redCyclistFall",redCyclistFall);
      }
      
      if(obstacleG1.isTouching(mainCyclist)){
        gameState = END;
        obstacle1.velocityY = 0;
        redCG.destroyEach();
        pinkCG.destroyEach();
        yellowCG.destroyEach();
      }
      
      if(obstacleG2.isTouching(mainCyclist)){
        gameState = END;
        obstacle1.velocityY = 0;
        redCG.destroyEach();
        pinkCG.destroyEach();
        yellowCG.destroyEach();
      }
      
      if(obstacleG3.isTouching(mainCyclist)){
        gameState = END;
        obstacle1.velocityY = 0;
        redCG.destroyEach();
        pinkCG.destroyEach();
        yellowCG.destroyEach();
      }
      
    
 }else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", camera.position.x-100,displayHeight-600);
  
    path.velocityX = 0

    mainCyclist.velocityY = 0;
    mainCyclist.velocityX = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
   
    obstacleG1.setVelocityXEach(0);
    obstacleG1.setLifetimeEach(-1);
   
    obstacleG2.setVelocityXEach(0);
    obstacleG2.setLifetimeEach(-1);
   
    obstacleG3.setVelocityXEach(0);
    obstacleG3.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}


}

function opponentCyclists(){
  var selectPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 250 == 0) {
    switch(selectPlayer){
      case 1: pinkCyclists();
              break;
      case 2: yellowCyclists();
              break;
      case 3: redCyclists();
              break;
    }
  }
}

function pinkCyclists(){
        pinkC =createSprite(displayWidth,Math.round(random(50, 250)));
        pinkC.scale =0.06;
        pinkC.setCollider("rectangle",50,0,800,800);
        pinkC.velocityX = -(6 + distance/100);
        pinkC.addAnimation("pinkCyclistAnimation",pinkCyclistAnimation);
        pinkC.addAnimation("pinkCyclistFall",pinkCyclistFall);
        pinkC.setLifetime=220;
        pinkCG.add(pinkC);
}

function yellowCyclists(){
        yellowC =createSprite(displayWidth,Math.round(random(50, 250)));
        yellowC.scale =0.06;
        yellowC.setCollider("rectangle",50,0,800,800);
        yellowC.velocityX = -(6 + distance/100);
        yellowC.addAnimation("yellowCyclistAnimation",yellowCyclistAnimation);
        yellowC.addAnimation("yellowCyclistFall",yellowCyclistFall);
        yellowC.setLifetime=220;
        yellowCG.add(yellowC);
}

function redCyclists(){
        redC =createSprite(displayWidth,Math.round(random(50, 250)));
        redC.scale =0.06;
        redC.velocityX = -(6 + distance/100);
        redC.setCollider("rectangle",50,0,800,800);
        redC.addAnimation("redCyclistAnimation",redCyclistAnimation);
        redC.addAnimation("redCyclistFall",redCyclistFall);
        redC.setLifetime=220;
        redCG.add(redC);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  obstacleG1.destroyEach();
  obstacleG2.destroyEach();
  obstacleG3.destroyEach();
  
  distance = 0;
}

function obstacles(){
  var selectObstacle = Math.round(random(1,3));
  
  if (frameCount % 100 == 0) {
    switch(selectObstacle){
      case 1: obstacle1();
              break;
      case 2: obstacle2();
              break;
      case 3: obstacle3();
              break;
    }
  }
}

function obstacle1(){
        obs1 =createSprite(displayWidth,Math.round(random(50, 250)));
        obs1.scale =0.1;
        obs1.debug=false;
   obs1.setCollider("rectangle",0,0,500,500);
        obs1.velocityX = -(6 + distance/100);
        obs1.addImage(obstacleImg1);
        obs1.setLifetime=220;
        obstacleG1.add(obs1);
}

function obstacle2(){
        obs2 =createSprite(displayWidth,Math.round(random(50, 250)));
        obs2.scale =0.1;
        obs2.debug=false;
        obs2.setCollider("rectangle",0,0,600,300);
        obs2.velocityX = -(6 + distance/100);
        obs2.addImage(obstacleImg2);
        obs2.setLifetime=220;
        obstacleG2.add(obs2);
}

function obstacle3(){
        obs3 =createSprite(displayWidth,Math.round(random(50, 250)));
        obs3.scale =0.1;
        obs3.debug=false;
        obs3.setCollider("rectangle",0,0,600,300);
        obs3.velocityX = -(6 + distance/100);
        obs3.addImage(obstacleImg3);
        obs3.setLifetime=220;
        obstacleG3.add(obs3);
}