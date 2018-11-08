"use strict";

var app = app || {};
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

app.classes = (function(){
	console.log("app.classes module loaded");
	let PlayerSprite = {
	    //every player instance needs basic movement variables and a tracker for their score and the level they are currently on
		x: 0,
		y: 0,
		height: 0,
		width: 0,
		points: 0,
	}

	let GroundSprite = {
	    x:0,
	    y:0,
	    width:0,
	    height:0,
		type:"",
		effect:"",
		hp:10,
		bombHidden:false
	}

	//sets the image source path of a tile by randomly selecting one of the 5 possible images 
	function chooseElementType(){
	    let rand = Math.floor(getRandom(1,6));
	    switch(rand){
	        case 1:
	        	return "images/water.png";
	        case 2:
	        	return "images/stone.png";
	        case 3:
	        	return "images/fire.png";
			case 4:
				return "images/wind.png";
			case 5:
	        	return "images/basic.png";
	    }
	}

	function getRandom(min, max){
		return Math.random() * (max - min) + min;
	}

	function fillGround(num1,num2,wid,hei){
		let sprites = [];
		for(let i=0;i<num1;i++){
			//nested for loop so we can have the width and height iterators different, else we get diagonal rows of tiles
			for(let j=0;j<num2;j++){
				// create Object literal with a prototype ElementSprite
				let tile = Object.create(GroundSprite);
				let typeHolder = chooseElementType();

				let image = new Image();
				image.src = typeHolder;
				
				// add properties to each tile
				tile = Object.assign(tile,{
					x: 0 + wid * j,
					y: 0 + hei * i,
					width: wid,
					height: hei,
					type: typeHolder,
					effect: "",
					hp: 20,
					bombHidden: false,
					image: image,
					draw(ctx){
						ctx.save();
						ctx.drawImage(tile.image,tile.x,tile.y,tile.width,tile.height);
						ctx.restore();
					}
				});

				//resets the spawning position of the tile if it is going off the canvas
				if(tile.x + tile.width >= canvas.width){
					tile.x = 0;
				};
				if(tile.y + tile.height >= canvas.height){
					tile.y = 0;
				};

				//the player can move only when the space theyre trying to move to is not blocked
				if(tile.type == "images/water.png"){
					tile.effect = "point";
				};
				if(tile.type == "images/fire.png"){
					tile.effect = "point";
				};
				if(tile.type == "images/stone.png"){
					tile.effect = "point";
				};
				if(tile.type == "images/wind.png"){
					tile.effect = "point";
				};

				//sets the basic tiles' hp to 10 so they will break faster
				if(tile.type == "images/basic.png"){
					tile.hp = 10;
					tile.effect = "block";
				};
				if(tile.type == "images/negative.png"){
					tile.hp = 1000;
					tile.effect = "negative";
				}

				//gives a 25% chance for a tile to hide a bomb
				if(getRandom(1,4) == 1){
					tile.bombHidden = true;
				}

				sprites.push(tile);
			}
		}

		return sprites; 
	}

	return{
		fillGround: fillGround,
		PlayerSprite: PlayerSprite,
		GroundSprite: GroundSprite,
	};
}());