//Normal Distribution based off the Box-Muller Transform
function normalDistribution (mu, sigma) {
    var u1 = Math.random();
    var u2 = Math.random();
  
    //U1 will probably never be 0, but it COULD be. 
    //Math.log(0) = infinity, so that would be very bad.
    while(u1 == 0){
      u1 = Math.random();
    }

    var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI*2 * u2);
    var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(Math.PI*2 * u2);
  
    /*So basically the issue behind only using z0 or z1 is that Math.Random() doesn't include 1, so if you only use cosine the value is less likely to equal 0. If you only use sine, the value is less likely to equal 1. 
    
    On a unit circle, each cosine/sine value reoccurs twice. Cosine is .8777 at .5 rad and at -.5 rad and 1 at 0 rad and 2PI rad. That second one can't ever happen, since it requires u2 to equal 1. The Box Muller's solution is to change between cosine and sine, so that it lessens the flaw (I'm sure that to some extent, it still exists).
    
    In our implementation, the function is used for a lot of different cases, so using a static flip boolean isn't really a fix. We could pass in a lot of different flip booleans, but that'd be a lot of extra code and doesn't work for some situations. So, we are just doing a coin flip. It's kind of hacksy and is probably secretly biased, but it is unlikely that the minutia of variance and probability will actually affect gameplay.*/
    
    if(Math.floor(Math.random() * 2) == 0){
      return z1 * sigma + mu;
    }
    
    return z0 * sigma + mu;
}

function Rectangle(x1, x2, y1, y2){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
}

function isPointInRect(pointX, pointY, rect){
    return ((pointX >= rect.x1 && pointX <= rect.x2) && (pointY >= rect.y1 && pointY <= rect.y2));
}

//Gets the position of the mouse relative to the canvas
function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return {
	 x: evt.clientX - rect.left,
	 y: evt.clientY - rect.top
	};
}

function capitalStr(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

