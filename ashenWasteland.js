/*global answerButton1*/
/*global answerButton2*/
/*global output*/
/*global players*/
/*global activePlayer*/
/*global playerMenuDisplay*/
/*global randNum*/
/*global ashenWasteland*/

//         ASHEN WASTELAND EVENTS

//  ashenWastelandEvents.randEvents = ["figure"];

function ashenWasteland() {
    var eventNum = randNum(0, ashenWasteland.randEvents.length - 1);
    switch(ashenWasteland.randEvents[eventNum]){
        case "figure": 
            /*
            output.innerHTML = " You're walking along and you see an open manhole the smell is horrid, but a cardboard sign says secret lair written in charcoal";
            answerButton1.innerHTML = "Well if it's a lair then there could be some good stuff done in there";
            answerButton1.style.display = "block";
            answerButton1.addEventListener("click", manholeEvent, false);
            answerButton2.innerHTML = "It smells bad I don't want to go in.";
            answerButton2.style.display = "block";
            answerButton2.addEventListener("click", manHoleFlee, false);
            */
    }
}
