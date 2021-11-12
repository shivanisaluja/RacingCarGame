    
    const score = document.querySelector('.score');
	const startScreen = document.querySelector('.startScreen');
	const gameArea = document.querySelector('.gameArea');

	console.log(gameArea);

    // on clicking the div, game will start
	startScreen.addEventListener('click', start);

	let player = { speed : 5, score: 0 } ; // player speed is 5

    // initially set all the keys false
	let keys = { ArrowUp : false, ArrowDown :false, ArrowLeft : false, ArrowRight : false } 
    // after keydown press a call back function ie keyDown Function is called
	document.addEventListener('keydown', keyDown); 
     // after keyup press a call back function ie keyUp Function is called
	document.addEventListener('keyup', keyUp);

	function keyDown(e){
		e.preventDefault(); // to prevent by default functionality
		keys[e.key] = true;  // key which is pressed make that true
		
	}

	function keyUp(e){
		e.preventDefault(); // to prevent by default functionality
		keys[e.key] = false;
	}

// a represents our car
// b represents all the enemy car positions 
	function isCollide(a,b){
		// to get complete position of our car
		aRect  = a.getBoundingClientRect();
		// to get complete position of enemy car
		bRect = b.getBoundingClientRect();
		// if bottom top left right whatever collides game gets stop
		return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
	}


	function moveLines(){
		let lines = document.querySelectorAll('.lines');

		lines.forEach(function(item) {
			//  after reaching at a point lines come again
			if(item.y >= 700){
				item.y -= 750;
			}
			//speed of lines
            item.y += player.speed;
			// line position center
            item.style.top = item.y + "px";
		} )

	}

	function endGame(){
		player.start = false;
		startScreen.classList.remove('hide');
		startScreen.innerHTML = "Game Over <br> Your final score is " + player.score + " <br> Press here to restart the Game."; 
	}

	function moveEnemy(car){
		let enemy = document.querySelectorAll('.enemy');

		enemy.forEach(function(item) {
	// if car collides
			if(isCollide(car, item)){
				console.log("Boom HIT");
				endGame();
			}

	// when these 5 car raches 750  then comes again from top
			if(item.y >= 750){
				item.y = -500;
				item.style.left = Math.floor(Math.random() * 350 ) + "px";

			}
            item.y += player.speed;
            item.style.top = item.y + "px";
		} )

	}

	function gamePlay(){
		let car = document.querySelector('.car');
        // to know the position of the road we use getBoundingClientRect
		let road = gameArea.getBoundingClientRect(); 		
// when player starts the game
		if(player.start){
			moveLines(); 
			moveEnemy(car);
        // increase top position of car by 70
			if(keys.ArrowUp && player.y > (road.top + 70) ) { player.y -= player.speed} // during arrow up top value will be decrease  ie top value - speed
		// from bottom where should car be ie should not go outside the road
            if(keys.ArrowDown && player.y < (road.bottom - 85) ) { player.y += player.speed} // during arrow down top value will increase ie top value + speed
		//player.x>0 is for that we cant go beyond the road from left side
            if(keys.ArrowLeft  &&  player.x > 0 ) { player.x -= player.speed} // when we press left key then distance from left is decreased
		//player.x should be less than rod width and -50 is width of the car
            if(keys.ArrowRight  && player.x < (road.width - 50) ) { player.x += player.speed}// when we press left key then distance from left is increase 

			car.style.top = player.y + "px"; 
			car.style.left = player.x + "px";

			window.requestAnimationFrame(gamePlay);//gamePlay method is invoked
			console.log(player.score++); 

			player.score++;
			let ps = player.score - 2;
			score.innerText = "Score: " + ps;
		}
		
	}

	function start(){

		startScreen.classList.add('hide'); // after game start hide this div
		gameArea.innerHTML = "";
		player.start = true;//player starts the game
		player.score = 0; //initially at sttart the score is zero 
        // for continuous animation
	    window.requestAnimationFrame(gamePlay); //gamePlay method is invoked

        // to get center lines multiple times
		for(x=0; x<5; x++){
            // created center lines of the road
			let roadLine = document.createElement('div');
			roadLine.setAttribute('class', 'lines');
            roadLine.y = (x*150); //  position of lines from top
			roadLine.style.top = roadLine.y + "px";
			// apend road line in play area
            gameArea.appendChild(roadLine);
		}

	// created car in the div gameArea
		let car = document.createElement('div');
		car.setAttribute('class', 'car');
		gameArea.appendChild(car);

		player.x = car.offsetLeft; //position from left
		player.y = car.offsetTop; // position from top

		
		for(x=0; x<5; x++){
			let enemyCar = document.createElement('div');
			enemyCar.setAttribute('class', 'enemy');
			// positioning between two different enemy cars
			enemyCar.y = ((x+1) * 350) * -1;
			enemyCar.style.top = enemyCar.y + "px";
			// each enemy car should have different colors
			enemyCar.style.backgroundColor = randomColor();
			// using random method we will move the div randomly by multiplying it with 350
			enemyCar.style.left = Math.floor(Math.random() * 350 ) + "px";
			gameArea.appendChild(enemyCar);
		}

	}

	function randomColor(){
		function c(){
			let hex = Math.floor(Math.random() * 256).toString(16);
			return ("0" + String(hex)).substr(-2);

		}
		return "#"+c()+c()+c();
	}
