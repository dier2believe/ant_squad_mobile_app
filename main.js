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
var deadPlayers = 0;
var players = [];


var volcano = new Biome("volcano");
volcano.randEvents = ["tunnel", "dragon"];
volcano.squares = ["C1", "D1", "E1", "F1", "G1", "H1", "C2", "D2", "E2", "F2", "G2", "H2", "A3", "B3", "C3", "D3", "E3", "F3", "G3", "A4", "B4", "C4", "D4", "E4", "F4", "A5", "B5", "C5", "D5", "E5", "A6", "B6", "C6", "D6", "A7", "B7", "C7"];
// volcano squares checked

var lava = new Biome("lava");
lava.randEvents = ["monster"/*,"drake"*/];
lava.squares = ["A1", "B1", "A2", "B2", "B8", "A9", "B9", "C9", "A10", "B10", "C10"];
// lava squares checked

var ashenWasteland = new Biome("ashenWasteland");
ashenWasteland.randEvents = ["figure","ashHopper", "ashMan"];
ashenWasteland.squares = ["I1", "J1", "K1", "L1", "I2", "J2", "K2", "L2", "H3", "I3", "J3", "K3", "L3", "M3", "G4", "H4", "F5", "G5", "E6", "F6", "D7", "E7", "A8", "C8", "D8", "D9", "D10", "D11"];
// ashenWasteland squares checked

var cemetary = new Biome("cemetary");
cemetary.randEvents = ["skeleton", "zombie", "wraith", "necromancer"];
cemetary.squares = ["A11", "B11", "C11", "A12", "B12", "C12", "A13", "B13", "C13"];
// cemetary squares checked

var forest = new Biome("forest");
forest.randEvents = ["tree", "berry", "mushroom", "paladin"/*,"fieldDoctor"*/];
forest.squares = ["D12", "E12", "D13", "E13", "F13", "A14", "B14", "C14", "D14", "E14", "F14", "G14", "A15", "B15", "C15", "D15", "E15", "F15", "G15", "H15", "I15", "A16", "B16", "C16", "D16", "E16", "F16", "G16", "H16", "I16", "J16", "A17", "B17", "C17", "D17", "E17", "F17", "G17", "H17", "I17", "J17", "K17", "A18", "B18", "C18", "D18", "E18", "F18", "G18", "H18", "I18", "J18", "K18", "L18", "A19", "B19", "C19", "D19", "E19", "F19", "G19", "H19", "I19", "J19", "K19", "L19", "A20", "B20", "C20", "D20", "E20", "F20", "G20", "H20", "I20", "J20", "K20", "L20"];
// forest squares fixed

var plains = new Biome("plains");
plains.randEvents = ["grave", "campsite", "hole", "jet", "direWolf"];
plains.squares = ["I4", "J4", "K4", "L4", "M4", "H5", "I5", "J5", "K5", "L5", "M5", "N5", "O5", "G6", "O6", "F7", "G7", "O7", "P7", "E8", "F8", "G8", "O8", "P8", "Q8", "R8", "E9", "F9", "G9", "O9", "P9", "Q9", "R9", "E10", "F10", "G10", "O10", "P10", "Q10", "R10", "S10", "E11", "F11", "G11", "O11", "P11", "Q11", "F12", "G12", "O12", "P12", "G13", "H13", "I13", "J13", "K13", "L13", "M13", "N13", "O13", "H14", "I14", "J14", "K14", "L14", "M14", "N14", "J15", "K15", "L15", "M15", "K16", "L16", "M16", "L17"];
// plains squares checked

var road = new Biome("road");
road.randEvents = ["widow", "oldMan", "manhole"];
road.squares = ["H6", "I6", "J6", "K6", "L6", "M6", "N6", "H7", "K7", "N7", "H8", "K8", "N8", "H9", "I9", "J9", "K9", "L9", "M9", "N9", "H10", "K10", "N10", "H11", "K11", "N11", "H12", "I12", "J12", "K12", "L12", "M12", "N12"];
// road squares

var river = new Biome("river");
river.randEvents = [/*"fisherman"*/];
river.squares = ["M1", "M2", "N2", "N3", "N4", "O4", "P4", "P6", "Q6", "Q7", "R7", "S7", "S8", "S9", "T9", "T10", "T12", "T13"];
// river squares fixed

var bridge = new Biome("bridge");
bridge.randEvents = ["knight"];
bridge.squares = ["P5", "T11"];
// bridge square checked

