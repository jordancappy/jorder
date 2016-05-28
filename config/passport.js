var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    	User.findById(id, function(err, user) {
    		done(err, user);
    	});
    });

   passport.use(new GoogleStrategy({
    	clientID: configAuth.googleAuth.clientID,
    	clientSecret: configAuth.googleAuth.clientSecret,
    	callbackURL: configAuth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile,done){
    	process.nextTick(function(){
    		User.findOne({'google.id': profile.id}, function(err, user){
    			if (err) return done(err);

    			if(user) return done(null,user);
    			else
    			{
    				var newUser = new User();

    				newUser.google.id = profile.id;
    				newUser.google.token = token;
    				newUser.google.name = profile.displayName;
    				newUser.username = profile.emails[0].value;

    				newUser.save((err)=>{
    					if (err) throw err;

    					return done(null,newUser);
    				})
    			}
    		})
    	});
    }));
};