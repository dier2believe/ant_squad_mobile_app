/*global answerButton1*/
/*global answerButton2*/
/*global answerButton3*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global plains*/

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
        output.innerHTML = "His Hand grasps a single golden goblet.<br>You gain a golden goblet.";
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
