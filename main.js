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

//document.querySelector("#nextButton").addEventListener("click", nextHandler, false);
//document.querySelector("#inventoryButton").addEventListener("click", bagHandler, false);

var output = document.querySelector("#output");
var squareInput = document.querySelector("#squareInput");
var squareButton = document.querySelector("#squareButton");
var playGameOutputs = document.querySelector("#playGameOutputs");

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


var desert = new Biome("desert");
desert.randEvents = ["oasis", "tired"];
var volcano = new Biome("volcano");
volcano.randEvents = ["tunnel", "dragon"];
var ocean = new Biome("ocean");
ocean.randEvents = ["sinking", "kraken"];
var forest = new Biome("forest");
forest.randEvents = ["tree", "berry", "mushroom", "bandit"];
var plains = new Biome("plains");
plains.randEvents = ["grave", "campsite", "hole", "jet"];

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
                desertEvent();
                break;
            case "volcano":
                volcanoEvent();
                break;
            case "ocean":
                oceanEvent();
                break;
            case "forest":
                forestEvent();
                break;
            case "plains":
                plainsEvent();
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
    
    output.innerHTML += "<br> Current Health: " + players[activePlayer].health;
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

//            DESERT EVENTS

function desertEvent() {
    var eventNum = randNum(0, desert.randEvents.length - 1);
    switch(desert.randEvents[eventNum]) {
        case "oasis":
            output.innerHTML = "What appears to be an oasis looms in the distance";
            answerButton1.innerHTML = "Approach It";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", approachOasis, false);
            answerButton2.innerHTML = "Ignore and keep going on your path";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", ignoreOasis, false);
            break;
        case "tired":
            output.innerHTML = "You are tired and need to rest in the heat";
            answerButton1.innerHTML = "You sit on a nearby rock";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", restTired, false);
            answerButton2.innerHTML = "Keep Going";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", kMovingTired, false);
            break;
    }
}
function approachOasis() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", approachOasis, false);
    answerButton2.removeEventListener("click", ignoreOasis, false);
    var xNum = randNum(1, 100);
    if(xNum <= 30) {
        output.innerHTML = "You get water from the Oasis<br>+5 HP";
        players[activePlayer].health += 5;
        
    } else {
        output.innerHTML = "It is a mirage and you are dehydrated from your efforts<br>-5 HP";
        players[activePlayer].health -= 5;
    }
    
    playerMenuDisplay();
}

function ignoreOasis() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", approachOasis, false);
    answerButton2.removeEventListener("click", ignoreOasis, false);
    output.innerHTML = "You press on";
    
    playerMenuDisplay();
}

function restTired() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", restTired, false);
    answerButton2.removeEventListener("click", kMovingTired, false);
    var xNum = randNum(1, 100);
    if(xNum <= 10) {
        output.innerHTML = "A rattlesnake crawls out from under the rock and bites you.<br>-2 HP";
        players[activePlayer].health -= 2;
    } else {
        output.innerHTML = "You rest up<br>+2 HP";
        players[activePlayer].health += 2;
    }
    
    playerMenuDisplay();
}

function kMovingTired() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", restTired, false);
    answerButton2.removeEventListener("click", kMovingTired, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 20) {
        output.innerHTML = "You are dehydrated and pass out and wake up to find you got robbed by desert bandits<br>-5 HP";
        players[activePlayer].health -= 5;
    } else if(xNum > 20 && xNum <= 40) {
        output.innerHTML = "You are dehydrated and move slower<br>Only go 2 spaces during your next turn";
    } else {
        output.innerHTML = "You press on!";
    }
    
    playerMenuDisplay();
    
}



//        VOLCANO EVENTS

