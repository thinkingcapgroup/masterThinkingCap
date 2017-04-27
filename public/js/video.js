var player;
playing = false

function logVideo(x){
	var arrayOfWhere = ["/video/back", "/categoricalvideo/back", "/biasvideo/back", "/meanvideo/back", "/proportionvideo/back"]
	var arrayDirect = ["/marsUniversity","/mod2", "/mod3", "/mod4", "/mod5"]
	var where = "/video/back";
	$.post(where, {videoNum: x});
}

function onYouTubeIframeAPIReady() {
   player = new YT.Player('video', {
            height: '360',
            width: '640',
            videoId: '0vtvsAYtMK8',
           events: {
                'onStateChange': onPlayerStateChange
            }
        });

}


 function onPlayerStateChange(event) {
        if(!playing){
            alert('hi');
            playing = true;
        }
    }
    
function tabChange(evt, tabID){
	var i,
	tablinks,
  currentsubTab = 0,
	tabcontent;

	tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var elementID = "report"+tabID;
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(elementID).style.display = "block";
    evt.currentTarget.className += " active";
    
    if(videoWatched)
    {
        logVideo(currentTab);
        $.post("/video/change",{});
    }
    currentTab = tabID+1
    videoWatched = false;
}

function subtabChange(evt, tabID){
  var i,
  tablinks,
  currentTab = 0,
  tabcontent;

  tabcontent = document.getElementsByClassName("subtabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("subtablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var elementID = "subreport"+tabID;
    console.log(elementID)
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(elementID).style.display = "block";
    evt.currentTarget.className += " active";

 currentTab = tabID
 console.log(currentTab)
}
