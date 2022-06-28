const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res)
{
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res)
{
   var num1 = Number(req.body.Text1);
   var num2 = Number(req.body.Text2);

   var result = num1 * num2;
   res.send("The result is " + result); 
})


app.get("/bmiCalculator", function(req,res)
{
    res.sendFile(__dirname + "/bmiCalculator.html");
})




app.post("/bmiCalculator", function(req,res)
{
   var weight = Number(req.body.num1);
   var height = Number(req.body.num2);

   var result = weight / (height * height);
   
   res.send("The calculated BMI is " + result); 
})

app.listen(3005,function(){
    console.log("Server is connected.");
})