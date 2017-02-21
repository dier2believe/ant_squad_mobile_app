// ************************************
//               LINKS
// ************************************
document.querySelector("#infoButton").addEventListener("click", settingsMenu, false);
document.querySelector("#onePlayer").addEventListener("click", function() { changePlayerNum(1); }, false);
document.querySelector("#twoPlayer").addEventListener("click", function() { changePlayerNum(2); }, false);
document.querySelector("#threePlayer").addEventListener("click", function() { changePlayerNum(3); }, false);
document.querySelector("#fourPlayer").addEventListener("click", function() { changePlayerNum(4); }, false);

//document.querySelector("#squareButton").addEventListener("click", )

document.querySelector("#instructButton").addEventListener("click", instructionsMenu, false);
document.querySelector("#playButton").addEventListener("click", playHandler, false);
document.querySelector("#squareButton").addEventListener("click", spaceHandler, false);
document.querySelector("#inventoryButton").addEventListener("click", inventoryDisplay, false);

//document.querySelector("#nextButton").addEventListener("click", nextHandler, false);
//document.querySelector("#inventoryButton").addEventListener("click", bagHandler, false);

var output = document.querySelector("#output");
var squareInput = document.querySelector("#squareInput");
var squareButton = document.querySelector("#squareButton");
var statsBar  = document.querySelector("#wordHeader");

var answerButton1 = document.querySelector("#answerButton1");
var answerButton2 = document.querySelector("#answerButton2");
var answerButton3 = document.querySelector("#answerButton3");
var answerButton4 = document.querySelector("#answerButton4");

var inventoryButton = document.querySelector("#inventoryButton");
var nextPlayerButton = document.querySelector("#nextPlayerButton");
nextPlayerButton.addEventListener("click", nextPlayer, false);

// ************************************
//             VARIABLES
// ************************************
var instructionsDisplayed = false;
var playerButtonsDisplayed = false;
var numberOfPlayers = 2;
var activePlayer = 1;
var players = [];

/*
var events = [];
events[0] = "bear";
events[1] = "old man";
events[2] = "trip wire";
events[3] = "abandoned house";
events[4] = "radioactive human";
*/


var volcano = new Biome("volcano");
volcano.randEvents = ["tunnel", "dragon"];
volcano.squares = ["C1", "D1", "E1", "F1", "G1", "H1", "C2", "D2", "E2", "F2", "G2", "H2", "A3", "B3", "C3", "D3", "E3", "F3", "G3", "A4", "B4", "C4", "D4", "E4", "F4", "A5", "B5", "C5", "D5", "E5", "A6", "B6", "C6", "D6", "A7", "B7", "C7"];

var lava = new Biome("lava");
lava.randEvents = [];
lava.squares = ["A1", "B1", "A2", "B2", "B8", "A9", "B9", "C9", "A10", "B10", "C10"];

var ashenWasteland = new Biome("ashenWasteland");
ashenWasteland.randEvents = ["figure"];
ashenWasteland.squares = ["I1", "J1", "K1", "L1", "I2", "J2", "K2", "L2", "H3", "I3", "J3", "K3", "L3", "M3", "G4", "H4", "F5", "G5", "E6", "F6", "D7", "E7", "A8", "C8", "D8", "D9", "D10", "D11"];

var cemetary = new Biome("cemetary");
cemetary.randEvents = [];
cemetary.squares = [];

var forest = new Biome("forest");
forest.randEvents = ["tree", "berry", "mushroom"/*, "bandit"*/];
forest.randEvents = ["D13","E13","D14","E14","F14","A15","B15","C15","D15","E15","F15","G15","A16","B16","C16","D16","E16","F16","G16","H16","I16","J16","A17","B17","C17","D17","E17","F17","G17","H17","I17","J17","K17","A18","B18","C18","D18","E18","F18","G18","H18","I18","J18","K18","L18","A19","B19","C19","D19","E19","F19","G19","H19","I19","J19","K19","L19","A20","B20","C20","D20","E20","F20","G20","H20","I20","J20","K20","L20"];

var plains = new Biome("plains");
plains.randEvents = ["grave", "campsite", "hole", "jet"];
plains.squares = [];

var road = new Biome("road");
road.randEvents = ["widow", "oldMan", "manhole"];
road.squares = [];

var store = new Biome("store");
store.randEvents = [];
store.squares = ["I7", "J7", "I8", "J8"];

var warehouse = new Biome("warehouse");
warehouse.randEvents = [];
warehouse.squares = [];

var house = new Biome("house");
house.randEvents = [];
house.squares = ["L7","M7","L8","M8"];

var hospital = new Biome("hospital");
hospital.randEvents = [];
hospital.squares = [];

var river = new Biome("river");
river.randEvents = [];
river.squares = [];

var bridge = new Biome("bridge");
bridge.randEvents = [];
bridge.squares = [];

var desert = new Biome("desert");
desert.randEvents = ["oasis", "tired"];
desert.squares = [""];

var temple = new Biome("temple");
temple.randEvents = [];
temple.squares = ["Y1", "Z1", "Y2", "Z2"];

var beach = new Biome("beach");
beach.randEvents = [];
beach.squares = [];

var dock = new Biome("dock");
dock.randEvents = ["dockStore"];
dock.squares = ["Z14", "P19"];

