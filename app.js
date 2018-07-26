var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var engToMorse = {
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
    " " : "\xa0\xa0\xa0\xa0"
};

var morseToEng = {
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
    "/"    : " "
};


//SETUP
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));


//ROOT ROUTE - REDIRECT TO /english-to-morse
app.get("/", function(req, res){
    res.redirect("/english-to-morse");
});


//RENDER english-to-morse
app.get("/english-to-morse", function(req, res){
    //loop through engToMorseObj and add each key:value to the 'keyGuide' string
    var keyGuide=[];
    for(var key in engToMorse){
        if(engToMorse.hasOwnProperty(key)){
            keyGuide.push(key + " : " + engToMorse[key]);
        }
    }
    console.log("This is keyguide: "+keyGuide);
    res.render("english-to-morse", {keyGuide:keyGuide});
});

//Translate user input into English or Morse and render result page.
app.post("/english-to-morse", function(req, res){
    var input = req.body.user_input.toUpperCase();
    var result="";
    // if the first character in user input is NOT "." or "-" then convert from English to Morse
    if(input[0]!=="."||input[0]==="-"){
        for(var i=0; i<input.length; i++){
            for(var key in engToMorse){
                //if the character in the input string is equal to the object key...
                if(input[i]===key){
                    //...append the corresponding object key value (Morse character) to 'result' string
                    result = result+" "+engToMorse[key];
                }
            }
        }
        console.log(result);
    //ELSE (if the first character in user input IS a "." or "-") THEN convert from Morse to English
    } else {
        //Create a list where user input is split at each " "
        input=input.split(" ");
        for(var i=0; i<input.length; i++){
            for(var key in morseToEng){
                if(input[i]===key){
                    result = result+morseToEng[key];
                }
            }
        }
    }
    res.render("result", {result:result});
});


//RENDER morse key guide
app.get("/morse-key-guide", function(req, res){
   res.send("Morse Key Guide page"); 
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Morse Convertor server initialised.");
});