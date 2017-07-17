let tutorialPages = [];

function TutorialPage(title, content, image){
  this.title = title;
  this.content = content;
  this.image = image;
  this.previous = "Previous";
  this.next = "Next";
}

function createTutorialPages(){
  //Page 1: How To Play
  let title = "How To Play";
  let content = "<p>Hi, my name is Gui’De. I will help you find your way around Mars University. You’re a new student, and we need your help now. It’s time for the student president election and all the candidates won't do a good job. You should run for president of the Student Council!</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Areas
  title = "Areas";
  content = "<p>Lets Take a Tour of the school! There are five main places on the Mars U Campus. Each area attracts different people to them.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`mapHelpPage`)'></img>";
  let image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Areas
  title = "Areas - Bias";
  content = "<p>Here is where everybody can be found! <br> Commons: Socialites and Arts Majors <br> Library: Readers and Law Majors<br> Gym: Athletes and Business Majors <br> Labs: Gamers and Technology Majors</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`mapHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates";
  content = "<p>Like in any election you'll have some comptetition. There are five other people running for presisdent at Mars U.</p> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`mapHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates - Issue Candidates";
  content = "<p>There are four candidates who don't do much campaigning. We call them the issue candidates. They're pretty well know and liked around campus so they think they don't need to campaign. Here are the Candidates in there issues. <br>Simon: Improve Medical Services <br> Zrapp: Increase the Budget <br> Boof: Lower Tuition <br> C1AMP: More School Functions</p> <img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`candidatesHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Candidates
  title = "Candidates - Karma";
  content = "<p>The final candidate also transferred in recently. Karma the Chameleon is very charismatic, but isn't very well known. People like her, but they have noticed that she seems to copy the statements of other candidates.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`candidatesHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Statements and Functions
  title = "Statements and Functions";
  content = "<p>You can win by doing three things: <br>-Statements<br>-Polling<br>-Student Functions <br> You have 12 hours in a day and everything you do takes time.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Statements
  title = "Statements";
  content = "<p>Statements are where you focus on the issues at school. Statements can change the way people feel about the issues. They also tell the population how you feel about the issues.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  image = '../img/menu/makeastatementiconNEW.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Statements
  title = "Statements - Continued";
  content = "<p>People are more likely to vote for you if they agree with you on the issues. Be sure to stick to one stance on each issue, because people won't like it if they can't trust you. Statements take an hour to prepare and perform.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Issues
  title = "Issues";
  image = '../img/issues.png';
  content = "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`statementsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, image));

  //Student Functions
  title = "Student Functions";
  content = "<p>Student Functions are how you get to know the population. Becoming more famous among groups to help get you elected.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`functionsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Student Functions
  title = "Student Functions";
  content = "<p>Functions take a couple hours to set up and you can add an option to that if you like, but it will take an extra hour. Functions can't be held in the quad according to the Univerity Guidelines.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`functionsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Population - Majors
  title = "Population - Majors";
  image = '../img/majors.png';
  content = "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`studentsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Population - Social Groups
  title = "Population - Social Groups";
  image = '../img/interests.png';
  content = "<img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`studentsHelpPage`)'></img>"
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Polling
  title = "Polling";
  content = "<p>With polls you can see how the populations around the school feel about the candidates, and issues. You take polls in different areas which will have different biases.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`pollHelpPage`)'></img>";
  image = '../img/menu/takeapollicon.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Polling
  title = "Polling - Continued";
  content = "<p> Polls take time to conduct, but the current student government will conduct one for you at the end of each day. These will help you see your effect on the population.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`pollHelpPage`)'></img>";
  image = '../img/menu/takeapollicon.png';
  tutorialPages.push(new TutorialPage(title, content, image));
		
  //Polling Results
  title = "Polling Results";
  content = "<p>After you  take a poll you are given the results from a sample of students. By looking at these results you can determine what moves you should make next. Poll Results can be viewed in 3 ways: Bar Graphs, Pie Graphs and a Table.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Results
  title = "Polling Results - Graphs";
  content = "<p> The Bar and Pie Graphs are for looking at more general data. Each Graph is attributed to a question. There you can see how many students answered each result in a question.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Results
  title = "Polling Results - Table";
  content = "<p> The table is for when you want specific data. In the table you can see how each person who took the sample responded to all the questions. You can even filter by majors, or social groups. So if you only want results from athletes then you can just view those.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Polling Reports
  title = "Old Polling Reports";
  content = "<p>Poll Results are saved for you after you take them so you can go back and view them at the poll menu whenever you like.</p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`graphsHelpPage`)'></img>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Trend Reports
  title = "Trend Reports"
  content = "<p>If you ask the same question more than once, it will appear on the trend report. A place where you can see the summary of all the graphs for that question. This is great for looking quickly at how public opinion has changed. </p><img class = 'logHelp' src= '../img/menu/QuestionICON.png' style = 'width:50px' onclick = 'chooseHelpPage(`trendsHelpPage`)'></img>";
  image = '../img/menu/trendreport.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Help Pages
  title = "Help Pages"
  content = "<p>You can return here later or use the help button displayed above to open the help page related to the page you are currently on. From that page you can navigate through the help menu to any other help page or return to the page you were on. I've created when you have questions. </p>";
  image = '../img/menu/QuestionICON.png';
  tutorialPages.push(new TutorialPage(title, content, image));
  
  //Practice Area
  title = "Practice Area";
  content = "<p>After this tutorial you will enter a practice polling area where you can create polls and look at polling results. Try it out, but remember, the data does not represent the actual students or candidates. You can start your election or return to the tutorial at any time.</p>";
  tutorialPages.push(new TutorialPage(title, content, ""));
  
  //Set previous and nexts
  for(let i = 0; i < tutorialPages.length; i++){
    if(i > 0){
      tutorialPages[i].previous = tutorialPages[i-1].title;
    }
    if(i < tutorialPages.length - 1){
      tutorialPages[i].next = tutorialPages[i+1].title;
    }
  }
}

function tutorial (help)
{
    clearScreen();
    showTutorialPage(0, help);
}

function showTutorialPage(currentPage, help){
    let context = {"tutorialPages":tutorialPages, "currentPage":currentPage, "isHelp":help};
    document.getElementById("centerDisplay").innerHTML = views["tutorial"](context);
}

function nextSection(currentPage, help)
{
  if(currentPage < tutorialPages.length-1){
    showTutorialPage(currentPage+1,help);
  }
  else{
    if(!help){
      globals.remainingHoursDay = 12;
      globals.days = 1;
      drawPoll(POLL_STATES.TUTORIAL, false, true);
    }
    else{
      drawPoll(POLL_STATES.IN_GAME_PRACTICE, true, true);
    }
  }
	
}

function lastSection(currentPage, help)
{
  showTutorialPage(currentPage-1, help);
}