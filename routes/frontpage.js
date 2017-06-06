exports.get = async function(ctx, next) {
    tx.body = ctx.render('login');
    // if (ctx.isAuthenticated()) {
  // 	if(ctx.req.user.emailConfirm){
  //   ctx.body = ctx.render('welcome');
	// }else{
	// ctx.body = ctx.render('confirm');
	// }
  // } else {
  //
  //   ctx.body = ctx.render('login');
  // }

};
