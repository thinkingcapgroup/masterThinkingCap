function tabChange(evt, tabID){
	var i,
	tablinks,
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
    console.log(elementID)
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(elementID).style.display = "block";
    evt.currentTarget.className += " active";
}

function researchQuery(){
  var searchElement = document.getElementById('researchInput').value;
  var searchType = document.getElementById('searchType').value;
  var cleanElement = searchElement.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');

  $.post('/research/search');

}