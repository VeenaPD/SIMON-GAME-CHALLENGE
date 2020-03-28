var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level" + " " + level);
    nextGeneration();
    started = true;
  }
});

function nextGeneration() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut()
    .fadeIn();
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
    console.log(gamePattern, userClickedPattern);
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextGeneration();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        $("#level-title").text("Game over, press any key to restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
          }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
