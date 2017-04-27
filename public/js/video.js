var currentTab= 1;
var videoWatched = false;

window.onload = function()
{
    document.getElementById("vid1").addEventListener('click', markVideoWatched());
    document.getElementById("vid2").addEventListener('click', markVideoWatched());
    document.getElementById("vid3").addEventListener('click', markVideoWatched());
    document.getElementById("vid4").addEventListener('click', markVideoWatched());
    document.getElementById("vid5").addEventListener('click', markVideoWatched());
    videoWatched = false;
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
