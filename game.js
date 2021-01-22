
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  userClickedPattern = [];
  level++;
  var levelChange = $("#level-title").text("Level:  " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
// Level up


  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function animatePress (currentColour) {
$(this)
.addClass("pressed")
.delay(10)
.queue(function(next){
  $(this).removeClass("pressed");
  next();
});
}

$('.btn').click(animatePress);

function once(fn, context) {
	var result;

	return function() {
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

// Usage
var start = once(function() {
	nextSequence();

});
$(document).keypress(start);

// Game pattern
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
