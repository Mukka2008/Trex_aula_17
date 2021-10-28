var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var restart, trex_collide, game_over, restartImg,
    game_overImg;
var morteSom, checkpointSom, pularSom;


var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var pontuacao;


function preload(){
  trex_correndo =         loadAnimation("trex1.png","trex3.png","trex4.png");
  morteSom = loadSound("die.mp3");
  checkpointSom = loadSound("checkPoint.mp3");
  pularSom = loadSound("jump.mp3");
  
  
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  game_overImg = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");
  trex_collide = loadAnimation("trex_collided.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collide", trex_collide);
  trex.scale = 0.5;
  trex.debug= false;
  
  trex.setCollider("rectangle",0,0,100,100,0)
  
  game_over = createSprite(300,100);
  game_over.addImage(game_overImg);
  

  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  game_over.visible = false;
  restart.visible = false;
    restart.scale= 0.4
  game_over.scale= 0.4
  
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
   
  //criar grupos de obstáculos e de nuvens
  grupodeobstaculos = createGroup();
  grupodenuvens = createGroup();
  
  console.log("Oi" + 5);
  
  pontuacao = 0;
}

function draw() {
  background(180);
  text("Pontuação: "+ pontuacao, 500,50); 
  
  if(estadoJogo === JOGAR){
    //mover o solo
    solo.velocityX = -(4+0.2*pontuacao/100);
    grupodeobstaculos.setVelocityXEach(-(4+0.2*pontuacao/100))
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
      pularSom.play();
  }
    gerarObstaculos();
    trex.velocityY = trex.velocityY + 0.8
    if (solo.x < 0){
       solo.x = solo.width/2;
    }
    gerarNuvens();

    
    if (grupodeobstaculos.isTouching(trex)){
     estadoJogo = ENCERRAR;
     morteSom.play();
      //trex.velocityY = -10;
     
    }
    pontuacao = pontuacao + Math.round(frameCount/60)   
    if(pontuacao%1000===0&& pontuacao>0){
      
      checkpointSom.play();
      
    }
    
  }
    

  else if(estadoJogo === ENCERRAR){
    //parar o solo
    solo.velocityX = 0;
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    grupodeobstaculos.setLifetimeEach(-1)
    grupodenuvens.setLifetimeEach(-1)
    trex.changeAnimation("collide", trex_collide)
    game_over.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      reset();
    }
   /* if(mousePressedOver(trex)){
      trex.scale = trex.scale -0.01;
    }
  */
  }
    
  
   
  
    trex.collide(soloinvisivel);
    
    
    drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(400,165,10,40);
  obstaculo.velocityX = -6;
      
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}




function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  var teste = "LALALAHAHAHAoIOI";

  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 134;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    //adicionando nuvem ao grupo
   grupodenuvens.add(nuvem);
  }
 
}

function reset(){
  pontuacao = 0;
  solo.x = solo.width /2;
  estadoJogo = JOGAR;
  trex.changeAnimation("running", trex_correndo)
  grupodeobstaculos.destroyEach();
  grupodenuvens.destroyEach();
  game_over.visible = false;
  restart.visible = false;
  
}