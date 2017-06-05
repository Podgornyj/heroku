const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret:   'mysecret',
  mongoose: {
      //uri:     'mongodb://localhost/app',
      //uri:     'mongodb://Test:Test1@cluster0-shard-00-00-h3esm.mongodb.net:27017,cluster0-shard-00-01-h3esm.mongodb.net:27017,cluster0-shard-00-02-h3esm.mongodb.net:27017/testDataBase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
        uri:'mongodb://test:test1@ds163181.mlab.com:63181/testnodedb',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      }
    }
  },
  providers:{
    google:{
      passportOptions:{
        clientID: '1069145840511-tv5on9nu965p7haf37va2tkjidih3jm9.apps.googleusercontent.com',
        clientSecret: 'VpA8rDyrIQXsVVk1tEC-C4Su',
        callbackURL: 'http://localhost:3000/oauth/google/collback'
      }
    }
  },
  crypto: {
    hash: {
      length:     128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: 12000
    }
  },
  template: {
    // template.root uses config.root
    root: defer(function(cfg) {
      return path.join(cfg.root, 'templates');
    })
  },
  root:     process.cwd()
};
