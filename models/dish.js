var mongoose = require("mongoose");


var dishSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
                //ref refers to the model that we are going to refer to 
            },
            username: String
        }
});
    
    module.exports = mongoose.model("Dish",dishSchema);