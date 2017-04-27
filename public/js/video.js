var player;
var player2;
var player3;
var player4;
var player5;
var videoWatched = false;
playing = false
currentTab = 1;

function logVideo(x){
	var arrayOfWhere = ["/video/back", "/categoricalvideo/back", "/biasvideo/back", "/meanvideo/back", "/proportionvideo/back"]
	var arrayDirect = ["/marsUniversity","/mod2", "/mod3", "/mod4", "/mod5"]
	var where = "/video/back";
	$.post(where, {videoNum: x});
}

function onYouTubeIframeAPIReady() {
   player = new YT.Player('vid1', {
            height: '360',
            width: '640',
            videoId: '0vtvsAYtMK8',
           events: {
                'onStateChange': onPlayerStateChange
            }
        });
   player2 = new YT.Player('vid2', {
            height: '360',
            width: '640',
            videoId: 'ZsHDsGOYkxk',
           events: {
                'onStateChange': onPlayerStateChange
            }
        });
   player3 = new YT.Player('vid3', {
            height: '360',
            width: '640',
            videoId: 'JTuvWfkE-_Y',
           events: {
                'onStateChange': onPlayerStateChange
            }
        });
   player4 = new YT.Player('vid4', {
            height: '360',
            width: '640',
            videoId: 'X7pEpb54kto',
           events: {
                'onStateChange': onPlayerStateChange
            }
        });
   player5 = new YT.Player('vid5', {
            height: '360',
            width: '640',
            videoId: 'dhXH59c1CE4',
           events: {
                'onStateChange': onPlayerStateChange
            }
        });

}


 function onPlayerStateChange(event) {
        if(!playing){
            videoWatched = true;
        }
    }
    
function tabChange(evt, tabID){
	var i,
	tablinks,
	tabcontent;

	player.stopVideo();
	player2.stopVideo();
	player3.stopVideo();
	player4.stopVideo();
	player5.stopVideo();
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
