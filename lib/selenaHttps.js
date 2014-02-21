/*
 * selena
 * httpss://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

/*
 * Module Dependencies
 */

var crypto = require('crypto');
var mongoose = require('mongoose');
var loader = require('./loader');
var express = require('express');
var passport = require('passport');
var consolidate = require('consolidate');
var mongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var helpers = require('view-helpers');
var https = require('https');
var debug = require('./debugger');
var logger = require('demi-logger');
var livi18n = require('livi18n');
var cors = require('cors');
var path = require('path');
var fs = require('fs');
require('colors');

/*
 * Private Methods
 */

function loadConfigs(app, cb) {
  //Load configs
  return loader.configs(app, cb);
}

function loadMiddlewares(app, cb) {
  //Load middlewares
  return loader.middlewares(app, cb);
}

function loadServices(app, cb) {
  //Load services
  return loader.services(app, cb);
}

function loadModels(cb) {
  //Load models
  return loader.models(cb);
}

function loadControllers(app, cb) {
  //Load controllers
  return loader.controllers(app, cb);
}

function loadSockets(server, cb) {
  //Load sockets
  return loader.sockets(server, cb);
}

function redirectToHttps(app) {
  app.get('*', function(req, res) {
    res.redirect('httpss://' + app.get('app').url + req.originalUrl);
  });
}

/**
 * Constructor
 *
 * @class SelenaHttps
 * @constructor
 *
 * @example
 *
 *     var app = selena(403, {});
 *
 * @param {String} port The app port
 * @param {Object} options The mongoose connect options
 * @return {Object} Returns a instance of express();
 */

