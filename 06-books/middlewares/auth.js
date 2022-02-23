/**
 * Authentication Middleware
 */

// A middleware is used to decide if to send it further in the chain or answer straight away

const debug = require('debug')('books:auth');
const { User } = require('../models');

/**
 * HTTP Basic Authentication
 */
const basic = (req, res, next) => {
    debug('Hello from auth.basic!');

    // Check if Authorization header exists, if not, stop and send response
    if (!req.headers.authorization) {
        debug('Authorization header missing');

        // Sends a response, prevents Next from execute.
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required',
        });
    }

    // %o works as a placeholder for the 2nd parameter (req.headers.authorization)
    debug('Authorization header: %o', req.headers.authorization);

    // split header into '<authSchema> <base64payload>'
    // 'Basic QmVlbmllOm1hbm5lbg=='
    // [0] = 'basic'
    // [1] = 'QmVlbmllOm1hbm5lbg=='
    const [authSchema, base64payload] = req.headers.authorization.split(' ');

    // if authSchema isn't 'basic', then pass request along
    if (authSchema.toLowercase() !== 'basic') {
        // Not ours to authenticate
        next();
    }

    // pass request along
    next();
}

// 

module.exports = {
    basic,
}