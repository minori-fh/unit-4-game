//Document ready
$(document).ready(function() {
    
//Defined variables
var yourCharacter = "";
var yourEnemies = "";
var yourOpponent = ""; 

var characterChosen = false;
var opponentChosen = false;
var win = false;
var firstRound = true; 
var winCount = 0;

var attackCount = 0; 
var originalState = $("#character-pick").clone();

//On click functionaliy to pick character
$(document).on("click", ".character", function() { //putting event listener on document vs. specific element
if (characterChosen === false){

    yourCharacter = $(this).html(); //grab the html contents of character that was clicked on
    $(this).remove();
    
    //Set yourCharacter attack powers and healthpoints
    var playerValue = $(this).attr("data-value");
    var obj = eval("(" + playerValue + ")"); 
    playerHP = obj.healthPoints;
    playerAP = obj.attackPower;
    playerCAP = obj.counterAttackPower; 

    $("#your-character").append(yourCharacter); //place the html contents from ^ into appropriate "your-character" div
    $("#your-character-02").append(yourCharacter);
    $("#your-character-02").css("color","white");

    //After character is chosen, move the contents of other characters to "enemies to defeat"
    yourEnemies = $(".character").not(this); //assign characters that were not chosen to "yourEnemies"
    yourEnemies.appendTo("#your-enemies");
    // $("#other-victims").css("color","white");

    characterChosen = true; //change chosenCharacter status to true
}
})

}); //END document ready end