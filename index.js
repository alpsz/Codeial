const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());


app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Codeial',
    //TODO change the secret before deployment in the production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passportLocal.initialize());
app.use(passportLocal.session());


//use express router
app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        //console.log('Error',err);
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});

