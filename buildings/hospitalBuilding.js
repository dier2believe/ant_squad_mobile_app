/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global hospital*/

//         HOSPITAL BUILDING
var amountToPay = 0;

function hospitalBuildings() {
    output.innerHTML = "You are welcomed as you come in and are shown to a bed.";
    
    if(players[activePlayer].health >= 76) {
        amountToPay = 25;
    } else if(players[activePlayer].health >= 51) {
        amountToPay = 50;
    } else if(players[activePlayer].health >= 26) {
        amountToPay = 75;
    } else {
        amountToPay = 100;
    }
    answerButton1.innerHTML = "-" + amountToPay + " Gold = Full Health";
    answerButton2.innerHTML = "pay nothing = +20 HP";
    answerButton1.style.display = "block";
    answerButton2.style.display = "block";
    answerButton1.addEventListener("click", payForHealth, false);
    answerButton2.addEventListener("click", waitForHealth, false);
    
}

function payForHealth() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", payForHealth, false);
    answerButton2.removeEventListener("click", waitForHealth, false);
    
    if(players[activePlayer].money >= amountToPay) {
        output.innerHTML = "You pay the " + amountToPay + " Gold and the doctor puts you at the top of his list.<br>Full HP";
        players[activePlayer].health = 100; 
        players[activePlayer].money -= amountToPay;
    } else {
        output.innerHTML = "You don't have enough gold<br>You wait in your room until someone helps you.<br>+20 HP";
        players[activePlayer].health += 20;
    }
    
    playerMenuDisplay();
}

function waitForHealth() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", payForHealth, false);
    answerButton2.removeEventListener("click", waitForHealth, false);
    
    output.innerHTML = "You wait in your room until someone helps you.<br>+20 HP";
    players[activePlayer].health += 20;
    
    playerMenuDisplay();
}
