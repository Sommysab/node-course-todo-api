var {User} = require('./../models/user');

// MIDDLEWARE FUNCTION for reusable function
var authenticate = (req, res, next)=>{
    var token = req.header('x-auth');

    User.findByToken(token).then((user)=>{
        if(!user){ // when doc != parameters specified
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next(); // ensures code executes
    }).catch((e)=>{
        res.status(401).send();  // 401 => unauthorized access
    });
};

module.exports = {authenticate};