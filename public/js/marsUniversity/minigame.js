
var runningGame ={};
var runningGame2 = {};
var secretSticker = {};
var runningGame4 = {};
var tshirtCannon = {};

/* Minigame Code*/
runningGame.main = 
{
	player:
	{
		width : 50,
		height : 50,
		x : 475,
		y:400
	},
	lanes:[],
	enemies:[],
	coins:[],
	instruction: true,
	instructionArea:0,
	speed:50,
	time: 60,
	playTime: this.time*1000,
	scores:
	{
		score: 0,
		tier1: 5,
		tier2: 10,
		tier3: 15,
		tier4: 20
	},
	stop: false,
	


	init: function (c,ctx)
	{
		ctx.restore;
		ctx.save;
		runningGame.main.instruction = true;
		bodyPixelLocation = [];
		frameIndex = 0;
		runningGame4.main.instructionArea = 0;
		ticker = 0;
		if(typeof globals.playerCandidate !== 'undefined'){
			headNumber = globals.playerCandidate.headNum
			raceNumber = globals.playerCandidate.raceNum
			genderNumber = globals.playerCandidate.genderNum
			bodyTypeNumber = globals.playerCandidate.bodyTypeNum
		}
		else{
			headNumber = 0;
			raceNumber = 0;
			genderNumber = 0
			bodyTypeNumber = 0
		}

		titleScreen = new Image();
		titleScreen.src = '../img/minigame1/titlescreen.png'
		instruction = new Image();
		instruction.src = '../img/minigame1/instruction.png'
		backButton = new Image();
		backButton.src = '../img/backbutton.png'

		blueBar = new Image();
		blueBar.src = '../img/bluebar.png';

		bodyPixelArray = [[169,123], [185,137],[218,175],[180,194]]
		backgroundImage= new Image();
		backgroundImage.src ="../img/minigame1/cafebg.png";
		playerAvatar = new Image();
		playerAvatar.src = "../img/minigame1/headspritesheettop.png";
		enemyAvatar = new Image();
		enemyAvatar.src = "../img/minigame1/spriteFlip/flipheadtopsprite.png";
		thinBodyCycle = new Image();
		thinBodyCycle.src = "../img/minigame1/thinwalkcyclesheet.png";
		medBodyCycle = new Image();
		medBodyCycle.src = "../img/minigame1/medwalkcycletop.png";
		largeBodyCycle = new Image();
		largeBodyCycle.src = "../img/minigame1/largewalkcycletop.png";
		chairBodyCycle = new Image();
		chairBodyCycle.src = "../img/minigame1/chairwalkcycletop.png";
		//enemies
		enemythinBodyCycle = new Image();
		enemythinBodyCycle.src = "../img/minigame1/spriteFlip/flipthinkwalkcyclesheet.png";
		enemymedBodyCycle = new Image();
		enemymedBodyCycle.src = "../img/minigame1/spriteFlip/flipmedwalkcyclesheet.png";
		enemylargeBodyCycle = new Image();
		enemylargeBodyCycle.src = "../img/minigame1/spriteFlip/fliplargewalkcyclesheet.png";
		enemychairBodyCycle = new Image();
		enemychairBodyCycle.src = "../img/minigame1/spriteFlip/flipchairwalkcyclesheet.png";
		animationAssets = new Image();
		animationAssets.src = "../img/minigame1/assetscafe.png";
		walkCycleArray = [thinBodyCycle, medBodyCycle, largeBodyCycle, chairBodyCycle];
		enemyWalkCycleArray = [enemythinBodyCycle, enemymedBodyCycle, enemylargeBodyCycle, enemychairBodyCycle];
		//lets add all the images

		runningGame.main.player=
		{
			width : 50,
			height : 50,
			x : 475,
			y:375
		};
		runningGame.main.lanes=[];
		runningGame.main.enemies=[];
		runningGame.main.coins=[];
		runningGame.main.removeEns=[];
		runningGame.main.removeCoins=[];
		runningGame.main.mouse={};
		runningGame.main.speed=50;
		runningGame.main.time= 60;
		runningGame.main.playTime= runningGame.main.time*1000;
		runningGame.main.scores=
		{
			score: 0,
			tier1: 5,
			tier2: 10,
			tier3: 15
		};
		runningGame.main.stop= false;
		
		runningGame.main.lanes.push(
		{
			top : 0,
			bottom : 500,
			left:0,
			right:332
		});
		runningGame.main.lanes.push(
		{
			top : 0,
			bottom : 500,
			left:334,
			right:665
		});
		runningGame.main.lanes.push(
		{
			top : 0,
			bottom : 500,
			left:667,
			right:999
		});
		ctx.strokeRect(0, 0, 1000, 500);

		ctx.moveTo(333, 0)
		ctx.lineTo(333,500);
		ctx.stroke();

		ctx.moveTo(666, 0);
		ctx.lineTo(666,500);
		ctx.stroke();

		ctx.font = "20px Arial";
		ctx.strokeText("Minutes Remaining: " +runningGame.main.time+"",790,20);

		ctx.font = "20px Arial";
		ctx.strokeText("Score " +runningGame.main.scores.score+"",0,20);

		c.onmousedown = runningGame.main.doMousedown;
		
		titleScreen.onload = function(){
			runningGame.main.update(c,ctx);
		}
	},

	update: function (c,ctx)
	{
		if(!runningGame.main.stop)
		{			
			requestAnimationFrame(function(){runningGame.main.draw(c,ctx)});
			
			if(runningGame.main.instruction == false){
				requestAnimationFrame(function(){runningGame.main.update(c,ctx)});
				runningGame.main.collisionManager();
			for(var i=0;i<runningGame.main.enemies.length;i++)
			{
				runningGame.main.enemies[i].move();
			}
			for(var i=0;i<runningGame.main.coins.length;i++)
			{
				runningGame.main.coins[i].move();
			}
			if(frameIndex >= 8){
				frameIndex = 0;
			}
				ticker++;
			}
		}
	},

	draw: function(c,ctx)
	{

		if(runningGame.main.instruction == false){
			ctx.drawImage(backgroundImage,-30,0,930,500);
			ctx.drawImage(blueBar,0,0,c.width,30)
			ctx.fillStyle = '#000000'
			ctx.font = "20px Arial";
			ctx.fillText("Time Remaining: " +runningGame.main.time+"",700,22);
		
			ctx.font = "20px Arial";
			ctx.fillText("Score " +runningGame.main.scores.score+"",10,22);
		var actualFrame;
		//player	
		//body
		if(bodyTypeNumber ==3){
			actualFrame =0;
		}
		else{
			actualFrame = frameIndex
		}
		ctx.drawImage(walkCycleArray[bodyTypeNumber], (actualFrame * bodyPixelArray[bodyTypeNumber][0]) ,(genderNumber * bodyPixelArray[bodyTypeNumber][1]),bodyPixelArray[bodyTypeNumber][0],bodyPixelArray[bodyTypeNumber][1],runningGame.main.player.x-2,runningGame.main.player.y-5,runningGame.main.player.width,runningGame.main.player.height);
		//head
		ctx.drawImage(playerAvatar, headNumber * 154, raceNumber*162 ,154,162,runningGame.main.player.x-1,runningGame.main.player.y,runningGame.main.player.width,runningGame.main.player.height);
		


		//enemies
			for(var i=0;i<runningGame.main.enemies.length;i++)
			{
			if(runningGame.main.enemies[i].body ==3){
					actualFrame =0;
				}
			else{
				actualFrame = frameIndex
			}
				ctx.drawImage(enemyWalkCycleArray[runningGame.main.enemies[i].body], (actualFrame * bodyPixelArray[runningGame.main.enemies[i].body][0]) ,(runningGame.main.enemies[i].gender * bodyPixelArray[runningGame.main.enemies[i].body][1]),bodyPixelArray[runningGame.main.enemies[i].body][0],bodyPixelArray[runningGame.main.enemies[i].body][1],runningGame.main.enemies[i].x,runningGame.main.enemies[i].y+5,runningGame.main.enemies[i].width,runningGame.main.enemies[i].height);
				ctx.drawImage(animationAssets,8,210,118,75,runningGame.main.enemies[i].x+5,runningGame.main.enemies[i].y+35,40,20)
				ctx.drawImage(animationAssets,32,149,49,49,runningGame.main.enemies[i].x+15,runningGame.main.enemies[i].y+35,20,20)
				ctx.drawImage(enemyAvatar,runningGame.main.enemies[i].face * 154, runningGame.main.enemies[i].race * 162 ,150,160,runningGame.main.enemies[i].x,runningGame.main.enemies[i].y,runningGame.main.enemies[i].width,runningGame.main.enemies[i].height);
				if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.enemies[i])){
					ctx.drawImage(animationAssets,248,169,241,157,runningGame.main.enemies[i].x-50,runningGame.main.enemies[i].y-20,157,107);
				}
				
			}
		//coins
			for(var i=0;i<runningGame.main.coins.length;i++)
			{
				if(runningGame.main.coins[i].body ==3){
					actualFrame =0;
				}
				else{
					actualFrame = frameIndex
				}
				ctx.drawImage(enemyWalkCycleArray[runningGame.main.coins[i].body],(actualFrame * bodyPixelArray[runningGame.main.coins[i].body][0]) ,(runningGame.main.coins[i].gender * bodyPixelArray[runningGame.main.coins[i].body][1]),bodyPixelArray[runningGame.main.coins[i].body][0],bodyPixelArray[runningGame.main.coins[i].body][1] ,runningGame.main.coins[i].x+2,runningGame.main.coins[i].y+5,runningGame.main.coins[i].width,runningGame.main.coins[i].height); 
       			ctx.drawImage(enemyAvatar,runningGame.main.coins[i].face * 154, runningGame.main.coins[i].race * 162 ,150,160,runningGame.main.coins[i].x,runningGame.main.coins[i].y,runningGame.main.coins[i].width,runningGame.main.coins[i].height);
				if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.coins[i])){
					ctx.drawImage(animationAssets,241,0,177,148,runningGame.main.coins[i].x-55,runningGame.main.coins[i].y-25,157,107);
				}
			}
			if(ticker > 5){
				frameIndex++;
				ticker = 0;
			}
		}
		else{

			if(runningGame.main.instructionArea == 0){
				ctx.drawImage(titleScreen,0,0,c.width,c.height)			}
			else if (runningGame.main.instructionArea == 1){
				ctx.drawImage(instruction,0,0,c.width,c.height)
				ctx.drawImage(backButton,35,420,190,60)
			}
		
				runningGame.main.update(c,ctx);
		}
	},
	
	doMousedown: function(c, e)
	{ 
	////CONSOLE.LOG(globals.canvasMouse);
		var mouse = globals.canvasMouse;
		runningGame.main.laneChanger(mouse, c, globals.ctx );
	},

	laneChanger: function (mouse,c,ctx)
	{
		////CONSOLE.LOG(runningGame.main.lanes);
		////CONSOLE.LOG(mouse, runningGame.main.instruction);
		if(!runningGame.main.instruction){
		for(var i=0; i < runningGame.main.lanes.length; i++)
		{
			if(mouse.x >= runningGame.main.lanes[i].left && mouse.x <= runningGame.main.lanes[i].right && mouse.y >= runningGame.main.lanes[i].top && mouse.y <= runningGame.main.lanes[i].top + runningGame.main.lanes[i].bottom )
			{
				runningGame.main.player.x = ((runningGame.main.lanes[i].left+runningGame.main.lanes[i].right)/2 - 25);
				if(i==0)
				{
					////CONSOLE.LOG("1");
				}
				else if(i==1)
				{
					////CONSOLE.LOG("2");
				}
				else if(i==2)
				{
					////CONSOLE.LOG("3");
				}
			}
		}
	}
	else{

		if(runningGame.main.instructionArea == 0 && (mouse.x >= 35 && mouse.x <=225) && (mouse.y >=420 && mouse.y <= 726)){
			runningGame.main.instruction = false;

		 	c = globals.c;
				var ctx = c.getContext("2d");

			for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/15)
			{setTimeout(runningGame.main.enemyGenerator, i);}
			for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/20)
			{setTimeout(runningGame.main.coinGenerator, i);}
			for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/6)
			{setTimeout(runningGame.main.increaseSpeed, i);}
			for(var i =0; i< runningGame.main.playTime; i +=runningGame.main.playTime/runningGame.main.time)
			{setTimeout(runningGame.main.timer, i);}
			setTimeout(runningGame.main.stopGame, runningGame.main.playTime);

				runningGame.main.update(c,ctx);
			}
			else if (runningGame.main.instructionArea == 0 && (mouse.x >= 666 && mouse.x <=856) &&(mouse.y >=420 && mouse.y <= 726)){
				runningGame.main.instructionArea = 1;
			}
			else if (runningGame.main.instructionArea == 1 && (mouse.x >= 35 && mouse.x <=225) && (mouse.y >=420 && mouse.y <= 726)){
				runningGame.main.instructionArea = 0;
			}

		}

	},

	enemyGenerator: function ()
	{
		var add = true;
		var lane = Math.floor(Math.random()* 3);
		var tempRect = 
		{
			touched:false,
			width : 50,
			height : 50,
			y: 75,
			x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
			move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
		};
		for(var i =0; i< runningGame.main.enemies.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.enemies[i],tempRect))
				add = false;
		}
		for(var i =0; i< runningGame.main.coins.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.coins[i],tempRect))
				add = false;
		}
		if(add)
		{
			runningGame.main.enemies.push(
			{
				touched:false,
				width : 50,
				height : 50,
				y: 75,
				race: Math.floor((Math.random() * 3)),
				gender: Math.floor((Math.random() * 3)), 
				face: Math.floor((Math.random() * 6)), 
				body: Math.floor((Math.random() * 4)),  
				x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
				move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
				id: runningGame.main.enemies.length
			});
		}

		////CONSOLE.LOG(runningGame.main.enemies);
	},

	coinGenerator: function ()
	{
		//var lane = Math.floor(Math.random()* 3);
		//runningGame.main.coins.push(
		//{
		//	width : 50,
		//	height : 50,
		//	y: 100,
		//	x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
		//	move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
		//	id: runningGame.main.coins.length
		//});
		
		
		var add = true;
		var lane = Math.floor(Math.random()* 3);
		var tempRect = 
		{
			width : 50,
			height : 50,
			y: 100,
			x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
			move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
		};
		for(var i =0; i< runningGame.main.enemies.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.enemies[i],tempRect))
				add = false;
		}
		for(var i =0; i< runningGame.main.coins.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.coins[i],tempRect))
				add = false;
		}
		if(add)
		{
			runningGame.main.coins.push(
			{
				touched:false,
				width : 50,
				height : 50,
				y: 75,
				race: Math.floor((Math.random() * 3)),
				gender: Math.floor((Math.random() * 3)), 
				face: Math.floor((Math.random() * 6)), 
				body: Math.floor((Math.random() * 4)),  
				x:((runningGame.main.lanes[lane].left+runningGame.main.lanes[lane].right)/2 - 25),
				move: function(){this.y+=runningGame.main.speed*runningGame.main.calculateDeltaTime()},
				id: runningGame.main.coins.length
			});
		}

	},

	collisionDetector: function (rect1, rect2)
	{
		if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) 
			return true;
		else
			return false;
	},

	collisionManager: function ()
	{
		for(var i=0;i<runningGame.main.enemies.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.enemies[i]))
			{
				if(runningGame.main.enemies[i].touched == false)
				{
					runningGame.main.enemies[i].touched = true;
					runningGame.main.scores.score--;
					if(runningGame.main.scores.score<0)
							runningGame.main.scores.score=0;
				}
				//draw the collision

			}
			else if(runningGame.main.enemies[i].y >1000)
			{
				runningGame.main.removeEns.push(runningGame.main.enemies[i].id);
			}
		}
		for(var i=0;i<runningGame.main.coins.length;i++)
		{
			if(runningGame.main.collisionDetector(runningGame.main.player, runningGame.main.coins[i]))
			{
				if(runningGame.main.coins[i].touched == false)
				{
					runningGame.main.coins[i].touched = true;
					runningGame.main.scores.score++;
					if(runningGame.main.scores.score>20)
							runningGame.main.scores.score=20;
				}
			}
			else if(runningGame.main.coins[i].y >1000)
			{
				runningGame.main.removeCoins.push(runningGame.main.coins[i].id);
			}
		}
	},

	stopGame: function ()
	{
		runningGame.main.stop=true;
		minigameResults(runningGame.main.scores, globals.practice, globals.loopable);
	},

	calculateDeltaTime: function()
	{
		var now,fps;
		now = (+new Date);
		fps = 1000 / (now - this.lastTime);
		fps = Math.max(12, Math.min(60, fps));
		this.lastTime = now;
		return 1/fps;
	},

	increaseSpeed: function()
	{
		runningGame.main.speed += 25;
	},

	timer: function()
	{
		runningGame.main.time--;
	}
}

