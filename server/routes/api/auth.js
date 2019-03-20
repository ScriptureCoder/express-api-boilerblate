const User = require('../../models/User');
const RegisterController = require('../../controllers/RegisterController');
const LoginController = require('../../controllers/LoginController');
const checkAuth = require('../../middleware/check_auth');

module.exports = (app) => {

    app.post('/api/register', RegisterController.create);
    app.post('/api/login', LoginController.authenticate);
    /*verify authentication token*/
    app.get("/api/token/verify", checkAuth, (req, res, next)=>{
        res.json({
            success: true,
            message: "Authenticated"
        })
    })
};