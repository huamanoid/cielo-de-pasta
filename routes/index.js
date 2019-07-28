var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User     = require("../models/user.js");
var middleware  = require("../middleware");



    
    //Root Slider Route
    router.get("/",function(req,res){
        res.render("landing.ejs");
    });
    //home route
     router.get("/home",function(req,res){
        res.render("home.ejs");
    });
    
    

    //%%%%%%%%%%%%%%%%%%%%%%%%%%
    //%%%%%   AUTH ROUTES  %%%%%
    //%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    // show register form
    router.get("/register", function(req, res){
       res.render("register.ejs"); 
    });
    
    //handle sign up logic
    router.post("/register", function(req, res){
        var newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err.message);
                
                return res.render("register.ejs");
            }
            passport.authenticate("local")(req, res, function(){
              req.flash("success", "Welcome To Cielo de pasta " + user.username);

               res.redirect("/"); 
            });
        });
    });
    
    // show login form
    router.get("/login", function(req, res){
       res.render("login.ejs",{message: req.flash("error")}); 
    });
    
    // handling login logic
    router.post("/login", passport.authenticate("local", 
        {
            successRedirect: "/especial",
            failureRedirect: "/login"
        }), function(req, res){
    });
    
    // logout route
    router.get("/logout", function(req, res){
       req.logout();
       req.flash("success", "logged you out");
       res.redirect("/");
    });
    
    //middleware
    
    
    module.exports=  router;