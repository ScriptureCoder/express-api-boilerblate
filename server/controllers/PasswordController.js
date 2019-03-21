const User = require('../models/User');
const Token = require('../models/Token');

exports.change=(req,res,next)=>{

    const data= {
        password: User().generateHash(req.body.password)
    };
    User.findById(req.auth.id).then(user=>{
        if (user.validPassword(req.body.old_password)) {
            User.findOneAndUpdate({_id:req.auth.id},data).then(result=>{
                if (result){
                    return res.json({
                        'success':true,
                        'message':'Password change successfully!'
                    })
                }

            }).catch((error)=>{
                return res.json(error)
            })
        }else{
            return res.json({
                'success':false,
                'message':'Incorrect Password!'
            })
        }
    });
};

exports.forget=async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if (user) {
        const today = new Date();
        const time = new Date();
        const data = {
            user_id: user._id,
            time: time.setDate(today.getDate() + 1)
        };

        new Token(data).save((err,doc)=>{
            if (!err){
                return res.json({
                    'success': true,
                    'message': doc.token
                })
            } else{
                return res.json({
                    'success': false,
                    'message': "An error occured!"
                })
            }
        })
    }else {
        return res.json({
            'success': false,
            'message': "Email does not exist!"
        })
    }

};

exports.reset= async (req,res,next)=>{
    const token = await Token.findOne({token: req.params.token, time: {$gt: new Date()}});
    if (token){
        const data= {
            password: User().generateHash(req.body.password)
        };
        User.findOneAndUpdate({_id:token.user_id},data).then(result=>{
            if (result){
                Token.remove({user_id: token.user_id}).then(()=>{
                    return res.json({
                        'success':true,
                        'message':'Password change successfully!, kindly login to continue'
                    })
                });
            }

        }).catch((error)=>{
            return res.json(error)
        })
    }else{
        return res.json({
            'success':false,
            'message':'Invalid Token!'
        })
    }

};