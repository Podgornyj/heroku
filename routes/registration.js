const passport = require('koa-passport');
const User = require('../models/user');
const pick = require('lodash/pick');
const uuidV4 = require('uuid/v4');
const sendMail = require('../libs/sendmail/index.js');

exports.get = async function(ctx, next) {
	User.find({},function(err, users){
		console.log(users)
	})
    ctx.body = ctx.render('registration');
};

exports.post = async function(ctx, next) {
    let params = pick(ctx.request.body, User.publicFields);
    params.emailToken = uuidV4();
    let user = await User.create(params);
    sendMail({
        to: user.email,
        subject: 'Confirm Email',
        html: `Please confirm your Email:</br>
	    <a href=http://localhost:3000/confirm/${user._id}/${user.emailToken}>Confirm</a>
	    `
    });
    await ctx.login(user);
    ctx.redirect('/');
};