var ocean = new Biome("ocean");
ocean.randEvents = ["sinking", "kraken"];
ocean.squares = ["V14","W14","X14","Z14","S15","T15","U15","V15","W15","X15","Y15","Z15","R16","S16","T16","U16","V16","W16","X16","Y16","Z16","Q17","R17","S17","T16","U17","V17","W17","X17","Y17","Z17","P18","Q18","R18","S18","T18","U18","V18","W18","X18","Y18","Z18","Q19","R19","S19","T19","U19","V19","W19","X19","Y19","Z19"];

var island = new Biome("island");
island.randEvents = [];
island.squares = [];


// ************************************
//             FUNCTIONS
// ************************************

//                TITLE SCREEN
function settingsMenu() {
    if(playerButtonsDisplayed === false) {
        document.querySelector("#playerButtons").style.display = "block";
        document.querySelector("#instructions").style.display = "none";
        instructionsDisplayed = false;
        playerButtonsDisplayed = true;
    } else if(playerButtonsDisplayed === true) {
        document.querySelector("#playerButtons").style.display = "none";
        playerButtonsDisplayed = false;
    }
}

function instructionsMenu() {
    if(instructionsDisplayed === false) {
        document.querySelector("#instructions").style.display = "block";
        document.querySelector("#playerButtons").style.display = "none";
        playerButtonsDisplayed = false;
        instructionsDisplayed = true;
    } else if(instructionsDisplayed === true) {
        document.querySelector("#instructions").style.display = "none";
        instructionsDisplayed = false;
    }
}

function changePlayerNum(zPlayerNum) {
    numberOfPlayers = zPlayerNum;
    playerButtonsDisplayed = true;
    settingsMenu();
}


 
//                 ACTUAL GAME

function playHandler() {
    for(var i = 1; i <= numberOfPlayers; i++) {
        players[i] = new Player(i);
    }
    
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#gameScreen").style.display = "block";
    document.querySelector("#title").style.fontSize = "20px";
    document.querySelector("#wordHeader").style.height = "50px";
    
    output.innerHTML = "Player 1";
    statsBar.innerHTML = "HP:" + players[activePlayer].health + " GOLD:" + players[activePlayer].money;
    
    setTimeout(squareInputHandler, 1500);
}

function squareInputHandler() {
    output.innerHTML = "What square are you on?";
    squareInput.style.display = "block";
    squareButton.style.display = "block";
    document.querySelector("#squareInput").style.display = "block";
}

function spaceHandler() {
    squareInput.style.display = "none";
    squareButton.style.display = "none";
    var squareValue = squareInput.value;
    //if(squareValue.length <= 3 && squareValue.length >= 2) {
        switch(squareValue) {
            case "desert":
                /*global desertEvent*/
                desertEvent();
                break;
            case "volcano":
                /*global volcanoEvent*/
                volcanoEvent();
                break;
            case "dock":
                /*global dockEvent*/
                dockEvent();
                break;
            case "ocean":
                /*global oceanEvent*/
                oceanEvent();
                break;
            case "forest":
                /*global forestEvent*/
                forestEvent();
                break;
            case "road":
                /*global roadEvent*/
                roadEvent();
                break;
            case "plains":
                /*global plainsEvent*/
                plainsEvent();
                break;
            case "ash":
                /*global ashenWastelandEvent*/
                ashenWastelandEvent();
                break;
            default:
                output.innerHTML = "What square are you on?<br>That is not a valid input";
                squareInput.style.display = "block";
                squareButton.style.display = "block";
                squareInput.value = "";
        }
    //}
    
    squareInput.value = "";
}

function nextPlayer() {
    activePlayer++;
    if(activePlayer === (numberOfPlayers + 1)) {
        activePlayer = 1;
    }
    
    inventoryButton.style.display = "none";
    nextPlayerButton.style.display = "none";
    
    output.innerHTML = "Player " + activePlayer;
    statsBar.innerHTML = "HP:" + players[activePlayer].health + " GOLD:" + players[activePlayer].money;
    
    if(players[activePlayer].loseTurn === false) {
        setTimeout(squareInputHandler, 1500);
    } else {
        output.innerHTML += "<br>Lose a Turn";
        players[activePlayer].loseTurn = false;
        nextPlayerButton.style.display = "block";
    }
    
}

function playerMenuDisplay() {
    if(players[activePlayer].health > 100) {
        players[activePlayer].health = 100;
    }
    
    //output.innerHTML += "<br> Current Health: " + players[activePlayer].health;
    statsBar.innerHTML = "HP:" + players[activePlayer].health + " GOLD:" + players[activePlayer].money;
    inventoryButton.style.display = "block";
    nextPlayerButton.style.display = "block";
    
    answerButton1.style.height = "75px";
    answerButton1.style.width = "175px";
    answerButton2.style.height = "75px";
    answerButton2.style.width = "175px";
    answerButton3.style.height = "75px";
    answerButton3.style.width = "175px";
    answerButton4.style.height = "75px";
    answerButton4.style.width = "175px";
}


//   OTHER FUNCTIONS

function randNum(zMin, zMax) {
    return Math.floor(Math.random() * ( zMax - zMin + 1) + zMin);
}

// ************************************
//              OBJECTS
// ************************************
function Player(zNum) {
    this.num = zNum;
    this.health = 100;
    this.money = 0;
    this.inventory = [];
    this.loseTurn = false;
    this.alive = true;
}

function Biome(zName) {
    this.name = zName;
    this.randEvents = [];
    this.squares = [];
}

function inventoryDisplay(){
    
}
//*****************************************
//                JQUERY
//*****************************************
/*
var invent = document.querySelector("#boxFullOfStuff");

$("#inventoryButton").click(function(){
   $("#boxFullOfStuff").toggle();
});
*/
