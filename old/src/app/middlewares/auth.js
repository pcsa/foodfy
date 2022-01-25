const { authAPI } = require('../services/auth-service');

async function authMiddleware(req, res, next) {
    const { token: reqToken } = req.query;
    let isAutheticated = !!req.session.user;
    let { user } = req.session;

    if (isAutheticated) {
        return next();
    }

    if (!isAutheticated && !reqToken) {
        return res.redirect('/admin/login');
    }

    if (!isAutheticated && reqToken != null) {
        const authResponse = await authAPI.get(
            `${process.env.AUTH_SERVICE_BASE_URL}/admin/login/me`,
            { headers: { Authorization: `Bearer ${reqToken}` } }
        );

        user = authResponse.data.user;
        isAutheticated = authResponse.data.isAutheticated;
    }

    if (!isAutheticated) {
        return res.redirect('/admin/login');
    }

    req.session.user = user;
    res.locals.user = req.session.user;
    req.session.token =
        req.session.token === null ? reqToken : req.session.token;

    return next();
}

module.exports = authMiddleware;
