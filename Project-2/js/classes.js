/*jshint esversion: 6 */

class PlayerSprite{
    //every player instance needs basic movement variables and a tracker for their score and the level they are currently on
	constructor(x,fwd,speed,points,level){
		this.x = x;
		this.fwd = fwd;
        this.speed = speed;
        this.points = points;
        this.level = level;
	}
	//  the player can move horizontally only - the objective is to catch things falling from the ceiling
	move(){
		this.x += this.fwd.x * this.speed;
    }
    // this will be called when the player reaches either edge of the canvas
	stopX(){
		this.fwd.x *= 0;
		this.x -= 5;
	}
}

class ElementSprite {
    constructor(x,y,width,height,type){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    move(){
        this.y += 10;
    }
}

function createElementSprites(num,type,wid,hei){
	let sprites = [];
	for(let i=0;i<num;i++){
		// create Object literal with a prototype ElementSprite
		let obj = new ElementSprite(0,0,0,0,"");
		
		// add properties to `s`
		obj = Object.assign(obj,{
			width: wid,
			height: hei,
			type: type,
			x: getRandom(0, canvas.width-wid),
			y: 0 - hei * 3,
			draw(ctx){
				ctx.save();
                ctx.drawImage(url(type),x,y);
				ctx.restore();
			}
		});
	
		sprites.push(obj);
	}
	
	return sprites; 
}

function chooseElementType(){
    let rand = Math.floor(getRandom(1,4));
    switch(rand){
        case 1:
            return "../images/water.png";
        case 2:
            return "../images/stone.png";
        case 3:
            return "../images/fire.png";
        case 4:
            return "../images/wind.png";
    }
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}