function volcanoEvent() {
    console.log("VOLCANO EVENT CALLED");
    var eventNum = randNum(0, volcano.randEvents.length - 1);
    switch(volcano.randEvents[eventNum]) {
        case "tunnel":
            output.innerHTML = "You approach a tunnel created by igneous rock. When peeking inside you see a shine glint from inside";
            answerButton1.innerHTML = "Enter the Tunnel";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", goInVolcano, false);
            answerButton2.innerHTML = "Keep Walking";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", keepWalkingVolcano, false);
            break;
        case "dragon":
            output.innerHTML = "The ground rumbles and the Lava Dragon emerges from the Lava Lake and flies towards you.";
            answerButton1.innerHTML = "Run as fast as you can!";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", runDragon, false);
            answerButton2.innerHTML = "Keep Walking";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", standGroundDragon, false);
            break;
    }
}

function goInVolcano() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", goInVolcano, false);
    answerButton2.removeEventListener("click", keepWalkingVolcano, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 34) {
        output.innerHTML = "You see a shiny chest in the distance! While trying to get to it, a Fire Bear attacks you.<br><combat>";
    } else if(xNum > 34 && xNum <= 67) {
        output.innerHTML = "You approach a shiny object and get burned in the process, only to find out the object was a useless spoon<br>-10 HP";
        players[activePlayer].health -= 10;
    } else {
        output.innerHTML = "You approach the shiny object to find a buried chest. You dig it up, and open it to find valuable loot";
    }
    
    playerMenuDisplay();
}

function keepWalkingVolcano() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", goInVolcano, false);
    answerButton2.removeEventListener("click", keepWalkingVolcano, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 50) {
        output.innerHTML = "You keep walking.";
    } else if(xNum >= 50 && xNum <= 70) {
        output.innerHTML = "As you walk past the tunnel, the ground collapses and you get your leg stuck in the ground<br>Lose Your Next Turn<br>-10 HP";
        players[activePlayer].health -= 10;
        players[activePlayer].loseTurn = true;
    } else {
        output.innerHTML = "nothing";
    }
    
    playerMenuDisplay();
}

function runDragon() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", runDragon, false);
    answerButton2.removeEventListener("click", standGroundDragon, false);
    
    // For now till complete
    output.innerHTML = "YOU RUN";
    
    /*
    var xNum = randNum(1, 100);
    if(xNum <= 34) {
        output.innerHTML = "";
    } else if(xNum > 34 && xNum <= 67) {
        output.innerHTML = "";
        players[activePlayer].health -= 10;
    } else {
        output.innerHTML = "";
    }
    */
    
    playerMenuDisplay();
    
}

function standGroundDragon() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", runDragon, false);
    answerButton2.removeEventListener("click", standGroundDragon, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 80) {
        output.innerHTML = "You swing  at the dragon's tail, your sword clinks harmlessly off and you pass out as you hit your head on the ground. When you wake up he is nowhere to be seen.<br>-30 HP";
        players[activePlayer].health -= 30;
    } else {
        output.innerHTML = "You make a deliberate strike, chopping the beast's tail clean off, it flies away in immense pain.";
    }
    
    playerMenuDisplay();
    
}



//          OCEAN EVENTS

function oceanEvent() {
    var eventNum = randNum(0, ocean.randEvents.length - 1);
    switch(ocean.randEvents[eventNum]) {
        case "sinking":
            output.innerHTML = "You see a box slowly sinking in the water";
            answerButton1.innerHTML = "Swim for it";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", swimSinking, false);
            answerButton2.innerHTML = "Leave it be";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", leaveSinking, false);
            break;
        case "kraken":
            output.innerHTML = "You see the terrifying Kraken of terror! What do you do?";
            answerButton1.innerHTML = "Ram it";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", ramKraken, false);
            answerButton2.innerHTML = "All hands on port bow, fire the cannons!";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", cannonKraken, false);
            answerButton3.innerHTML = "Leap from the boat and stab it in the eye.";
            answerButton3.style.display = "block";
            answerButton3.addEventListener("click", stabKraken, false);
            answerButton4.innerHTML = "Flee!";
            answerButton4.style.display = "block";
            answerButton4.addEventListener("click", fleeKraken, false);
            
            answerButton1.style.height = "50px";
            answerButton1.style.width = "250px";
            answerButton2.style.height = "50px";
            answerButton2.style.width = "250px";
            answerButton3.style.height = "50px";
            answerButton3.style.width = "250px";
            answerButton4.style.height = "50px";
            answerButton4.style.width = "250px";
            break;
    }
}

