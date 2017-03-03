/*global answerButton1*/
/*global answerButton2*/
/*global answerButton3*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global ashenWasteland*/

//         ASHEN WASTELAND EVENTS

//  ashenWastelandEvents.randEvents = ["figure"];

function ashenWastelandEvent() {
    var eventNum = randNum(0, ashenWasteland.randEvents.length - 1);
    switch(ashenWasteland.randEvents[eventNum]){
        case "figure":
            output.innerHTML = "You slowly make your way through the grey-black ash. After a while you think you see a figure in the distance.";
            answerButton1.innerHTML = "Hail them, you could sure use some company.";
            answerButton2.innerHTML = "Approach it quickly, it could just be a mind trick.";
            answerButton3.innerHTML = "Ignore it, probably just more ash and wind.";
            answerButton1.style.display = "block";
            answerButton2.style.display = "block";
            answerButton3.style.display = "block";
            answerButton1.addEventListener("click", hailFigure, false);
            answerButton2.addEventListener("click", approachFigure, false);
            answerButton3.addEventListener("click", ignoreFigure, false);
            break;
    }
}

function hailFigure() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", hailFigure, false);
    answerButton2.removeEventListener("click", approachFigure, false);
    answerButton3.removeEventListener("click", ignoreFigure, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 33) {
        output.innerHTML = "A fellow adventure! You share a meal and trade stories. This place isn’t so bad.<br>+6 HP";
        players[activePlayer].health += 6;
    } else if(xNum <= 66) {
        output.innerHTML = "It suddenly disappears! Although you can’t shake the feeling of being watched…<br>-2 HP for 3 turns.";
        players[activePlayer].health -= 2;
        players[activePlayer].hurtEvents.push("beingWatched");
        players[activePlayer].hurtEventsTurnNum.push(3);
    } else {
        output.innerHTML = "It was just ash and wind after all, sure is lonely here...";
    }
    
    playerMenuDisplay();
}

function approachFigure() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", hailFigure, false);
    answerButton2.removeEventListener("click", approachFigure, false);
    answerButton3.removeEventListener("click", ignoreFigure, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 25) {
        output.innerHTML = "A fellow adventure! He gives you a weird look, you looked kind of crazy. You laugh it off and part ways...<br>+3 HP";
        players[activePlayer].health += 3;
    } else if(xNum <= 55) {
        output.innerHTML = "You get to the place where you saw the figure last, you see nothing but you feel an immense presence. You swear you hear crying or maybe that’s laughter... You need to out of here…<br>-4 HP for 3 turns";
        players[activePlayer].health -= 4;
        players[activePlayer].hurtEvents.push("immensePresence");
        players[activePlayer].hurtEventsTurnNum.push(3);
    } else {
        output.innerHTML = "It was just ash and wind after all, you cough. Aerobic exercise isn’t the best plan when the air is half ash.<br>-2 HP";
        players[activePlayer].health -= 2;
    }
    
    playerMenuDisplay();
}

function ignoreFigure() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", hailFigure, false);
    answerButton2.removeEventListener("click", approachFigure, false);
    answerButton3.removeEventListener("click", ignoreFigure, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 90) {
        output.innerHTML = "It sure is eerie though…";
    } else {
        output.innerHTML = "You can’t shake the feeling of being watched though…<br>-2 HP for 3 turns";
        players[activePlayer].health -= 2;
        players[activePlayer].hurtEvents.push("shakeWatched");
        players[activePlayer].hurtEventsTurnNum.push(3);
    }
    
    playerMenuDisplay();
}
