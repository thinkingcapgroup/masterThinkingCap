var currentTab= 1;
var videoWatched = false;

window.onload = function()
{
    //document.getElementById("vid1").contentWindow.addEventListener('click', markVideoWatched());
    //document.getElementById("vid2").contentWindow.addEventListener('click', markVideoWatched());
    //document.getElementById("vid3").contentWindow.addEventListener('click', markVideoWatched());
    //document.getElementById("vid4").contentWindow.addEventListener('click', markVideoWatched());
    //document.getElementById("vid5").contentWindow.addEventListener('click', markVideoWatched());
    videoWatched = false;
    //onYouTubeIframeAPIReady();
}
  var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('vid1', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
    onYouTubeIframeAPIReady2();
  }
  function onYouTubeIframeAPIReady2() {
    player = new YT.Player('vid2', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
    onYouTubeIframeAPIReady3();
  }
  function onYouTubeIframeAPIReady3() {
    player = new YT.Player('vid3', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
    onYouTubeIframeAPIReady4();
  }
  function onYouTubeIframeAPIReady4() {
    player = new YT.Player('vid4', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
    onYouTubeIframeAPIReady5();
  }
  function onYouTubeIframeAPIReady5() {
    player = new YT.Player('vid5', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
    console.log("bllllll")
  }
  function onPlayerReady(event) {
    console.log("hate");
  }

  function changeBorderColor(playerStatus) {
    var color;
    if (playerStatus == -1) {
      color = "#37474F"; // unstarted = gray
    } else if (playerStatus == 0) {
      color = "#FFFF00"; // ended = yellow
    } else if (playerStatus == 1) {
      color = "#33691E"; // playing = green
    } else if (playerStatus == 2) {
      color = "#DD2C00"; // paused = red
    } else if (playerStatus == 3) {
      color = "#AA00FF"; // buffering = purple
    } else if (playerStatus == 5) {
      color = "#FF6DOO"; // video cued = orange
    }
    if (color) {
      document.getElementById('existing-iframe-example').style.borderColor = color;
    }
  }
  function onPlayerStateChange(event) {
    markVideoWatched();
  }

function markVideoWatched()
{
    console.log("shakalaka")
    videoWatched = true;
}

function logVideo(x){
	var arrayOfWhere = ["/video/back", "/categoricalvideo/back", "/biasvideo/back", "/meanvideo/back", "/proportionvideo/back"]
	var arrayDirect = ["/marsUniversity","/mod2", "/mod3", "/mod4", "/mod5"]
	var where = "/video/back";
	$.post(where, {videoNum: x});
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
