globals =
{
    //making all the score presets
    groupList:[],
    majorList:[],
    fakeCandidateHolder:[],
    currentCandidateArrayHolder:[],
    graphData:[],
    lastMinigame:0, 
    isPoll:false,
    isCurrentAreaHover:0,
	inGame: false,
    first: false,
    tableHeaders:[],
    tableArrays:[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ]],
    pastPollChoices:[],
    pastPollResults:[],
    pastPollSizes:[],
    pastGraphData:[],
    pastGraphLabels:[],
    lifeformArray:[],
    bodyShapeArray:[],
    bodyTypeArray:[],
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
    imgArrayBodyWidth:[],
    imgArrayBodyHeight:[],
    imgArrayHeadHeight:[],
    dayCycleImage:[],
    //scores go Socialite/Athlete/MediaLover/Researcher/Reader
    //the score goes tuition, tuition var, athletic, athletic var, research, research var, events, events var, medical, issueScore[4]
    positions:[],
    positionsLower:[],
    //Socialite/athlete/gamer/reader
    //Index orresponds with Area id
    groupIssues:[],
    //goes Business/Engineering/Technology/Finearts/Liberalarts
    majorIssues:[],
    oppChoice:[],
    chosenCandRanks:[],
    currentEvents:[],
    sample:[],
    events:[],
    questions:[],
    endReset:false,
    //playerIssues
    //sprites
    spriteHead:new Image(),
    //setting up some more variables
    turnCounter:0,
    sample: [],
    days: 0,
    remainingHoursDay: 0,
    population:1000,
    canvasMouse: "",
    images:new Array(30),
    opponentCandidate: null,
    playerImg:new Image(),
    eventsLoaded:false,
    studentBiases: {},
    opinionLimits: {},
    opinionValues: {},
    studentGroups: {},
    currentPoll: 0,
	loopable: false,
	helpPage: ["Statement", "Polls", "Areas", "Candidates", "Functions", "Graphs", "Trends", "Students", "Map" ],
    gameIssues:
    {
        tuition: "Lower Tuition",
        budget: "Increase Budget",
        functions: "More School Functions",
        medical: "Improve Medical Services"
    },
    allQuestions: {},
	POLL_STATES:{},
	tutorialPages: []
}
    
    
