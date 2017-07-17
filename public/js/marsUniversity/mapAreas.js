const areaChoices = {};

function MapArea(name, id, labelX, labelY, coordinates, collisionRects){
    this.name = name;
    this.labelX = labelX;
    this.labelY = labelY;
    this.id = id;
    this.coordinates = coordinates;
    this.collisionRects = collisionRects;
    this.events = [];
}

function createAreas(){    
    //Create Gym Object
    let coords = [
        [360, 15],
        [585, 15],
        [585, 235],
        [485, 235],
        [485, 120],
        [360, 120]
    ];
    
    let rects = [new Rectangle(360, 585, 15, 120), new Rectangle(480, 590, 115, 235)];
    areaChoices["Gym"] = new MapArea("Gym", 2, 475, 50, coords, rects);
    
    //Create Labs
    coords = [
        [148, 15],
        [255, 15],
        [255, 135],
        [226, 135],
        [226, 165],
        [180, 165],
        [180, 135],
        [148, 135]
    ];
    rects = [new Rectangle(145, 255, 15, 135), new Rectangle(180, 230, 135, 165)];
    areaChoices["Labs"] = new MapArea("Labs", 3, 145, 30, coords, rects);
    
    //Create Commons
    coords = [
        [90, 275],
        [207, 275],
        [207, 397],
        [90, 397]
    ];
    
    rects = [new Rectangle(90, 205, 275, 395)];
    areaChoices["Commons"] = new MapArea("Commons", 1, 90, 285, coords, rects);
    
    //Create Library
    coords = [
        [400, 275],
        [588, 275],
        [588, 399],
        [400, 399]
    ];
    
    rects = [new Rectangle(400, 590, 255, 400)];
    areaChoices["Library"] = new MapArea("Library", 4, 435, 270, coords, rects);
    
    //Create Quad
    coords = [
        [135, 190],
        [305, 190],
        [305, 246],
        [135, 246]
    ];
    
    rects = [new Rectangle(135, 300, 190, 250)];
    areaChoices["Quad"] = new MapArea("Quad", -1, 160, 160, coords, rects);
}

function isPointInArea(pointX, pointY, mapArea){
    
    //If one of the area rectangles contains the point, return true
    for(let i = 0; i < mapArea.collisionRects.length; i++){
        if(isPointInRect(pointX, pointY, mapArea.collisionRects[i])){
            return true;
        }
    }
    return false;
}

function drawAreaPath(mapArea){
    
    globals.ctx.beginPath();
    globals.ctx.moveTo(mapArea.coordinates[0][0], mapArea.coordinates[0][1]);
    for(let i = 1; i < mapArea.coordinates.length; i++){
        globals.ctx.lineTo(mapArea.coordinates[i][0], mapArea.coordinates[i][1]);
    }
    globals.ctx.closePath();
}

//Draws lines on the map around the buildings
function setupMap(poll)
{
	globals.isPoll = poll;
    
    document.getElementById("map").innerHTML = "<canvas id='myCanvas' width='600px' height = '415px' style = 'position: relative; display: inline'></canvas>";
    globals.c=document.getElementById("myCanvas");
    globals.ctx = globals.c.getContext("2d");
    
    var mouse = globals.canvasMouse;
	globals.c.addEventListener('mousemove', function(evt) {globals.canvasMouse = getMousePos(globals.c, evt);}, false);
	globals.c.onmousedown = doMousedownMap;
	globals.c.onmousemove = doMouseoverMap;
    
    drawMapAreas();
    drawMapIcons();

}

    
//Sets the clickable zones on the map for the Game Map
 function doMousedownMap(c,e)
	{
		var mouse = globals.canvasMouse;
        
        //Loop through map areas
        for(let key in areaChoices){
            let mapArea = areaChoices[key];
            
            //Only check for quad icon during Polling
            if(mapArea.name != "Quad" || globals.isPoll){
                
                if(isPointInArea(mouse.x, mouse.y, mapArea)){
                    
                    //If it's during a poll, update the input value
                    if(globals.isPoll){
                        document.getElementById("location").value = mapArea.id;
                    }
                    //Otherwise display the selected choice element
                    else{
                        //Hide all Choice Elements
                        document.getElementById("GymChoice").style.display = 'none';
                        document.getElementById("LibraryChoice").style.display = 'none';
                        document.getElementById("LabsChoice").style.display = 'none';
                        document.getElementById("CommonsChoice").style.display = 'none';
                        
                        //Display only the selected area
                        document.getElementById(mapArea.name+"Choice").style.display = 'block';
                    }
                    
                    globals.isCurrentAreaHover = mapArea.id;
                    
                    //Redraw screen with new outline
                    doMouseoverMap();
                }
            }
        }
    }

//Fills the zone over the building that the mouse if hovering over
	function doMouseoverMap(c,e){


        globals.c=document.getElementById("myCanvas");
        globals.ctx = globals.c.getContext("2d");
		var mouse = globals.canvasMouse;
        ////CONSOLE.LOG(mouse);
		globals.ctx.fillStyle = 'rgba(0,255,255,0.5)';
        
        drawMapAreas();
        
        //Draw Hover shapes
        
		//Loop through map areas
        for(let key in areaChoices){
            let mapArea = areaChoices[key];
            
            //Only check for quad icon during Polling
            if(mapArea.name != "Quad" || globals.isPoll){
                
                if(isPointInArea(mouse.x, mouse.y, mapArea)){
                    drawAreaPath(mapArea);
                    globals.ctx.fill();
                }
            }
        }
        
        drawMapIcons();
	}
    

    //Draws lines on the map around the buildings
    function drawMapAreas()
    {
        
        globals.ctx.drawImage(images["Map"], 0,0,600,414);
        
        globals.ctx.strokeStyle = '#00FFFF';
        globals.ctx.lineWidth = 3;
        
        
        //Draw outlines of map areas
        for(let key in areaChoices){
            globals.ctx.save();
            let mapArea = areaChoices[key];

            //Only draw the quad icon during Polling
            if(mapArea.name != "Quad" || globals.isPoll){
                
                if(globals.isCurrentAreaHover == mapArea.id){
                    globals.ctx.strokeStyle = '#FFFF00';
        	        globals.ctx.lineWidth = 6;
                }
                drawAreaPath(mapArea);
                globals.ctx.stroke();
            }
            globals.ctx.restore();
        }

    }
function drawMapIcons(){
    
    //Draw area icons
    for(let key in areaChoices){
        let mapArea = areaChoices[key];
        //Only draw the quad icon during Polling
        if(mapArea.name != "Quad" || globals.isPoll){
            let areaIcon = images[mapArea.name+"Icon"];
            globals.ctx.drawImage(areaIcon, mapArea.labelX, mapArea.labelY,113,75)
        }
    }
}