/*Photo Game*/
runningGame2.main = 
{
	player:
	{
		picturenum:0,
		pictures:[],

	},
	studentCircles: [],
	activeStudent: "",
	requiredDemograph1: 0,
	requiredDemograph2: 0,
	takenDemograph1:0,
	takenDemograph2:0,
	demograph1num:0,
	demograph2num:0,
	instructionNum:0,
	areaNumber: 0,
	specialExist: false,
	picturetaken: false,
	cantTake: false,
	inArea:false,	
	hover: false,
	scores: {
		score:0,
		tier1: 2,
		tier2: 4,
		tier3: 6,
		tier4: 8
	},
	buildingHover: [false,false,false,false,false,false],


	//area numbers (0-Map, 1-6 map locations clockwise, 7 victory screen?)	
	stop: false,

	init: function(c,ctx){
		ctx.restore;
		ctx.save;
		runningGame2.main.stop = false;
		runningGame2.main.hover = false;
		runningGame2.main.instructionNum = 0;

		headIcons = new Image();
		headIcons.src = '../img/spriteheadlong.png';
		instruction = new Image();
		instruction.src = '../img/minigame2/instruction1.png'
		instruction2 = new Image();
		instruction2.src = '../img/minigame2/instruction2.png'

		//map icons
		libraryIcon = new Image();
		libraryIcon.src = '../img/map/libraryicon.png';
		quadIcon = new Image();
		quadIcon.src = '../img/map/icon.png';
		gymIcon = new Image();
		gymIcon.src = '../img/map/gymicon.png';
		commonsicon = new Image();
		commonsicon.src = '../img/map/commonsIcon.png';
		labIcon = new Image();
		labIcon.src = '../img/map/labicon.png';
		mediaIcon = new Image();
		mediaIcon.src =  '../img/map/mediaicon.png';

		blueBar = new Image();
		blueBar.src = '../img/bluebar.png';

		titleScreen = new Image();
		titleScreen.src = '../img/minigame2/titlescreen.png';

		//peopleicons
		tuitionIcon = new Image();
		tuitionIcon.src = '../img/icons/tuitionsquare.png';	
		researchIcon = new Image();
		researchIcon.src = '../img/icons/researchsquare.png';
		socialIcon = new Image();
		socialIcon.src = '../img/icons/schoolevents.png';
		medicalIcon = new Image();
		medicalIcon.src = '../img/icons/medicalsquare.png';
		//majoricons
		artIcon = new Image();
		artIcon.src = '../img/icons/artisticon.png';
		businessIcon = new Image();
		businessIcon.src = '../img/icons/businessicon.png'
		lawIcon = new Image();
		lawIcon.src = '../img/icons/lawicon.png'
		techIcon = new Image();
		techIcon.src = '../img/icons/techicon.png'

		studentID = new Image();
		studentID.src = '../img/studentid.png';

		//backgrounds
		cafebg = new Image();
		cafebg.src = '../img/minigame2/backgroundcafe.png';
		quadbg = new Image();
		quadbg.src = '../img/minigame2/quadpicturebgNEW.png';
		gymbg = new Image();
		gymbg.src = '../img/minigame2/photobombgymbg.png';
		libbg = new Image();
		libbg.src = '../img/minigame2/Librarusnapshotbg.png';
		labsbg = new Image();
		labsbg.src = '../img/minigame2/labsbg.png';


		//get people assets
		hoverPeace1 = new Image();
		hoverPeace1.src = "../img/minigame2/hover1peace.png";
		hoverPeace2 = new Image();
		hoverPeace2.src = '../img/minigame2/hover2peace.png';
		hoverStrong = new Image();
		hoverStrong.src = '../img/minigame2/hoverstrong.png';
		thinPeace1 = new Image();
		thinPeace1.src = '../img/minigame2/thinpeace1.png'
		thinPeace2 = new Image();
		thinPeace2.src = '../img/minigame2/thinpeace2.png'
		thinStrong = new Image();
		thinStrong.src = '../img/minigame2/thinstrong.png'
		medPeace1 = new Image();
		medPeace1.src = '../img/minigame2/medpeace.png';
		medPeace2 = new Image();
		medPeace2.src = '../img/minigame2/medpeace2.png';
		medStrong = new Image();
		medStrong.src = '../img/minigame2/medstrong.png';
		plusPeace1 = new Image();
		plusPeace1.src = '../img/minigame2/pluspeace1.png';
		plusPeace2 = new Image();
		plusPeace2.src = '../img/minigame2/pluspeace2.png';
		plusStrong = new Image();
		plusStrong.src = '../img/minigame2/plusstrong.png';

		backButton = new Image();
		backButton.src = '../img/backbutton.png'
		cameraIcon = new Image();
		cameraIcon.src = '../img/minigame3/cameraicon.png';
		awesomePic = new Image();
		awesomePic.src = '../img/AwesomePicture.png';

		imgBArray = [[thinPeace1, thinPeace2, thinStrong], [medPeace1, medPeace2, medStrong], [plusPeace1, plusPeace2, plusStrong], [hoverPeace1, hoverPeace2, hoverStrong]]
		iconArray = [tuitionIcon, researchIcon, socialIcon, medicalIcon];
		majorIconArray = [artIcon,businessIcon,lawIcon,techIcon];
		mapbackground = new Image();
		mapbackground.src = '../img/map/map.png';




		//now init
		runningGame2.main.gameStop = false;
		runningGame2.main.player.picturenum = 0;
		runningGame2.main.player.pictures = [],
		runningGame2.main.scores.score = 0;	
		runningGame2.main.areaNumber = -1;	
		c.onmousedown = runningGame2.main.doMousedown;
		c.onmousemove = runningGame2.main.doMouseOver;
		ctx.font="14px Georgia";
		runningGame2.main.requiredDemograph1 = Math.floor(Math.random() * 6) + 2;
		runningGame2.main.requiredDemograph1 = Math.floor(Math.random() * 3) + 2;
		runningGame2.main.demograph1num = Math.floor(Math.random() * 4);
		runningGame2.main.demograph2num = Math.floor(Math.random() * 4);
		runningGame2.main.takenDemograph1=0;
		runningGame2.main.takenDemograph2=0;
	
		mapbackground.onload = function(){
			runningGame2.main.update(c,ctx);
		}
	},

	update: function (c,ctx)
	{
		
		if(!runningGame2.main.stop)
		{
			requestAnimationFrame(function(){runningGame2.main.update(c,ctx)});
     		requestAnimationFrame(function(){runningGame2.main.draw(c,ctx)});
     	
	
			//double check player photos = the amount they need
				//end game
			if(runningGame2.main.player.picturenum > 2 && !runningGame2.main.cantTake){
				runningGame2.main.stopGame();
			}

			else{
			//generate information for the map area
			if(runningGame2.main.areaNumber > 0 && runningGame2.main.areaNumber < 9 && !(runningGame2.main.picturetaken)){
			 			var hold = 0;	
			 	if(!runningGame2.main.inArea){
			 	createSample((Math.floor(Math.random() * 3) + 4), runningGame2.main.areaNumber - 1)
				runningGame2.main.studentCircles = [];
				widthArray = [ [[60,150],[70,160],[70,120]], [[80,140],[80,140],[80,140]],[[100,140],[100,140],[100,140]],[[80,140],[80,140],[80,140]]]		
				headArray = [[[17,9,0],[5,14,7],[12,10,2]] , [[1,8,4],[1,9,17],[7,3,8]] , [[16,8,0],[0,16,6],[14,4,7]] , [[0,11,14],[12,8,5],[4,7,16]] ]
				globals.sample.forEach(function(element) {
					var studentCircleHolder = {
						isDemographic: false,
						interest: Math.floor(Math.random() * 4),
						major: Math.floor(Math.random() * 4),
						typenum: Math.floor(Math.random() * 4),
						posenum: Math.floor(Math.random() * 3),
						headnum: Math.floor(Math.random() * 3),
						x:  Math.floor(Math.random() * 79) + (110 * hold),
   					y:  Math.floor(Math.random() * 50) + 230,
   					headID: 0,
   					width: 10,
   					height: 10,
					}
					studentCircleHolder.width = widthArray[studentCircleHolder.typenum][studentCircleHolder.posenum][0]
					studentCircleHolder.height= widthArray[studentCircleHolder.typenum][studentCircleHolder.posenum][1]
					studentCircleHolder.headID = headArray[studentCircleHolder.typenum][studentCircleHolder.posenum][studentCircleHolder.headnum]
					hold++;
   				if(studentCircleHolder.interest == runningGame2.main.demograph1num){
   						studentCircleHolder.isDemographic = true;   					
   					}
   				runningGame2.main.studentCircles.push(studentCircleHolder)   					
				});
				runningGame2.main.inArea = true;
				}
				
			}
			else if(runningGame2.main.picturetaken){
			
				runningGame2.main.picturetaken = false;
				runningGame2.main.cantTake = true;
				setTimeout(runningGame2.main.returnAfterPicture, 1000);
			}
		}			
		}
		
	},
	
	returnAfterPicture: function()
	{
		runningGame2.main.inArea = false;
		runningGame2.main.areaNumber = 0;
		runningGame2.main.cantTake = false;
	},
	
	stopGame: function ()
	{
		runningGame2.main.stop=true;
		minigameResults(runningGame2.main.scores, globals.practice, globals.loopable);
	},

	draw: function(c,ctx)
	{
		//draw the background for the area
		
		if(runningGame2.main.areaNumber == -1)
			ctx.drawImage(titleScreen,0,0,c.width,c.height)
		else if (runningGame2.main.areaNumber == -2){
			ctx.drawImage(instruction,0,0,c.width,c.height)
			ctx.drawImage(backButton,35,420,190,60)
		}
		else if (runningGame2.main.areaNumber == -3){
			ctx.drawImage(instruction2,0,0,c.width,c.height)
			ctx.drawImage(backButton,35,420,190,60)
		}

		else if(!runningGame2.main.inArea && runningGame2.main.areaNumber>=0)
		{
			ctx.drawImage(mapbackground, 0,0,900,500);
		}
		else
        {
			//draw backgrounds
            switch(runningGame2.main.areaNumber)
            {
                case 1:
                ctx.drawImage(quadbg, 0,0,900,500);
                break;
                case 2:
                ctx.drawImage(gymbg, 0,0,900,500);
                break;
                case 3:
                ctx.drawImage(labsbg, 0,0,900,500);            
                break;
                case 4:
                ctx.fillStyle = '#FFFFFF';
                ctx.drawImage(cafebg, 0,0,900,500);
                break;
                case 5:
                ctx.drawImage(libbg, 0,0,900,500);
                break;
                default:
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0,0,900, 500)
                break;
            }
		}
		//draw anything specific ontop of the background layer depending on what area you are
		if(runningGame2.main.areaNumber >= 0){
			if(runningGame2.main.areaNumber == 0){
					//quad
					ctx.strokeStyle = '#00FFFF';
				
			
					ctx.drawImage(blueBar,0,0,c.width, 35)
					ctx.fillStyle = '#000000'
					ctx.font = '25px Arial'
					ctx.fillText('Choose an Area', 350, 25)

					ctx.fillStyle = 'rgba(0,255,255,0.5)';
					ctx.lineWidth = 3;

					//stroke areas for gym
					ctx.beginPath();
					ctx.moveTo(530,40);
					ctx.lineTo(530,150);
					ctx.lineTo(725,150);
					ctx.lineTo(725,300);
					ctx.lineTo(880,300);
					ctx.lineTo(880,40);
					ctx.closePath();
					ctx.stroke();
					if(runningGame2.main.buildingHover[1]){
						ctx.fill();
					}
					//stroke labs
					ctx.beginPath();
					ctx.moveTo(225,40);
					ctx.lineTo(225,170);
					ctx.lineTo(275,170);
					ctx.lineTo(275,200);
					ctx.lineTo(340,200);
					ctx.lineTo(340,170);
					ctx.lineTo(383,170);
					ctx.lineTo(383,40);
					ctx.closePath();
					ctx.stroke();
					if(runningGame2.main.buildingHover[3]){
						ctx.fill();
					}
		
					//quad
					ctx.strokeRect(208,235,243,60);
					if(runningGame2.main.buildingHover[0]){
						ctx.fillRect(208,235,243,60);
					}
					//library
					ctx.strokeRect(600,330,280,155);
					if(runningGame2.main.buildingHover[5]){
						ctx.fillRect(600,330,280,155);
					}
					//cafe
					
					//media
					ctx.strokeRect(135,333,175,145);
					if(runningGame2.main.buildingHover[2]){
						ctx.fillRect(135,333,175,145);
					}
					//labs
		
					//draw icon
					ctx.drawImage(quadIcon, 255,190,150,100)
					ctx.drawImage(libraryIcon, 665,325,150,100)
					ctx.drawImage(gymIcon, 725,50,150,100)
			
					ctx.drawImage(commonsicon, 150,335,150,100)
					ctx.drawImage(labIcon, 230,25,150,100)
                    
					ctx.fillStyle = '#000000'
					var scoreText = "Target Group:     " + runningGame2.main.takenDemograph1 + '/'+ runningGame2.main.requiredDemograph1 + " ";
					var photosLeftText = runningGame2.main.player.picturenum + '/3 Photos Taken'
				
					ctx.drawImage(iconArray[runningGame2.main.demograph1num], 805,7,25,25);
					ctx.fillText(scoreText, 650,27);
					ctx.fillText(photosLeftText, 19,27);
				}
				if(runningGame2.main.areaNumber>0){
					
					//draw the students
		
					runningGame2.main.drawStudents(c,ctx,runningGame2.main.studentCircles)
					//draw the ux/ui of the game
					ctx.drawImage(blueBar,0,430,c.width,70)


				
					ctx.fillStyle = '#000000'
					ctx.fillRect(400,440,100,50)
					ctx.strokeStyle = '#000000'
					ctx.drawImage(cameraIcon,423,437,55,55)
					ctx.strokeRect(400,440,100,50);
		

					ctx.fillStyle = '#000000'
					var scoreText = "Target Group:         " + runningGame2.main.takenDemograph1 + '/'+ runningGame2.main.requiredDemograph1 + " ";
					var photosLeftText = runningGame2.main.player.picturenum + '/3 Photos Taken'
				
					ctx.drawImage(iconArray[runningGame2.main.demograph1num], 690,440,50,50);
					ctx.fillText(scoreText, 530,470);
					ctx.fillText(photosLeftText, 190,470);
					ctx.drawImage(backButton,10,440,150,50)

					//student ID card
					if(runningGame2.main.hover){
						ctx.drawImage(studentID,runningGame2.main.activeStudent.x + 50,runningGame2.main.activeStudent.y-110,210,135)
						//draw head
						ctx.drawImage(headIcons,154 * runningGame2.main.activeStudent.headID,0,154,172,runningGame2.main.activeStudent.x + 68,runningGame2.main.activeStudent.y-96,60,60)
						//draw icon
						ctx.drawImage(iconArray[runningGame2.main.activeStudent.interest],runningGame2.main.activeStudent.x + 207,runningGame2.main.activeStudent.y-52,37,27)
						ctx.drawImage(majorIconArray[runningGame2.main.activeStudent.major],runningGame2.main.activeStudent.x + 142,runningGame2.main.activeStudent.y-52,37,27)
					}
					if(runningGame2.main.cantTake)
					{
						ctx.drawImage(awesomePic,50,0,800,500);
					}
				}
		
					//draw the score
		
		}
	
	},

	drawStudents: function(c,ctx, students){
        hoverArray = [[224,477],[287,467],[257,466]];
        thinArray = [[184,518], [217,531], [259,469]];
        medArray = [[266,493], [224,495], [285, 492]]
        plusArray = [[277,463], [311,475], [322,463]]
		sizeArray = [thinArray, medArray, plusArray, hoverArray]
		widthArray = [ [[60,150],[70,160],[70,120]], [[80,140],[80,140],[80,140]],[[100,140],[100,140],[100,140]],[[80,140],[80,140],[80,140]]]		
		
		//icons

		students.forEach(function(e){
			//draw student	
			ctx.drawImage(imgBArray[e.typenum][e.posenum], sizeArray[e.typenum][e.posenum][0] * e.headnum, 0,sizeArray[e.typenum][e.posenum][0],sizeArray[e.typenum][e.posenum][1],e.x,e.y,widthArray[e.typenum][e.posenum][0],widthArray[e.typenum][e.posenum][1]);
			//draw head
		
		})
	

	},

	doMousedown: function(c, e)
	{ 
		////CONSOLE.LOG(globals.canvasMouse);
		var mouse = globals.canvasMouse;
		var update = false

		//check if the area is clickable
		if(runningGame2.main.areaNumber == 0){
			//quad 		ctx.strokeRect(208,235,243,60);
			if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
				runningGame2.main.areaNumber = 1;
				update = true;
			}
			
			//gym1
			if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
				runningGame2.main.areaNumber = 2;
				update = true;
			}
			//gym2
			if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
				runningGame2.main.areaNumber = 2;
				update = true;
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475)){
				runningGame2.main.areaNumber = 4;
				update = true;
			}
		
			//labs1
			if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
				runningGame2.main.areaNumber = 3;
				update = true;
			}
			//labs2
			else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
				runningGame2.main.areaNumber = 3;
				update = true;
			}
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
				runningGame2.main.areaNumber = 5;
				update = true;
			}
		}
		else if(runningGame2.main.areaNumber > 0 && runningGame2.main.areaNumber < 9 ){

			if((mouse.x >= 5 && mouse.x <= 155)&&(mouse.y >= 445 && mouse.y <= 495)){
				runningGame2.main.areaNumber = 0;
				runningGame2.main.inArea = false;
				update = true;
			}
			if((mouse.x >= 400 && mouse.x <= 500)&&(mouse.y >= 440 && mouse.y <= 490) && !runningGame2.main.cantTake){
				runningGame2.main.picturetaken = true;
				update = true;
				runningGame2.main.player.picturenum++;
				runningGame2.main.studentCircles.forEach(function(element) {
		
					if (element.isDemographic){						
						runningGame2.main.takenDemograph1++;
						runningGame2.main.scores.score++;				
					}
					runningGame2.main.cantTake = true;
				});
			}
		}
		else if(runningGame2.main.areaNumber == -1 && (mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 35 && mouse.x <=225) ){
			runningGame2.main.areaNumber++;
		}
		else if(runningGame2.main.areaNumber == -1 && (mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 666 && mouse.x <=856) ){
			runningGame2.main.areaNumber--;
		}
		else if(runningGame2.main.areaNumber == -2 && (mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 35 && mouse.x <=225) ){
			runningGame2.main.areaNumber++;
		}
		else if(runningGame2.main.areaNumber == -2 && (mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 666 && mouse.x <=856) ){
			runningGame2.main.areaNumber--;
		}
		else if(runningGame2.main.areaNumber == -3 && (mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 35 && mouse.x <=225) ){
			runningGame2.main.areaNumber++;
		}

	
		
		//if not a clickable area do nothing
	},

	doMouseOver: function(c, e){
		var mouse = globals.canvasMouse;
			widthArray = [ [[60,150],[70,160],[70,120]], [[80,140],[80,140],[80,140]],[[100,140],[100,140],[100,140]],[[80,140],[80,140],[80,140]]]		
				//check if the area is clickable
		if(runningGame2.main.areaNumber == 0){
			runningGame2.main.buildingHover = [false,false,false,false,false,false];
			if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
				runningGame2.main.buildingHover[0] = true;
			}
			if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
				runningGame2.main.buildingHover[1] = true;
			}
			//gym2
			else if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
				runningGame2.main.buildingHover[1] = true;
			}
			//media 		ctx.strokeRect(135,333,175,145);
			if((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475)){
				runningGame2.main.buildingHover[2] = true;
			}
		
			//labs1
			if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
				runningGame2.main.buildingHover[3] = true;
			}
			//labs2
			else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
				runningGame2.main.buildingHover[3] = true;
			}
			//coffee shop 
			if((mouse.x >= 13 && mouse.x <= 178)&&(mouse.y >= 43 && mouse.y <= 303)){
				runningGame2.main.buildingHover[4] = true;
			}
			//library 	ctx.strokeRect(600,330,280,155);
			if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
				runningGame2.main.buildingHover[5] = true;
			}
		}
		else if (runningGame2.main.areaNumber > 0){
			var showStudentID = false;
			runningGame2.main.hover = false;
			for(var z =0; z < runningGame2.main.studentCircles.length; z++){
				if(mouse.x >= runningGame2.main.studentCircles[z].x && mouse.x <= (runningGame2.main.studentCircles[z].x+ runningGame2.main.studentCircles[z].width)){
					if(mouse.y >= runningGame2.main.studentCircles[z].y && mouse.y <= (runningGame2.main.studentCircles[z].y+ runningGame2.main.studentCircles[z].height)){
						showStudentID = true;	
						runningGame2.main.activeStudent = runningGame2.main.studentCircles[z];
					}
				}
			}
			if(showStudentID == true){
				runningGame2.main.hover = true;
			}
			
		}
	},
}

	/*Secret Sticker*/
