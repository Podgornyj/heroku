const passport = require('koa-passport');
const User = require('../../models/user');

require('./serialize');

require('./localStrategy');
require('./googleStrategy');

module.exports = passport;
