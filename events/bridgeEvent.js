/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global bridge*/

//         BRIDGE EVENTS

//  bridge.randEvents = ["knight"];

function bridgeEvent() {
    //output.innerHTML = "You listen to the river flowing as you walk across the bridge.";
    var eventNum = randNum(0, bridge.randEvents.length -1);
    switch(bridge.randEvents[eventNum]){
        case"tree":
            output.innerHTML = "You attempt to cross the bridge, but you find a dark figure in the middle of the bridge. He says “None shall pass.” You Have a feeling that you’ll need to fight this guy.";
            answerButton1.innerHTML = "Fight";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", fightKnight, false);
            answerButton2.innerHTML = "Try and run";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", runKnight, false);
            break;
    }
    
    playerMenuDisplay();
}

function fightKnight() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", fightKnight, false);
    answerButton2.removeEventListener("click", runKnight, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 35) {
        output.innerHTML = "You draw your sword, and he readies his, you go in for a low cut, but he counters and cuts you in the leg.<br>-25 HP";
        players[activePlayer].health -= 25;
    } else {
        output.innerHTML = 'You draw your sword and cut off his arm. You stand and bask in your victory, before walking heroically across the bridge.  You are enjoying the peace only to have the silence disturbed by the knight yelling “yellow bellied coward, we’ll call it a draw!”';
    }
    
}

function runKnight() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", fightKnight, false);
    answerButton2.removeEventListener("click", runKnight, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 75) {
        output.innerHTML = "You run past and the knight just watches you run by. You feel foolish.";
    } else {
        output.innerHTML = "You run past and the knight knicks you with his poisonous sword as you go by.<br>-2 HP for the next 3 turns.";
        players[activePlayer].health -= 2;
        players[activePlayer].hurtEvents.push("poisonousSword");
        players[activePlayer].hurtEventsTurnNum.push(3);
    }
    
}
