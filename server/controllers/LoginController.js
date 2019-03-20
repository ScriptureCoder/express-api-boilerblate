const User = require('../models/User');
const config = require('../../config');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next)=>{
    User.find({email: req.body.email})
        .exec()
        .then(doc =>{
            if (doc.length < 1){
                return res.status(401).json({
                    success: false,
                    message: "Authentication Failed"
                })
            }
            const user = doc[0];
            if (user.validPassword(req.body.password)){
                const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                    config.env.JWT_KEY,
                    {
                        expiresIn: "365 days" //token will expire in 365 days
                    });
                return res.status(200).json({
                    success: true,
                    message: "Authentication Successful!",
                    token: token
                })
            }
            return res.status(401).json({
                success: false,
                message: "Authentication Failed"
            })
        })
};
