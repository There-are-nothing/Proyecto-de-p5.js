var player, back;
var points = 0;
var backImg;
var leftPlayerImg;
var rightPlayerImg;
var gameState= "START";
var baseImg, baseGroup;
var goodImg, goodThingsGroup;
var badImg, badThingsGroup;

//Función para cargar imágenes y animaciones
function preload() {
  backImg = loadImage("images/Clouds Back.png")
  leftPlayerImg = loadAnimation("images/willyLeft.png")
  baseImg = loadImage("images/base.png");
  goodImg = loadImage("images/grayblock.png")
  badImg= loadImage("images/badthing.png")
  
}
//Función para declarar Sprites y grupos
function setup() {
  createCanvas(450,800);
  back = createSprite(225,400,20,20);
  back.addImage(backImg);
  back.scale = 0.5;
  player = createSprite(225, 450, 20, 20);
  player.addAnimation("left", leftPlayerImg);
  player.scale = 0.07;
  baseGroup = new Group();
  goodThingsGroup = new Group();
  badThingsGroup = new Group();
}
//Función para dibujar los Sprites y establecer reglas del juego
function draw() {
  background(220);
  drawSprites();
    
  //Puntuación 
   textSize(20);
   fill("coral");
   text("Puntos: " + points, 30, 50);
  //Inicio del juego
  if(gameState==="START" && keyDown("up_arrow")){
      //Cambio de estado
      gameState="PLAY";
    //Velocidad y cambio de estado 
    
     }
  console.log(gameState)
  
  if(gameState==="PLAY"){
    //Fondo infinito
    back.velocityY = 1;
    if(back.y > 450){
      back.y = 300;
    }
   console.log(back.y)
    //gravedad
     player.velocityY = player.velocityY + 0.8; //gravedad
    //Mover personaje con las flechas 
    if(keyDown("right_arrow")){
    player.x = player.x+3;
  }
  
  if(keyDown("left_arrow")){
    player.x = player.x-3;
  }
  
  if(keyDown("up_arrow")){
    player.velocityY = -4;
  }
    //Crear bases y hacer que el personaje quede sobre ellas
    createBases();
    //Aumentar puntos
    if(player.isTouching(baseGroup)){
      player.velocityY = 0;
    }
    if(player.isTouching(goodThingsGroup,removeGoodThings)){
      points = points + 10;
    }
    
    //Crear Cosas Malas 
      createBadThings();
    //Cambiar a estado GAMEOVER
    if(player.isTouching(badThingsGroup)){
      gameState = "GAMEOVER"
    }
    
    if(player.y > 800){
      gameState = "GAMEOVER"
    }
    
  }
  
  //Estado GAMEOVER 
  
  if(gameState==="GAMEOVER"){
    back.velocityY= 0;
    player.velocityY = 3;
    textSize(40);
    fill("black")
    text("GAME OVER >(",100,400)
    textSize(20);
    text("Presiona x para reiniciar el juego",100,450)
    //player.destroy();
   
    if(keyDown("x")){
      points = 0;
      player.x = 225;
      player.y = 450;
      gameState = "START"
    }
    
  }
  
  

}

//Función para crear bases 
function createBases(){
   if(frameCount % 100 === 0){
     var base = createSprite(random(50,450), 0, 70, 20);       
     base.velocityY = 2;
      base.addImage(baseImg);
     base.scale = 0.30;
     baseGroup.add(base); // se agrega el sprite base al grupo baseGroup
     var good = createSprite(base.x,base.y - 15,20,20);
     good.addImage(goodImg)
     good.scale = 0.04;
     good.velocityY = 2;
     goodThingsGroup.add(good);
   }
}

//Función para crear Cosas Malas 

function createBadThings(){
  var velo = 3;
  if(frameCount % 75 === 0){
    var bad = createSprite(random(20,450),0,70,20);
    bad.addImage(badImg);
    bad.scale = 0.1;
    bad.velocityY = 3;
    badThingsGroup.add(bad);
     }
}

//Función para eliminar CosasBuenas
function removeGoodThings(sprite,goodThingsGroup ){
 goodThingsGroup.remove();
}

