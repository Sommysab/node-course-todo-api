// Lib Imports
var express = require('express');  // server setup helper
var bodyParser = require('body-parser'); // convert string to js format
// Loc Imports
var {mongoose}= require('./db/mongoose.js'); // Js destructuring (var from array or obj)
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    // save in db
    todo.save().then((doc)=>{
        res.send(doc);  // express send method
    }, (e)=>{
        res.status(400).send(e);  // 400 = bad request header
    })
});

app.listen(3000, ()=>{
    console.log('Started on port 3000');
})


















// // Mongoose Model with attributes
// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,        
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// // New todo value
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });
// // Save created todo and Return Result
// newTodo.save().then((doc) =>{
//     console.log('Save todo', doc)
// }, (e)=>{
//     console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//     text: 'Eat dinner',
//     completed: true,
//     completedAt: 123
// });
// otherTodo.save().then((doc)=>{
//     // console.log('Save todo', doc)
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e)=>{
//     console.log('Unable to save todo', e);
// });

// // Set User Model
// var Users = mongoose.model('Users', {
//     email: {
//         type: String,
//         required: true,        
//         minlength: 1,
//         trim: true
//     }
// });
// // Create new
// var newUsers = new Users({
//     email: 'Sommysabudeh@g.com'
// });
// // Save and Return results
// newUsers.save().then((doc)=>{
//     console.log('Saved User Email', doc);
// });

