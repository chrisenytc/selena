/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

var User = global.models.User;

module.exports = function(app, passport) {

    var ctrl = {
        session: function(req, res) {
            res.redirect('/');
        },
        authCallback: function(req, res) {
            res.redirect('/');
        },
        signin: function(req, res) {
            res.render('users/login', {
                title: 'Signin',
                message: req.flash('error')
            });
        },
        user: function(req, res, next, id) {
            User.findOne({
                _id: id
            })
                .exec(function(err, user) {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return next(new Error('Failed to load User ' + id));
                    }
                    req.profile = user;
                    next();
                });
        }
    };

    // Setting up the userId param
    app.param('userId', ctrl.user);

    app.get('/login', ctrl.signin);

    // Setting the local strategy route
    app.post('/auth', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), ctrl.session);

    if (app.get('auth').facebook.enabled) {
        // Setting the facebook oauth routes
        app.get('/auth/facebook', passport.authenticate('facebook', {
            scope: ['email', 'user_about_me'],
            failureRedirect: '/login'
        }), ctrl.signin);

        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            failureRedirect: '/login'
        }), ctrl.authCallback);
    }

    if (app.get('auth').twitter.enabled) {
        // Setting the twitter oauth routes
        app.get('/auth/twitter', passport.authenticate('twitter', {
            failureRedirect: '/login'
        }), ctrl.signin);

        app.get('/auth/twitter/callback', passport.authenticate('twitter', {
            failureRedirect: '/login'
        }), ctrl.authCallback);
    }

    if (app.get('auth').github.enabled) {
        // Setting the github oauth routes
        app.get('/auth/github', passport.authenticate('github', {
            failureRedirect: '/login'
        }), ctrl.signin);

        app.get('/auth/github/callback', passport.authenticate('github', {
            failureRedirect: '/login'
        }), ctrl.authCallback);
    }

    if (app.get('auth').google.enabled) {
        // Setting the google oauth routes
        app.get('/auth/google', passport.authenticate('google', {
            failureRedirect: '/login',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }), ctrl.signin);

        app.get('/auth/google/callback', passport.authenticate('google', {
            failureRedirect: '/login'
        }), ctrl.authCallback);
    }

    if (app.get('auth').linkedin.enabled) {
        // Setting the linkedin oauth routes
        app.get('/auth/linkedin', passport.authenticate('linkedin', {
            failureRedirect: '/login',
            scope: ['r_emailaddress']
        }), ctrl.signin);

        app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
            failureRedirect: '/login'
        }), ctrl.authCallback);
    }

};