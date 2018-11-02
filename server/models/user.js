const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,                
        trim: true,        
        minlength: 1,
        unique: true,
        validate: {
            //validator: (value)=>{return validator.isEmail(value); }
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'            
        }
    },
    password : {
        type:String,
        require:true,
        minlength: 6
    },
    tokens: [{
        access:{
            type:String,
            required: true
        },
        token:{
            type: String,
            required: true            
        }
    }]
});

// overwrite a method
UserSchema.methods.toJSON = function(){  // determining what is sent back
    var user = this;
    var userObject = user.toObject(); // converts mangoose variable to regular object where all properties on doc exist

    return _.pick(userObject, ['_id', 'email']);
};

// Created method 
// instane method have access to individual document
UserSchema.methods.generateAuthToken = function (){ // we need a this keyword for binding individual doc
    var user =this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(), 
        access
    }, 'abc123').toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then(()=>{
        return token;
    });
};

// MODEL METHD
UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token, 'abc123');
    }catch (e){
        // return new Proomise((resolve, reject)=>{
        //     reject();
        // })
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

// Set User Model
var User = mongoose.model('User', UserSchema);

module.exports = {User};