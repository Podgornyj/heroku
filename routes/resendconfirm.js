const User = require('../models/user');
const sendMail = require('../libs/sendmail');
const uuidV4 = require('uuid/v4');

exports.get = async function(ctx, next) {
	let params = ctx.params;
	await User.findOne({
		emailToken: params.token
	},function(err, user){
		 if (err) {
            throw err
            return
        };
        if(!user){
        	ctx.body = "User not found"
            return
        }
        if (user.emailConfirm) {
            ctx.body = "User's email has been confirmed before"
            return
        };
        if (user.emailToken !== params.token) {
            ctx.body = "Invalid token"
            return
        };
        if (user.emailToken === params.token && !user.emailConfirm) {
        	let newEmailToken = uuidV4();
        	user.emailToken = newEmailToken
        	user.save(function(err, user) {
                if (err) {
                    throw err
                    return
                };
            })
               sendMail({
		        to: user.email,
		        subject: 'Confirm Email',
		        html: `Please confirm your Email:</br>
			    <a href=http://localhost:3000/confirm/${user._id}/${user.emailToken}>Confirm</a>
			    `
    		});
            ctx.redirect('/');   
        };
	})
}