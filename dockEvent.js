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
