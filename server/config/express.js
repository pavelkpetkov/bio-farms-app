
const bp = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/auth');

module.exports = (app) => {

    app.use(bp.urlencoded({ extended: true }));
    app.use(bp.json());

    app.use(cookieParser());
    app.use(authMiddleware());

    app.use((req, res, next) => {
        if (!req.url.includes('favicon')) {
            console.log('>>>', req.method, req.url);
            if (req.user) {
                console.log('Known user', req.user.username);
            }
        }
        next();
    })
}