secretSticker.main = 
{
    player:
    {
        picturenum:0,
        pictures:[],

    },
    activeHover: false,
    activeID: 0,
    activeStudent: 0,
    requiredDemograph1: 0,
    takenDemograph1:0,
    demograph1num:0,
    areaNumber: 9,
    inArea:false,
    postersLeft: 5,
    drag: false,
    placeStudents: false,
    scores: {
        score:0,
        tier1: 1,
        tier2: 3,
        tier3: 5,
        tier4: 7
    },
    areas:
    [ 
        {
            
        },
        
        //quad
        {
            students: [],
            studentPositions: [],
            posterHung: 0,
            position1: false, 
            position2: false, 
            position3: false 
        },
        //gym
        {
            students: [],
            studentPositions: [],
            posterHung: 0,
            position1: false, 
            position2: false, 
            position3: false 
        },
        //media
        {
            students: [],
            studentPositions: [],
            posterHung: 0,
            position1: false, 
            position2: false, 
            position3: false 
        },
        //labs
        {
            students: [],
            studentPositions: [],
            posterHung: 0,
            position1: false, 
            position2: false, 
            position3: false 
        },
        //coffee shop
        {
            students: [],
            studentPositions: [],
            posterHung: 0,
            position1: false, 
            position2: false, 
            position3: false 
        },
        //library
        {
            students: [],
            studentPositions: [],
            posterHung: 0,
            position1: false, 
            position2: false, 
            position3: false 
        }
    ],
    buildingHover: [false,false,false,false,false,false],
    //area numbers (0-Map, 1-6 map locations clockwise, 7 victory screen?)
    init: function(c,ctx)
    {
        ctx.restore;
        ctx.save;
        secretSticker.main.gameStop = false;
        secretSticker.main.activeHover = false;
        
        blueBar = new Image();
		blueBar.src = '../img/bluebar.png';

        titleScreen = new Image();
		titleScreen.src = '../img/minigame3/titlescreen.png';
		instruction = new Image();
		instruction.src = '../img/minigame3/instruction1.png'
		instruction2 = new Image();
		instruction2.src = '../img/minigame3/instruction2.png'

        //map icons
        libraryIcon = new Image();
        libraryIcon.src = '../img/map/libraryicon.png';
        quadIcon = new Image();
        quadIcon.src = '../img/map/icon.png';
        gymIcon = new Image();
        gymIcon.src = '../img/map/gymicon.png';
        commonsicon = new Image();
        commonsicon.src = '../img/map/commonsIcon.png';
        labIcon = new Image();
        labIcon.src = '../img/map/labicon.png';
        mediaIcon = new Image();
        mediaIcon.src =  '../img/map/mediaicon.png';

        
		//peopleicons
		tuitionIcon = new Image();
		tuitionIcon.src = '../img/icons/tuitionsquare.png';	
		researchIcon = new Image();
		researchIcon.src = '../img/icons/researchsquare.png';
		socialIcon = new Image();
		socialIcon.src = '../img/icons/socialsquare.png';
		medicalIcon = new Image();
		medicalIcon.src = '../img/icons/medicalsquare.png';
		//majoricons
		artIcon = new Image();
		artIcon.src = '../img/icons/artisticon.png';
		businessIcon = new Image();
		businessIcon.src = '../img/icons/businessicon.png'
		lawIcon = new Image();
		lawIcon.src = '../img/icons/lawicon.png'
		techIcon = new Image();
		techIcon.src = '../img/icons/techicon.png'
        
        mapbackground = new Image();
        mapbackground.src = '../img/map/map.png';

        poster = new Image();
        poster.src = '../img/minigame3/VotePosterProp.png';
        sticker = new Image();
        sticker.src = '../img/minigame3/Stickerasset.png';
        libWall = new Image();
        libWall.src = '../img/minigame3/Librarywallbg.png';
        labWall = new Image();
        labWall.src = '../img/minigame3/labwall.png'
        quadWall = new Image();
        quadWall.src = '../img/minigame3/posterwallbg.png';
        gymWall = new Image();
        gymWall.src = '../img/minigame3/WallforGymBG.png';
        mediaWall = new Image();
        mediaWall.src = '../img/minigame3/WallforMediaRoomBG.png';
        cafeWall = new Image();
        cafeWall.src = '../img/minigame3/WallforCafeBG.png';

        //icons
        tuitionIcon = new Image();
        tuitionIcon.src = '../img/icons/tuitionsquare.png'
       
        researchIcon = new Image()
        researchIcon.src = '../img/icons/researchsquare.png';
        eventsIcon = new Image();
        eventsIcon.src = '../img/icons/socialsquare.png'
        medicalIcon = new Image();
        medicalIcon.src = '../img/icons/medicalsquare.png';

        interestArray = [tuitionIcon, researchIcon, eventsIcon, medicalIcon];

        backButton = new Image();
        backButton.src = '../img/backbutton.png';
        
        //get people assets
        hoverBack = new Image();
        hoverBack.src = "../img/minigame3/chairback.png";
        thinBack = new Image();
        thinBack.src = "../img/minigame3/thinback.png";
        medBack = new Image();
        medBack.src = "../img/minigame3/medback.png";
        plusBack = new Image();
        plusBack.src = "../img/minigame3/plusback.png";
      
      	imgBArray = [thinBack,medBack,plusBack,hoverBack]
        iconArray = [tuitionIcon, researchIcon, socialIcon, medicalIcon];
		majorIconArray = [artIcon,businessIcon,lawIcon,techIcon];
        
        secretSticker.main.player.picturenum = 0;
        secretSticker.main.scores.score = 0;	
        secretSticker.main.areaNumber = 9;	
        c.onmousedown = secretSticker.main.doMousedown;
        c.onmousemove = secretSticker.main.doMouseOver;
        c.onmouseup = secretSticker.main.doMouseUp
        ctx.font="14px Georgia";
        secretSticker.main.requiredDemograph1 = Math.floor(Math.random() * 6) + 2;
        secretSticker.main.requiredDemograph1 = Math.floor(Math.random() * 3) + 2;
        secretSticker.main.demograph1num = Math.floor(Math.random() * 4);
        secretSticker.main.takenDemograph1=0;
        secretSticker.main.postersLeft=5;
        secretSticker.main.areas =
        [ 
            {
                
            },
            
            //quad
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //gym
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //media
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //labs
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //coffee shop
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            },
            //library
            {
                students: [],
                studentPositions: [],
                posterHung: 0,
                position1: false, 
                position2: false, 
                position3: false 
            }
        ];
        mapbackground.onload = function()
        {
            secretSticker.main.update(c,ctx);
        }
    },

    update: function (c,ctx)
    {
        
        if(secretSticker.main.postersLeft > 0)
        {
            requestAnimationFrame(function(){secretSticker.main.update(c,ctx)});
            requestAnimationFrame(function(){secretSticker.main.draw(c,ctx)});
        }
        else if(secretSticker.main.areaNumber != 0)
        {
            requestAnimationFrame(function(){secretSticker.main.update(c,ctx)});
            requestAnimationFrame(function(){secretSticker.main.draw(c,ctx)});
        }
        else
        {
            if(secretSticker.main.takenDemograph1 >= secretSticker.main.demograph1num)
                secretSticker.main.score++;
            minigameResults(secretSticker.main.scores, globals.practice, globals.loopable);
        }
    },

    draw: function(c,ctx)
    {
        var mouse = globals.canvasMouse;
  
        //draw the background for the area
        ctx.fillStyle="#FFFFFF";
        ctx.fillRect(0,0,c.width,c.height);
        //draw anything specific ontop of the background layer depending on what area you are
        //draw the background for the area

        if(!secretSticker.main.inArea && secretSticker.main.areaNumber>=-0 &&secretSticker.main.areaNumber<9)
        {
            if(secretSticker.main.areaNumber == 0){
            	ctx.drawImage(mapbackground, 0,0,900,500);
            	ctx.drawImage(blueBar,0,0,c.width, 35)
					ctx.fillStyle = '#000000'
					ctx.font = '25px Arial'
					ctx.fillText('Choose an Area', 350, 25)
            }

            else if(secretSticker.main.areaNumber == 8){
            	ctx.drawImage(instruction, 0,0,c.width,c.height);
            	ctx.drawImage(backButton,35,420,190,60);
            }
            else if(secretSticker.main.areaNumber == 7){
            	ctx.drawImage(instruction2, 0,0,c.width,c.height);
            	ctx.drawImage(backButton,35,420,190,60)
            }
        }
        else{
            switch(secretSticker.main.areaNumber)
            {
                case 1:
                ctx.drawImage(quadWall, 0,0,900,500);
                break;
                case 2:
                ctx.drawImage(gymWall, 0,0,900,500);
                break;
                case 3:
                ctx.fillStyle = '#FFFFFF';
                ctx.drawImage(labWall, 0,0,900,500);            
                break;
                case 4:
                ctx.fillStyle = '#FFFFFF';
                ctx.drawImage(cafeWall, 0,0,900,500);
                break;
                case 5:
                ctx.drawImage(libWall, 0,0,900,500);
                break;
                default:
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0,0,900, 500)
                break;
            }
            
        }

        //draw anything specific ontop of the background layer depending on what area you are
        if(secretSticker.main.areaNumber == 0)
        {
            //quad
            ctx.strokeStyle = '#00FFFF';
            ctx.fillStyle = 'rgba(0,255,255,0.5)';
            ctx.lineWidth = 3;
        
            //stroke areas for gym
            ctx.beginPath();
            ctx.moveTo(530,40);
            ctx.lineTo(530,150);
            ctx.lineTo(725,150);
            ctx.lineTo(725,300);
            ctx.lineTo(880,300);
            ctx.lineTo(880,40);
            ctx.closePath();
            ctx.stroke();
            if(secretSticker.main.buildingHover[1]){
                ctx.fill();
            }
            //stroke labs
            ctx.beginPath();
            ctx.moveTo(225,40);
            ctx.lineTo(225,170);
            ctx.lineTo(275,170);
            ctx.lineTo(275,200);
            ctx.lineTo(340,200);
            ctx.lineTo(340,170);
            ctx.lineTo(383,170);
            ctx.lineTo(383,40);
            ctx.closePath();
            ctx.stroke();
            if(secretSticker.main.buildingHover[3]){
                ctx.fill();
            }
        
            //quad
            ctx.strokeRect(208,235,243,60);
            if(secretSticker.main.buildingHover[0]){
                ctx.fillRect(208,235,243,60);
            }
            //library
            ctx.strokeRect(600,330,280,155);
            if(secretSticker.main.buildingHover[5]){
                ctx.fillRect(600,330,280,155);
            }
            //cafe
            //ctx.strokeRect(13,43,165,260);
         
            //media
            ctx.strokeRect(135,333,175,145);
            if(secretSticker.main.buildingHover[2]){
                ctx.fillRect(135,333,175,145);
            }
            //labs
        
            //draw icon
            ctx.drawImage(quadIcon, 255,190,150,100)
            ctx.drawImage(libraryIcon, 665,325,150,100)
            ctx.drawImage(gymIcon, 725,50,150,100)
            //ctx.drawImage(commonsicon, 20,110,150,100)
            ctx.drawImage(commonsicon, 150,335,150,100)
            ctx.drawImage(labIcon, 230,25,150,100)
            
			ctx.fillStyle = '#000000'
			var scoreText = "Target Group:     " + secretSticker.main.takenDemograph1 + '/'+ secretSticker.main.requiredDemograph1 + " ";
			var photosLeftText = secretSticker.main.postersLeft + '/5 Posters Left'
			
			ctx.drawImage(iconArray[secretSticker.main.demograph1num], 805,7,25,25);
			ctx.fillText(scoreText, 650,27);
			ctx.fillText(photosLeftText, 19,27);
	}
       
       if(secretSticker.main.areaNumber >0 && secretSticker.main.areaNumber <6  ){
           
           if(secretSticker.main.placeStudents)
           {
              secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions =[]; 
               secretSticker.main.areas[secretSticker.main.areaNumber].students.forEach(function(element, i) 
               {
                   secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions.push
                   (
                       {
                           y: 300,
                           x: i * 125 + 55,
                           stickered: false
                       }
                   );
               });
              secretSticker.main.placeStudents = false;
           }
           
           hoverArray = [213,334];
           thinArray = [162,343];
           medArray = [191,327]
           plusArray = [266,400]
           sizeArray = [thinArray, medArray, plusArray, hoverArray]
    		
    			
           //draw the students
           for(var i =0; i<secretSticker.main.areas[secretSticker.main.areaNumber].students.length;i++)
           {
               var x = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].x;
               var y = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].y;
               ctx.fillStyle = secretSticker.main.areas[secretSticker.main.areaNumber].students[i].color;
               //ctx.beginPath();
               //ctx.arc(x,y,30,0,2*Math.PI);
               //ctx.fill();
               //ctx.stroke();//draw student
             	ctx.drawImage(imgBArray[secretSticker.main.areas[secretSticker.main.areaNumber].students[i].typenum],sizeArray[secretSticker.main.areas[secretSticker.main.areaNumber].students[i].typenum][0] * secretSticker.main.areas[secretSticker.main.areaNumber].students[i].headnum,0,sizeArray[secretSticker.main.areas[secretSticker.main.areaNumber].students[i].typenum][0],sizeArray[secretSticker.main.areas[secretSticker.main.areaNumber].students[i].typenum][1],x,y,100,150)
               if(secretSticker.main.activeHover && secretSticker.main.activeStudent == i){
               	 ctx.drawImage(interestArray[secretSticker.main.activeID],x+35, y-25,40,40);
               }
               if(secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].stickered)
               {
                   //ctx.fillStyle = '#0000ff';
                   //ctx.beginPath();
                   //ctx.arc(x,y,20,0,2*Math.PI);
                   //ctx.fill();
                   //ctx.stroke();
                    ctx.drawImage(sticker,x+35, y+70,40,40);
               }
           };
          
           
           

           //draw the ux/ui of the game
            ctx.drawImage(blueBar,0,430,c.width,70)

            ctx.fillStyle = '#000000'
            var scoreText = "Target Group:         " + secretSticker.main.takenDemograph1 + '/'+ secretSticker.main.requiredDemograph1 + "";
            var photosLeftText = secretSticker.main.postersLeft + '/5 Posters Left'
            ctx.fillText(scoreText,530,470);
            ctx.fillText(photosLeftText, 210,470);
            ctx.drawImage(interestArray[secretSticker.main.demograph1num], 690,440,50,50)



           ctx.drawImage(backButton,10,440,150,50);
           
           ctx.fillStyle = '#AAAAAA'
           ctx.fillRect(0,250,25,25);
           ctx.fillStyle = '#000000'
           ctx.fillText("<",5,270);
           
           ctx.fillStyle = '#AAAAAA'
           ctx.fillRect(875,250,25,25);
           ctx.fillStyle = '#000000'
           ctx.fillText(">",880,270);
           
           //ctx.fillStyle = '#0000FF';
           //ctx.beginPath();
           //ctx.arc(c.width/2,c.height-30,20,0,2*Math.PI);
           //ctx.fill();
           //ctx.stroke();
           
           
           ctx.drawImage(sticker,c.width/2-30,c.height-60,50,50);
           if(secretSticker.main.drag)
           {
               //ctx.fillStyle = '#0000FF';
               //ctx.beginPath();
               //ctx.arc(mouse.x, mouse.y,20,0,2*Math.PI);
               //ctx.fill();
               //ctx.stroke();
               ctx.drawImage(sticker,mouse.x-25, mouse.y-25,50,50);
           }


           if (!secretSticker.main.areas[secretSticker.main.areaNumber].position1)
           {
               ctx.fillStyle = '#000000 '
               ctx.fillRect(120,30,120,170);
           }
           else
           {
               ctx.fillStyle = '#00ff00'
               ctx.drawImage(poster,120,30,120,170);
           }
           
           if (!secretSticker.main.areas[secretSticker.main.areaNumber].position2)
           {
               ctx.fillStyle = '#000000 '
               ctx.fillRect(400,30,120,170);
           }
           else
           {
               ctx.fillStyle = '#00ff00'
               ctx.drawImage(poster,400,30,120,170);
           }
           
           if (!secretSticker.main.areas[secretSticker.main.areaNumber].position3)
           {
               ctx.fillStyle = '#000000 '
               ctx.fillRect(680,30,120,170);
           }
           else
           {
               ctx.fillStyle = '#00ff00'
               ctx.drawImage(poster,680,30,120,170);
           }
       }

       if(secretSticker.main.areaNumber == 9)
       {
           
      			ctx.drawImage(titleScreen,0,0,c.width,c.height)
       }
      


        
    },

    doMousedown: function(c, e)
    { 
        ////CONSOLE.LOG(globals.canvasMouse);
        var mouse = globals.canvasMouse;

        //check if the area is clickable
	if(secretSticker.main.areaNumber == 0){
		//quad 		ctx.strokeRect(208,235,243,60);
		if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
			secretSticker.main.areaNumber = 1;
            secretSticker.main.inArea = true;
		}
		
		//gym1
		if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
			secretSticker.main.areaNumber = 2;
            secretSticker.main.inArea = true;
		}
		//gym2
		if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
			secretSticker.main.areaNumber = 2;
            secretSticker.main.inArea = true;
		}
	
	
		//labs1
		if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
			secretSticker.main.areaNumber = 3;
            secretSticker.main.inArea = true;
		}
		//labs2
		else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
			secretSticker.main.areaNumber = 3;
            secretSticker.main.inArea = true;
		}
	

		//coffee shop 
		if(((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475))){
			secretSticker.main.areaNumber = 4;
			secretSticker.main.inArea = true;
		}
		//library 	ctx.strokeRect(600,330,280,155);
		if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
			secretSticker.main.areaNumber = 5;
			secretSticker.main.inArea = true;
		}
	}
        if(secretSticker.main.areaNumber > 0 && secretSticker.main.areaNumber < 6 )
        {
            if((mouse.x >= 5 && mouse.x <= 155)&&(mouse.y >= 445 && mouse.y <= 495))
            {
                secretSticker.main.areaNumber = 0;
                secretSticker.main.inArea = false;
            }
            
            if(!secretSticker.main.areas[secretSticker.main.areaNumber].position1 && secretSticker.main.postersLeft>0)
            {
                if((mouse.x >= 120 && mouse.x <= 240)&&(mouse.y >= 30 && mouse.y <= 200))
                {
                    secretSticker.main.areas[secretSticker.main.areaNumber].position1 = true;
                    secretSticker.main.postersLeft--;
                    secretSticker.main.areas[secretSticker.main.areaNumber].posterHung++;
                    secretSticker.main.populateArea(secretSticker.main.areas[secretSticker.main.areaNumber].posterHung,secretSticker.main.areaNumber);
                    secretSticker.main.placeStudents = true;

                }
            }
            if(!secretSticker.main.areas[secretSticker.main.areaNumber].position2 && secretSticker.main.postersLeft>0)
            {
                if((mouse.x >= 440 && mouse.x <= 520)&&(mouse.y >= 30 && mouse.y <= 200))
                {
                    secretSticker.main.areas[secretSticker.main.areaNumber].position2 = true;
                    secretSticker.main.postersLeft--;
                    secretSticker.main.areas[secretSticker.main.areaNumber].posterHung++;
                        secretSticker.main.populateArea(secretSticker.main.areas[secretSticker.main.areaNumber].posterHung,secretSticker.main.areaNumber);
                    secretSticker.main.placeStudents = true;

                }
            }
            if(!secretSticker.main.areas[secretSticker.main.areaNumber].position3 && secretSticker.main.postersLeft>0)
            {
                if((mouse.x >= 680 && mouse.x <= 800)&&(mouse.y >= 30 && mouse.y <= 200))
                {
                    secretSticker.main.areas[secretSticker.main.areaNumber].position3 = true;
                    secretSticker.main.postersLeft--;
                    secretSticker.main.areas[secretSticker.main.areaNumber].posterHung++;
                        secretSticker.main.populateArea(secretSticker.main.areas[secretSticker.main.areaNumber].posterHung,secretSticker.main.areaNumber);
                    secretSticker.main.placeStudents = true;

                }
            }
            var dx = mouse.x - 440;
            var dy = mouse.y - 470;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 30) 
            {
                secretSticker.main.drag = true;

            }
            
            
            if((mouse.x >= 0&& mouse.x <= 25)&&(mouse.y >= 250 && mouse.y <= 275))
            {
                if(secretSticker.main.areaNumber >1)
                secretSticker.main.areaNumber--;
                else
                secretSticker.main.areaNumber = 5;
            }
            if((mouse.x >= 875&& mouse.x <= 900)&&(mouse.y >= 250 && mouse.y <= 275 ))
            {
                if(secretSticker.main.areaNumber <5)
                secretSticker.main.areaNumber++;
                else
                secretSticker.main.areaNumber = 1;
            }
        }
         if(secretSticker.main.areaNumber == 9)
        {
            if((mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 35 && mouse.x <=225))
            {
                secretSticker.main.areaNumber = 0;
            }
            else if ((mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 666 && mouse.x <=856)){
            	 secretSticker.main.areaNumber = 8;
            }
        }
         else if(secretSticker.main.areaNumber == 8)
        {

            if((mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 35 && mouse.x <=225))
            {
            	 //CONSOLE.LOG('hey')
                secretSticker.main.areaNumber = 9;
            }
            else if ((mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 666 && mouse.x <=856)){
            	 secretSticker.main.areaNumber = 7;
            }
        }
         else if(secretSticker.main.areaNumber == 7)
        {
            if((mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 35 && mouse.x <=225))
            {
                secretSticker.main.areaNumber = 8;
            }
            else if ((mouse.y >=420 && mouse.y <= 726) && (mouse.x >= 666 && mouse.x <=856)){
            	 secretSticker.main.areaNumber = 9;
            }
        }
    },
    
    doMouseOver: function(c, e)
    {
        var mouse = globals.canvasMouse;
		//check if the area is clickable
        if(secretSticker.main.areaNumber == 0){
            secretSticker.main.buildingHover = [false,false,false,false,false,false];
            if((mouse.x >= 208 && mouse.x <= 451)&&(mouse.y >= 235 && mouse.y <= 295)){
                secretSticker.main.buildingHover[0] = true;
            }
            if((mouse.x >= 530 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 150)){
                secretSticker.main.buildingHover[1] = true;
            }
            //gym2
            else if((mouse.x >= 725 && mouse.x <= 880)&&(mouse.y >= 20 && mouse.y <= 300)){
                secretSticker.main.buildingHover[1] = true;
            }
            //media 		ctx.strokeRect(135,333,175,145);
            if((mouse.x >= 135 && mouse.x <= 310)&&(mouse.y >= 333 && mouse.y <= 475)){
                secretSticker.main.buildingHover[2] = true;
            }
        
            //labs1
            if((mouse.x >= 225 && mouse.x <= 383)&&(mouse.y >= 20 && mouse.y <= 170)){
                secretSticker.main.buildingHover[3] = true;
            }
            //labs2
            else if((mouse.x >= 275 && mouse.x <= 340)&&(mouse.y >= 170 && mouse.y <= 200)){
                secretSticker.main.buildingHover[3] = true;
            }
            //coffee shop 
            if((mouse.x >= 13 && mouse.x <= 178)&&(mouse.y >= 43 && mouse.y <= 303)){
                secretSticker.main.buildingHover[4] = true;
            }
            //library 	ctx.strokeRect(600,330,280,155);
            if((mouse.x >= 600 && mouse.x <= 880)&&(mouse.y >= 330 && mouse.y <= 495)){
                secretSticker.main.buildingHover[5] = true;
            }
        }
        else if (secretSticker.main.areaNumber >=0 && secretSticker.main.areaNumber <7){
        	var flagcheck = false;
        	 for(var i =0; i<secretSticker.main.areas[secretSticker.main.areaNumber].students.length; i++)
            {
            		checkx = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].x;
            		checky = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].y;
            	 if ((mouse.x >= checkx && mouse.x <=checkx + 100) && (mouse.y >= checky && mouse.y <=checky + 150))
                {

                	secretSticker.main.activeHover = true;
                	secretSticker.main.activeStudent = i;
                	flagcheck = true;
                	secretSticker.main.activeID = secretSticker.main.areas[secretSticker.main.areaNumber].students[i].interest;
               
                }
                else{
                	if(!flagcheck){
                		secretSticker.main.activeHover = false;
                	}
                }
            }
        }
    },
    doMouseUp: function()
    {
        var mouse = globals.canvasMouse;
        if(secretSticker.main.areaNumber != 0 && secretSticker.main.areaNumber <6 && secretSticker.main.drag)
        {
			for(var i =0; i<secretSticker.main.areas[secretSticker.main.areaNumber].students.length; i++)
			{
					checkx = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].x;
					checky = secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].y;
				if ((mouse.x >= checkx && mouse.x <=checkx + 100) && (mouse.y >= checky && mouse.y <=checky + 150))
				{
					if(secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].stickered == false)
					{
						if (secretSticker.main.activeID == secretSticker.main.demograph1num)
						{		
							secretSticker.main.takenDemograph1++;
							secretSticker.main.scores.score++;				
						}
						secretSticker.main.areas[secretSticker.main.areaNumber].studentPositions[i].stickered = true;
					}
				}
			}
			secretSticker.main.drag = false;
        }
    },
    
    populateArea: function(posterNum, areaNum)
    {

        var posterCount = posterNum*2;
        ////CONSOLE.LOG(posterCount)
        createSample(posterCount, secretSticker.main.areaNumber-1);
        secretSticker.main.areas[secretSticker.main.areaNumber].students = [];
        globals.sample.forEach(function(element, i) 
        {
            var studentCircleHolder = 
            {
                isDemographic: false,
                interest: Math.floor(Math.random() * 4),
                typenum: Math.floor(Math.random() * 4),
                headnum: Math.floor(Math.random() * 3),
            }
            if(studentCircleHolder.interest == runningGame2.main.demograph1num)
            {
                studentCircleHolder.isDemographic = true;   					
            }

            secretSticker.main.areas[areaNum].students.push(studentCircleHolder)
        });
    }
}



