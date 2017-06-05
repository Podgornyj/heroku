// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files
require('babel-register');
require('babel-polyfill;);
let passport = require('passport');
// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

/*
  transfermoney.com
  vasya -> masha

  GET /tranferMoney?amount=100&to=Masha
    ctx.isAuthenticated() ? balance > 100 ? masha + 100

  hacker
    hi Vasya,
    look at this pic:
      <a href="transfermoney.com/tranferMoney?amount=100&to=hacker">pic</a>

*/

const Koa = require('koa');
const app = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');

const path = require('path');
const fs = require('fs');

app.keys = [config.get('secret')];

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
handlers.forEach(handler => require('./middlewares/' + handler).init(app));

// ---------------------------------------

// can be split into files too
const Router = require('koa-router');

const router = new Router();

router.get('/', require('./routes/frontpage').get);
router.get('/registration', require('./routes/registration').get);
router.post('/registration', require('./routes/registration').post);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);
router.get('/confirm/:id/:token', require('./routes/confirm').get);
router.get('/resendconfirm/:token', require('./routes/resendconfirm').get);

router.get('/login/google', passport.authenticate('google', {
	 display: 'popup',
     scope:   ['email']
}));
router.get('/oauth/google/collback', passport.authenticate('google',{
	successRedirect : '/',
    failureRedirect : '/'
}));
// router.get('/', require('./routes/login').post);

app.use(router.routes());

app.listen(3000);
