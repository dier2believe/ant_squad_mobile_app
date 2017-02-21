/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global road*/

//         ROAD EVENTS

//  road.randEvents = ["widow", "oldMan", "manhole"];

function roadEvent() {
    var eventNum = randNum(0, road.randEvents.length - 1);
    switch(road.randEvents[eventNum]){
        case "widow":
            output.innerHTML = 'You see an old widow, she looks desolate.<br>"My husband had died at sea, he was hunting a terrible beast in the ocean. Please avenge him"';
            answerButton1.innerHTML = "vow to defeat the monster";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", vowWidow, false);
            answerButton2.innerHTML = "keep walking you have better things to do";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", ignoreWidow, false);
            break;
        case "oldMan":
            output.innerHTML = "You meet a wise old man on the road";
            answerButton1.innerHTML = "Talk to the old man";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", talkOldMan, false);
            answerButton2.innerHTML = "Ignore the old man";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", ignoreOldMan, false);
            break;
        case "manhole": 
            output.innerHTML = "You're walking along and you see an open manhole the smell is horrid, but a cardboard sign says secret lair written in charcoal";
            answerButton1.innerHTML = "Well if it's a lair then there could be some good stuff done in there";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", manholeEvent, false);
            answerButton2.innerHTML = "It smells bad I don't want to go in.";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", manHoleFlee, false);
            break;
    }
}

function vowWidow() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", vowWidow, false);
    answerButton2.removeEventListener("click", ignoreWidow, false);
    
    output.innerHTML = "You vow to the widow that you will defeat the monster and avenge her husband<br>You gain a quest:<br>Defeat the Kraken";
    
    playerMenuDisplay();
    
}

function ignoreWidow() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", vowWidow, false);
    answerButton2.removeEventListener("click", ignoreWidow, false);
    
    output.innerHTML = "You keep walking. You have better things to do.";
    
    playerMenuDisplay();
    
}

function talkOldMan() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", talkOldMan, false);
    answerButton2.removeEventListener("click", ignoreOldMan, false);
    
    output.innerHTML = '"Please, the fire dragon to the north is causing us great trouble. . ."<br>You gain a quest:<br>"Defeat the Fire Dragon"';
    
    playerMenuDisplay();
}

function ignoreOldMan() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", talkOldMan, false);
    answerButton2.removeEventListener("click", ignoreOldMan, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 90) {
        output.innerHTML = "You continue on your way";
    } else {
        output.innerHTML = "The old man suddenly knocks you out and takes your food<br>-10 HP";
        players[activePlayer].health -= 10;
    }
    
    playerMenuDisplay();
}

function manholeEvent() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", manholeEvent, false);
    answerButton2.removeEventListener("click", manHoleFlee, false);
    
    var xNum = randNum(1,100);
    if(xNum <= 30){
        output.innerHTML = "RATS!!! <br> -3 HP";
        players[activePlayer].health -= 3;
    }
    else if(xNum > 30 && xNum <= 35){
        output.innerHTML = "You find a item";
        // some random item
    }
    else if(xNum > 35 && xNum <= 95){
        output.innerHTML = "You smell something fowl.";
    }
    else{
        output.innerHTML = "Find a note, telling you of a more refined base.";
        //give a location
    }
    playerMenuDisplay();
}

function manHoleFlee(){
    answerButton1.style.display = "none";
    answerButton2.style.display ="none";
    answerButton1.removeEventListener("click", manholeEvent,false);
    answerButton2.removeEventListener("click", manHoleFlee, false);
    var xNum = randNum(1,100);
    if(xNum <= 95){
        output.innerHTML = "You keep walking";
    }
    else{
        
        output.innerHTML = "The smell causes your eyes to water and you fall in anyways";
        players[activePlayer].health -= 7;
        manholeEvent();
    }
    playerMenuDisplay();
}

