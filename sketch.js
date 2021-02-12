//to make variables
var PLAY = 1;
var END = 0;
 var gameState = PLAY;
var backGround, backGroundImage;
var monkey , monkey_running;
var gameOver, gameOverImage;
var restart, restartImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var food = 0;

//to load Images & Animations in preload function
function preload(){
  //to load backGroundImage
  backGroundImage = loadImage("jungle_background.jpg")
    
  //to load monkey Animation
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  //to load banana Image
  bananaImage = loadImage("banana.png");
  
  //to load obstacle Image
  obstacleImage = loadImage("obstacle.png");
 
  //to load gameOver Image
  gameOverImage = loadImage("game-over.png");
  
  //to load restart Image
  restartImage = loadImage("restartOption.jpg");
  
  //to load monkey jumping sound 
monkey_jumping_sound = loadSound("monkey_jump_sound.wav");

//to load collecting sound
banana_collecting_sound =loadSound("collecting_sound.wav")
}




//to createCanvas & createSprites in setup function
function setup() {
  //to createCanvas
createCanvas(600, 350);
  
  //to create backGround
  backGround = createSprite(0, 0, 10, 10);
  backGround.addImage(backGroundImage);
  backGround.velocityX = -3;
  backGround.scale = 2.0;
  

  
  //to create a backGround_1 to collide monkey 
  backGround_1 = createSprite(300, 325, 600, 10)
  
  //to create monkey
monkey = createSprite(100, 300, 10, 10)  
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //to show gameOver
   gameOver = createSprite(300, 175, 10, 10);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.4;
      
  //to show restart
      restart = createSprite(300, 240, 10, 10);
    restart.addImage(restartImage);
    restart.scale = 0.1;
  
 

    //to make foodGroup
  foodGroup = new Group ();
  
  //to make obstacleGroup
  obstacleGroup = new Group (); 
}

//to set commands in draw function
function draw() {
 
  
    //to show backGround continuously 
  
  //to make backGround_1 invisible
backGround_1.visible = false;
   if(backGround.x<0)
  {
   backGround.x = backGround.width/1;
  }
  
  if(gameState === PLAY)
    {
     
  
      
      monkey.visible = true;
      
  gameOver.visible = false;
    restart.visible = false;
      
      
  //to count Survival Time
  score = score + Math.round(frameCount/100);
    

  
  //to show bananas after 80 frameCount
  if(frameCount % 100 === 0)
    {
      bananas();
    }
  
  //to show stones after 300 frameCount
  if(frameCount % 200 === 0)
    {
      stones();
    }
   
  //if player "space" to monkey jumps
  if(keyDown("space")&& monkey.y>=270)
    { 
      monkey_jumping_sound.play();
     monkey.velocityY = -9; 
    }
  //to get monkey back if player jumps
  monkey.velocityY = monkey.velocityY + 0.2;
  //to collide  monkey with backGround_1
  monkey.collide(backGround_1);
  
  //if foodGroup Is Touching monkey so foodGroup destroyEach
  if(foodGroup.isTouching(monkey))
    {
      banana_collecting_sound.play();
      food = food+1;
     foodGroup[0].destroy();
    }
  
  //if obstacleGroup Is Touching monkey so game reset &  ogbstacleGroup destroyEach
  if(obstacleGroup.isTouching(monkey))
    {
  
      
     
      obstacleGroup.destroyEach();
      gameState = END;
    }
  }else if(gameState === END){
    foodGroup.destroyEach();
    
   backGround.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
    
    
    
      monkey.visible = false;
    
    foodGroup.setVelocityXEach (0);
    obstacleGroup.setVelocityXEach (0);
    
    
    
    
    
  
  }
    
  if(mousePressedOver(restart))
    {
      
      reset();
    }
   
  
  //to draw sprites
  drawSprites();
  
  //to show Survival Time and banana
  textFont("Poppins");
  textSize(20);
  fill("red");
  text ("Survival Time =" + score, 150, 20 );
  text ("Bananas =" + food, 400, 20 );
  
}

//to create reset function
function reset()
{
  
  score = 0;
  food = 0;
  gameState = PLAY;
  backGround.velocityX = -3;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
 
  
}

//to create bananas
function bananas() 
{
  banana = createSprite(600,(Math.round(random(120, 160))), 10, 10)
  banana.addImage(bananaImage)
  banana.velocityX = -3;
  banana.lifetime = 200;
  banana.scale = 0.1;
  foodGroup.add(banana);
}

//to create stones
function stones()
{
  obstacle = createSprite(600, 280, 10, 10)
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -3;
  obstacle.lifetime = 200;
  obstacle.scale = 0.2; 
  obstacleGroup.add(obstacle);
}