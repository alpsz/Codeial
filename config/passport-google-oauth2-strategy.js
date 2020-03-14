const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use this property for google login
passport.use(new googleStrategy ({
    clientID:"432009645291-jjk4ldg7rn7a3oontik7sapa0pdo5urh.apps.googleusercontent.com",
    clientSecret:"Aw8HVH6hKDKCybOOSpWcnRnG",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},

    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy passport.",err);
                return;
            }
            console.log(profile);
            
            //if found set this user as req.user
            if(user){
                return done(null,user);
            }else{
                //if not found, create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.email,
                    password:crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if(err){
                        console.log("Error in google strategy passport.",err);
                        return;
                    }

                    return done(null,user);
                })
            }
        })
    }



));

module.exports = passport;