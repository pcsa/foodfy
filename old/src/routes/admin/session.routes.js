const express = require('express');

const routes = express.Router();

const SessionController = require('../../app/controllers/admin/SessionController');
const SessionValidator = require('../../app/validators/SessionValidator');

const guestMiddleware = require('../../app/middlewares/guest');

routes
    .get(
        '/login',
        guestMiddleware,
        // SessionController.loginForm
        (req, res) => {
            res.redirect(`${process.env.AUTH_SERVICE_BASE_URL}/admin/login`);
        }
    )
    .post(
        '/login',
        (req, res) => {
            res.redirect(`${process.env.AUTH_SERVICE_BASE_URL}/admin/login`);
        }
        // [SessionValidator.loginFields, SessionValidator.login],
        // SessionController.login
    )
    .get('/logout/me', SessionController.logout)
    .get(
        '/recover-password',
        guestMiddleware,
        SessionController.recoverPasswordForm
    )
    .post(
        '/recover-password',
        [
            SessionValidator.recoverPasswordFields,
            SessionValidator.recoverPassword,
        ],
        SessionController.recoverPassword
    )

    .get(
        '/reset-password',
        guestMiddleware,
        SessionValidator.resetPasswordForm,
        SessionController.resetPasswordForm
    )
    .post(
        '/reset-password',
        [SessionValidator.resetPasswordFields, SessionValidator.resetPassword],
        SessionController.resetPassword
    );

module.exports = routes;
