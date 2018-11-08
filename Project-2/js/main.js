"use strict";

var app = app || {};

app.main = (function(){
    console.log("main.js module loaded");

    //variables
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const screenWidth = 1280;
    const screenHeight = 720;
    let elementSprites,elementSprites2,elementSprites3,elementSprites4,elementSprites5 = [];
    let gameState = "mainMenu";
    let classes = app.classes;
    let player = Object.create(classes.PlayerSprite);
    let playerImg = new Image();
    let deadZone = new Image();
    deadZone.src = "images/deadZone.png";
    playerImg.src = "images/doug.png";

    //object to store keycodes for keyboard presses
    let KEY = {
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

    function init(){
        //initialize the player object with these values
        player = Object.assign(player,{
            x: 12,
            y: 11,
            width: 51,
            height: 60,
            points: 0,
            image: playerImg
        });
        elementSprites = classes.fillGround(12,25,51,60);
        elementSprites2 = classes.fillGround(12,25,51,60);
        elementSprites3 = classes.fillGround(12,25,51,60);
        elementSprites4 = classes.fillGround(12,25,51,60);
        elementSprites5 = classes.fillGround(12,25,51,60);
        loop();
    };

    function loop(){
    	// schedule a call to loop() in 1/60th of a second
        requestAnimationFrame(loop);

        //Game State Machine
        switch (gameState){
            case "mainMenu":
                ctx.save();
                ctx.fillStyle = "rgba(178,175,133,.5)";
                ctx.strokeStyle = "rgba(100,98,73,1)";
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(canvas.width/2 - 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 - 355);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2 + 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 + 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 + 355);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 + 240);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();
                ctx.save();
                ctx.font = "50px elemental";
                ctx.textAlign = "center"; 
                ctx.fillText("PRESS SPACEBAR",screenWidth/2,screenHeight/2 - 80);
                ctx.fillText("TO BEGIN YOUR JOURNEY",screenWidth/2,screenHeight/2);
                ctx.restore();
                ctx.font = "32px elemental";    
                ctx.textAlign = "center";             
                ctx.fillText("OR PRESS H",screenWidth/2,screenHeight/2 + 140);
                ctx.fillText("FOR HELP",screenWidth/2,screenHeight/2 + 190);
                ctx.restore();
                document.body.onkeydown = function(e){
                    if(e.keyCode == KEY.SPACE){
                            gameState = "level1";
                    }
                    else if(e.keyCode == KEY.H){
                        gameState = "help";
                    }
                };
                return;

            case "help":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "rgba(178,175,133,.5)";
                ctx.strokeStyle = "rgba(100,98,73,1)";
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(canvas.width/2 - 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 - 355);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2 + 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 + 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 + 355);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 + 240);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();
                ctx.font = "24px elemental";    
                ctx.textAlign = "center";    
                ctx.fillText("USE THE ARROW KEYS",screenWidth/2,screenHeight/2 - 140);
                ctx.fillText("TO CLEAR BLOCKS AROUND YOU AND",screenWidth/2,screenHeight/2 - 70);
                ctx.fillText("COLLECT THE INDICATED TYPE OF ELEMENTAL",screenWidth/2,screenHeight/2);
                ctx.fillText("ENERGY WITHIN THE TIME LIMIT.",screenWidth/2,screenHeight/2 + 70);
                ctx.fillText("PRESS SPACEBAR",screenWidth/2,screenHeight/2 + 210);
                ctx.restore();
                return;

            case "level1":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "#D3C8A5";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.restore();
                document.body.onkeydown = function(e){
                    if(e.keyCode == KEY.UP){
                         upArrow(elementSprites);   
                    };
                    if(e.keyCode == KEY.LEFT){
                         leftArrow(elementSprites);   
                    };
                    if(e.keyCode == KEY.RIGHT){
                         rightArrow(elementSprites);   
                    };
                    if(e.keyCode == KEY.DOWN){
                         downArrow(elementSprites);   
                    };
                };

                //draws grid of tiles by calling each tile object's draw method
                for(let e of elementSprites){
                    e.draw(ctx);
                    ctx.drawImage(player.image,player.x*player.width,player.y*player.height,player.width,player.height);
                };

                if (player.points >= 50){
                    gameState = "level2";
                };
                return;

            case "level2":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "#EAE9D6";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.restore();

                document.body.onkeydown = function(e){
                    if(e.keyCode == KEY.UP){
                         upArrow(elementSprites2);   
                    };
                    if(e.keyCode == KEY.LEFT){
                         leftArrow(elementSprites2);   
                    };
                    if(e.keyCode == KEY.RIGHT){
                         rightArrow(elementSprites2);   
                    };
                    if(e.keyCode == KEY.DOWN){
                         downArrow(elementSprites2);   
                    };
                };

                for(let e of elementSprites2){
                    e.draw(ctx);
                    ctx.drawImage(player.image,player.x*player.width,player.y*player.height,player.width,player.height);
                };

                if (player.points >= 100){
                    gameState = "level3";
                };
                return;

            case "level3":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "#EAE9D6";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.restore();

                document.body.onkeydown = function(e){
                    if(e.keyCode == KEY.UP){
                         upArrow(elementSprites3);   
                    };
                    if(e.keyCode == KEY.LEFT){
                         leftArrow(elementSprites3);   
                    };
                    if(e.keyCode == KEY.RIGHT){
                         rightArrow(elementSprites3);   
                    };
                    if(e.keyCode == KEY.DOWN){
                         downArrow(elementSprites3);   
                    };
                };

                for(let e of elementSprites3){
                    e.draw(ctx);
                    ctx.drawImage(player.image,player.x*player.width,player.y*player.height,player.width,player.height);
                };

                if (player.points >= 150){
                    gameState = "level4";
                };
                return;

            case "level4":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "#EAE9D6";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.restore();

                document.body.onkeydown = function(e){
                    if(e.keyCode == KEY.UP){
                         upArrow(elementSprites4);   
                    };
                    if(e.keyCode == KEY.LEFT){
                         leftArrow(elementSprites4);   
                    };
                    if(e.keyCode == KEY.RIGHT){
                         rightArrow(elementSprites4);   
                    };
                    if(e.keyCode == KEY.DOWN){
                         downArrow(elementSprites4);   
                    };
                };

                for(let e of elementSprites4){
                    e.draw(ctx);
                    ctx.drawImage(player.image,player.x*player.width,player.y*player.height,player.width,player.height);
                };

                if (player.points >= 200){
                    gameState = "level5";
                };
                return;

            case "level5":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "#EAE9D6";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.restore();

                document.body.onkeydown = function(e){
                    if(e.keyCode == KEY.UP){
                         upArrow(elementSprites5);   
                    };
                    if(e.keyCode == KEY.LEFT){
                         leftArrow(elementSprites5);   
                    };
                    if(e.keyCode == KEY.RIGHT){
                         rightArrow(elementSprites5);   
                    };
                    if(e.keyCode == KEY.DOWN){
                         downArrow(elementSprites5);   
                    };
                    if(e.keyCode == KEY.G){
                        gameState = "gameOver";   
                   };
                };

                for(let e of elementSprites5){
                    e.draw(ctx);
                    ctx.drawImage(player.image,player.x*player.width,player.y*player.height,player.width,player.height);
                };

                if (player.points >= 250){
                    gameState = "victory";
                };
                return; 

            case "gameOver":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "rgba(178,175,133,.5)";
                ctx.strokeStyle = "rgba(100,98,73,1)";
                ctx.lineWidth = 30;
                ctx.beginPath();
                ctx.moveTo(canvas.width/2 - 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 - 355);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2 + 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 + 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 + 355);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 + 240);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();
                ctx.save();
                ctx.font = "72px elemental";  
                ctx.lineWidth = 10;
                ctx.strokeStyle = "black";  
                ctx.fillStyle = "#E10202";
                ctx.textAlign = "center"; 
                ctx.strokeText("GAME OVER",screenWidth/2,screenHeight/2);
                ctx.fillText("GAME OVER",screenWidth/2,screenHeight/2);
                ctx.restore();
                ctx.save();
                ctx.font = "24px elemental";
                ctx.textAlign = "center";
                ctx.fillText("Made by James Friedenberg", screenWidth/2,screenHeight/2 + 200);
                document.body.onkeydown = function(e){
                    if(e.keyCode == KEY.V){
                            gameState = "victory";
                    };
                };
                return;

            case "victory":
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.fillStyle = "rgba(178,175,133,.5)";
                ctx.strokeStyle = "rgba(100,98,73,1)";
                ctx.lineWidth = 30;
                ctx.beginPath();
                ctx.moveTo(canvas.width/2 - 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 - 325);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 - 240);
                ctx.lineTo(canvas.width/2 + 590, canvas.height/2);
                ctx.lineTo(canvas.width/2 + 320, canvas.height/2 + 240);
                ctx.lineTo(canvas.width/2, canvas.height/2 + 325);
                ctx.lineTo(canvas.width/2 - 320, canvas.height/2 + 240);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();
                ctx.save();
                ctx.font = "72px elemental";  
                ctx.lineWidth = 10;
                ctx.strokeStyle = "#BEBEBE";  
                ctx.fillStyle = "#00B4AE";
                ctx.textAlign = "center"; 
                ctx.strokeText("VICTORY?",screenWidth/2,screenHeight/2);
                ctx.fillText("VICTORY?",screenWidth/2,screenHeight/2);
                ctx.restore();
                ctx.save();
                ctx.font = "24px elemental";
                ctx.textAlign = "center";
                ctx.fillText("Made by James Friedenberg", screenWidth/2,screenHeight/2 + 200);
                return;
        }
    };

    //use the player's x and y values to determine what kind of blocks they are near
    function spaceChecker(playerX,playerY,objectArr){ 
        //multiplying by 25 because that's how many elements are in each row
        let tempType = objectArr[playerY*25+playerX];
        if(tempType.effect == "block"){
            player.y = player.y;
            player.x = player.x;
        }
        else if(tempType.effect == "point"){
            tempType.image = deadZone;
            player.points += 10;
        }
        else if (tempType.effect == "negative"){
            player.points -= 10;
        }
    };

    //these functions keep track of what happens when the player hits an arrow key. functionality differs depending on where the player is
    //and what blocks surround them
    function upArrow(spritesArray){
        switch (spritesArray){
            //since each level uses a different array, i need to run spaceChecker depending on which is being used
            case elementSprites:
                spaceChecker(player.x, player.y - 1, elementSprites);
                return;
            case elementSprites2:
                spaceChecker(player.x, player.y - 1, elementSprites2);
                return;
            case elementSprites3:
                spaceChecker(player.x, player.y - 1, elementSprites2);
                return;
            case elementSprites4:
                spaceChecker(player.x, player.y - 1, elementSprites2);
                return;
            case elementSprites5:
                spaceChecker(player.x, player.y - 1, elementSprites2);
                return;
        }
    };

    function downArrow(spritesArray){
        switch (spritesArray){
            case elementSprites:
                spaceChecker(player.x, player.y + 1, elementSprites);
                return;
            case elementSprites2:
                spaceChecker(player.x, player.y + 1, elementSprites2);
                return;
            case elementSprites3:
                spaceChecker(player.x, player.y + 1, elementSprites2);
                return;
            case elementSprites4:
                spaceChecker(player.x, player.y + 1, elementSprites2);
                return;
            case elementSprites5:
                spaceChecker(player.x, player.y + 1, elementSprites2);
                return;
        }
    };

    function leftArrow(spritesArray){
        switch (spritesArray){
            case elementSprites:
                spaceChecker(player.x - 1, player.y, elementSprites);
                return;
            case elementSprites2:
                spaceChecker(player.x - 1, player.y - 1, elementSprites2);
                return;
            case elementSprites3:
                spaceChecker(player.x - 1, player.y - 1, elementSprites2);
                return;
            case elementSprites4:
                spaceChecker(player.x - 1, player.y - 1, elementSprites2);
                return;
            case elementSprites5:
                spaceChecker(player.x - 1, player.y - 1, elementSprites2);
                return;
        }
    };

    function rightArrow(spritesArray){
        switch (spritesArray){
            case elementSprites:
                spaceChecker(player.x + 1, player.y, elementSprites);
                return;
            case elementSprites2:
                spaceChecker(player.x + 1, player.y - 1, elementSprites2);
                return;
            case elementSprites3:
                spaceChecker(player.x + 1, player.y - 1, elementSprites2);
                return;
            case elementSprites4:
                spaceChecker(player.x + 1, player.y - 1, elementSprites2);
                return;
            case elementSprites5:
                spaceChecker(player.x + 1, player.y - 1, elementSprites2);
                return;
        }
    };
    
    return{
        init:init,
    };
}());
