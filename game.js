
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;

$(document).keydown(function(){
    if (level===0) {
        nextSequence();
    }
});

$("div.btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1#level-title").text("Game Over, Press Any Key to Restart!");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    let randomChosenColor = buttonColors[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeTo(100, 0.2, function() {
        $(this).fadeTo(500, 1.0);
    });
    $("h1#level-title").text("Level "+level);
    level++;
    playSound(randomChosenColor);
}

function playSound(name) {
    new Audio("./sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
    $("div#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("div#" + currentColor).removeClass("pressed");
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
}


