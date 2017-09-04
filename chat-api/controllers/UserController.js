var User = require('../models/user');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var UserController = {

    login: function (req, res) {
        console.log(req.body.password);
        User.findOne({ "email": req.body.email }).exec((err, user) => {
            if (user) {
                // check password
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result == true)
                        res.json({ message: "login in successfully", id: user._id, username: user.username, error: false })
                    else {
                        res.json({ message: "password doesn't match" ,error:true})
                    }
                });
            }else{
                res.json({message:"can't find email",error:true})
            }

        })
    },
    signup: function (req, res) {
        console.log(req.body);
        bcrypt.hash(req.body.password, saltRounds).then((hash) => {
            var user = new User();
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = hash;
            user.save((err,user) => {
                if (err) res.json({ error: true, message: err });
                else res.json({ message: "signed up successfully", error: false ,data:user});
            })
        });


    }

}
module.exports = UserController;
