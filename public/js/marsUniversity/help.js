
  // Shows the bug report modal
  function displayHelpPage () {
    document.getElementById('helpPage').classList.remove('hide');
  }

  // Hides the bug report modal
  function hideHelpPage () {
	  globals.loopable = false;
    document.getElementById('helpPage').classList.add('hide');
  }

function helpScreen(previousScreen)
{
	globals.practice = true;
    //Shows the Help screen 
	clearScreen();
    document.getElementById("mainContent").classList.add("center");
  
    //Show the top bar
    document.getElementById('topBar').style.display = "inline-flex";
  
	globals.section = 1;
    
    document.getElementById("mainContent").innerHTML = views["help"]({});
    document.getElementById("back").innerHTML = "<button class = 'logHelp' id='helpBack' class = 'logHelpEnd'>Exit </button>";
    document.getElementById("helpBack").onclick = previousScreen;
    
}

function backToHelp(){
  document.getElementById('mapIcons').style.display = 'none';
  document.getElementById('helpfulIcons').style.display = 'none';
  document.getElementById('quickReference').style.display = 'none';
  document.getElementById('showCandidates').style.display = 'none';
  document.getElementById('backToHelp').style.display = 'none';
  
  document.getElementById('mainHelp').style.display = 'block';
}

function helpMinigamePlayer(id){
	globals.loopable=true;
	switch(id)
	{
		case 1:
		document.getElementById("coffeerundemoplayer").style.height = '500px';
			document.getElementById("coffeerundemoplayer").innerHTML = "<canvas id='myCanvas1' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas1");
		break;
		case 2:
		document.getElementById("photobombdemoplayer").style.height = '500px';
			document.getElementById("photobombdemoplayer").innerHTML = "<canvas id='myCanvas2' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas2");
		break;
		case 3:
		document.getElementById("secretstickerdemoplayer").style.height = '500px';
			document.getElementById("secretstickerdemoplayer").innerHTML = "<canvas id='myCanvas3' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas3");
		break;
		case 4:
		document.getElementById("meanmovesdemoplayer").style.height = '500px';
			document.getElementById("meanmovesdemoplayer").innerHTML = "<canvas id='myCanvas4' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas4");
		break;
		case 5:
		document.getElementById("tshirtdemoplayer").style.height = '500px';
			document.getElementById("tshirtdemoplayer").innerHTML = "<canvas id='myCanvas5' width='900px' height = '500px' style='float:none'></canvas><br>";
			globals.c=document.getElementById("myCanvas5");
		break;
	}	
	globals.ctx = globals.c.getContext("2d");
	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	switch(id)
	{
		case 1:
		runningGame.main.init(globals.c,globals.ctx);
		break;
		case 2:
		runningGame2.main.init(globals.c,globals.ctx);
		break;
		case 3:
		secretSticker.main.init(globals.c,globals.ctx);
		break;
		case 4:
		runningGame4.main.init(globals.c,globals.ctx);
		break;
		case 5:
		tshirtCannon.main.init(globals.c,globals.ctx);
		break;
	}	
}

function showMiniHelp(id)
{
	switch(id)
	{
		case 1:
		document.getElementById("coffeerundemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		break;
		case 2:
		document.getElementById("photobombdemo").style.display = "block"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
		break;
		case 3:
		document.getElementById("secretstickerdemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
		break;
		case 4:
		document.getElementById("meanmovesdemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("tshirtdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
		break;
		case 5:
		document.getElementById("tshirtdemo").style.display = "block"; 
		document.getElementById("photobombdemo").style.display = "none"; 
		document.getElementById("secretstickerdemo").style.display = "none"; 
		document.getElementById("meanmovesdemo").style.display = "none"; 
		document.getElementById("coffeerundemo").style.display = "none"; 
		break;
		break;
	}	
}

function chooseHelpPage(page)
{
	//Chooses the passed in page
	document.getElementById("helpContent").innerHTML = views[page]({});
	//Display page after filling it.
	displayHelpPage();
}


