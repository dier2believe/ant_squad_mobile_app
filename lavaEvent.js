/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global lava*/

//            LAVA EVENTS

//  lava.randEvents = [monster];

function lavaEvent() {
    //output.innerHTML = "You feel the heat radiating off of the lava as you walk by.";
    
    var eventNum = randNum(0, lava.randEvents.length - 1);
    switch(lava.randEvents[eventNum]) {
        case "monster":
            output.innerHTML = "A large splash of huge gouts of lava splash all around you, miraculously missing you. A large creature, made of pure lava erupts from the middle and roars a deafening roar. You need to act quick…";
            answerButton1.innerHTML = "Fight";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", fightMonster, false);
            answerButton2.innerHTML = "Flee";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", fleeMonster, false);
            break;
    }
    
    playerMenuDisplay();
}

function fightMonster() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", fightMonster, false);
    answerButton2.removeEventListener("click", fleeMonster, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 90) {
        output.innerHTML = "The creature wraps a single tentacle around you, and you burn alive.<br>-30 HP";
        players[activePlayer].health -= 60;
    } else {
        output.innerHTML = "Before you turn around twice the monster has disappeared. In the space where it occupied, lies a Monster’s tooth. That will probably never happen to you again.<br>Gain Monster's Tooth";
        players[activePlayer].inventory.push("monster's tooth");
    }
    
    playerMenuDisplay();
}

function fleeMonster() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", fightMonster, false);
    answerButton2.removeEventListener("click", fleeMonster, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 50) {
        output.innerHTML = "You run faster than the creature's tentacles, and you escape, but just barely.";
    } else {
        output.innerHTML = "You couldn’t run fast enough. You were caught, but you manage to pull yourself out and run.<br>-15 HP";
        players[activePlayer] -= 15;
    }
    
}