function swimSinking() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", swimSinking, false);
    answerButton2.removeEventListener("click", leaveSinking, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 40) {
        output.innerHTML = "Your ship bounces off harmlessly before the Kraken smashes your ship with one mighty swing, you manage to hold onto a door to the shore.<br>Move to dock square.<br>-13 HP";
        players[activePlayer].health -= 13;
    } else if(xNum > 40 && xNum <= 70) {
        output.innerHTML = "";
        
    } else {
        
    }
    
    playerMenuDisplay();
}

function leaveSinking() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", swimSinking, false);
    answerButton2.removeEventListener("click", leaveSinking, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 20) {
        
    }
    
    playerMenuDisplay();
}

function ramKraken() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton4.style.display = "none";
    answerButton1.removeEventListener("click", ramKraken, false);
    answerButton2.removeEventListener("click", cannonKraken, false);
    answerButton3.removeEventListener("click", stabKraken, false);
    answerButton4.removeEventListener("click", fleeKraken, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 20) {
        output.innerHTML = "Your volley bounces off harmlessly before the irritated Kraken smashes your ship with one mighty swing, you manage to hold onto a door to the shore.<br>Move to dock square.<br>-25 HP";
        players[activePlayer].health -= 25;
    } else if(xNum >= 20 && xNum <= 60) {
        output.innerHTML = "You fire a volley into  beast, the cannon tearing into the flesh. It lashes out in pain destroying your ship before collapsing.  You take the eye as a trophy as your ship slowly sinks.<br>Move to dock square.<br>-25 HP<br>Gain Eye of Kracken.";
        players[activePlayer].health -= 25;
    } else {
        output.innerHTML = "You ram your ship into the beast, driving the bowsprit into the flesh, straight through its heart. It collapses silently. You solemnly take its eye as a trophy.<br>Gain Eye of Kraken.";
    }
    
    playerMenuDisplay();
    
}

function cannonKraken() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton4.style.display = "none";
    answerButton1.removeEventListener("click", ramKraken, false);
    answerButton2.removeEventListener("click", cannonKraken, false);
    answerButton3.removeEventListener("click", stabKraken, false);
    answerButton4.removeEventListener("click", fleeKraken, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 20) {
        output.innerHTML = "Your volley bounces off harmlessly before the irritated Kraken smashes your ship with one mighty swing, you manage to hold onto a door to the shore.<br>Move to dock square.<br>-25 HP";
        players[activePlayer].health -= 25;
    } else if(xNum > 20 && xNum <= 60) {
        output.innerHTML = "You fire a volley into  beast, the cannon tearing into the flesh. It lashes out in pain destroying your ship before collapsing.  You take the eye as a trophy as your ship slowly sinks.<br>Move to dock square.<br>-25 HP<br>Gain Eye of Kracken.";
        players[activePlayer].health -= 25;
    } else {
        output.innerHTML = "You ram your ship into the beast, driving the bowsprit into the flesh, straight through its heart. It collapses silently. You solemnly take its eye as a trophy.<br>Gain Eye of Kraken.";
    }
    
    playerMenuDisplay();
}

function stabKraken() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton4.style.display = "none";
    answerButton1.removeEventListener("click", ramKraken, false);
    answerButton2.removeEventListener("click", cannonKraken, false);
    answerButton3.removeEventListener("click", stabKraken, false);
    answerButton4.removeEventListener("click", fleeKraken, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 50) {
        output.innerHTML = "As you leap from your boat yelling, you feel a sharp pain in your back as you are accelerated towards the water. You blackout as you body connects with the frigid water, after some time you wake up on your ship safely at the dock..<br>Lose a turn<br>-25 HP";
        players[activePlayer].health -= 25;
        players[activePlayer].loseTurn = true;
    } else if(xNum > 50 && xNum <= 80) {
        output.innerHTML = "As you leap from your boat yelling, you feel a sharp pain in your back as you are accelerated towards your boat, it is utterly destroyed. You blackout as you crash through the floor and wake up on a piece of debris on the beach.<br>Lose a turn.";
        players[activePlayer].loseTurn = true;
        //go to random beach square
    } else {
        output.innerHTML = "You leap through the air, you deftly manage to slice through an incoming tentacle. Before Grasping the creatures slimy flesh and moving in. You heave your arm back before thrusting your weapon into its eye. The foul beast screams as you leap back with your new trophy. You land on your ship.";
    }
    
    playerMenuDisplay();
    
}

