/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

var User = global.models.User;

module.exports = {

    /*
     * GET /users
     */
    index: {
        method: 'POST',
        fn: function(req, res, next) {
            var user = new User(req.body);
            var message = null;

            user.provider = 'local';
            user.save(function(err) {
                if (err) {
                    switch (err.code) {
                        case 11000:
                        case 11001:
                            message = 'Username already exists';
                            break;
                        default:
                            message = 'Please fill all the required fields';
                    }

                    return res.render('users/signup', {
                        message: message,
                        user: user
                    });
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    req.flash('success', 'Your account has been successfully created!');
                    return res.redirect('/');
                });
            });
        }
    },
    signup: {
        method: 'GET',
        path: '/signup',
        fn: function(req, res) {
            res.render('users/signup', {
                user: new User()
            });
        }
    },
    signout: {
        method: 'GET',
        path: '/logout',
        fn: function(req, res) {
            req.logout();
            res.redirect('/login');
        }
    },
    me: {
        method: 'GET',
        fn: function(req, res) {
            res.jsonp(req.user || null);
        }
    }
};