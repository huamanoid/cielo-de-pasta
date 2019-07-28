var express     = require("express");
var router      = express.Router();
var Dish        = require("../models/dish.js");
var middleware  = require("../middleware");



//show items from database
    router.get("/",function(req,res){
        
        
        Dish.find({},function(err,items){
           if(err)console.log(err);
           else{res.render("especial.ejs",{menuitems:items});}
        });
    });

//new route
    router.get("/new",middleware.isLoggedIn,function(req, res) {
        res.render("new.ejs");
    })
    
//create Route
    router.post("/",middleware.isLoggedIn,function(req,res) {
        //get data from the page and add it to array
        var name  = req.body.name;
        var price = req.body.price;
        var image = req.body.image;
        var author= {
            id: req.user._id,
            username: req.user.username
        }
        var item  = {name:name,price: price,image:image, author:author};
        
        Dish.create(item,function(err,newlyaddedtodb){
           if(err)console.log(err);
           
           else {
           console.log(newlyaddedtodb);
           res.redirect("/especial");
            }});
        
    });
    
    //show route
    router.get("/:id",function(req, res) {
       //Dish.findById(req.params.id, function(err,founditem){
       Dish.findById(req.params.id).populate("comments").exec(function(err, founditem){

            if(err)console.log(err);
            else {
                res.render("show.ejs",{hiho : founditem});
            }
       });
    });
    
    //edit dishes route
    router.get("/:id/edit",middleware.checkDishOwnership,function(req, res){
        
                Dish.findById(req.params.id,function(err, foundDish){
                res.render("edit.ejs",{dish: foundDish});
                });
    });
    
    //update campground route
    router.put("/:id",function(req, res){
        //find and update the correct campground
        
        Dish.findByIdAndUpdate(req.params.id, req.body.dish, function(err,updatedDish){
            if(err){
                res.redirect("/especial");
            }else {
                res.redirect("/especial/" + req.params.id);
            }
        })
    })
    
    //destroy campground route
    router.delete("/:id",middleware.checkDishOwnership,function(req,res){
        Dish.findByIdAndRemove(req.params.id, function(err){
            if(err){ 
                res.redirect("/especial/" + req.params.id);
            } else {
                 res.redirect("/especial/");
            }
            
        })
           
    })
    
    

    
    module.exports =router;