//Document ready
$(document).ready(function() {

$("#intro-scene").hide(); 
$("#intro-scene").delay(11000).show(0);
$("#loading-page").delay(11000).hide(0);
$("#battle-scene").hide();
    
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

//Create a function to reset
function reset() {
    yourCharacter = "";
    yourEnemies = "";
    yourOpponent = ""; 

    characterChosen = false;
    opponentChosen = false;
    win = false; 
    firstRound = true; 
    winCount = 0; 

    attackCount = 0; 
    $("#your-opponent, #your-character, #your-enemies, #your-character-02, #your-opponent-02").empty();
    $("#character-pick").replaceWith(originalState.clone());
};

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

} else if (characterChosen && opponentChosen === false) { //if a character was chosen, pick an opponent! 
        
    if(yourCharacter != $(this).html() && firstRound === true) { //ensure player cannot pick the same character to fight

        opponentChosen = true; 
        yourOpponent = $(this).html(); //grab the html contents of character that was clicked on for "yourOpponent"
        $(this).remove(); //remove the contents from yourEnemies

        //Append chosen opponent to appropriate HTML DOMs
        $("#your-opponent").append(yourOpponent);
        $("#your-opponent-02").append(yourOpponent);
        $("#your-opponent-02").css("color", "white"); 

        //Set yourOpponent attack powers and health points
        var opponentValue = $(this).attr("data-value");
        var obj = eval("(" + opponentValue + ")");
        opponentHP = obj.healthPoints;
        opponentAP = obj.attackPower;
        opponentCAP = obj.counterAttackPower;

        opponentChosen = true;

    }
}
});

//On click functionality for "start battle"
$(document).on("click", "#start-battle", function() {
    if (opponentChosen){
        $("#battle-scene").show();
        $("#intro-scene").hide();
        $("#button-attack").show();
    } 
});

//On click functionality for attack button with WIN LOSE SUICIDE scenario 
$(document).on("click", "#attack", function() {

    if (opponentChosen) {
        attackCount = attackCount + 1; 
        opponentHP = opponentHP - playerAP * attackCount
        playerHP = playerHP - opponentCAP 
    
        $("#your-opponent-02 span").html(opponentHP)
        $("#your-character-02 span").html(playerHP)
    
    
        //WIN scenario 
        if(opponentHP <= 0 && playerHP > 0) {
            
            win = true; 
            winCount = winCount + 1; 
            firstRound = false; 
    
            console.log(playerHP)
            console.log(attackCount)
            console.log(opponentHP)
            console.log(playerHP)
            console.log(winCount)
            
    
            if (winCount < 3){
                $("#message").append("You won this round!")
                $("#other-victim-link p").append("Pick your next victim...")
                $("#button-attack").hide();

                $(document).on("click", "#other-victim-link", function() {
                    $("#intro-scene").show();
                    $("#battle-scene").hide();

                    $("#message").empty();   
                    $("#other-victim-link p").empty(); 
                    $("#your-opponent-02").empty();
                    $("#your-character-02 span").html(playerHP)
                    opponentChosen = false; 
        
                })

                $(document).on("click", ".character", function() {    
                    if(yourCharacter != $(this).html()){ //ensure player can't play against the same chosen character
                        yourOpponent = $(this).html(); //pick the next opponent
                        $(this).remove();
                        opponentChosen = true; 
        
                        $("#your-opponent").empty();
                        $("#your-opponent-02").empty();
                        $("#your-opponent").append(yourOpponent);
                        $("#your-opponent-02").append(yourOpponent);
        
                        //Set yourOpponent attack powers and health points
                        var opponentValue = $(this).attr("data-value");
                        var obj = eval("(" + opponentValue + ")");
                        opponentHP = obj.healthPoints;
                        opponentAP = obj.attackPower;
                        opponentCAP = obj.counterAttackPower;
                    }
                })
            } 
            
            if (winCount === 3) {
                $("#message").append("You have defeated all enemies!!!")
                $("#congrats-link p").append("Play again")
                $("#button-attack").hide();
                $("#congrats-link").on("click", function(){
                    $("#intro-scene").show();
                    $("#battle-scene").hide();

                    $("#message").empty(); 
                    $("#congrats-link p").empty();  
                    reset()
            })
            }
                
        } //END WIN scenario 
        
        //LOSE scenario 
        if(playerHP <= 0 && opponentHP > 0 && winCount != 3) {
            $("#message").append("You lost, better luck next time.")
            $("#other-victim-link p").append("Click here to restart")
            $("#button-attack").hide();
            $("#other-victim-link").on("click", function(){
                $("#intro-scene").show();
                $("#battle-scene").hide();

                $("#message").empty();   
                $("#other-victim-link p").empty(); 
                $("#your-opponent-02").empty();
                $("#your-character-02 span").html(playerHP)
                opponentChosen = false; 
                reset()
            })
        
        } //END LOSE scenario
    
        //SUICIDE scenario
        if(playerHP <= 0 && opponentHP <= 0 && winCount != 3) {
            $("#message").append("It was a suicide mission! You both lost...");
            $("#other-victim-link p").append("Click here to restart");
            $("#button-attack").hide();
            $("#other-victim-link").on("click", function(){
                $("#intro-scene").show();
                $("#battle-scene").hide();

                $("#message").empty();   
                $("#other-victim-link p").empty(); 
                $("#your-opponent-02").empty();
                $("#your-character-02 span").html(playerHP)
                opponentChosen = false; 
                reset()
    
            })
            
        } //END SUICIDE scenario 
        } else {
            $("#message").append("Opponent does not exist!")
            $("#other-victim-link p").append("Click here to pick an opponent from 'enemies'.")
            $("#other-victim-link").on("click", function(){
                $("#intro-scene").show();
                $("#battle-scene").hide();
            })
        }
    });
    
});
