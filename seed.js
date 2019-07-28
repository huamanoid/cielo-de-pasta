var mongoose = require("mongoose"),
    dish     = require("./models/dish.js"),
    comment    = require("./models/comment.js")
    
var data = [
        {name : "Spaghetti Bolognese", 
        image: "https://images.unsplash.com/photo-1531089073319-17596b946d42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        author:{
            id : "5c94b8035c0a6e282670d57f",
            username: "aman"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquam dolor, sed vulputate nisi. Proin sollicitudin suscipit urna at porttitor. Sed sodales ex egestas mauris dignissim ullamcorper. Nullam leo metus, condimentum eget dolor quis, faucibus porttitor urna. Mauris neque tellus, malesuada in imperdiet in, finibus quis metus. Donec maximus, diam vitae ultrices aliquam, mauris quam accumsan urna, eget euismod neque magna eget tellus. Cras sed nisl vel lorem gravida placerat finibus interdum erat. Pellentesque sodales placerat sapien in hendrerit."    
        },
        
        {name : "Pasta Con Pomodoro E Basilico",
        image : "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        author:{
            id : "5c94b8035c0a6e282670d57f",
            username: "aman"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquam dolor, sed vulputate nisi. Proin sollicitudin suscipit urna at porttitor. Sed sodales ex egestas mauris dignissim ullamcorper. Nullam leo metus, condimentum eget dolor quis, faucibus porttitor urna. Mauris neque tellus, malesuada in imperdiet in, finibus quis metus. Donec maximus, diam vitae ultrices aliquam, mauris quam accumsan urna, eget euismod neque magna eget tellus. Cras sed nisl vel lorem gravida placerat finibus interdum erat. Pellentesque sodales placerat sapien in hendrerit."       
        }
        ,
        {name : "Gnocchi with Tomato Sauce", 
        image : "https://images.unsplash.com/photo-1521775219710-2db5c11f85e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        author:{
            id : "5c94b8035c0a6e282670d57f",
            username: "aman"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquam dolor, sed vulputate nisi. Proin sollicitudin suscipit urna at porttitor. Sed sodales ex egestas mauris dignissim ullamcorper. Nullam leo metus, condimentum eget dolor quis, faucibus porttitor urna. Mauris neque tellus, malesuada in imperdiet in, finibus quis metus. Donec maximus, diam vitae ultrices aliquam, mauris quam accumsan urna, eget euismod neque magna eget tellus. Cras sed nisl vel lorem gravida placerat finibus interdum erat. Pellentesque sodales placerat sapien in hendrerit."   },
        
        {name : "Ravioli",
        image : "https://images.unsplash.com/photo-1532939624-3af1308db9a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        author:{
            id : "5c94b8035c0a6e282670d57f",
            username: "aman"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquam dolor, sed vulputate nisi. Proin sollicitudin suscipit urna at porttitor. Sed sodales ex egestas mauris dignissim ullamcorper. Nullam leo metus, condimentum eget dolor quis, faucibus porttitor urna. Mauris neque tellus, malesuada in imperdiet in, finibus quis metus. Donec maximus, diam vitae ultrices aliquam, mauris quam accumsan urna, eget euismod neque magna eget tellus. Cras sed nisl vel lorem gravida placerat finibus interdum erat. Pellentesque sodales placerat sapien in hendrerit."   },
        
        {name : "Spaghetti Aglio Olio Peperocino",
        image : "https://images.unsplash.com/photo-1528510138849-786a5feddf94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        author:{
            id : "5c94b8035c0a6e282670d57f",
            username: "aman"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquam dolor, sed vulputate nisi. Proin sollicitudin suscipit urna at porttitor. Sed sodales ex egestas mauris dignissim ullamcorper. Nullam leo metus, condimentum eget dolor quis, faucibus porttitor urna. Mauris neque tellus, malesuada in imperdiet in, finibus quis metus. Donec maximus, diam vitae ultrices aliquam, mauris quam accumsan urna, eget euismod neque magna eget tellus. Cras sed nisl vel lorem gravida placerat finibus interdum erat. Pellentesque sodales placerat sapien in hendrerit."   },
    
        {name : "Penne Arabiatta / Alfredo",
        image : "https://images.unsplash.com/photo-1541013406133-94ed77ee8ba8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        author:{
            id : "5c94b8035c0a6e282670d57f",
            username: "aman"
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquam dolor, sed vulputate nisi. Proin sollicitudin suscipit urna at porttitor. Sed sodales ex egestas mauris dignissim ullamcorper. Nullam leo metus, condimentum eget dolor quis, faucibus porttitor urna. Mauris neque tellus, malesuada in imperdiet in, finibus quis metus. Donec maximus, diam vitae ultrices aliquam, mauris quam accumsan urna, eget euismod neque magna eget tellus. Cras sed nisl vel lorem gravida placerat finibus interdum erat. Pellentesque sodales placerat sapien in hendrerit."   
        }
        
    ]



function seedDB(){
    
    //remove all dishes
     dish.remove({},function(err){
        
        if(err){
            console.log(err);
        }    
        else console.log("removed dish");
    // add dishes from data
             data.forEach(function(seed){
                 dish.create(seed,function(err,newdata){
                     if(err)console.log(err);
                     else console.log("added a dish!!!");
                    
                    // create a comment
                    comment.create({
                        text: "This is magically treacherous!",
                        author:{
                            id : "5c94b8035c0a6e282670d57f",
                            username: "aman"
                        },
                    },function(err,createdcomment){
                        if(err)console.log(err);
                        else {
                            newdata.comments.push(createdcomment);
                            newdata.save();
                            console.log("*commented*");
                        }
                    })
                    
                    
                    
                 })
             })
    });
  
}

module.exports = seedDB;
    
    
