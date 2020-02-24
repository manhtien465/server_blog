

var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../scheme/usersgoole');
const key =require("./key")
passport.use(
 new GoogleStrategy(
  {
   clientID:key.google.clientID,
   clientSecret: key.google.clientSecret,
   callbackURL: "http://localhost:3402/login/google/callback"
  },function(accessToken, refreshToken, profile, done) {
    User.findById(profile.userid, function (err, user) {
        if(!user){
            var newUser= new User({
                name:profile.displayName,
                userid: profile.id
            })
            newUser.save()
        }else{
            return done(err, user);
        }
          
        
     
    });
    
      
    
}
));

module.exports = passport;