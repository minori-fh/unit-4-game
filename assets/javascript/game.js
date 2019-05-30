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

    $("#your-character").append(yourCharacter); //place the html contents from ^ into appropriate "your-character" div
    $("#your-character-02").append(yourCharacter);
    $("#your-character-02").css("color","white");
}
})

}); //END document ready end