function fleeKraken() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton4.style.display = "none";
    answerButton1.removeEventListener("click", ramKraken, false);
    answerButton2.removeEventListener("click", cannonKraken, false);
    answerButton3.removeEventListener("click", stabKraken, false);
    answerButton4.removeEventListener("click", fleeKraken, false);
    
    // Might change later
    output.innerHTML = "You sail away as fast as you can.";
    
    playerMenuDisplay();
    
}



//         FOREST EVENTS

function forestEvent() {
    var eventNum = randNum(0, forest.randEvents.length -1);
    switch(forest.randEvents[eventNum]){
        case"tree":
            output.innerHTML = " You see a tree fall  in the distance.";
            answerButton1.innerHtml = "Investigate";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", investigateTree, false);
            answerButton2.innerHTML = "Run away!";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", ignoreTree, false);
            break;
        case "berry":
            output.innerHTML = "You are walking and you find some berries. Could be poisonous but they look good.";
            answerButton1.innerHTML = "Eat them you're starving!";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", deadlyBerry, false);
            answerButton2.innerHTML = "Don't want to risk it";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", smartChoiceBerry, false);
            break;
        case "mushroom":
            output.innerHTML = "You find some mushrooms growing in the ground that looks tasty.";
            answerButton1.innerHTML = "Eat the mushrooms";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", yummyMushroom, false);
            answerButton2.innerHTML = "Don't eat the mushrooms";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click",noMushroom, false);
            break;
        case "bandit":
            output.innerHTML = "You see a bandit hiding in a tree, they haven't noticed you yet";
            answerButton1.innerHTML = "You try to get the jump on the scoundrel";
            answerButton1.style.display = "block";
            answerButton1.addEventListner("click", attackBandit, false);
            answerButton2.innerHTML = "Don't do it";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", passiveBandit, false);
            break;
    }
}

function investigateTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", investigateTree, false);
    answerButton2.removeEventListener("click", ignoreTree, false);
    
    output.innerHTML = "It's a fallen tree, a tree person!";
    
    answerButton1.innerHTML = "Attack the creature";
    answerButton1.style.display = "block";
    answerButton1.addEventListener("click", attackTree, false);
    answerButton2.innerHTML = "Run away!";
    answerButton2.style.display = "block";
    answerButton2.addEventListener("click", runAwayTree, false);
    
    
    playerMenuDisplay();
}

function attackTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", attackTree, false);
    answerButton2.removeEventListener("click", runAwayTree, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 60) {
        output.innerHTML = "The bark is tough, you on the other hand are rahter squishy<br>-4 HP";
        players[activePlayer].health -= 4;
    } else {
        output.innerHTML = "The bark is tough, but your strength was overwhelming! The sap is revitalizing.<br>+8 HP<br>You gain the Tree Branch of General Irritation";
        players[activePlayer].health += 8;
        players[activePlayer].inventory.push("Tree Branch of General Irritation");
    }
    
    playerMenuDisplay();
    
}

function runAwayTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", attackTree, false);
    answerButton2.removeEventListener("click", runAwayTree, false);
    
    output.innerHTML = "You run away screaming";
    
    playerMenuDisplay();
    
}

function ignoreTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", investigateTree, false);
    answerButton2.removeEventListener("click", ignoreTree, false);
    
    output.innerHTML = "You ignore it and keep going";
    
    playerMenuDisplay();
}


