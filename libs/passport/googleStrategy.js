const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/user');
const config = require('../../config/default');

passport.use(new GoogleStrategy({

        clientID        : config.providers.google.passportOptions.clientID,
        clientSecret    : config.providers.google.passportOptions.clientSecret,
        callbackURL     : config.providers.google.passportOptions.callbackURL

    },
    function(token, refreshToken, profile, done) {
    	let emailGoogleUser = profile.emails[0].value;
    	User.findOne({
    		email: emailGoogleUser
    	}, async function(err, user){
    		 if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {
                	let newUser = await User.create({
                		displayName:profile.displayName,
                		email: emailGoogleUser,
                		emailConfirm: true
                	});
                	return done(null, newUser);
                }
    	})
    })
)
