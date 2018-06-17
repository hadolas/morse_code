var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var morseTranslation = {
    "A" : ".-",
    "B" : "-...",
    "C" : "-.-.",
    "D" : "-..",
    "E" : ".",
    "F" : "..-.",
    "G" : "--.",
    "H" : "....",
    "I" : "..",
    "J" : ".---",
    "K" : "-.-",
    "L" : ".-..",
    "M" : "--",
    "N" : "-.",
    "O" : "---",
    "P" : ".--.",
    "Q" : "--.-",
    "R" : ".-.",
    "S" : "...",
    "T" : "-",
    "U" : "..-",
    "V" : "...-",
    "W" : ".--",
    "X" : "-..-",
    "Y" : "-.--",
    "Z" : "--..",
    " " : "      "
}

//SETUP
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));


//REDIRECT ROOT ROUTE
app.get("/", function(req, res){
    res.redirect("/morse-converter");
});

//RENDER morse_converter
app.get("/morse-converter", function(req, res){
   res.render("morse_converter.ejs"); 
});

//Translate user input (English) into Morse and render result page.
app.post("/morse-converter", function(req, res){
    var input = req.body.user_input.toUpperCase();
    var result = ""
    for(var i=0; i<input.length; i++){
        for(var key in morseTranslation){
            //if the character in the input string is equal to the object key...
            if(input[i]===key){
                //...append the corresponding object key value (Morse character) to 'result' string
                result = result+" "+morseTranslation[key];
            }
        }
    }

    
    console.log(result);

    res.render("result.ejs", {result:result});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Morse Convertor server initialised.");
});