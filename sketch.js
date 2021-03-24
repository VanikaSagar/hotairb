var balloon,backgroundimg
var database,position

function preload(){

}

function setup() {
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  
   database = firebase.database()

   var balloonPosition=database.ref('balloon/height')
   balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(255,255,255);  

  textSize(15)
  fill("black")
  stroke(4)
  text("Use the arrow keys to move the balloon! " , 20,20)

  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10

  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10
    balloon.scale=balloon.scale-0.005
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10
    balloon.scale=balloon.scale+0.005
  }


  drawSprites();
}

function readPosition(data){
  height=data.val()
  balloon.x=height.x
  balloon.y=height.y

}

function showError(){
  console.log("ERROR IN WRITING TO THE DATABASE")
}

function updateHeight(){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y' :height.y+y
  })
}