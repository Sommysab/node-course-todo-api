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
var {authenticate} = require('./middleware/authenticate');

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
app.post('/users', (req, res)=>{    //console.log('res', res);  //console.log('req', req); return false;
    // _ => return results from lodash
    var body = _.pick(req.body, ['email', 'password']); // 'obj to pick from', array   //console.log(req.body);    //return false;
    // create new instance of User model
    var user = new User(body);
    // User //models   // user // instance
    // User.findByToken   // user.generateAuthToken

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

// PRIVATE URL REQUEST
app.get('/users/me', authenticate, (req,res)=>{ // modified
    res.send(req.user);  
})

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};  // for testing



