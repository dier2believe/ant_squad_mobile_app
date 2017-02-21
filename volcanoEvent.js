/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global volcano*/

//        VOLCANO EVENTS

//  volcano.randEvents = ["tunnel", "dragon"];

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
            output.innerHTML = "The ground rumbles and the Fire Dragon emerges from the Lava Lake and flies towards you.";
            answerButton1.innerHTML = "Run as fast as you can!";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", runDragon, false);
            answerButton2.innerHTML = "You stand your ground and fight";
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
    
    var xNum = randNum(1, 100);
    if(xNum <= 70) {
        output.innerHTML = "You run away and are able to find a large boulder to hide behind. You hear the dragon roar as it looks for you. It flies away and you are able to escape with no harm.";
    } else {
        output.innerHTML = "You try to run away but it's a flying dragon.  He finds you easily, picks you up with it's talons and drops you.<br>-30 HP";
        players[activePlayer].health -= 30;
    }
    

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

