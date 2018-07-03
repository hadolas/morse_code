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

var englishTranslation = {
    ".-"   : "A",
    "-..." : "B",
    "-.-." : "C",
    "-.."  : "D",
    "."    : "E",
    "..-." : "F",
    "--."  : "G",
    "...." : "H",
    ".."   : "I",
    ".---" : "J",
    "-.-"  : "K",
    ".-.." : "L",
    "--"   : "M",
    "-."   : "N",
    "---"  : "O",
    ".--." : "P",
    "--.-" : "Q",
    ".-."  : "R",
    "..."  : "S",
    "-"    : "T",
    "..-"  : "U",
    "...-" : "V",
    ".--"  : "W",
    "-..-" : "X",
    "-.--" : "Y",
    "--.." : "Z",
    " "    : "_"
}


//SETUP
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));


//REDIRECT ROOT ROUTE
app.get("/", function(req, res){
    res.redirect("/english-to-morse");
});

//RENDER english-to-morse
app.get("/english-to-morse", function(req, res){
   res.render("english-to-morse");
});

//Translate user input (English) into Morse and render result page.
app.post("/english-to-morse", function(req, res){
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
    res.render("result", {result:result});
});

//RENDER morse-to-english
app.get("/morse-to-english", function(req, res){
    res.render("morse-to-english");
});

app.post("/morse-to-english", function(req, res){
    var input = req.body.user_input.split(" ");
    var result=""
    console.log(input);
        for(var i=0; i<input.length; i++){
        for(var key in englishTranslation){
            //if the character in the input string is equal to the object key...
            if(input[i]===key){
                //...append the corresponding object key value (Morse character) to 'result' string
                result = result+englishTranslation[key];
            }
        }
    }
    console.log(result);
    res.render("result", {result:result});
});

//RENDER morse key guide

app.get("/morse-key-guide", function(req, res){
   res.send("Morse Key Guide page"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Morse Convertor server initialised.");
});