var desert = new Biome("desert");
desert.randEvents = ["oasis", "tired"/*, "desertRaider"*/];
desert.squares = ["N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "O2", "P2", "Q2", "R2", "S2", "T2", "U2", "V2", "W2", "X2", "O3", "P3", "Q3", "R3", "S3", "T3", "U3", "V3", "W3", "X3", "Y3", "Z3", "Q4", "R4", "S4", "T4", "U4", "V4", "W4", "X4", "Y4", "Z4", "Q5", "R5", "S5", "T5", "U5", "V5", "W5", "X5", "Y5", "Z5", "R6", "S6", "T6", "U6", "V6", "W6", "X6", "Y6", "Z6", "T7", "U7", "V7", "W7", "X7", "Y7", "Z7", "T8", "U8", "V8", "W8", "X8", "Y8", "Z8", "U9", "V9", "W9", "X9", "Y9", "Z9", "U10", "V10", "W10", "X10", "Y10", "Z10"];
// desert squares checked

var beach = new Biome("beach");
beach.randEvents = [/*"scorpion"*/];
beach.squares = ["R11", "S11", "U11", "V11", "W11", "X11", "Y11", "Z11", "Q12", "R12", "S12", "U12", "V12", "W12", "X12", "Y12", "Z12", "P13", "Q13", "R13", "S13", "U13", "O14", "P14", "Q14", "R14", "N15", "O15", "P15", "Q15", "N16", "O16", "P16", "Q16", "M17", "N17", "O17", "P17", "M18", "N18", "O18", "M19", "N19", "O19", "M20", "N20", "O20"];
// beach squares checked

var dock = new Biome("dock");
dock.randEvents = ["dockStore"];
dock.squares = ["Y13", "P19"];
// dock squares fixed

var ocean = new Biome("ocean");
ocean.randEvents = ["sinking", "kraken"];
ocean.squares = ["V13", "W13", "X13", "Z13", "S14", "T14", "U14", "V14", "W14", "X14", "Y14", "Z14", "R15", "S15", "T15", "U15", "V15", "W15", "X15", "Y15", "Z15","R16", "S16", "T16", "U16", "V16", "W16", "X16", "Y16", "Z16", "Q17", "R17", "S17", "T16", "U17", "V17", "W17", "X17", "Y17", "Z17", "P18", "Q18", "R18", "S18", "T18", "U18", "V18", "W18", "Z18", "Q19", "R19", "S19", "T19", "U19", "V19", "W19", "Z19", "P20", "Q20", "R20", "S20", "T20", "U20", "V20", "W20", "X20", "Y20", "Z20"];
// ocean squares checked

var island = new Biome("island");
island.randEvents = ["medusa"];
island.squares = ["X18", "Y18", "X19", "X19"];
// island squares fixed


// BUILDINGS

var store = new Biome("store");
store.randEvents = [];
store.squares = ["I7", "J7", "I8", "J8"];

var house = new Biome("house");
house.randEvents = [];
house.squares = ["L7","M7","L8","M8"];

var hospital = new Biome("hospital");
hospital.randEvents = [];
hospital.squares = ["M10", "N10", "M11", "N11"];

var warehouse = new Biome("warehouse");
warehouse.randEvents = [];
warehouse.squares = ["I10", "J10", "I11", "J11"];


// DUNGEONS

var temple = new Dungeon("temple", 2);
temple.squares = ["Y1", "Z1", "Y2", "Z2"];
temple.loot = [];


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
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", squareInputHandler, false);
    
    output.innerHTML = "What square are you on?";
    if(players[activePlayer].triedToSwim === true) {
        players[activePlayer].triedToSwim = false;
        output.innerHTML += "<br>You have to go through a dock first";
    }
    squareInput.style.display = "block";
    squareButton.style.display = "block";
    document.querySelector("#squareInput").style.display = "block";
}

