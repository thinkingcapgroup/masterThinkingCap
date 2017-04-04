function tabChange(evt, tabID){
	var i,
	tablinks,
  currentTab = 0,
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

 currentTab = tabID

 if(currentTab == 1){
  document.getElementById('subreport0').style.display = 'block';
  document.getElementById('subreport1').style.display = 'none';
 } 
 if(currentTab == 2){
  document.getElementById('subreport2').style.display = 'block';
  document.getElementById('subreport3').style.display = 'none';
 }

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

function researchQuery(){
  var searchElement = document.getElementById('researchInput').value;
  var searchType = document.getElementById('searchType').value;
  var cleanElement = searchElement.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');


  $.get('/research/search', {search: cleanElement, type: searchType} , function(data){
  if(data.length == 0){
      document.getElementById('searchResults').innerHTML = '<h2>No Results Found<h2>'
    }
  else{
     document.getElementById('searchResults').innerHTML = '<h2>Results Found<h2>'
     document.getElementById('searchResults').innerHTML +='<table id = "tableSearchResults"></table>'
     document.getElementById('tableSearchResults').innerHTML +='<thead><tr><th>Username</th><th>User ID</th><th>Role</th></tr></thead>'
    for(var x =0; x < data.length; x++){
        document.getElementById('tableSearchResults').innerHTML += '<tr><td>'+data[x].username+'</td><td>'+data[x].id+'</td><td>'+data[x].role+'</td></tr>'
    }
  }

  });


}

