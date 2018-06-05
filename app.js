var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var morseTranslation = {
    "A" : ".-",
    "B" : "-...",
    "C" : "-.-.",
    " " : "      "
}

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.redirect("/morse-converter");
});

app.get("/morse-converter", function(req, res){
   res.render("morse_converter.ejs"); 
});

app.post("/morse-converter", function(req, res){
    var input = req.body.user_input.toUpperCase();
    //console.log(result);
    //console.log(typeof result);
    
    //// var inputArray = []
    //// for(var i=0; i<input.length; i++){
    ////     inputArray.push(input[i]);
    //// }
    
    //=======================
    var test = ""
    for(var i=0; i<input.length; i++){
        for(var key in morseTranslation){
            if(input[i]===key)
                test = test+morseTranslation[key]
        }
    }
    
    console.log(test)
    //=======================
    //console.log("InputArray: "+ typeof inputArray);
    //console.log(morseTranslation.A)
    res.render("result.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Morse to English server initialised.")
});