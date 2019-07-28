var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    Dish                  = require("./models/dish.js"),
    flash                 = require("connect-flash"),
    comment               = require("./models/comment.js"),
    seedDB                = require("./seed.js"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
var port = process.env.PORT || 1000;

    //requiring ROUTES
var commentRoutes         =require("./routes/comments"),
    dishesRoutes          =require("./routes/dishes"),
    indexRoutes           =require("./routes/index")
    
    app.use(express.static("public"));
    mongoose.connect("mongodb://localhost/pasta_dishes");
    app.use(bodyParser.urlencoded({extended: true}));
    //conventional
    app.use(methodOverride("_method"));
    app.use(flash());
    seedDB();
    
     //PASSPORT CONFIGURATION
     app.use(require("express-session")({
            secret: "ula la la la le yo, ula la la la la le ye o",
            resave: false,
            saveUninitialized: false
        }));
        
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    
    //this piece of code helped us to not substitute the value of current User in every page containing navbar
    app.use(function(req, res, next){
       res.locals.currentUser = req.user;
       res.locals.error     = req.flash("error");
       res.locals.success   = req.flash("success");

       next();
    });

    
    
    app.use("/", indexRoutes);
    app.use("/especial",dishesRoutes);
    app.use("/especial/:id/comments",commentRoutes);
        
    app.listen(port, ()=>{
        console.log("listening on port 1000");
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   
    
    
    