//
//
//
//running game 4 - Mean Moves
runningGame4.main = {

	player:
	{
		headnum: 0,
		gendernum:0,
		bodynum:0,
		racenum:0,

	},
	//all the images
	scores: {
		score:0,
		tier1: 3,
		tier2: 7,
		tier3: 10,
		tier4: 15,
	},
	colors: ['darkred','red','#004c00', '#00cc00','#00004c', 'blue','darkorange', 'yellow'],
	clickColor:[0,0,0,0],
	rngOrder: [0,0,0],
	leftStudent: {},
	rightStudent: {},
	instruction: true,
	round:0,
	peopleDancingNow: false,
	studentDancingNow: 0,
	playerDancingFrame: 0,
	moveTurn:0,
	groups: [0,0,0],
	gameGroups: [0,0,0],
	whichStatGroup: 0,
	inDanceMode: false,
	danceOrder: [],
	prompt: 0,
	clickpause: false,
	lastClick: 0,
	instructionArea: 0,
	colorCounter: 0,
	delayCounter: 0,
	isPlayerDancingNow: false,
	playerDanceCounter: 0,
	moveCounter: 0,
	areWeDelay: true,
	finalBlink: false,
	animationTicker: 0,
	ticker: 0,
	showMeYourMove: false,
	incorrectDance: false,
	endGame: false,
	resultText: "",
	getReady: true,
	groupPrompt: ["Click on the Smallest Group", "Click on the Medium Sized Group", "Click on the Largest Group"],
	
//bodyTypeArray [body][gender][movetype][movefram][x/y]
	thinHeadPos: [
								//body types
								[
									[
										[422,184],[416,184],[416,184]
									],
									[
										[417,184],[415,197],[415,197]
									],
									[
										[423,184],[423,190],[430,190]
									],
									[
										[426,185],[417,190],[410,190]
									]
								],
								[
									[
										[417,184],[414,184],[412,184]
									],
									[
										[422,184],[417,190],[414,190]
									],
									[
										[420,184],[417,190],[439,190]
									],
									[
										[423,184],[417,190],[409,191]
									]
								],
								[
									[
										[413,183],[413,183],[417,183]
									],
									[
										[413,184],[418,196],[418,196]
									],
									[
										[416,184],[420,196],[440,196]
									],
									[
										[415,184],[416,196],[410,196]
									]
								]
							],
		medHeadPos: [
								[
									[
										[415,189],[414,189],[415,189]
									],
									[
										[415,189],[413,202],[415,197]
									],
									[
										[415,189],[413,189],[415,189]
									],
									[
										[415,190],[415,190],[415,190]
									]
								],
								[
									[
										[410,190],[411,190],[416,190]
									],
									[
										[412,190],[414,201],[415,201]
									],
									[
										[406,191],[420,191],[430,191]
									],
									[
										[408,191],[408,191],[404,191]
									]
								],
								[
									[
										[412,190],[412,190],[414,193]
									],
									[
										[411,190],[411,209],[414,209]
									],
									[
										[414,193],[416,193],[433,193]
									],
									[
										[411,192],[413,193],[403,195]
									]
								]
							],
		plusHeadPos: [
								[
									[
										[416,198],[416,198],[416,198]
									],
									[
										[413,196],[411,204],[411,204]
									],
									[
										[416,198],[418,196],[430,200]
									],
									[
										[416,198],[415,202],[408,202]
									]
								],
								[
									[
										[416,198],[416,198],[414,198]
									],
									[
										[418,198],[415,201],[415,201]
									],
									[
										[421,198],[421,198],[430,200]
									],
									[
										[412,198],[410,200],[407,200]
									]
								],
								[
									[
										[414,195],[412,195],[414,195]
									],
									[
										[414,195],[412,200],[416,200]
									],
									[
										[416,195],[418,198],[426,198]
									],
									[
										[417,196],[410,200],[403,200]
									]
								]
							],
		chairHeadPos: [
								[
									[
										[421,200],[421,200],[416,196]
									],
									[
										[422,195],[420,199],[417,190]
									],
									[
										[423,197],[420,194],[420,187]
									],
									[
										[417,198],[414,195],[410,188]
									]
								],
								[
									[
										[426,205],[416,201],[423,195]
									],
									[
										[423,205],[415,201],[419,195]
									],
									[
										[426,206],[420,202],[420,192]
									],
									[
										[424,204],[414,200],[422,193]
									]
								],
								[
									[
										[422,205],[418,202],[417,193]
									],
									[
										[422,202],[418,199],[420,190]
									],
									[
										[428,207],[424,204],[429,191]
									],
									[
										[416,204],[416,201],[413,193]
									]
								]
							],


	init: function(c,ctx){
		//images

		arrayOfHeadCoords =  [runningGame4.main.thinHeadPos, runningGame4.main.medHeadPos, runningGame4.main.plusHeadPos, runningGame4.main.chairHeadPos];
		runningGame4.main.resultText = 'Get Ready';
		runningGame4.main.getReady = false;
		backgroundDanceFloor = new Image();
		backgroundDanceFloor.src = '../img/minigame4/dancebg.png';
		backgroundAerialDanceFloor = new Image();
		backgroundAerialDanceFloor.src = '../img/minigame4/arieldance.png';

		instruction = new Image();
		instruction.src = '../img/minigame4/instruction1.png'
		instruction2 = new Image();
		instruction2.src = '../img/minigame4/instruction2.png'

		if(globals.practice){
                //CONSOLE.LOG("PRACTICE GAME");
				runningGame4.main.player.headnum = 0;
				runningGame4.main.player.racenum = 0;
				runningGame4.main.player.gendernum = 0;
				runningGame4.main.player.bodynum = 0;
		}
			else{
                    //CONSOLE.LOG("playerCandidate game Name: "+globals.playerCandidate.name);
                  //CONSOLE.LOG("playerCandidate game HeadNum: "+globals.playerCandidate.headNum);
                //CONSOLE.LOG("playerCandidate game BodyNum: "+globals.playerCandidate.bodyTypeNum);
                //CONSOLE.LOG("playerCandidate game raceNum: "+globals.playerCandidate.raceNum);
              
				runningGame4.main.player.headnum = globals.playerCandidate.headNum;
				runningGame4.main.player.racenum = globals.playerCandidate.raceNum;
				runningGame4.main.player.gendernum = globals.playerCandidate.genderNum;
				runningGame4.main.player.bodynum = globals.playerCandidate.bodyTypeNum;
			}
      
      
		//words
		getReady = new Image();
		getReady.src = '../img/minigame4/getready.png';
		oops = new Image();
		oops.src = '../img/minigame4/oops.png'
		great = new Image();
		great.src = '../img/minigame4/great.png'

		titleScreen = new Image();
		titleScreen.src = '../img/minigame4/titlescreen.png';
		runningGame.main.instructionArea = 0;
		textArray = [great, oops, getReady]


		//groups
		smallGroup = new Image();
		smallGroup.src = '../img/minigame4/group2.png';
		medGroup = new Image();
		medGroup.src = '../img/minigame4/group4.png';
		largeGroup = new Image();
		largeGroup.src = '../img/minigame4/group6.png';

		stageRed = new Image();
		stageRed.src = '../img/minigame4/stagelightbeamred.png'
		stageBlue = new Image();
		stageBlue.src = '../img/minigame4/stagelightbeamblue.png'
		stageGreen = new Image();
		stageGreen.src = '../img/minigame4/stagelightbeamgreen.png'
		stageLampRed = new Image();
		stageLampRed.src = '../img/minigame4/stagelightred.png';
		stageLampBlue = new Image();
		stageLampBlue.src = '../img/minigame4/stagelightblue.png';
		stageLampGreen = new Image();
		stageLampGreen.src = '../img/minigame4/stagelightgreen.png';

		//arrows
		rightArrow = new Image();
		rightArrow.src = '../img/minigame4/rightarrowgreyed.png';
		rightArrowGlow = new Image();
		rightArrowGlow.src = '../img/minigame4/rightarrowGREEN.png';
		leftArrow = new Image();
		leftArrow.src = '../img/minigame4/leftarrowgreyed.png';
		leftArrowGlow = new Image();
		leftArrowGlow.src = '../img/minigame4/leftarrowGREEN.png';
		upArrow = new Image();
		upArrow.src = '../img/minigame4/uparrowgreyed.png';
		upArrowGlow = new Image();
		upArrowGlow.src = '../img/minigame4/uparrowGREEN.png';
		downArrow = new Image();
		downArrow.src = '../img/minigame4/downarrowgreyed.png';
		downArrowGlow = new Image();
		downArrowGlow.src = '../img/minigame4/downarrowGREEN.png';

		backButton = new Image();
		backButton.src = '../img/backbutton.png'

		//people
		headSheet = new Image();
		headSheet.src = '../img/spriteheadlong.png';
		//thin sheets
		thinFemale = new Image();
		thinFemale.src = '../img/minigame4/thinfemaledancesheet.png';
		thinMale = new Image();
		thinMale.src = '../img/minigame4/thinmaledancesheet.png';
		thinNB = new Image();
		thinNB.src = '../img/minigame4/thinnbdancesheet.png'
		//med sheets
		medFemale = new Image();
		medFemale.src = '../img/minigame4/medfemaledance.png';
		medMale = new Image();
		medMale.src = '../img/minigame4/medmaledance.png';
		medNB = new Image();
		medNB.src = '../img/minigame4/mednbdance.png';
		//plus sheet
		plusFemale = new Image();
		plusFemale.src = '../img/minigame4/plusfemaledance.png';
		plusMale = new Image();
		plusMale.src = '../img/minigame4/plusmaledance.png';
		plusNB = new Image();
		plusNB.src = '../img/minigame4/plusnbdance.png';
		//chair
		chairFemale = new Image();
		chairFemale.src = '../img/minigame4/chairfemaledance.png';
		chairMale = new Image();
		chairMale.src = '../img/minigame4/chairmaledance.png';
		chairNB = new Image();
		chairNB.src = '../img/minigame4/chairnbdance.png';

		danceSheetArray = [[thinNB, thinFemale, thinMale],[medNB,medFemale,medMale], [plusNB, plusFemale, plusMale], [chairNB, chairFemale, chairMale]]

		ctx.restore;
		ctx.save;
		runningGame4.main.rightStudent.race = Math.floor(Math.random() * 3);
		runningGame4.main.rightStudent.head = Math.floor(Math.random() * 6);
		runningGame4.main.rightStudent.body = Math.floor(Math.random() * 3);
		runningGame4.main.rightStudent.gender = Math.floor(Math.random() * 3);
		runningGame4.main.leftStudent.race = Math.floor(Math.random() * 3);
		runningGame4.main.leftStudent.head = Math.floor(Math.random() * 6);
		runningGame4.main.leftStudent.body = Math.floor(Math.random() * 3);
		runningGame4.main.leftStudent.gender = Math.floor(Math.random() * 3);
		runningGame4.main.instruction = true;
		runningGame4.main.endGame = false;
		runningGame4.main.ticker = 0;
		runningGame4.main.animationTicker = 0;
		c.onmousedown = runningGame4.main.doMousedown;
		runningGame4.main.round = 0;
		runningGame4.main.groups= [0,0,0];
		runningGame4.main.gameGroups= [0,0,0];
		runningGame4.main.clickColor=[0,0,0,0];
		runningGame4.main.rngOrder= [0,0,0];
		runningGame4.main.inDanceMode = false;
		runningGame4.main.showMeYourMove = false;
		//make the first round of students
		globals.sample = 0;
		createSample(20,0);

		arrayGlowArrows = [[upArrowGlow,370,410,65,80],[downArrowGlow,451,410,65,80],[leftArrowGlow,270,420,80,65],[rightArrowGlow,526,420,80,65]]
		prompt = Math.floor(Math.random() * 3)
		//focus on a target on one of the 3 statistics (major, economic group, main interest)
		whichStatGroup = Math.floor(Math.random() * 3);
		runningGame4.main.setUpGroup();
		runningGame4.main.getReady = true;
		runningGame4.main.update(c,ctx);
	
	},

	update: function(c,ctx)
	{
		//requestionAnimation
		if(runningGame4.main.endGame ==  false){
			requestAnimationFrame(function(){runningGame4.main.draw(c,ctx)});
			requestAnimationFrame(function(){runningGame4.main.update(c,ctx)});		
			runningGame4.main.endOfRound();
		}
		else{
			////CONSOLE.LOG('END GAME')
			
			minigameResults(runningGame4.main.scores, globals.practice, globals.loopable)
		}
	},

	draw: function(c,ctx)
	{
		//draw background
	
		
	
		
		//if not in dance mode
		if(!runningGame4.main.inDanceMode){
			if(runningGame4.main.instruction){
				if(runningGame4.main.instructionArea == 0)
					ctx.drawImage(titleScreen,0,0,c.width,c.height)
				else if(runningGame4.main.instructionArea == 1){
					ctx.drawImage(instruction,0,0,c.width,c.height)
					ctx.drawImage(backButton,35,420,190,60)
				}
				else if(runningGame4.main.instructionArea == 2){
					ctx.drawImage(instruction2,0,0,c.width,c.height)
					ctx.drawImage(backButton,35,420,190,60)
				}

			}
			else{
	
			//draw the lights
			ctx.drawImage(backgroundAerialDanceFloor,0,0,c.width, c.height)
			ctx.font = "20px Serif";
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(runningGame4.main.groupPrompt[prompt], 335, 40);
		

		//draw groups
			ctx.drawImage(smallGroup,600,330,130,90);
			ctx.drawImage(medGroup,130,280,160,120);
			ctx.drawImage(largeGroup,390,90,255,180);

		//		

		//draw the player

		//draw the ui
			}
		}
	else if(runningGame4.main.inDanceMode){		
			
			//background
			ctx.drawImage(backgroundAerialDanceFloor,0,0,c.width, c.height)
			ctx.drawImage(backgroundDanceFloor,0,-40,c.width, c.height+40)
			ctx.filter = 'blur(3px)';
			
			ctx.filter = 'none';
			ctx.drawImage(stageLampGreen,70,20,140,120)
			ctx.drawImage(stageLampRed,370,20,140,120)
			ctx.drawImage(stageLampBlue,670,20,140,120)
			//the correct 
			//((width*3) * runningGame4.main.danceOrder[runningGame4.main.colorCounter]) + (width* runningGame4.main.studentDancingNow)
			//nb f m
			widthArray = [[280,289,280], [325,289,289],[352,352,352],[289,289,289]]
			//bodyTypeArray [body][gender][movetype][movefram][x/y]
      
      
            let bodyNum = globals.playerCandidate.bodyTypeNum;
            let genderNum = globals.playerCandidate.genderNum;
            let headNum = globals.playerCandidate.headNum;
            let raceNum = globals.playerCandidate.raceNum;
      
            //CONSOLE.LOG("Correct Body: "+bodyNum+" current body: "+runningGame4.main.player.gendernum);
            //CONSOLE.LOG("Correct Gender: "+genderNum+" current Gender: "+runningGame4.main.player.gendernum);
            //CONSOLE.LOG("Correct Head: "+headNum+" current Head: "+runningGame4.main.player.headnum);
            //CONSOLE.LOG("Correct Race: "+raceNum+" current Race: "+runningGame4.main.player.racenum);
            
			if(runningGame4.main.player.bodynum ==3){
                    
                    
                    ctx.drawImage(danceSheetArray[bodyNum][runningGame4.main.player.gendernum],((widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]*3) * runningGame4.main.lastClick) + (widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]* runningGame4.main.playerDancingFrame),0,widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum],468,390,200,110,200);
			  		
              
                    ctx.drawImage(headSheet,154 * ((6 * runningGame4.main.player.racenum) + runningGame4.main.player.headnum),0,153,172,413,193,59,67);
			}
				else{
					ctx.drawImage(headSheet,154 * ((6 * runningGame4.main.player.racenum) + runningGame4.main.player.headnum),0,153,172,arrayOfHeadCoords[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum][runningGame4.main.lastClick][runningGame4.main.playerDancingFrame][0],arrayOfHeadCoords[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum][runningGame4.main.lastClick][runningGame4.main.playerDancingFrame][1],59,67)
                  
					ctx.drawImage(danceSheetArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum],((widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]*3) * runningGame4.main.lastClick) + (widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum]* runningGame4.main.playerDancingFrame),0,widthArray[runningGame4.main.player.bodynum][runningGame4.main.player.gendernum],468,390,200,110,200);
			  	
				}
			//player
			
			//if chair                                //xy cords
			stu1 = [[[118,208],[114,208],[112,210]],[[114,208],[112,220],[110,220]],[[119,207],[120,213],[126,213]],[[118,207],[113,220],[107,215]]]
			stu2 = [[[714,209],[712,209],[708,207]],[[719,208],[714,214],[712,214]],[[718,208],[714,214],[736,214]],[[722,207],[714,214],[703,214]]]

			ctx.drawImage(headSheet,154.6 * 0,0,154.6,172,stu1[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][0],stu1[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][1],59.6,62)
      
			ctx.drawImage(headSheet,154.6 * 0,0,154.6,172,stu2[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][0],stu2[runningGame4.main.danceOrder[runningGame4.main.colorCounter]][runningGame4.main.studentDancingNow][1],59.6,62)

			//other students dont care
			ctx.drawImage(thinNB,((280*3) * runningGame4.main.danceOrder[runningGame4.main.colorCounter]) + (280* runningGame4.main.studentDancingNow),0,280,486,85,220,110,200);		
			ctx.drawImage(thinMale,((280*3) * runningGame4.main.danceOrder[runningGame4.main.colorCounter]) + (280* runningGame4.main.studentDancingNow),0,280,486,680,220,120,200)

			
			//we are stopping clicking
			if(runningGame4.main.clickpause && runningGame4.main.showMeYourMove){
				if(runningGame4.main.moveCounter == 200){
					runningGame4.main.showMeYourMove = false;
					runningGame4.main.getReady = false;
					runningGame4.main.incorrectDance = false;
					runningGame4.main.moveCounter = 0;
				}
				
				else{
					runningGame4.main.moveCounter++;
					if(runningGame4.main.moveCounter == 100){
						runningGame4.main.getReady = true;
					}

						if(runningGame4.main.isPlayerDancingNow){

						if(runningGame4.main.playerDanceCounter == 100){
								runningGame4.main.isPlayerDancingNow = false;
								runningGame4.main.playerDanceCounter = 0;
							}
						else if(runningGame4.main.playerDanceCounter == 0  ||runningGame4.main.playerDanceCounter == 40){
							runningGame4.main.playerDancingFrame = 0;
						}
						else if (runningGame4.main.playerDanceCounter  == 5 ||runningGame4.main.playerDanceCounter  ==35){
							runningGame4.main.playerDancingFrame = 1;
						}
						else if (runningGame4.main.playerDanceCounter  == 10){
							runningGame4.main.playerDancingFrame = 2;
						}
						runningGame4.main.playerDanceCounter++;
					}
			
				}

				

			}
			else if(runningGame4.main.clickpause && !runningGame4.main.showMeYourMove){
					
					//pause between colors
					if(runningGame4.main.areWeDelay){
						ctx.filter = 'blur(3px)';
						ctx.drawImage(stageGreen,72.5,90,140,320)
						ctx.drawImage(stageBlue,672.5,90,140,320)
						ctx.filter = 'none';
						if(runningGame4.main.delayCounter == 10){
							runningGame4.main.areWeDelay = false;
							runningGame4.main.delayCounter = 0;
						}
						else{
			
							runningGame4.main.delayCounter++;
						}
					}
					else{
						ctx.filter = 'blur(3px)';
						ctx.drawImage(stageGreen,72.5,90,140,320)
						ctx.drawImage(stageBlue,672.5,90,140,320)
						ctx.filter = 'none';
					//doing Simon Says part
					if(runningGame4.main.ticker == 50){

						runningGame4.main.clickColor = [0,0,0,0]
						runningGame4.main.ticker = 0;
						runningGame4.main.colorCounter++;
						runningGame4.main.areWeDelay = true;
			
					}
					else{
						runningGame4.main.ticker++; 
						//ticker animation frames
						if(runningGame4.main.ticker == 0  ||runningGame4.main.ticker == 40){
							runningGame4.main.studentDancingNow = 0;
						}
						else if (runningGame4.main.ticker == 5 ||runningGame4.main.ticker ==35){
							runningGame4.main.studentDancingNow = 1;
						}
						else if (runningGame4.main.ticker == 10){
							runningGame4.main.studentDancingNow = 2;
						}

						
						runningGame4.main.clickColor[runningGame4.main.danceOrder[runningGame4.main.colorCounter]] = 1;


					}

					if(runningGame4.main.colorCounter > 3){
						runningGame4.main.clickpause = false;
						runningGame4.main.colorCounter = 0;
					}
				}				
			}
			//are actually in gamemode
			else{
				ctx.filter = 'blur(3px)';
					ctx.drawImage(stageRed,372.5,90,140,320)
					ctx.filter = 'none';
					//see if button is still lit up
					if(runningGame4.main.ticker == 10){
						if(!runningGame4.main.finalBlink){
						runningGame4.main.clickColor = [0,0,0,0]
					}
						  runningGame4.main.ticker = 0;
					if(runningGame4.main.moveTurn == 4){
							runningGame4.main.finalBlink = true;
							runningGame4.main.showMeYourMove = true;
						}
					}
					else{
						runningGame4.main.ticker++; 	
						runningGame4.main.showMeYourMove = false;	
					}
					//if player is dancing
				if(runningGame4.main.isPlayerDancingNow){

						if(runningGame4.main.playerDanceCounter == 100){
								runningGame4.main.isPlayerDancingNow = false;
								runningGame4.main.playerDanceCounter = 0;
							}
						else if(runningGame4.main.playerDanceCounter == 0  ||runningGame4.main.playerDanceCounter == 40){
							runningGame4.main.playerDancingFrame = 0;
						}
						else if (runningGame4.main.playerDanceCounter  == 5 ||runningGame4.main.playerDanceCounter  ==35){
							runningGame4.main.playerDancingFrame = 1;
						}
						else if (runningGame4.main.playerDanceCounter  == 10){
							runningGame4.main.playerDancingFrame = 2;
						}
						runningGame4.main.playerDanceCounter++;
					}
	
				
			}

			//arrows
			ctx.drawImage(leftArrow,270,420,80,65);
			ctx.drawImage(upArrow,370,410,65,80);
			ctx.drawImage(downArrow,451,410,65,80);
			ctx.drawImage(rightArrow,526,420,80,65);

			for(var s = 0; s < 4; s++){
				if(runningGame4.main.clickColor[s] == 1){
					ctx.drawImage(arrayGlowArrows[s][0],arrayGlowArrows[s][1],arrayGlowArrows[s][2],arrayGlowArrows[s][3],arrayGlowArrows[s][4])
				}
			}

			//the move
			if(runningGame4.main.showMeYourMove)
			{					
				if(runningGame4.main.getReady){
					runningGame4.main.resultText =  2
				}
				else{
					if(runningGame4.main.incorrectDance){
						runningGame4.main.resultText = 1
					}
					else{
						
						runningGame4.main.resultText = 0
					}
				}
				arrayofWidths = [[330, 120,230,100],[265, 120,350,100],[300, 120,300,100]]
				ctx.drawImage(textArray[runningGame4.main.resultText], arrayofWidths[runningGame4.main.resultText][0], arrayofWidths[runningGame4.main.resultText][1],arrayofWidths[runningGame4.main.resultText][2],arrayofWidths[runningGame4.main.resultText][3]);
			}
		}
		ctx.fillStyle = "white";
		ctx.fillText("Score: " + runningGame4.main.scores.score, 10, 17);
		ctx.fillText("Round " + (parseInt(runningGame4.main.round) +1),810,17);
	},


	doMousedown: function(c, e)
	{ 
		var mouse = globals.canvasMouse;
		runningGame4.main.clickPicker(mouse);
	},

	danceGen: function(){
		runningGame4.main.danceOrder[0] = Math.floor(Math.random() * 4);
		runningGame4.main.danceOrder[1] = Math.floor(Math.random() * 4);
		runningGame4.main.danceOrder[2] = Math.floor(Math.random() * 4);
		runningGame4.main.danceOrder[3] = Math.floor(Math.random() * 4);
		////CONSOLE.LOG(runningGame4.main.danceOrder);
	},

	danceMoveCheck: function(clicked){
		if(runningGame4.main.danceOrder[runningGame4.main.moveTurn] == clicked){
			//increase the score
				runningGame4.main.scores.score++;
			//continue on
		}
		else{
			//do not increase score
			runningGame4.main.incorrectDance = true;
			//
		
		}
		runningGame4.main.moveTurn++;
	},

	setUpGroup: function()
	{
		var match = true;
		

		runningGame4
		//make the labels
		for(var x =0; x < 3; x++){
			runningGame4.main.groups[x] = x;
			runningGame4.main.gameGroups[x] = Math.floor(Math.random() * 4);
		}



	//you now have the # of students in main.groups & the groupID num in gameGroups
	},

	endOfRound: function(){
		//if we've gone through 3 rounds
			if(runningGame4.main.moveTurn > 3 && runningGame4.main.round <= 2 && runningGame4.main.finalBlink){
			runningGame4.main.round++;
			//reset round
			runningGame4.main.moveTurn = 0;
			runningGame4.main.danceGen();
			runningGame4.main.clickpause = true;
	
			runningGame4.main.clickColor = [0,0,0,0];
			runningGame4.main.finalBlink = false;

		}
		//if we've gone through 3 moves
		if(runningGame4.main.round > 2 && !runningGame4.main.showMeYourMove){
			//end teh game
			runningGame4.main.endGame = true;
		}
	},

	clickPicker: function(mouse){
		//if not in dance mode
		if(!runningGame4.main.inDanceMode && !runningGame4.main.instruction)
		{
			/*ctx.drawImage(smallGroup,600,330,130,90);
			ctx.drawImage(medGroup,130,280,160,120);
			ctx.drawImage(largeGroup,390,90,255,180);
*/
			if(mouse.x >= 600 && mouse.x <=730){
				if(mouse.y>= 330 && mouse.y <=420){
					runningGame4.main.promptChecker(prompt, 0)
				}
			}
			else if(mouse.x >= 130 && mouse.x <=290){
				if(mouse.y>= 280 && mouse.y <=400){
					runningGame4.main.promptChecker(prompt, 1)
				}
			}
			else if(mouse.x >= 390 && mouse.x <=635){
				if(mouse.y>= 90 && mouse.y <=270){
					runningGame4.main.promptChecker(prompt, 2)
				}
			}

			if(runningGame4.main.inDanceMode)
					{
						runningGame4.main.clickpause = true;
						runningGame4.main.showMeYourMove = true;
						if(!runningGame4.main.incorrectDance){
							runningGame4.main.scores.score++;
						}

						runningGame4.main.danceGen();
					}			
			
		}
		if(!runningGame4.main.inDanceMode && runningGame4.main.instruction){
		
			
			if(runningGame4.main.instructionArea == 0 && (mouse.x >= 35 && mouse.x <=225) && (mouse.y >=420 && mouse.y <= 726)){
				runningGame4.main.instruction = false;
				var c=document.getElementById("myCanvas");		
			}
			else if (runningGame4.main.instructionArea == 0 && (mouse.x >= 666 && mouse.x <=856) &&(mouse.y >=420 && mouse.y <= 726)){
				runningGame4.main.instructionArea = 1;
			}
			else if (runningGame4.main.instructionArea == 1 && (mouse.x >= 35 && mouse.x <=225) && (mouse.y >=420 && mouse.y <= 726)){
				runningGame4.main.instructionArea = 0;
			}
			else if (runningGame4.main.instructionArea == 1 && (mouse.x >= 666 && mouse.x <=856) &&(mouse.y >=420 && mouse.y <= 726)){
				runningGame4.main.instructionArea = 2;
			}
				else if (runningGame4.main.instructionArea == 2 && (mouse.x >= 35 && mouse.x <=225) && (mouse.y >=420 && mouse.y <= 726)){
				runningGame4.main.instructionArea = 1;
			}
			else if (runningGame4.main.instructionArea == 2 && (mouse.x >= 666 && mouse.x <=856) &&(mouse.y >=420 && mouse.y <= 726)){
				runningGame4.main.instructionArea = 0;
			}

		

				
		}


		//if in dance mode

		/*
			colors: ['darkred','red','darkgreen', 'green','darkblue', 'blue','darkorange', 'yellow'],
	*/
		if(runningGame4.main.inDanceMode && !runningGame4.main.clickpause){
			
			runningGame4.main.ticker = 0;
			//check the y
		
			//up and down
			if(mouse.y >= 410 && mouse.y <=490){
				//up
				if(mouse.x >= 370 && mouse.x <= 435){
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.clickColor[0] = 1
					runningGame4.main.lastClick = 0;
					runningGame4.main.danceMoveCheck(0);
				}
				if(mouse.x >= 451 && mouse.x <= 516){
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.clickColor[1] = 1
					runningGame4.main.lastClick = 1;
					runningGame4.main.danceMoveCheck(1);
				}
			}
			if(mouse.y >= 410 && mouse.y <=475){
				//
				if(mouse.x >= 270 && mouse.x <= 350){
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.clickColor[2] = 1
					runningGame4.main.lastClick = 2;
					runningGame4.main.danceMoveCheck(2);	
				}
				if(mouse.x >= 526 && mouse.x <= 606){
					runningGame4.main.playerDancingFrame = 0;
					runningGame4.main.playerDanceCounter = 0;
					runningGame4.main.isPlayerDancingNow = true;
					runningGame4.main.clickColor[3] = 1
					runningGame4.main.lastClick = 3;
					runningGame4.main.danceMoveCheck(3);
				}
			}


		}
	},

	promptChecker: function(prompt,x){
		var groupPop = runningGame4.main.groups[x]
		////CONSOLE.LOG(groupPop)
		switch(prompt){
			case 0:			
				var minArray = Math.min.apply(groupPop, runningGame4.main.groups);		
				if(groupPop == minArray){			
					runningGame4.main.inDanceMode = true;
				}
				else{
					runningGame4.main.inDanceMode = false
				
				}
			break;
			case 1:
				var minArray = Math.min.apply(groupPop, runningGame4.main.groups);
				var maxArray = Math.max.apply(groupPop, runningGame4.main.groups);			
				if(groupPop != minArray && groupPop != maxArray){
		
						runningGame4.main.inDanceMode = true;
				}
				else{
						runningGame4.main.inDanceMode = false;
						
				}
			break;
			case 2:
				var maxArray = Math.max.apply(groupPop, runningGame4.main.groups);		
				if(groupPop == maxArray){
			
						runningGame4.main.inDanceMode = true;
				}
				else{
					runningGame4.main.inDanceMode = false
				}
			break;
		}


	},

}

