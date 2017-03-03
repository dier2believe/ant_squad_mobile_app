/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global forest*/

//         FOREST EVENTS

//  forest.randEvents = ["tree", "berry", "mushroom"/*, "bandit"*/];

function forestEvent() {
    var eventNum = randNum(0, forest.randEvents.length -1);
    switch(forest.randEvents[eventNum]){
        case"tree":
            output.innerHTML = " You see a tree fall  in the distance.";
            answerButton1.innerHTML = "Investigate";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", investigateTree, false);
            answerButton2.innerHTML = "Keep Walking";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", ignoreTree, false);
            break;
        case "berry":
            output.innerHTML = "You are walking and you find some berries. Could be poisonous but they look good.";
            answerButton1.innerHTML = "Eat them you're starving!";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", deadlyBerry, false);
            answerButton2.innerHTML = "Don't want to risk it";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", smartChoiceBerry, false);
            break;
        case "mushroom":
            output.innerHTML = "You find some mushrooms growing in the ground that looks tasty.";
            answerButton1.innerHTML = "Eat the mushrooms";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", yummyMushroom, false);
            answerButton2.innerHTML = "Don't eat the mushrooms";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click",noMushroom, false);
            break;
            /*
        case "bandit":
            output.innerHTML = "You see a bandit hiding in a tree, they haven't noticed you yet";
            answerButton1.innerHTML = "You try to get the jump on the scoundrel";
            answerButton1.style.display = "block";
            answerButton1.addEventListner("click", attackBandit, false);
            answerButton2.innerHTML = "Don't do it";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", passiveBandit, false);
            break;
            */
    }
}

function investigateTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", investigateTree, false);
    answerButton2.removeEventListener("click", ignoreTree, false);
    
    output.innerHTML = "It's a fallen tree, a tree person!";
    
    answerButton1.innerHTML = "Attack the creature";
    answerButton1.style.display = "block";
    answerButton1.addEventListener("click", attackTree, false);
    answerButton2.innerHTML = "Run away!";
    answerButton2.style.display = "block";
    answerButton2.addEventListener("click", runAwayTree, false);
}

function attackTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", attackTree, false);
    answerButton2.removeEventListener("click", runAwayTree, false);
    
    var xNum = randNum(1, 100);
    if(xNum <= 60) {
        output.innerHTML = "The bark is tough, you on the other hand are rather squishy<br>-4 HP";
        players[activePlayer].health -= 4;
    } else {
        output.innerHTML = "The bark is tough, but your strength was overwhelming! The sap is revitalizing.<br>+8 HP<br>You gain the Tree Branch of General Irritation";
        players[activePlayer].health += 8;
        players[activePlayer].inventory.push("Tree Branch of General Irritation");
    }
    
    playerMenuDisplay();
    
}

function runAwayTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", attackTree, false);
    answerButton2.removeEventListener("click", runAwayTree, false);
    
    output.innerHTML = "You run away screaming";
    
    playerMenuDisplay();
    
}

function ignoreTree() {
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", investigateTree, false);
    answerButton2.removeEventListener("click", ignoreTree, false);
    
    output.innerHTML = "You ignore it and keep going";
    
    playerMenuDisplay();
}


function deadlyBerry(){
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", deadlyBerry, false);
    answerButton2.style.display = "none";
    answerButton2.removeEventListener("click", smartChoiceBerry, false);
    var xNum = randNum(1,100);
    if (xNum <= 50) {
       output.innerHTML = "You don't feel so good<br> -10HP";
       players[activePlayer].health -= 10;
    } else if (xNum > 50 && xNum <= 90) {
        output.innerHTML = "Delicious and nutritious<br> +15HP";
        players[activePlayer].health += 15;   
    } else {
        output.innerHTML = "The berries are berry powerful<br> +10HP and \n +2 moving for the next 2 turns.";
        players[activePlayer].health += 10;
        //need to add +2 moving for next 2 turns
    }
    playerMenuDisplay();
}

function smartChoiceBerry(){
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", deadlyBerry, false);
    answerButton2.removeEventListener("click", smartChoiceBerry, false);
    
    output.innerHTML = "You decide not to eat the berries."; 
    
    playerMenuDisplay();
    
}

function yummyMushroom(){
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", yummyMushroom, false);
    answerButton2.removeEventListener("click", noMushroom, false);
    
    var xNum = randNum(1,100);
    if(xNum <= 50) {
        output.innerHTML = "Yummy mushrooms<br>+10 HP";
        players[activePlayer].health += 10;
    } else if(xNum > 50 && xNum <= 65) {
        output.innerHTML = "Your eyelids are getting heavy, you'll just rest rest your eyes for a moment...<br>+20 HP<br>lose a turn";
        players[activePlayer].health += 20;
        players[activePlayer].loseTurn = true;
    } else if(xNum > 65 && xNum <= 85) {
        output.innerHTML = "Ohh, you don't feel so well...<br>-4 HP";
        players[activePlayer].health -= 4;
    } else {
        output.innerHTML = "You begin seeing colors you've never seen befor<br>-6 HP<br>lose a turn";
        players[activePlayer].health -= 6;
        players[activePlayer].loseTurn = true;
    }
    
    playerMenuDisplay();
}

function noMushroom(){
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton1.removeEventListener("click", yummyMushroom, false);
    answerButton2.removeEventListener("click", noMushroom, false);
    
    var xNum = randNum(1,100);
    if(xNum <= 5) {
        output.innerHTML = "The mushroom releases the spores<br>-4 HP";
        players[activePlayer].health -= 4;
    } else {
        output.innerHTML = "You put down the mushrooms and keep going";
    }
    
    
    playerMenuDisplay();
}

function attackBandit(){
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", attackBandit, false);
    answerButton2.style.display = "none";
    answerButton2.removeEventListener("click", passiveBandit, false);
    
    var xNum = randNum(1,100);
    /*if(this happens....){
    output.innerHTML = "";
    players[activePlayers].heatlh += #;   
    } else if(this happens....){
    output.innerHTML = "";
        players[activePlayers].health -= #;
    } else{
        output.innerHTML = "";
    }
    
    
    
    
    */
    playerMenuDisplay();
}

function passiveBandit(){
    answerButton1.style.display = "none";
    answerButton1.removeEventListener("click", attackBandit, false);
    answerButton2.style.display = "none";
    answerButton2.removeEventListener("click", passiveBandit, false);
    
    
    var xNum = randNum(1,100);
    //output.innerHTML = "";
    
    playerMenuDisplay();
}

