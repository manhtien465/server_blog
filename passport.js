const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const key = require("./config/key");
const Users = require("./scheme/users");
const UsersFacebook =require("./scheme/usersfacebook")
const UsersGoogle =require("./scheme/usersgoole")

var jwtOptions = {};
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");

var jwt = require("jsonwebtoken");
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(
  "authorization"
); //  Tên cần đúng như thế này
jwtOptions.secretOrKey = key.jwt.JWT_SECRET;
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    console.log(payload);

    Users.findOne({ _id: payload.sub }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: key.google.clientID,
      clientSecret: key.google.clientSecret,
      callbackURL: "http://localhost:3402"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refeshToken", refreshToken);
      console.log(profile);
      try {

        const existuserGoogle = await UsersGoogle.findOne({id:profile.id });
        

        if (existuserGoogle) {
          return done(null, existuserGoogle);
        } else {
          const newUser = new UsersGoogle({
           
           
              id: profile.id,
              username: profile.name.givenName
            
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
passport.use(
  "FacebookToken",
  new FacebookTokenStrategy(
    {
      clientID: key.facebook.clientID,
      clientSecret: key.facebook.clientSecret,
      
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refeshToken", refreshToken);
      console.log(profile);
      try {
       
        
        const existuserFacbook = await UsersFacebook.findOne({id: profile.id });
        

        if ( existuserFacbook) {
          return done(null, existuserFacbook);
        } else {
          const newUser = new UsersFacebook({
           
           
              id: profile.id,
              email: profile.emails[0].value
            
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
//LOCAL STRETEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false);
        }
        //checked verify email
        if(!user.active){
          return done(null,false,{mes:"you need verify email"})
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
