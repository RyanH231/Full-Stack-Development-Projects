
var colours = ["red","yellow","green","blue"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var notStarted = true;
var indexCounter = 0;

function NextSequence()
{
    level++;
    $("#level-title").html("Level: " + level);

    var randNum = Math.floor(Math.random() * 4);
    var randomColour = colours[randNum];
    gamePattern.push(randomColour);

    var fader = $("#" + randomColour);
    fader.fadeOut(450).fadeIn(450).fadeOut(450).fadeIn(450);

    var faderSound = new Audio("sounds/" + randomColour + ".mp3");
    faderSound.play();

}

$(document).keypress(function(e)
{
    if(notStarted && e.keyCode == 65)
    {
        NextSequence();
        notStarted = false;
    }
})

function PlayAudio(clickedColour)
{
    var a = new Audio("sounds/" + clickedColour + ".mp3");
    a.play();
}

function AnimatePress(clickedColour)
{
    var fader = "#" + clickedColour;
    $(fader).addClass("pressed");

    setTimeout(function(){
        $(fader).removeClass("pressed");
    }, 100);
}

$('.btn').click(function(event){
    if(!notStarted)
    {
        var userChosenColour = event.target.id; 
        userClickedPattern.push(userChosenColour);
        PlayAudio(userChosenColour);
        AnimatePress(userChosenColour);
        var clickedAnswer = userClickedPattern.length-1;
        CheckAnswer(clickedAnswer);
    }
})

function CheckAnswer(checkLevel)
{   
     if(userClickedPattern[checkLevel] === gamePattern[checkLevel])
     {
       console.log("Success!");     
       if(checkLevel === gamePattern.length - 1)
        {
            userClickedPattern = [];
            setTimeout(function(){
            NextSequence();
            }, 1000);
        }       
     }
     else
     {
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();
      
       $("body").addClass("game-over");

       setTimeout(function(){
            $("body").removeClass("game-over");
       }, 200);

       $("h1").html("Game over, press A key to restart!");
       StartOver();
       console.log("Failure");
     }
}

function StartOver()
{
    gamePattern = [];
    notStarted = true;
    level = 0;
}