function deadlyBerry(){
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", deadlyBerry, false);
    answerButton2.style.display = "none";
    answerButton2.removeEventListener("click", smartChoiceBerry, false);
    var xNum = randNum(1,100);
    if(xNum <= 50){
       output.innerHTML = "You don't feel so good";
       players[activePlayer].health -= 10;
    }
    else if(xNum > 50 && <= 90){
        output.innerHTML = "Delicious and nutritious";
        players[activePlayer].health += 15;   
        }
    else{
        output.innerHTML = "The berries are berry powerful";
        players[activePlayer].health += 10;
        //need to add +2 moving for next 2 turns
    }
    playerMenuDisplay();
}

function smartChoiceBerry(){
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", deadlyBerry, false);
    answerButton2.style.display = "none";
    answerButton2.removeEventListener("click", smartChoiceBerry, false);
    var xNum = randNum(1,100);
    
    
    playerMenuDisplay();
    
}

function yummyMushroom(){
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", yummyMushroom, false);
    answerButton2.removeEventListener("click", noMushroom, false);
    
    var xNum = randNum(1,100);
    if(xNum <= 50) {
        output.innerHTML = "Yummy mushrooms<br>+10 HP";
        players[activePlayer].health += 10;
    } else if(xNum > 50 && <= 65) {
        output.innerHTML = "Your eyelids are getting heavy, you'll just rest rest your eyes for a moment...<br>+20 HP<br>lose a turn";
        players[activePlayer].health += 20;
        players[activePlayer].loseTurn = true;
    } else if(xNum > 65 && <= 85) {
        output.innerHTML = "Ohh, you don't feel so well...<br>-4 HP";
        players[activePlayer].health -= 4;
    } else {
        output.innerHTML = "You begin seeing colors you've never seen befor<br>-6 HP<br>lose a turn";
        players[activePlayer].health -= 6;
        players[activePlayer].loseTurn = true;
    }
    
    playerMenuDisplay();
}

function noMushroom(){
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", yummyMushroom, false);
    answerButton2.removeEventListener("click", noMushroom, false);
    
    var xNum = randNum(1,100);
    
    
    playerMenuDisplay();
}

function attackBandit(){
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", attackBandit, false);
    answerButton2.style.display = "none";
    answerButton2.removeEventListener("click", passiveBandit, false);
    
    var xNum = randNum(1,100);
    
    playerMenuDisplay();
}

function passiveBandit(){
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", attackBandit, false);
    answerButton2.style.display = "none";
    answerButton2.removeEventListener("click", passiveBandit, false);
    
    
    var xNum = randNum(1,100);
    
    
    playerMenuDisplay();
}






//         PLAINS EVENTS

//  plains.randEvents = ["grave", "campsite", "hole", "jet"];

function plainsEvent() {
    var eventNum = randNum(0, plains.randEvents.length - 1);
    switch(plains.randEvents[eventNum]) {
        case "grave":
            output.innerHTML = "While exploring the plains you find an unmarked grave.";
            answerButton1.innerHTML = "Dig it up<br>he could have something interesting.";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", digGrave, false);
            answerButton2.innerHTML = "You pay your respects, place a pebble on the grave.";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", pebbleGrave, false);
            answerButton3.innerHTML = "Move on it's getting late and plains suck.";
            answerButton3.style.display = "block";
            answerButton3.addEventListener("click", moveOnGrave, false);
            break;
        case "campsite":
            output.innerHTML = 'You walk by a campsite with a cardboard sign that reads "keep out, booby traps", but you see nobody.';
            answerButton1.innerHTML = "Enter camp there could be food.";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", enterCamp, false);
            answerButton2.innerHTML = "Leave it alone. it's not mine.";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", leaveCamp, false);
            break;
        case "hole":
            output.innerHTML = "You see a hole in the ground and chipmunks going in and out";
            answerButton1.innerHTML = "Try to get the chipmunks stick your hand in the hole";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", handHole, false);
            answerButton2.innerHTML = "Don't do anything";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", nothingHole, false);
            break;
        case "jet":
            output.innerHTML = "You see a jumbo jet flying at altitude.";
            answerButton1.innerHTML = "Try to signal it";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", signalJet, false);
            answerButton2.innerHTML = "It's pointless";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", pointlessJet, false);
            break;
    }
}

