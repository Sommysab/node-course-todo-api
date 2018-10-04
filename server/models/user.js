var mongoose = require('mongoose');
// Set User Model
var Users = mongoose.model('Users', {
    email: {
        type: String,
        required: true,        
        minlength: 1,
        trim: true
    }
});

module.exports = {Users};