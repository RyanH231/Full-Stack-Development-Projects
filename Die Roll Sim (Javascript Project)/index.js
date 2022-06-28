var randNum = Math.floor(Math.random() * 6) + 1;

var img = document.querySelector(".img1");
img.setAttribute("src","dice" + randNum + ".png");

var randNum2 = Math.floor(Math.random() * 6) + 1;
var img2 = document.querySelector(".img2");
img2.setAttribute("src","dice" + randNum2 + ".png");

if(randNum > randNum2)
{
    document.querySelector("h1").innerHTML = "Player 1 Wins!"
}
else if (randNum2 > randNum)
{
    document.querySelector("h1").innerHTML = "Player 2 Wins!"
}
else 
{
    document.querySelector("h1").innerHTML = "Draw!"
}
