var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp2', {useNewUrlParser: true});

module.exports = {mongoose};