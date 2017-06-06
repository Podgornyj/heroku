const User = require('../models/user');

exports.get = async function(ctx, next) {
    let params = ctx.params;
    await User.findOne({
        _id: params.id
    }, function(err, user) {
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
        if (user.emailToken === params.token) {
            user.emailConfirm = true;
            user.save(function(err, user) {
                if (err) {
                    throw err
                    return
                };
                ctx.redirect('/');
            })
        };
    })
};