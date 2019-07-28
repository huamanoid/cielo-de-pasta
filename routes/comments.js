var express = require("express");
var router  = express.Router({mergeParams: true});
// to access the :id from app.js in comments.js
var Dish    = require("../models/dish.js");
var comment = require("../models/comment.js");
var middleware  = require("../middleware");



//Comments New
    
    router.get("/new",middleware.isLoggedIn,function(req, res) {
        //console.log(req.params.id);
        Dish.findById(req.params.id,function(err,dish) {
            if(err)console.log(err);
            else res.render("newcom.ejs",{hiho:dish});
        })
    });
    
    //Comments Create
    router.post("/",middleware.isLoggedIn,function(req,res){
        Dish.findById(req.params.id,function(err, comondish) {
            if(err)console.log(err);
            else {
                comment.create(req.body.comment, function (err, createdcomment) {
                    if(err)console.log(err);
                    else{
                        // console.log(createdcomment);
                      
                        //add username and id to comment
                        createdcomment.author.id = req.user._id;
                        createdcomment.author.username = req.user.username;
                        //save comment
                        createdcomment.save(); 
                         //console.log(createdcomment);
                        //save comment
                        comondish.comments.push(createdcomment);
                        comondish.save();
                        req.flash("success","Successfully Added comment")
                        res.redirect('/especial/' + comondish._id);
                    }
                })
            }
        })
    }) 
    
    //false piece of code
    // router.get("/:comment_id/edit", function(req, res){
    //     comment.findById(req.params.id.comment_id, function(err, foundComment){
    //         if(err){
    //             res.redirect("back");
    //         } else {
    //             console.log(foundComment)
    //             console.log("\n\n\n");
                
    //             res.render("editcom.ejs", {Dishid: req.params.id, comm: foundComment})
    //         }
    //     })
    // })
    
    
    // COMMENT EDIT ROUTE
    router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
       comment.findById(req.params.comment_id, function(err, foundComment){
          if(err){
              res.redirect("back");
          } else {
            res.render("editcom.ejs", {Dishid: req.params.id, comment: foundComment});
          }
       });
    });
    
    // COMMENT UPDATE
    router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
       comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
           //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
           // the second argument reads the name 'comment' in body not the variable
           //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
           
          if(err){
              res.redirect("back");
          } else {
              res.redirect("/especial/" + req.params.id );
          }
       });
    });
    
    
    
    //comment destroy route
    
    router.delete("/:comment_id",middleware.checkCommentOwnership,function(req, res){
        //findbyid and remove
        comment.findByIdAndRemove(req.params.comment_id, function(err){
            if(err){
                res.redirect("back")
            } else{
                req.flash("success", "Comment deleted!");
                res.redirect("/especial/"+req.params.id)
            }
        })
    })
 
    
    
  
    
    module.exports = router;