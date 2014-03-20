/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

/*
 * Module Dependencies
 */

var mailer = require('nodemailer');

/*
 * Mailer
 */

module.exports = mailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: global.configs.mail.email,
        pass: global.configs.mail.password
    }
});
