/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global dock*/

//         DOCK EVENT

//  dock.randEvents = ["dockStore"];

function dockEvent() {
    if(players[activePlayer].beenInOcean === false) {
        output.innerHTML = "Dock Shop";
        if(players[activePlayer].inventory.indexOf("boat") != -1) {
            answerButton1.innerHTML = "Set Sail!";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", setSailDock, false);
        } else if(players[activePlayer].money >= 100) {
            answerButton1.innerHTML = "Buy a boat<br>$100";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", buyBoatDock, false);
            answerButton2.innerHTML = "Try to haggle";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", haggleDock, false);
        } else {
            answerButton1.innerHTML = "You don't have enough money for a boat.";
            answerButton1.style.display = "block";
            answerButton2.innerHTML = "Try to haggle";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", haggleDock, false);
        }
    } else {
        players[activePlayer].beenInOcean = false;
        players[activePlayer].parkedAtDock = true;
        players[activePlayer].beenThroughDock = false;
        output.innerHTML = "You park your boat and go on your way";
        
        playerMenuDisplay();
    }
}

function setSailDock() {
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", setSailDock, false);
    players[activePlayer].beenThroughDock = true;
    
    output.innerHTML = "You get your boat ready to set sail.";
    players[activePlayer].beenThroughDock = true;
    
    playerMenuDisplay();
}

function buyBoatDock() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", buyBoatDock, false);
    answerButton2.removeEventListener("click", haggleDock, false);
    
    output.innerHTML = "You buy the boat and get it ready to set sail.<br>-100 Gold<br>You gain a boat";
    players[activePlayer].beenThroughDock = true;
    players[activePlayer].inventory.push("boat");
    players[activePlayer].money -= 100;
    
    playerMenuDisplay();
}

function haggleDock() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", buyBoatDock, false);
    answerButton2.removeEventListener("click", haggleDock, false);
    
    var xNum = randNum(1, 100);
    if((xNum <= 20) && (players[activePlayer].money >= 120)) {
        output.innerHTML = "You fail epicly and end up paying 120 Gold. You get the boat ready to set sail.<br>-120 Gold<br>You gain a boat";
        players[activePlayer].money -= 120;
        players[activePlayer].inventory.push("boat");
        players[activePlayer].beenThroughDock = true;
    } else if((xNum > 20 && xNum <= 45) && (players[activePlayer].money >= 80)) {
        output.innerHTML = "You successfully Haggle the price down! You pay them 80 gold and get the boat ready to set sail<br>-80 Gold<br>You gain a boat";
        players[activePlayer].money -= 80;
        players[activePlayer].inventory.push("boat");
        players[activePlayer].beenThroughDock = true;
    } else if(xNum > 45 && xNum <= 60) {
        output.innerHTML = "You convince them it's of dire importance! They give you their boat for a ONE TIME USE. You get it ready to set sail.";
        players[activePlayer].beenThroughDock = true;
    } else {
        output.innerHTML = "You are laughed off";
    }
    
    playerMenuDisplay();
}
