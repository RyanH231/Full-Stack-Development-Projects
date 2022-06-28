const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require('cors');



const app = express();

//allow cross-origin requests
//app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}));

mongoose.connect("mongodb+srv://<User>:<Password>@cluster0.yigwizs.mongodb.net/BookDatabase");
mongoose.connection.once('open', function()
{
    console.log("Connected with mongoose");
});


app.listen(4000,function(){
    console.log("Server is connected.");
});
