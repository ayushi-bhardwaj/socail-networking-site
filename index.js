const express= require('express');
const cookieParser=require('cookie-parser')
const app=express();
const port=8000;
const router=require('./routes/index');
const expressLayouts=require('express-ejs-layouts')
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const { MongoStore } = require('connect-mongo');
const mongoStore=require('connect-mongo')(session);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'))
app.use(expressLayouts)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codial',
    secret:'ayushiisbest',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new mongoStore({
        
            mongooseConnection:db,
            autoRemove:'disabled'
        
    },function(err){
        console.log(err||'connect-mongodb setup okay')
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use('/',router);
app.listen(port,function(err){
    if(err)
    {
       console.log(`Error in running the server :${err}`)
    }
    console.log(`server is running on port :${port}`)
})
