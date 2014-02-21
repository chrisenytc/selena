[![Selena.js](logo.png)](http://selenajs.enytc.com)

#Selena.js [![Build Status](https://secure.travis-ci.org/chrisenytc/selena.png?branch=master)](http://travis-ci.org/chrisenytc/selena) [![Dependency Status](https://gemnasium.com/chrisenytc/selena.png)](https://gemnasium.com/chrisenytc/selena) [![GH version](https://badge-me.herokuapp.com/app/gh/chrisenytc/selena.png)](http://badges.enytc.com/for/gh/chrisenytc/selena) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/chrisenytc/selena/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

> An wonderful full stack framework for node.js

## Getting Started

1º Clone selena repo

```bash
git clone https://github.com/enytc/selena.git
```

2º Enter in Selena directory
```bash
cd selena
```

3º Install dependencies

```bash
npm install
```

4º Configure the settings in `app/config`

5º Build Selena

```bash
gulp build
```

6º Start Selena

```bash
npm start
```

Test your selena app

```bash
npm test
```

##### Using Yeoman Generator

Install Selena.js generator

```bash
npm install -g generator-selena
```

Run Selena.js

```bash
yo selena
```

###### Learn to use the Selena.js generator

[![Demo](https://raw2.github.com/enytc/selena/gh-pages/src/img/howtouse-play.png)](http://ascii.io/a/7794/)

For more informations access this links.

NPM: [npm link](https://npmjs.org/package/generator-selena)
Repository: [generator-selena](https://github.com/chrisenytc/generator-selena)

## Documentation

### Overview

Selena.js can work with HTTP or HTTPS. You can simply switch the settings in your enviroment.

**INFO** To use htps you need to generate or have a key and a certificate. e.g: `cert.pem` and `key.pem`

You can rename the files in `app/config/<env>/ssl.json`.

[How to generate a ssl cert](http://greengeckodesign.com/blog/2013/06/15/creating-an-ssl-certificate-for-node-dot-js/)

[How to generate a ssl cert with pem](http://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server)

Example:

Edit: `app/config/<env>/app.json`

```json
{
  "https": true
}
```

#### Params to Selena.js constructor

**Parameter**: `options`
**Type**: `Object`
**Example**:
```javascript
{
 http: {
  port: 80,
  options: {}
  },
 https: {
  port: 403,
  options: {}
  }
}
```

**options** are options that can be passed optionally to connect to database using mongoose.

### Controllers

How to use controllers

There are two kinds of controllers, each with a different purpose and operation.

##### Default Controller

The default controller is the model used to define routes based on `controller/action'

Conventions:

- The file name and the methods will be used on the route. e.g: tasks.js => `/` or `tasks/tasks/index`
- The default method always has to be the `index`
- If you want to override the route use the option: `path:'/newcustomroute/test '`
- If you wish to protect the route only for logged in users. Use the option: `requireLogin: true`
- Routes can optionally have a `.json` extension or without the extension. e.g: `/tasks/all.json` or `/tasks/all`
- All models can be found at: `global.models`. e.g: `global.models.Task`
- All configurations can be found at: `global.configs`. e.g: `global.configs.app`

Example:

```javascript

var Model = global.models.Model;

module.exports = {

 /*
  * GET /
  */

 index: {
  method: 'GET',
  requireLogin: true,
  path: '/newcustomroute',
  fn: function (req, res) {
   res.jsonp(200, {
    message: 'Request received successfully!'
   });
  }
 }
};

```

##### Restful Controller

The restful controller is responsible for providing restful routes following the model of restful applications.

Conventions:

- If you wish to protect the restful route only for logged in users. Use the option `requireLogin: true`

Example:

```javascript
module.exports = {

  /*
   * GET /tasks
   */

   requireLogin: true,

  index: function (req, res) {
    res.jsonp(200, {
      welcome: 'Welcome to selena App'
    });
  },

  /*
   * GET /tasks/new
   */

  new: function (req, res) {
    res.jsonp(200, {
      welcome: 'Welcome to selena App'
    });
  },

  /*
   * POST /tasks
   */

  create: function (req, res) {
    res.jsonp(200, {
      welcome: 'Welcome to selena App'
    });
  },

  /*
   * GET /tasks/:task
   */

  show: function (req, res) {
    res.jsonp(200, {
      welcome: 'Welcome to selena App'
    });
  },

  /*
   * GET /tasks/:task/edit
   */

  edit: function (req, res) {
    res.jsonp(200, {
      welcome: 'Welcome to selena App'
    });
  },

  /*
   * PUT /tasks/:task
   */

  update: function (req, res) {
    res.jsonp(200, {
      welcome: 'Welcome to selena App'
    });
  },

  /*
   * DELETE /tasks/:task
   */

  destroy: function (req, res) {
    res.jsonp(200, {
      welcome: 'Welcome to selena App'
    });
  }
};
```

For more information see the documentation of the implementation of the restful Selena.js: [express-resource](https://npmjs.org/package/express-resource)

## Models

How to use Models

The models in Selena.js uses the mongoose and follows the implementation of the example below:

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Taks Schema
 */
var TaskSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  slug: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  closed: {
    type: Boolean,
    default: false
  }
});

//Exports model
module.exports = mongoose.model('Task', TaskSchema);
```

## Views

How to use Swig views

The Selena.js uses the Swig as its template engine, you can see more information on how to use Swig on the link below.

[How to use Swig](http://paularmstrong.github.io/swig/)

You can also use any of the listed template engines in this link:

[List of supported template engines](https://github.com/visionmedia/consolidate.js#supported-template-engines)

Example:

`app/views/index.html`

```html
{% extends '../layouts/default.html' %} 

{% block content %}
<div><strong>Hello World</strong></div>
{% endblock %}

```

## Internationalisation (i18n)

How to use Livi18n

The language files of Selena.js are in the folder `app/locales`

To use the Livi18n you must follow some conventions:

1. All language files are in `app/locales`, except as you change the settings in `app/config/<env>/i18n.json`
2. File names will be used to get the translation strings.

Quick example:

`app/locales/messages.json`

```json
{
  "welcome": "Hello :name, Welcome to Selena.js!",
  "message": ":name have :&: The Vampire Diaries Book||:name have :&: The Vampire Diaries Books"
}
```

In Views

`app/views/index.html`

```html
<div class="content">
  <p>{{ {key: 'messages.welcome', options: {name: 'Selena'}, defaultValue: 'TestValue'}) }}</p>
  <p>{{ {key: 'messages.message', options: {name: 'Selena'}, value: 10, defaultValue: 'TestValue'}) }}</p>
</div>
```

In Controllers

`app/controllers/index.js`

```javascript
module.exports = {

 /*
  * GET /
  */

 index: {
  method: 'GET',
  fn: function (req, res) {
   res.jsonp(200, {
    welcome: req.t({key: 'messages.welcome', options: {name: 'Selena'}, defaultValue: 'TestValue'});,
    message: req.p({key: 'messages.message', options: {name: 'Selena'}, value: 10, defaultValue: 'TestValue'});
   });
  }
 }
};
```

For more information see the documentation of the implementation of the Livi18n in Selena.js:

[Example of Livi18n on Backend](https://github.com/chrisenytc/livi18n/#examples)

[Example of Livi18n on Frontend with json API](https://github.com/chrisenytc/livi18n.js/#documentation)

[Example of Livi18n on Frontend with socket.io API](https://github.com/chrisenytc/livi18n.socket.js/#documentation)


## Middlewares

How to use middlewares

You can add and manage middlewares very easily in Selena.js and may activate it or deactivate it very easily and quickly.

The Selena.js middleware follow the format below:

```javascript
module.exports = {

  /*
   * Set true if you want enable this middleware
   */
  enabled: false,
  fn: function () {
    return function (req, res, next) {
      //console.log('Called');
      next();
    };
  }
};
```

##### Shared Middlewares

You can create or use shared middlewares by the community Selena.js on NPM.

###### Using shared middlewares

1º Search for middlewares in `https://npmjs.org/search?q=selena-` or `http://selenajs.enytc.com/#/middlewares`

2º Install middleware `npm install selena --save`

3º Declare and enable in `app/config/<env>/middlewares.jsonp`

Example:

```json
[
  {
    "enabled": true,
    "name": "selena"
  }
]

```

Now your shared middlewares are ready to be used.

###### Creating your Selena.js middleware

The middlewares of Selena.js are exactly the same as the middlewares of  Express.js but just need to follow some conventions.

Conventions:

- The name of the middleware must always start with `selena-`. e.g: `selena`.
- The middleware should be sent to NPM.
- The middlewares must have the tag `selenamiddleware`.

Following these conventions your middleware may appear in Selena.js site, so you can help many people.

Example:

```javascript
/*
 * selena
 * https://github.com/chrisenytc/selena
 *
 * Copyright (c) 2014 Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function () {
  return function (req, res, next) {
    //console.log('Called');
    next();
};

```

## Services

How to use services

Services are specific to provide static JSON files can be accessed via: `/ws/nameofjsonfile.json`

Conventions:

- All services are on route `/ws/`
- The name of the JSON file will be used as the name of the route. e.g: `/ws/nameofjsonfile`
- Routes can use the `.json` extension optionally. e.g: `/ws/nameofjsonfile.json`

The services accept any valid JSON.

Example:

```json
[
  {
    "name": "Bella"
  },
  {
    "name": "Livia"
  }
]
```

## Sockets

How to use Sockets

The selena.js uses socket.io, you need to follow some conventions to able to use it.

1. The file name and the method name will be used as socket path. e.g: `test.js` + `index` = `test/index`
2. You can listen or emit a message using that path. e.g: `on: function(data){}` or `emit: 'message-example'`
3. `this` variable has the scope of socket.io and can use all of its methods. e.g: `this.on('test/index', function(data){});`, `this.emit('test/index', 'message-example')` and more.

Example:

`app/sockets/test.js`

```javascript
module.exports = {

  /*
   * SOCKET test
   */

  index: {
    on: function(data) {
      //show received data
      console.log(data);
      //emit new data
      this.emit('test/another/event', data);
    },
    emit: 'test this'
  }
};
```

For more information see the documentation of socket.io:

[How to use Socket.io](http://socket.io/#how-to-use)

## Assets and Public

The `assets` folder is where are the project dependencies, installed using bower.

The `public` folder is where are the frontend application with angularJS.

**controllers** Folder that contains all the angularJS controllers.

**directives** Folder that contains all the angularJS directives.

**filters** Folder that contains all the angularJS filters.

**services** Folder that contains all the angularJS services.

**views** Folder that contains all the angularJS views.

**app.js** AngularJS Module with dependencies.

**init.js** Initialize Application.

## Core

The Selena.js was created to be as configurable, yet you have total freedom to alter the Core of Selena.js.

The Core Selena.js is in the `lib` folder.

## Settings

How to use Settings

The Selena.js works with environments, you can have multiple configurations in your application.

The defaults environments are: `development`, `test` and `production`. You also create your own customized reports environments.

You can access the contents of environments using `app.get('nameofconfigfile')`

Conventions:

- The name of the configuration files in `app/config/<envs>` are the names used to get the contents of the settings in: `app.get('nameofconfigfile')`

##### Custom Environments

How to create custom environments

1º Create `mycustomenv` folder in `app/config/`

2º Create config files in `app/config/mycustomenv`

3º Run your environment

```bash
NODE_ENV=mycustomenv node app
```

Example:

```bash
NODE_ENV=production node app
```

## Contributing

See the [CONTRIBUTING Guidelines](CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/enytc/selena/issues).

## License

The BSD License

Copyright (c) 2014, EnyTC Corporation

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the EnyTC Corporation nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
