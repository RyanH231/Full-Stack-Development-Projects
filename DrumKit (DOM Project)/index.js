var numOfDrums = document.querySelectorAll(".drum").length;


addEventListener("keydown", function(event)
{
    var key = event.key;
    HandleEvent(key);
})



for(var i =0; i < numOfDrums; i++)
{
   document.querySelectorAll(".drum")[i].addEventListener("click",function()
   {
        var drumText = this.innerHTML;
        HandleEvent(drumText);
   })
}


function HandleEvent(e)
{

    document.querySelector("." + e).classList.add("pressed");
   
   
    setTimeout(function(){
        document.querySelector("." + e).classList.remove("pressed");
    }, 100);

    switch(e)
    {
        case "w":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            w.classList.toggle("pressed");
            break;
        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        case "h":
            var audio = new Audio("sounds/hi-hat.ogg");
            audio.play();
            break;
        default:
            alert(drumText);
            break;    
    }
}