function Selena(port, options) {

  /*
   * Environment.
   */

  var app = express();

  // Set the node enviornment variable if not set before
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  //Load Custom settings
  loadConfigs(app, function() {
    debug('Custom settings loadded', 'success', 'https');
  });

  var httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', global.configs.ssl.key)),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', global.configs.ssl.cert))
  };

  //Port
  app.set('port', process.env.PORT || 22792);

  // assign the template engine to .html files
  app.engine('html', consolidate[app.get('app').templateEngine]);

  // set .html as the default extension
  app.set('view engine', 'html');

  // Set views path, template engine and default layout
  app.set('views', path.join(__dirname, '..', 'app', 'views'));

  //Jsonp support
  app.enable('jsonp callback');

  //All environments
  app.configure(function() {

    //Database manager
    if (app.get('database').enabled) {

      //Define db instance
      options = options || {};

      //Db
      var db;

      //Bootstrap db connection
      if (mongoose.connection.readyState) {
        //If connection exists use this connection
        db = mongoose.connection;
      } else {
        //If not connected, connect and use this connection
        mongoose.connect(app.get('database').uri, options);
        db = mongoose.connection;
      }

      //MongoDB ErrorHandler
      if (app.get('env') !== 'test') {
        db.on('error', console.error.bind(console, 'Connection error:'.red));
      }

      //MongoDB ConnnectedEvent
      db.on('connected', function() {
        debug('MongoDB connected successfully', 'success', 'https');
      });

      //MongoDB DisconnnectedEvent
      db.on('disconnected', function() {
        debug('MongoDB disconnected', 'warning', 'https');
      });

      //MongoDB autoClose
      process.on('SIGINT', function() {
        mongoose.connection.close(function() {
          debug('Mongoose disconnected through app termination', 'error', 'https');
          process.exit(0);
        });
      });
    }

    //Logger
    if (app.get('env') !== 'test') {
      app.use(express.logger(logger));
    }

    //CookieParser
    app.use(express.cookieParser(app.get('auth').sessionSecret));

    //Headers
    if (app.get('app').httpss) {
      app.enable('trust proxy');
    }

    //Headers
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());

    //SessionManager
    if (app.get('database').enabled && app.get('env') !== 'test') {
      // Express/Mongo session storage
      app.use(express.session({
        secret: app.get('auth').sessionSecret,
        store: new mongoStore({
          db: mongoose.connections[0].db,
          collection: app.get('database').sessionCollection
        })
      }));
    } else {
      //Express Session
      app.use(express.session());
    }

    // Connect flash for flash messages
    app.use(flash());

    app.use(function(req, res, next) {
      res.removeHeader('X-Powered-By');
      res.setHeader('X-Powered-By', app.get('app').powered_by);
      next();
    });

    //Compress
    app.use(express.compress({
      filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
      },
      // Levels are specified in a range of 0 to 9, where-as 0 is
      // no compression and 9 is best compression, but slowest
      level: 9
    }));

    //Favicon
    app.use(express.favicon());

    //Enable csrf
    if (app.get('app').csrf) {
      app.use(express.csrf());
    }

    //Cors Options
    var corsOptions = app.get('cors');
    //Cors
    if (corsOptions.allRoutes) {
      app.use(cors(corsOptions));
      debug('CORS support enabled', 'success', 'https');
    }

    /*
     * Middlewares.
     */

    //Load Custom Middlewares
    loadMiddlewares(app, function() {
      debug('Middlewares loadded', 'success', 'https');
    });

    // Dynamic helpers
    app.use(helpers(app.get('app').name));

    //Check if authentication is enabled
    if (app.get('auth').enabled) {
      //Authentication provider
      app.use(passport.initialize());
      //Use passport session
      app.use(passport.session());
    }

    //Internationalisation (i18n)
    if (app.get('i18n').enabled) {
      //I18n Provider
      app.use(livi18n.init(app, {
        defaultLanguage: app.get('i18n').defaultLanguage,
        languages: app.get('i18n').languages,
        storageKey: app.get('i18n').StorageKey,
        cookie: app.get('i18n').cookie,
        cookieSettings: app.get('i18n').cookieSettings,
        socket: app.get('i18n').socket,
        serveClient: app.get('i18n').serveClient,
        path: path.join(__dirname, '..', 'app', app.get('i18n').path)
      }));
      //Locales loaded successfully
      debug('Locales loadded', 'success', 'https');
    }

    //Configs
    app.locals = {
      configs: global.configs,
      md5: function(string) {
        return crypto.createHash('md5').update(string).digest("hex");
      }
    };

    //User
    app.use(function(req, res, next) {
      res.locals.user = req.user;
      res.locals.msg = req.flash();
      next();
    });

    //Static files
    app.use(express.static(path.join(__dirname, '..', 'app', 'public')));
    app.use(express.static(path.join(__dirname, '..', 'app', 'assets')));

    //ResponseTime
    app.use(express.responseTime());

    //Router
    app.use(app.router);

    //Error 500 Handler
    app.use(function(err, req, res, next) {
      console.error(err.stack);
      var error500 = app.get('errors')['500'].message.replace(/:method/, req.method).replace(/:path/, req.url);

      // Log it
      console.error(err.stack);
      //Error 500
      if (req.xhr) {
        res.jsonp(500, {
          message: error500,
          error: err.stack
        });
      } else {
        res.status(500).render('500', {
          message: error500,
          error: err.stack
        });
      }
    });

    //Error 404 Handler
    app.use(function(req, res) {
      var error404 = app.get('errors')['404'].message.replace(/:method/, req.method).replace(/:path/, req.url);
      //Error 500
      if (req.xhr) {
        res.jsonp(404, {
          url: req.originalUrl,
          message: error404,
        });
      } else {
        res.status(404).render('404', {
          url: req.originalUrl,
          message: error404
        });
      }
    });

  });

  //ErrorHandler
  app.configure('development', function() {
    app.use(express.errorHandler());
  });

  /*
   * Services
   */
  loadServices(app, function() {
    debug('Services loadded', 'success', 'https');
  });

  /*
   * Models
   */

  //Load Models
  loadModels(function() {
    debug('Models loadded', 'success', 'https');
  });

  /*
   * Passport
   */

  require('./passport.js')(app, passport);

  require('./passportRoutes.js')(app, passport);

  /*
   * Controllers
   */

  //RedirectToHttps
  if (app.get('app').httpss) {
    redirectToHttps(app);
  }

  //Load Routes and Controllers
  loadControllers(app, function() {
    debug('Controllers loadded', 'success', 'https');
  });

  //Define port
  app.set('port', port || app.get('port'));

  //Server
  var server;

  if (app.get('env') !== 'test') {
    //
    server = https.createServer(httpsOptions, app).listen(app.get('port'), function() {
      //Log init
      console.log('[ ' + 'HTTPS'.bold + ' ] ' + ' running on port '.green + ' [ ' + String(app.get('port')).bold + ' ] ' + ' and using '.green + ' [ ' + app.get('env').white.bold + ' ] ' + ' environment'.green);
      console.log('');

    });
  }

  //Load All Sockets
  if (app.get('app').socket) {
    //Load Sockets
    loadSockets(server, function() {
      debug('Sockets loadded', 'success', 'https');
    });
  }

  //Return
  return app;

}

//Exports
module.exports = Selena;