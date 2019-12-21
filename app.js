//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

const items = ["Buy food","Cook food","Eat food"];
const workItems = [];

//console.log(date);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  day = date.getDate();

  res.render("list", {
    listType: day,
    newListItems:items
  });
});

app.get("/work",function (req,res){

  res.render("list",{
    listType:"Work",
    newListItems:workItems
  });

});

app.get("/about",function (req,res){
  res.render("about");
});

app.post("/",function(req,res){
  var item = req.body.newItem;

  if(req.body.list=="Work"){
      workItems.push(item);
      res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
  //console.log("Received "+item);
});


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
