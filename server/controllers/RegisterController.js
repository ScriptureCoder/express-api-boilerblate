const User = require('../models/User');

exports.create = (req, res, next)=>{
    const {body} = req;
    const { firstName, lastName, password} = body;
    let { email} = body;
    if(email){
        // redefine email to lowercase
        email = email.toLowerCase();
    }

    User.find({email:email}, (err, user)=> {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error:Server Error'
            })
        }
        if (user.length > 0) {
            return res.status(422).json({
                success: false,
                message: "error: User already exist!"
            })
        }

        const newUser = new User({
            email : email,
            firstName : firstName,
            lastName : lastName,
        });
        newUser.password= newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                })
            }
            return res.status(200).json({
                success: true,
                message: "Successful!"
            })
        })
    })
};