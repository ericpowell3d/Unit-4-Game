var currentScore = 0;
var reachScore = 24;
var guessesLeft = 1;
var wins = 0;
var losses = 0;
var crystals = [0, 0, 0, 0];

function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reset(){
    $("#reset").remove();

    currentScore = 0;
    reachScore = randomInt(24,96); // In addition to the balancing I did for the crystal values, I raised the base value so you wouldn't lose in just 2 guesses (because it was just unfair). I also lowered the max a bit because it got annoying just clicking the highest number until you got near it

    for (var i=0; i<crystals.length; i++){
        crystals[i] = randomInt(2 + i, 6 + i * 2); // Assigns a random integer to the crystals. I wanted to make the larger crystals give a generally higher output (to help balance the game). 1st: 2-6. 2nd: 3-8. 3rd: 4-10. 4th: 5-12
        var crystal = $("<button>")
        crystal.addClass("btn btn-dark");
        crystal.attr("id", "crystal" + i);
        crystal.attr("value", crystals[i]);
        crystal.text("Crystal " + i);
        $("#crystalBtn").append(crystal);
    }

    $("#reach").text("Score to Match: " + reachScore);
    $("#current").text("Current Score: " + currentScore);
    $("#win-loss").text("");

    // Added a "Guesses Left" formula to prevent the player from spamming smaller numbers until they reach the final number (I tested this until it seemed fair)
    guessesLeft = Math.round(10 - ((crystals[0] + crystals[1] + crystals[2] + crystals[3]) / crystals.length) + (reachScore / 7));
    $("#guesses").text("Guesses Left: " + guessesLeft);

    // Check for crystalClick
    $(".btn-dark").on("click", crystalClick);

    console.log("Crystal 0: " + crystals[0]);
    console.log("Crystal 1: " + crystals[1]);
    console.log("Crystal 2: " + crystals[2]);
    console.log("Crystal 3: " + crystals[3]);
    console.log("Reach Score: " + reachScore);
    console.log("Guesses Left: " + guessesLeft);

    // Reset game if the reachScore is odd and there are no odd crystals (which makes the game un-winnable)
    unwinnable();
}

function isOdd(n) {return n % 2;}

function unwinnable(){
    if (isOdd(reachScore) == 1 && isOdd(crystals[0]) == 0 && isOdd(crystals[1]) == 0 && isOdd(crystals[2]) == 0 && isOdd(crystals[3]) == 0){
        // Backup for deleting crystals if the game was reset because it was un-winnable
        for (var i=0; i<crystals.length; i++) {
            $("#crystal" + i).remove();
        }
        console.log("Un-winnable situation detected! Reseting...");
        reset();
    }
}

function crystalClick(){
    var crystalId = $(this).attr("id");
    currentScore += parseInt($("#" + crystalId).attr("value"));

    $("#current").text("Current Score: " + currentScore);
    console.log("Current Score: " + currentScore);

    if (currentScore < reachScore || currentScore > reachScore){
        guessesLeft--;
    }

    $("#guesses").text("Guesses Left: " + guessesLeft);
    console.log("Guesses Left: " + guessesLeft);

    if (currentScore >= reachScore || guessesLeft <= 0){
        finish();
    }
}

function finish(){
    if (currentScore === reachScore){
        wins++;
        $("#win-loss").text("You Win!");
        $("#wins").text("Wins: " + wins);
    }
    if (currentScore > reachScore || guessesLeft == 0){
        losses++
        $("#win-loss").text("You Lose!");
        $("#losses").text("Losses: " + losses);
    }

    for (var i=0; i<crystals.length; i++) {
        $("#crystal" + i).remove();
    }

    var resetBtn = $("<button>")
    resetBtn.addClass("btn btn-primary");
    resetBtn.attr("id", "reset");
    resetBtn.text("Play Again");
    $("#resetBtn").append(resetBtn);
    $("#reset").on("click", reset);
}

$(document).ready(function(){

    reset();

});