function spaceHandler() {
    squareInput.style.display = "none";
    squareButton.style.display = "none";
    var squareValue = squareInput.value.toUpperCase();
    
    /*  volcano, lava, ashenWasteland, cemetary, forest, 
        plains, road, store, warehouse, house, hospital, river, 
        bridge, desert, temple, beach, dock, ocean, island  */
    
    
    //  events
    if(players[activePlayer].beenThroughDock === true) {
        if(ocean.squares.indexOf(squareValue) != -1) {
            if(players[activePlayer].beenThroughDock === true) {
                /*global oceanEvent*/
                oceanEvent();
            } else {
                players[activePlayer].triedToSwim = true;
                squareInputHandler();
            }
        } else if(island.squares.indexOf(squareValue) != -1) {
            /*global islandEvent*/
            islandEvent();
        } else if(dock.squares.indexOf(squareValue) != -1) {
            /*global dockEvent*/
            dockEvent();
        } else {
            output.innerHTML = "You have to park your boat first.";
            squareInput.style.display = "block";
            squareButton.style.display = "block";
            squareInput.value = "";
        }
    } else {
        if(volcano.squares.indexOf(squareValue) != -1) {
            /*global volcanoEvent*/
            volcanoEvent();
        } else if(lava.squares.indexOf(squareValue) != -1) {
            /*global lavaEvent*/
            lavaEvent();
        } else if(ashenWasteland.squares.indexOf(squareValue) != -1) {
            /*global ashenWastelandEvent*/
            ashenWastelandEvent();
        } else if(cemetary.squares.indexOf(squareValue) != -1) {
            /*global cemetaryEvent*/
            cemetaryEvent();
        } else if(forest.squares.indexOf(squareValue) != -1) {
            /*global forestEvent*/
            forestEvent();
        } else if(plains.squares.indexOf(squareValue) != -1) {
            /*global plainsEvent*/
            plainsEvent();
        } else if(road.squares.indexOf(squareValue) != -1) {
            /*global roadEvent*/
            roadEvent();
        } else if(river.squares.indexOf(squareValue) != -1) {
            /*global riverEvent*/
            riverEvent();
        } else if(bridge.squares.indexOf(squareValue) != -1) {
            /*global bridgeEvent*/
            bridgeEvent();
        } else if(desert.squares.indexOf(squareValue) != -1) {
            /*global desertEvent*/
            desertEvent();
        } else if(beach.squares.indexOf(squareValue) != -1) {
            /*global beachEvent*/
            beachEvent();
        } else if(dock.squares.indexOf(squareValue) != -1) {
            /*global dockEvent*/
            dockEvent();
        } else if(ocean.squares.indexOf(squareValue) != -1) {
            if(players[activePlayer].beenThroughDock === true) {
                /*global oceanEvent*/
                oceanEvent();
            } else {
                players[activePlayer].triedToSwim = true;
                squareInputHandler();
            }
        } else if(island.squares.indexOf(squareValue) != -1) {
            if(players[activePlayer].beenThroughDock === true) {
                /*global islandEvent*/
                islandEvent();
            } else {
                players[activePlayer].triedToSwim = true;
                squareInputHandler();
            }
        }
        
        //  buildings
        else if(store.squares.indexOf(squareValue) != -1) {
            /*global storeBuilding*/
            storeBuilding();
        } else if(warehouse.squares.indexOf(squareValue) != -1) {
            /*global warehouseBuilding*/
            warehouseBuilding();
        } else if(house.squares.indexOf(squareValue) != -1) {
            /*global houseBuilding*/
            houseBuilding();
        } else if(hospital.squares.indexOf(squareValue) != -1) {
            /*global hospitalBuilding*/
            hospitalBuilding();
        }
        
        //  dungeons
        else if(temple.squares.indexOf(squareValue) != -1) {
            /*global templeDungeon*/
            templeDungeon();
        }
        
        else {
            output.innerHTML = "What square are you on?<br>That is not a valid input";
            squareInput.style.display = "block";
            squareButton.style.display = "block";
            squareInput.value = "";
        }
    }
        
    
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
    
    if(players[activePlayer].alive === true) {
        
        if(players[activePlayer].inDungeon === false) {
            
            if(players[activePlayer].loseTurn === false) {
                setTimeout(squareInputHandler, 1500);
            } else {
                output.innerHTML += "<br>Lose a Turn";
                players[activePlayer].loseTurn = false;
                nextPlayerButton.style.display = "block";
            }
            
        } else {
            setTimeout(dungeonContinueHandler, 1500);
        }
        
    } else {
        output.innerHTML += "<br>You are dead.";
        nextPlayerButton.style.display = "block";
    }
    
}

