require('./config/config');

// Lib Imports
const _ = require('lodash');
const express = require('express');  // server setup helper
const bodyParser = require('body-parser'); // convert string to js format
const {ObjectID} = require('mongodb');
// Loc Imports
var {mongoose}= require('./db/mongoose.js'); // Js destructuring (var from array or obj)
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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
// route handler registration
app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        // res.send(todos);  // passes todos db array=> difficulty to add more properties
        res.send({todos});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

// GET /todos/1234432
app.get('/todos/:id', (req, res)=>{
    // res.send(req.params);
    var id = req.params.id;    
    if(!ObjectID.isValid(id)) return res.status(404).send();    

    Todo.findById(id).then((todo)=>{
        if(!todo) return res.status(404).send() ;        
        res.send({todo:todo});  // res.send({todo});
    }).catch((e)=>{        
        return res.status(400).send();  // Bad request
    });
});

// DELETE POST
app.delete('/todos/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(404).send();
    Todo.findByIdAndDelete(id).then((todo)=>{
        if(!todo) return res.status(404).send();  // if null was return, id was not found
        res.send({todo}); // assign as an obj|array in obj
    }).catch((e)=>{
        res.send(400).send(); // Empty body: bad request
    });
});

// UPDATING A RESOURCE
app.patch('/todos/:id', (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); // prpty accessible to user
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = null;
    }
    //findByIdAndUpdate.
    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if(!todo) return res.status(404).send(); 

        res.send({todo});
        // res.send({body});
    }).catch((e)=>{
        res.status(400).send();
    });    
});

// POST /users
app.post('/users', (req, res)=>{
    // _ => return results from lodash
    var body = _.pick(req.body, ['email', 'password']); // 'obj to pick from', array
    // create new instance of User model
    var user = new User(body);

    // User //models
    // user // instance
    // User.findByToken
    // user.generateAuthToken

    // save to the db plus then callback for result access
    user.save().then((user)=>{
        return user.generateAuthToken(); // for a chain promise
        // res.send(user); // specify success case?? || res.send(user) =>passing back the user        
    }).then((token)=>{
        res.header('x-auth', token).send(user); // return with a custome header
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};  // for testing


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