function digGrave() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", digGrave, false);
    answerButton2.removeEventListener("click", pebbleGrave, false);
    answerButton3.removeEventListener("click", moveOnGrave, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 50) {
        output.innerHTML = "you dig up the guy. He's messed up pretty bad. You don't find any weapons.";
    } else if(xNum > 50 && xNum <= 99) {
        output.innerHTML = "You pull a muscle digging him up<br>-2 HP";
        players[activePlayer].health -= 2;
    } else {
        output.innerHTML = "His Hand grasps a single golden goblet.<br>You gain a golden goblet."
        //ADD TO THEIR INVENTORY LATER
    }
    
    playerMenuDisplay();
    
}

function pebbleGrave() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", digGrave, false);
    answerButton2.removeEventListener("click", pebbleGrave, false);
    answerButton3.removeEventListener("click", moveOnGrave, false);
    
    output.innerHTML = "You feel good about the deed<br>+1 HP";
    
    playerMenuDisplay();
    
}

function moveOnGrave() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", digGrave, false);
    answerButton2.removeEventListener("click", pebbleGrave, false);
    answerButton3.removeEventListener("click", moveOnGrave, false);
    
    output.innerHTML = "You keep moving";
    
    playerMenuDisplay();
    
}


function enterCamp() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", enterCamp, false);
    answerButton2.removeEventListener("click", leaveCamp, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 30) {
        output.innerHTML = "Find food<br>+5 HP";
        players[activePlayer].health += 5;
    } else if(xNum > 30 && xNum <= 80) {
        output.innerHTML = "Find nothing";
    } else {
        output.innerHTML = "Set off an old bear trap.<br>-10 HP";
        players[activePlayer].health -= 10;
    }
    
    playerMenuDisplay();
    
}

function leaveCamp() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", enterCamp, false);
    answerButton2.removeEventListener("click", leaveCamp, false);
    
    output.innerHTML = "You leave the camp alone";
    
    playerMenuDisplay();
    
}


function handHole() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", handHole, false);
    answerButton2.removeEventListener("click", nothingHole, false);
    
    var xNum = randNum(1, 100);
    if(xNum <=30) {
        output.innerHTML = "You spend hours doing this and get nothing";
    } else if(xNum > 30 && xNum <= 70) {
        output.innerHTML = "You grab the chipmunk, cook it, and eat it";
        // MIGHT ADD HP
    } else if(xNum > 70 && xNum <= 90) {
        output.innerHTML = "The chipmunk bites you<br>-5 HP";
        players[activePlayer].health -= 5;
    } else {
        output.innerHTML = "You hear the hissing but it's too late you get bitten by a snake<br>-15 HP";
        players[activePlayer].health -= 15;
    }
    
    playerMenuDisplay();
    
}

function nothingHole() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", handHole, false);
    answerButton2.removeEventListener("click", nothingHole, false);
    
    output.innerHTML = "You walk right past the hole";
    
    playerMenuDisplay();
    
}


function signalJet() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", signalJet, false);
    answerButton2.removeEventListener("click", pointlessJet, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 10) {
        output.innerHTML = "You wave your hands jumping up and down, but you pull a muscle<br>-1 HP";
        players[activePlayer].health -= 1;
    } else {
        output.innerHTML = "You wave your hands jumping up and down like a baboo";
        // Might add something
    }
    
    playerMenuDisplay();
    
}

function pointlessJet() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", signalJet, false);
    answerButton2.removeEventListener("click", pointlessJet, false);
    
    output.innerHTML = "You watch as the plane flies by";
    
    playerMenuDisplay();
    
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
    this.inventory = [];
    this.loseTurn = false;
    this.alive = true;
}

function Biome(zName) {
    this.name = zName;
    this.randEvents = [];
    this.squares = [];
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