tshirtCannon.main = {

	currentAmmo: 0,
	gameStop: false,
	areaNum: 0,
	students: [],
	time: 60,
	instruction: true,
	instructionArea: 0,
	playTime: this.time*1000,
	scores:
	{
		score: 0,
		tier1: 5,
		tier2: 10,
		tier3: 15,
		tier4: 20
	},


	init: function(c,ctx){
		ctx.restore;
		ctx.save;

		tshirtCannon.main.instructionArea = 0;
		tshirtCannon.main.students = [];
		tshirtCannon.main.scores.score = 0;

		instruction = new Image();
		instruction.src = '../img/minigame5/instruction.png'
		backButton = new Image();
		backButton.src = '../img/backbutton.png'
		//images
		gymBG = new Image();
		gymBG.src = '../img/minigame5/background.png'
		thinwalk = new Image();
		thinwalk.src = '../img/minigame5/thinwalkcyclesheet.png'
		medwalk = new Image();
		medwalk.src = '../img/minigame5/medwalkcycletop.png'
		pluswalk = new Image();
		pluswalk.src = '../img/minigame5/largewalkcycletop.png'
		chairwalk = new Image();
		chairwalk.src = '../img/minigame5/chairwalkcycletop.png'

		titleScreen = new Image();
		titleScreen.src = '../img/minigame5/titlescreen.png';
		blueBar = new Image();
		blueBar.src = '../img/bluebar.png'
		blueBarSmall = new Image();
		blueBarSmall.src = '../img/bluebarsmall.png';

		happy = new Image();
		happy.src = '../img/minigame5/happyreaction.png'
		neutral = new Image();
		neutral.src = '../img/minigame5/neutralreaction.png'
		angry = new Image();
		angry.src = '../img/minigame5/angryreaction.png'
		superHappy = new Image();
		superHappy.src = '../img/minigame5/superhapyreaction.png'
		superAngry = new Image();
		superAngry.src = '../img/minigame5/superangryreaction.png'

		tshirt1 = new Image();
		tshirt1.src = '../img/minigame5/tshirt1.png'
		tshirt2 = new Image();
		tshirt2.src = '../img/minigame5/tshirt2.png'
		tshirt3 = new Image();
		tshirt3.src = '../img/minigame5/tshirt3.png'

		walkingArray = [thinwalk,medwalk,pluswalk,chairwalk];
		reactionArray = [happy,neutral,angry,superHappy,superAngry];

		tshirtCannon.main.instruction = true;

		tshirtCannon.main.areaNum = 0;
		tshirtCannon.main.currentAmmo = 0;
		tshirtCannon.main.gameStop = false;
	
        
		c.onmousedown = tshirtCannon.main.doMousedown;
		titleScreen.onload = function(){
			tshirtCannon.main.update(c,ctx);
		}

	},
    stop: function() 
    {
        tshirtCannon.main.gameStop=true;
        minigameResults(tshirtCannon.main.scores, globals.practice, globals.loopable);
    },
	update: function(c,ctx)
	{
		if(!tshirtCannon.main.gameStop){
		//check if game finished
			requestAnimationFrame(function(){tshirtCannon.main.draw(c,ctx)});
			requestAnimationFrame(function(){tshirtCannon.main.update(c,ctx)});		

		}
	},

	draw: function(c,ctx){    
	
		if(tshirtCannon.main.instructionArea == 0)
			ctx.drawImage(titleScreen,0,0,c.width,c.height)
		else if (tshirtCannon.main.instructionArea == 1){
			ctx.drawImage(instruction,0,0,c.width,c.height)
			ctx.drawImage(backButton,35,420,190,60)
		}

    if(tshirtCannon.main.instruction == false) {
    	ctx.drawImage(gymBG,0,0,c.width, c.height);	
    	ctx.drawImage(blueBar,0,0,c.width,35);
		ctx.fillStyle = "#000000";
		ctx.font = "15px Arial";
		ctx.fillText("Time Remaining: " +tshirtCannon.main.time+"",700,20);
		
		ctx.font = "15px Arial";
		ctx.fillText("Score " +tshirtCannon.main.scores.score+"",50,20);
        
		//draw students moving
		ctx.fillStyle = '#00FFFF'
		for(var i=0;i<tshirtCannon.main.students.length;i++){
			if(tshirtCannon.main.students[i].active){
				var studentFeeling = 1;
				if(tshirtCannon.main.students[i].clickedReaction == 0){
				if(tshirtCannon.main.students[i].likedtshirt == tshirtCannon.main.currentAmmo){
					studentFeeling = 0;
				}
				else if(tshirtCannon.main.students[i].neutraltshirt == tshirtCannon.main.currentAmmo){
					studentFeeling = 1;
				}
				else if(tshirtCannon.main.students[i].disliketshirt == tshirtCannon.main.currentAmmo){
					studentFeeling = 2;
				}
			}
				else if(tshirtCannon.main.students[i].clickedReaction == 1){
					studentFeeling = 3;
				}
				else if(tshirtCannon.main.students[i].clickedReaction == 2){
					studentFeeling = 4;
				}
				ctx.save();
				if(tshirtCannon.main.students[i].direction == -1){
					ctx.drawImage(reactionArray[studentFeeling],(tshirtCannon.main.students[i].x*-1) -41,(tshirtCannon.main.students[i].y*-1)-85,35,35)
					ctx.rotate(Math.PI)
				}
				else{
					ctx.drawImage(reactionArray[studentFeeling],tshirtCannon.main.students[i].x+5,tshirtCannon.main.students[i].y-38,35,35)
				}

				ctx.drawImage(walkingArray[tshirtCannon.main.students[i].body],tshirtCannon.main.students[i].picwidth* tshirtCannon.main.students[i].gender,tshirtCannon.main.students[i].picheight* tshirtCannon.main.students[i].frame,tshirtCannon.main.students[i].picwidth,tshirtCannon.main.students[i].picheight,tshirtCannon.main.students[i].x,tshirtCannon.main.students[i].y,50,50)
			//draw icon
				ctx.restore();
				tshirtCannon.main.students[i].move();
			}
		}

		//draw tshirts
		var strokeArray = [[335,443],[450,443],[564,443]]
		
		ctx.fillStyle = '#55DD68'
		ctx.strokeStyle = '#55BB68'
		ctx.drawImage(blueBarSmall,260,400,380,90)
		ctx.beginPath();
		ctx.arc(strokeArray[tshirtCannon.main.currentAmmo][0],strokeArray[tshirtCannon.main.currentAmmo][1],37,0,2*Math.PI);
		ctx.lineWidth = 3
		ctx.fill();
		ctx.stroke();
		//draw the shirts
		ctx.drawImage(tshirt1,305,408,65,74);
		ctx.drawImage(tshirt2,420,408,65,74);
		ctx.drawImage(tshirt3,535,408,65,74);

		}


	},

	doMousedown: function(c, e)
	{ 
		var mouse = globals.canvasMouse;
		tshirtCannon.main.clickPicker(mouse);
	},

	collisionDetector: function (rect1, rect2)
	{
		if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) 
			return true;
		else
			return false;
	},

	peopleGenerator: function ()
	{
		var add = true;
		var mod;
		var directionMod =  Math.floor(Math.random() * 2);
		var startx;
		var starty =  Math.floor(Math.random() * 240) +105;
		var gen = Math.floor((Math.random() * 3));
		var bodynum =  Math.floor((Math.random() * 4));

		widthArray = [[123,169],[137,185],[175,218],[194,180]]

		if(directionMod == 1){
			startx = -99;
			mod = 1
		}
		else{
			startx = -900;
			starty = -1 * starty;
			mod = -1;
		}

		var tempRect = 
		{
			touched:false,
			width : 50,
			height : 50,
			y: starty,
			x: startx,
		};

		for(var i =0; i< tshirtCannon.main.students.length;i++)
		{
			if(tshirtCannon.main.collisionDetector(tshirtCannon.main.students[i],tempRect))
				add = false;
		}	
		if(add)
		{
			var tshirtArray = [0,1,2]
			tshirtArray.sort(function(a, b){return 0.5 - Math.random()});

			tshirtCannon.main.students.push(
			{
				touched:false,
				active: true,
				direction: mod,
				width : 50,
				frame: 0,
				height : 50,
				y: starty,
				picwidth: widthArray[bodynum][0],
				picheight: widthArray[bodynum][1],
				likedtshirt: tshirtArray[0],
				neutraltshirt: tshirtArray[1],
				disliketshirt: tshirtArray[2],
				clickedReaction: 0,
				gender: gen, 
				ticker: 0,
				body: bodynum,  
				x: startx,
				move: function(){this.x+= (100) * tshirtCannon.main.calculateDeltaTime()/2; this.ticker++; if(this.ticker ==10){if(this.body <3){this.frame++}this.ticker = 0} ; if(this.frame >=8){this.frame = 0;}},
			});		
		}
	},

	peopleManager: function(){
		for(var i=0;i<tshirtCannon.main.students.length;i++)
		{
			if(tshirtCannon.main.students[i].x >1000 || tshirtCannon.main.students[i].x <-100){
				tshirtCannon.main.students[i].active = false;
			}
		}
	},

	clickPicker: function(mouse){

		if(tshirtCannon.main.instruction == false){
		for(var x =0; x < tshirtCannon.main.students.length; x++){
			xcord = tshirtCannon.main.students[x].x
			ycord = tshirtCannon.main.students[x].y

			if(tshirtCannon.main.students[x].direction == -1){			
				xcord = (tshirtCannon.main.students[x].x * -1) -tshirtCannon.main.students[x].width
				ycord = (tshirtCannon.main.students[x].y * -1) -tshirtCannon.main.students[x].height
			}
			if(mouse.x >= xcord && mouse.x <= (xcord+tshirtCannon.main.students[x].width)){
				if(mouse.y >= ycord && mouse.y <= (ycord+tshirtCannon.main.students[x].height)){					
					if(tshirtCannon.main.students[x].likedtshirt == tshirtCannon.main.currentAmmo && tshirtCannon.main.students[x].touched == false){
		
                        tshirtCannon.main.scores.score++;
                        tshirtCannon.main.students[x].touched = true; 
                        tshirtCannon.main.students[x].clickedReaction = 1
					}
					else{
						tshirtCannon.main.students[x].clickedReaction = 2
					}
				}
			}
		}

		if(mouse.y>= 400 && mouse.y <=480){
			if(mouse.x >=305 && mouse.x <=370){
				tshirtCannon.main.currentAmmo = 0;
			}
			else if(mouse.x >=420 && mouse.x <=485){
				tshirtCannon.main.currentAmmo = 1;
			}
			else if(mouse.x >=535 && mouse.x <=600){
				tshirtCannon.main.currentAmmo = 2;
			}
		}
	}
	else{
		if(tshirtCannon.main.instructionArea == 0 && (mouse.x >= 35 && mouse.x <=225) && (mouse.y >=420 && mouse.y <= 726)){
			tshirtCannon.main.instruction = false;
			tshirtCannon.main.time = 60;
			tshirtCannon.main.playTime= tshirtCannon.main.time*1000;

			for(var i =0; i< tshirtCannon.main.playTime; i +=tshirtCannon.main.playTime/20){
				setTimeout(tshirtCannon.main.peopleGenerator, i);
			}
			setTimeout(tshirtCannon.main.stop, tshirtCannon.main.playTime);
	        
			for(var i =0; i< tshirtCannon.main.playTime; i +=tshirtCannon.main.playTime/tshirtCannon.main.time){
				setTimeout(tshirtCannon.main.timer, i);
			}


		 	c = globals.c;
			ctx = c.getContext("2d")
			tshirtCannon.main.update(c,ctx)
			
		}
		else if(tshirtCannon.main.instructionArea == 0 && (mouse.x >= 666 && mouse.x <=856) &&(mouse.y >=420 && mouse.y <= 726)){

			tshirtCannon.main.instructionArea = 1;
		}
		else if(tshirtCannon.main.instructionArea == 1 && (mouse.x >= 35 && mouse.x <=225)&&(mouse.y >=420 && mouse.y <= 726)){
			tshirtCannon.main.instructionArea = 0;
		}
	}
},


	calculateDeltaTime: function()
	{
		var now,fps;
		now = (+new Date);
		fps = 1000 / (now - this.lastTime);
		fps = Math.max(12, Math.min(60, fps));
		this.lastTime = now;
		return 1/fps;
	},
	timer: function()
	{
		tshirtCannon.main.time--;
	}
    
}