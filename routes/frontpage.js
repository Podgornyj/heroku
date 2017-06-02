exports.get = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
  	if(ctx.req.user.emailConfirm){
    ctx.body = ctx.render('welcome');
	}else{
	ctx.body = ctx.render('confirm');	
	}
  } else {
  	
    ctx.body = ctx.render('login');
  }

};
