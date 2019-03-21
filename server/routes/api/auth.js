const RegisterController = require('../../controllers/RegisterController');
const LoginController = require('../../controllers/LoginController');
const PasswordController = require('../../controllers/PasswordController');
const checkAuth = require('../../middleware/check_auth');
const validateRegister = require('../../validations/register');
const validateLogin = require('../../validations/login');

module.exports = (app) => {
    app.post('/register', validateRegister, RegisterController.create);
    app.post('/login', validateLogin, LoginController.authenticate);
    app.post("/change_password", checkAuth, PasswordController.change);
    app.post("/forgot_password", PasswordController.forget);
    app.post("/reset_password/:token", PasswordController.reset);
};