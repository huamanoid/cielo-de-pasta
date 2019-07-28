var Dish          = require("../models/dish.js");
var comment       = require("../models/comment.js")
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be logged in first!");
        res.redirect("/login");
    }
    
    
    
middlewareObj.checkCommentOwnership = function(req,res,next) {
             if(req.isAuthenticated()){
                   
                comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            } else{
                //does user own the dish
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                     req.flash("error", "You don't have the permission");
                    res.redirect("back");
                 }
                 
            }
        })
                
            } else {
                 req.flash("error", "You need to be logged in first!");
                res.redirect("back");
            }
         }
    
    
middlewareObj.checkDishOwnership = function(req,res,next) {
             if(req.isAuthenticated()){
                   
                Dish.findById(req.params.id,function(err,foundDish){
            if(err){
                req.flash("error","campground not found")
                res.redirect("back");
            } else{
                //does user own the dish
                if(foundDish.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have the required permission!")
                    res.redirect("back");
                 }
                 
            }
        })
                
            } else {
                req.flash("error", "You need to be logged in to do that!!!")
                res.redirect("back");
            }
         }
   
   
   module.exports  = middlewareObj;