/*global answerButton1*/
/*global answerButton2*/
/*global answerButton3*/
/*global answerButton4*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global ocean*/

//          OCEAN EVENTS

//  ocean.randEvents = ["sinking", "kraken"];

function oceanEvent() {
    players[activePlayer].beenInOcean = true;
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
    if(xNum <= 33) {
        output.innerHTML = "You were dry and warm with no box, now you're cold and wet with an empty box<br>-3 HP";
        players[activePlayer].health -= 3;
    } else if(xNum > 33 && xNum <= 66) {
        output.innerHTML = "You're cold, but you found some treasure!<br>-2 HP<br>+10 Gold";
        players[activePlayer].health -= 2;
        players[activePlayer].money += 10;
    } else {
        output.innerHTML = "It's locked with a combination lock and the material is stronger than your weapons. Maybe someone in town will know";
    }
    
    playerMenuDisplay();
}

function leaveSinking() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", swimSinking, false);
    answerButton2.removeEventListener("click", leaveSinking, false);
    
    output.innerHTML = "Leave it be. That water is rather cold, and those waves look rather high.";
    
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
    
    var questNum = players[activePlayer].quests.indexOf("defKraken");
    
    var xNum = randNum(1, 100);
    if(xNum <= 20) {
        output.innerHTML = "Your volley bounces off harmlessly before the irritated Kraken smashes your ship with one mighty swing, you manage to hold onto a door to the shore.<br>Move to dock square.<br>lose a turn<br>-25 HP";
        players[activePlayer].health -= 25;
        players[activePlayer].loseTurn = true;
    } else if(xNum >= 20 && xNum <= 60) {
        output.innerHTML = "You fire a volley into  beast, the cannon tearing into the flesh. It lashes out in pain destroying your ship before collapsing.  You take the eye as a trophy as your ship slowly sinks.<br>Move to dock square.<br>lose a turn<br>-25 HP<br>Gain Eye of Kracken.";
        players[activePlayer].inventory.push("eye of kraken");
        players[activePlayer].health -= 25;
        players[activePlayer].loseTurn = true;
        
        if(questNum != -1) {
            players[activePlayer].quests.splice(questNum, 1);
            output.innerHTML += "<br>You completed your quest to defeat the Kraken!";
            // Gain item
        }
    } else {
        output.innerHTML = "You ram your ship into the beast, driving the bowsprit into the flesh, straight through its heart. It collapses silently. You solemnly take its eye as a trophy.<br>Gain Eye of Kraken.";
        players[activePlayer].inventory.push("eye of kraken");
        
        if(questNum != -1) {
            players[activePlayer].quests.splice(questNum, 1);
            output.innerHTML += "<br>You completed your quest to defeat the Kraken!";
            // Gain item
        }
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
    
    var questNum = players[activePlayer].quests.indexOf("defKraken");
    
    var xNum = randNum(1, 100);
    if(xNum <= 20) {
        output.innerHTML = "Your volley bounces off harmlessly before the irritated Kraken smashes your ship with one mighty swing, you manage to hold onto a door to the shore.<br>Move to dock square.<br>lose a turn<br>-25 HP";
        players[activePlayer].health -= 25;
        players[activePlayer].loseTurn = true;
    } else if(xNum > 20 && xNum <= 60) {
        output.innerHTML = "You fire a volley into  beast, the cannon tearing into the flesh. It lashes out in pain destroying your ship before collapsing.  You take the eye as a trophy as your ship slowly sinks.<br>Move to dock square.<br>Lose a turn<br>-25 HP<br>Gain Eye of Kracken.";
        players[activePlayer].health -= 25;
        players[activePlayer].loseTurn = true;
        players[activePlayer].inventory.push("eye of kraken");
        
        if(questNum != -1) {
            players[activePlayer].quests.splice(questNum, 1);
            output.innerHTML += "<br>You completed your quest to defeat the Kraken!";
            // Gain item
        }
    } else {
        output.innerHTML = "You ram your ship into the beast, driving the bowsprit into the flesh, straight through its heart. It collapses silently. You solemnly take its eye as a trophy.<br>Gain Eye of Kraken.";
        players[activePlayer].inventory.push("eye of kraken");
        
        if(questNum != -1) {
            players[activePlayer].quests.splice(questNum, 1);
            output.innerHTML += "<br>You completed your quest to defeat the Kraken!";
            // Gain item
        }
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
    
    var questNum = players[activePlayer].quests.indexOf("defKraken");
    
    var xNum = randNum(1, 100);
    if(xNum <= 50) {
        output.innerHTML = "As you leap from your boat yelling, you feel a sharp pain in your back as you are accelerated towards the water. You blackout as you body connects with the frigid water, after some time you wake up on your ship safely at the dock..<br>Lose a turn<br>-25 HP";
        players[activePlayer].health -= 25;
        players[activePlayer].loseTurn = true;
    } else if(xNum > 50 && xNum <= 80) {
        output.innerHTML = "As you leap from your boat yelling, you feel a sharp pain in your back as you are accelerated towards your boat, it is utterly destroyed. You blackout as you crash through the floor and wake up on a piece of debris on the beach.<br>Lose a turn.";
        players[activePlayer].loseTurn = true;
        
        /*global beach*/
        var squareToMove = randNum(0, beach.squares.length - 1);
        output.innerHTML += "<br>Go to " + squareToMove + ".";
    } else {
        output.innerHTML = "You leap through the air, you deftly manage to slice through an incoming tentacle. Before Grasping the creatures slimy flesh and moving in. You heave your arm back before thrusting your weapon into its eye. The foul beast screams as you leap back with your new trophy. You land on your ship.<br>Gain Eye of Kraken";
        players[activePlayer].inventory.push("eye of kraken");
        
        if(questNum != -1) {
            players[activePlayer].quests.splice(questNum, 1);
            output.innerHTML += "<br>You completed your quest to defeat the Kraken!";
            // Gain item
        }
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
