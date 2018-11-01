const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const screenWidth = 1280;
const screenHeight = 720;
let elementSprites = [];
let baseSprites = [];
var level = 1;
let menuState = "main";
let imgs = ["basic.png","bg.png","favicon.png","fire.png","negative.png","stone.png","water.png","wind.png"];
let drawingStack = 0;
let player = new PlayerSprite(0,0);

var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:    192
  };

document.addEventListener('keydown',    onkeydown,    false);
document.addEventListener('keyup',      onkeyup,      false);

canvas.addEventListener('click',      onclick,      false);
canvas.addEventListener('mousemove',   onmousemove,  false);
canvas.addEventListener('touchstart', ontouchstart, false);
canvas.addEventListener('touchmove',  ontouchmove,  false);

init();

function init(){
    loop();
    //elementSprites = elementSprites.concat(createElementSprites(level * 10,chooseElementType(),50,50,));
}

function loop(imgs){
	// schedule a call to loop() in 1/60th of a second
	requestAnimationFrame(loop);

    if(drawingStack == 0){
        ctx.font = "72px Arial";
        ctx.textAlign = "center"; 
        ctx.fillText("PRESS SPACEBAR",screenWidth/2,screenHeight/2);
    }
    
    document.body.onkeydown = function(e){
        if(e.keyCode == 32){
            drawingStack = 1;
            if(drawingStack = 1){
                ctx.save()
                ctx.beginPath();
                ctx.fillStyle = "gray";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.fill();
                ctx.closePath();
                ctx.restore();
                drawingStack = 1;
                ctx.save();
                ctx.fillText("hi",screenWidth/2,screenHeight/2);
            }
        }
        if(e.keyCode == 13){
            drawingStack = 2;
            ctx.font = "72px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("This is the game state.",screenWidth/2,screenHeight/2);
        }
    }
    
    /*
	// loop through sprites
	for (let s of elementSprites){
		// move sprites
		s.move();
	
	    // draw sprites
		s.draw(ctx);
		
    }; // end for
    */
}

loadResources(imgs,loop);

function loadResources(names, callback) {
    var n,name,
        result = {},
        count  = names.length,
        onload = function() { if (--count == 0) callback(result); };
  
    for(i=0; i<names.length; i++) {
      name = names[n];
      result[name] = new Image();
      result[name].addEventListener('load', onload);
      result[name].src = "../images/" + name + ".png";
    }
}

/*
function onkeydown(event) {
    ...
    event.preventDefault();
}
  
function onkeyup(event) {
  ...
}

function onclick(event) {
  ...
}

function onmousemove(event) {
  ...
}

function ontouchstart(event) {
  ...
}

function ontouchmove(event) {
  ...
}
*/