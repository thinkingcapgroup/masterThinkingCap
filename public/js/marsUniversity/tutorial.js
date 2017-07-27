function TutorialPage(title, content, image){
  this.title = title;
  this.content = content;
  this.image = image;
  this.previous = "Previous";
  this.next = "Next";
}


function tutorial (help)
{
    clearScreen();
    showTutorialPage(0, help);
}

function showTutorialPage(currentPage, help){
    let context = {"tutorialPages":globals.tutorialPages, "currentPage":currentPage, "isHelp":help};
    document.getElementById("centerDisplay").innerHTML = views["tutorial"](context);
}

function nextSection(currentPage, help)
{
  if(currentPage < globals.tutorialPages.length-1){
    showTutorialPage(currentPage+1,help);
  }
  else{
    if(!help){
      globals.remainingHoursDay = 12;
      globals.days = 1;
      drawPoll(globals.POLL_STATES.TUTORIAL, false, true);
    }
    else{
      drawPoll(globals.POLL_STATES.IN_GAME_PRACTICE, true, true);
    }
  }
	
}

function lastSection(currentPage, help)
{
  showTutorialPage(currentPage-1, help);
}