globals =
{
    //making all the score presets
    groupList:["socialite", "athlete", "gamer", "reader"],
    majorList:["business", "law", "tech", "arts"],
    fakeCandidateHolder:[],
    currentCandidateArrayHolder:[],
    graphData:[],
    lastMinigame:0, 
    isPoll:false,
    isCurrentAreaHover:0,
	inGame: false,
    first: false,
    firstPoll: false,
	firstState: false,
    tableHeaders:["Favored Issue", "Least Favored Issue", "Favored Candidate", "Least Favored Candidate", "Major", "Class", "Group", "Our Candidate's Fame", "Our Candidate's Trust", "Issue Support: ", "Candidate's Fame: ","Candidate's Trust: "],
    tableArrays:[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]],
    pastPollChoices:[],
    pastPollResults:[],
    pastPollSizes:[],
    pastGraphData:[],
    pastGraphLabels:[],
    lifeformArray:["Android", "Human", "Martian"],
    bodyShapeArray:["Straight", "Curvy", "Broad"],
    bodyTypeArray:["Thin", "Medium", "Plus", "HoverChair"],
    back:false,
    num:1,
    textContents: "",
    c: "",
    ctx: "",
    qPollHolder: [],
    ranking: [],
    practice:false,
    section:1,
    graphType:"Pie",
    //sprite stuff
    heads:new Image(),
    thinBody:new Image(),
    medBody:new Image(),
    lgBody:new Image(),
    chairBody:new Image(),
    imgArrayBody:[],
    imgArrayBodyWidth:[164,190,264,215],
    imgArrayBodyHeight:[343,327,304,334],
    imgArrayHeadHeight:[171,173,173],
    
    dayCycleImage:['day0','day1','day2','day3','day4','day5','day6','day7','day8','day9'],
    
    
    //scores go Socialite/Athlete/MediaLover/Researcher/Reader
    //the score goes tuition, tuition var, athletic, athletic var, research, research var, events, events var, medical, issueScore[4]
    positions:
    [
        "Lowering Tuition",
        "Increase Budget",
        "More School Functions",
        "Improve Medical Services"
    ],
    
    positionsLower:
    [
        "tuition",
        "budget",
        "functions",
        "medical"
    ],
    //Socialite/athlete/gamer/reader
    //Index orresponds with Area id
    groupIssues:
    [
        [2,2,2,1,0,3,1,1,-1,2],
        [0,2,3,1,0,3,1,1,-1,2],
        [1,1,-1,2,1,2,3,1,-2,3],
        [-1,1,-1,1,2,2,3,1,0,4],
        [0,3,-2,2,0,2,1,3,3,1]
    ],
    
    //goes Business/Engineering/Technology/Finearts/Liberalarts
    majorIssues:
    [
        [-2,1,3,1,1,1,0,3,2,1],
        [-1,2,1,1,1,3,-2,1,3,1],
        [3,1,-1,1,3,1,0,4,0,2],
        [2,2,0,3,-2,2,2,2,2,1],
        [0,3,0,4,-3,1,3,1,3,1]
    ],
    
    oppChoice:[],
    chosenCandRanks:[],
    currentEvents:[],
    sample:[],
    events:[],
    questions:[],
    candidates:[],
    gameSession:0, 
    gameOver:false, 
    endReset:false,
    //playerIssues
    
    //sprites
    spriteHead:new Image(),
    //sample person
    
    //setting up some more variables
    
    turnCounter:0,
    population: 0,
    sample: [],
    startHours: 0,
    remainingHoursTotal: 0,
    days: 0,
    totalDays: 0,
    remainingHoursDay: 0,
    
    population:1000,
    canvasMouse: "",
    images:new Array(30),
    playerCandidate: null,
    opponentCandidate: null,
    playerImg:new Image(),
    eventsLoaded:false,
    studentBiases: {},
    studentGroups: {}
}
    
    