let passport = require('passport');

const Koa = require('koa');
const app = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');

const path = require('path');
const fs = require('fs');

app.keys = [config.get('secret')];

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
handlers.forEach(handler => require('./middlewares/' + handler).init(app));

const Router = require('koa-router');

const router = new Router();

// router.get('/', require('./routes/frontpage').get);
// router.get('/registration', require('./routes/registration').get);
// router.post('/registration', require('./routes/registration').post);
// router.post('/login', require('./routes/login').post);
// router.post('/logout', require('./routes/logout').post);
// router.get('/confirm/:id/:token', require('./routes/confirm').get);
// router.get('/resendconfirm/:token', require('./routes/resendconfirm').get);
//
// router.get('/login/google', passport.authenticate('google', {
// 	 display: 'popup',
//      scope:   ['email']
// }));
// router.get('/oauth/google/collback', passport.authenticate('google',{
// 	successRedirect : '/',
//     failureRedirect : '/'
// }));

app.use(router.routes());

app.listen(3000);
