const express= require("express");
const bodyParser =require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app=express();

app.set("view engine" ,"ejs")
app.use(bodyParser.urlencoded({
    extended:true
    }
))
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/wikiDB" ,{useNewUrlParser: true});

const articleSchema={
    title: "string",
    content: "string"
}
const Article=mongoose.model("Article", articleSchema);

// chain route handlers
app.route("/articles")
    .get(function(req,res){
        Article.find(function(err, getTheArticle){
            res.send(getTheArticle);
        });
    })
    .post (function(req, res){
        console.log();
        console.log();
        const newArticle=new Article({
            name: req.body.name,
            content:req.body.content

        })
        newArticle.save(function(err){
                if (err){
                    res.send("please check there is a error")
                }
                else{
                    res.send("you have successfully send the data")
                }
            }

        )
    })
    .delete(function(req, res){
        articles.deleteMany(function(err){
            if(err){{
                res.send("you the got an error")
            }}
            else{
                res.send("you are the right path")
            }
        })

    })

// to get the specific data from the server

app.route("/articles/:articleName" )
    .get(function(req, res){
        Article.findOne({name: req.params.articleName}, function(err, foundArticle){
            if (foundArticle){
                res.send("send the article")
            }
            else{
                res.send("no articles")
            }
        })
        })
    .put(function(req, res) {
        Article.updateOne(
            {name: req.params.articleName},
            {name: req.body.name, content: req.body.content},
            function (err) {
                if (err) {
                    res.send("there is a response")

                } else {
                    res.send("there is no response")
                }

            })
    })




// the server runs on port 3000
        app.listen(3000, function () {
            console.log("this is local port")
        })

