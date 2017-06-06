let passport = require('passport');

exports.get = async function(ctx, next) {
	passport.authenticate('google')
}