function playerMenuDisplay() {
    if(players[activePlayer].health > 100) {
        players[activePlayer].health = 100;
    }
    
    //  HURT EVENTS
    
    if(players[activePlayer].hurtEvents.length != 0) {
        
        if(players[activePlayer].hurtEvents.indexOf("snakeBite") != -1) {
            var snakeBiteNum = players[activePlayer].hurtEvents.indexOf("snakeBite");
            
            if(players[activePlayer].hurtEventsTurnNum[snakeBiteNum] != 3){
                output.innerHTML += "<br>-2 HP from snake bite";
                players[activePlayer].health -= 2;
            }
            
            players[activePlayer].hurtEventsTurnNum[snakeBiteNum] -= 1;
            
            if(players[activePlayer].hurtEventsTurnNum[snakeBiteNum] === 0) {
                players[activePlayer].hurtEvents.splice(snakeBiteNum, 1);
                players[activePlayer].hurtEventsTurnNum.splice(snakeBiteNum, 1);
            }
            
        }
        
        if(players[activePlayer].hurtEvents.indexOf("beingWatched") != -1) {
            var beingWatchedNum = players[activePlayer].hurtEvents.indexOf("beingWatched");
            
            if(players[activePlayer].hurtEventsTurnNum[beingWatchedNum] != 3) {
                output.innerHTML += "<br>-2 HP from being watched";
                players[activePlayer].health -= 2;
            } else {
                players[activePlayer].hurtEventsTurnNum[beingWatchedNum] -= 1;
            }
            
            if(players[activePlayer].hurtEventsTurnNum[beingWatchedNum] === 0) {
                players[activePlayer].hurtEvents.splice(beingWatchedNum, 1);
                players[activePlayer].hurtEventsTurnNum.splice(beingWatchedNum, 1);
            }
            
        }
        
        if(players[activePlayer].hurtEvents.indexOf("immensePresence") != -1) {
            var immensePresenceNum = players[activePlayer].hurtEvents.indexOf("immensePresence");
            
            if(players[activePlayer].hurtEventsTurnNum[immensePresenceNum] != 3) {
                output.innerHTML += "<br>-2 HP from being watched";
                players[activePlayer].health -= 4;
            } else {
                players[activePlayer].hurtEventsTurnNum[immensePresenceNum] -= 1;
            }
            
            if(players[activePlayer].hurtEventsTurnNum[immensePresenceNum] === 0) {
                players[activePlayer].hurtEvents.splice(immensePresenceNum, 1);
                players[activePlayer].hurtEventsTurnNum.splice(immensePresenceNum, 1);
            }
            
        }
        
        if(players[activePlayer].hurtEvents.indexOf("shakeWatched") != -1) {
            var shakeWatchedNum = players[activePlayer].hurtEvents.indexOf("shakeWatched");
            
            if(players[activePlayer].hurtEventsTurnNum[shakeWatchedNum] != 3) {
                output.innerHTML += "<br>-2 HP from being watched";
                players[activePlayer].health -= 2;
            } else {
                players[activePlayer].hurtEventsTurnNum[shakeWatchedNum] -= 1;
            }
            
            if(players[activePlayer].hurtEventsTurnNum[shakeWatchedNum] === 0) {
                players[activePlayer].hurtEvents.splice(shakeWatchedNum, 1);
                players[activePlayer].hurtEventsTurnNum.splice(shakeWatchedNum, 1);
            }
            
        }
        
        if(players[activePlayer].hurtEvents.indexOf("poisonousSword") != -1) {
            var poisonousSwordNum = players[activePlayer].hurtEvents.indexOf("poisonousSword");
            
            if(players[activePlayer].hurtEventsTurnNum[poisonousSwordNum] != 3) {
                output.innerHTML += "<br>-2 HP from being watched";
                players[activePlayer].health -= 2;
            } else {
                players[activePlayer].hurtEventsTurnNum[poisonousSwordNum] -= 1;
            }
            
            if(players[activePlayer].hurtEventsTurnNum[poisonousSwordNum] === 0) {
                players[activePlayer].hurtEvents.splice(poisonousSwordNum, 1);
                players[activePlayer].hurtEventsTurnNum.splice(poisonousSwordNum, 1);
            }
            
        }
        
    }
    
    //output.innerHTML += "<br> Current Health: " + players[activePlayer].health;
    statsBar.innerHTML = "HP:" + players[activePlayer].health + " GOLD:" + players[activePlayer].money;
    nextPlayerButton.style.display = "block";
    
    if(players[activePlayer].health <= 0 && players[activePlayer].alive === true) {
        players[activePlayer].alive = false;
        output.innerHTML += "<br>You died.";
        deadPlayers++;
        checkForGameOver();
    } else if(players[activePlayer].alive === true) {
        inventoryButton.style.display = "block";
    }
    
    answerButton1.style.height = "75px";
    answerButton1.style.width = "175px";
    answerButton2.style.height = "75px";
    answerButton2.style.width = "175px";
    answerButton3.style.height = "75px";
    answerButton3.style.width = "175px";
    answerButton4.style.height = "75px";
    answerButton4.style.width = "175px";
}

function dungeonContinueHandler() {
    switch(players[activePlayer].dungeonName) {
        case "temple":
            /*global templeDungeonContinue*/
            templeDungeonContinue();
            break;
    }
    
}

function checkForGameOver() {
    if(activePlayer === deadPlayers) {
        output.innerHTML += "<br><br>Everyone died!";
        nextPlayerButton.style.display = "none";
        statsBar.innerHTML = "GAME OVER!";
    }
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
    
    this.beenInOcean = false;
    this.parkedAtDock = true;
    this.beenThroughDock = false;
    
    this.loseTurn = false;
    this.alive = true;
    
    this.inventory = [];
    this.quests = [];
    
    this.hurtEvents = [];
    this.hurtEventsTurnNum = [];
    
    this.inDungeon = false;
    this.dungeonName = "";
    this.dungeonStage = 1;
}

function Biome(zName) {
    this.name = zName;
    this.randEvents = [];
    this.squares = [];
}

function Dungeon(zName, zStagesNum) {
    this.name = zName;
    this.stagesNum = zStagesNum;
    this.loot = [];
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
