/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global desert*/

//            DESERT EVENTS

//  desert.randEvents = ["oasis", "tired"];

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
        output.innerHTML = "A rattlesnake crawls out from under the rock and bites you.<br>-2 HP for the next 3 turns";
        players[activePlayer].health -= 2;
        players[activePlayer].hurtEvents.push("snakeBite");
        players[activePlayer].hurtEventsTurnNum.push(3);
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
