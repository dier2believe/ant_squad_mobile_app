/*global answerButton1*/
/*global answerButton2*/
/*global answerButton3*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global temple*/

//         TEMPLE EVENTS

function templeDungeon() {
    players[activePlayer].inDungeon = true;
    players[activePlayer].dungeonName = "temple";
    
    output.innerHTML = "The hulking figure is coming at you with a giant piece of bent rebar! His body is disfigured but, but you can see the massive muscles ripping through his shirt.";
    
    answerButton1.innerHTML = "Press on and attack";
    answerButton2.innerHTML = "Run away! You're under equipped and under trained!";
    answerButton1.style.display = "block";
    answerButton2.style.display = "block";
    answerButton1.addEventListener("click", fightTempleStage1, false);
    answerButton2.addEventListener("click", runAwayTemple, false);
}

function templeDungeonContinue() {
    switch(players[activePlayer].dungeonStage) {
        case 1:
            templeDungeon();
            break;
        case 2:
            output.innerHTML = "This only enrages this beast, who then yells out a mighty ogre roar as he charges you!";
            answerButton1.innerHTML = "Try to roll away.";
            answerButton2.innerHTML = "Finish this here and now!";
            answerButton3.innerHTML = "To the door!!!";
            answerButton1.style.display = "block";
            answerButton2.style.display = "block";
            answerButton3.style.display = "block";
            answerButton1.addEventListener("click", fightTempleStage2, false);
            answerButton2.addEventListener("click", finishThisTempleStage2, false);
            answerButton3.addEventListener("click", runAwayTemple, false);
            break;
        case 3:
            output.innerHTML = "not done yet";
            setTimeout(runAwayTemple, 1500);
            break;
    }
}

function fightTempleStage1() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", fightTempleStage1, false);
    answerButton2.removeEventListener("click", runAwayTemple, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 50) {
        output.innerHTML = "THONK! You feel the rebar drive into your skull with tremendous force as you're thrown out of the dungeon. Good thing you have a thick skull...<br>move to a space outside the temple<br>-49 HP";
        players[activePlayer].health -= 49;
        players[activePlayer].dungeonName = "";
        players[activePlayer].inDungeon = false;
    } else if(xNum <= 25) {
        output.innerHTML = "You get a good swing at him before managing to hit him over the head with a nearby rock.<br>Success!";
        players[activePlayer].dungeonStage++;
    } else {
        output.innerHTML = "You swing at him! He falters under your tremendous blow! But not before swinging back and hitting you in the chest. Ouch that had to have cracked a few ribs.<br>Success!<br>-38 HP";
        players[activePlayer].health -= 38;
        players[activePlayer].dungeonStage++;
    }
    
    playerMenuDisplay();
    
}

function fightTempleStage2() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", fightTempleStage2, false);
    answerButton2.removeEventListener("click", finishThisTempleStage2, false);
    answerButton3.removeEventListener("click", runAwayTemple, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 50) {
        output.innerHTML = "The beast barrels into the wall and activates a hidden booby trap! Rocks fall on its head, enraging the beast immensely!<br>-20 HP<br>Success!";
        players[activePlayer].health -= 20;
        players[activePlayer].dungeonStage++;
    } else if(xNum <= 75) {
        output.innerHTML = "You successfully roll out of the way and avoid his hit! It swings wildly, completely enraged.<br>Success!";
        players[activePlayer].dungeonStage++;
    } else {
        output.innerHTML = "You forgot to dodge and are knocked into the ceiling. Ouch.<br>-35 HP";
        players[activePlayer].health -= 35;
    }
    
    playerMenuDisplay();
    
}

function finishThisTempleStage2() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton1.removeEventListener("click", fightTempleStage2, false);
    answerButton2.removeEventListener("click", finishThisTempleStage2, false);
    answerButton3.removeEventListener("click", runAwayTemple, false);
    
    // going to be changed
    output.innerHTML = "not done yet";
    
    playerMenuDisplay();
}

function runAwayTemple() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    
    answerButton1.removeEventListener("click", fightTempleStage1, false);
    answerButton2.removeEventListener("click", runAwayTemple, false);
    
    answerButton1.removeEventListener("click", fightTempleStage2, false);
    answerButton2.removeEventListener("click", finishThisTempleStage2, false);
    answerButton3.removeEventListener("click", runAwayTemple, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 90) {
        output.innerHTML = "You turn and run out. Not dying today!<br>Move to a space outside of the temple";
        players[activePlayer].inDungeon = false;
        players[activePlayer].dungeonName = "";
    } else {
        output.innerHTML = "You set a booby trap that crushes you under rocks. You crawl out and leave the temple<br>Move to a space outside of the temple<br>-50 HP";
        players[activePlayer].health -= 50;
        players[activePlayer].inDungeon = false;
        players[activePlayer].dungeonName = "";
    }
    
    playerMenuDisplay();
}
