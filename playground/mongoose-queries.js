
const {mangoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');
var id = '5bb5f62d4dd88a17704906c6';

Users.findById(id).then((user)=>{ 
    (!user)? console.log('Id not found') : console.log('User By Id', user);
}).catch((e)=>console.log(e)); // if id is in wrong format

// var id = '5bb6322a33745c1c848f6c8a';
// if(!ObjectId.isValide(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id:id // with mangoose, no need for converting to id-object
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id:id // with mangoose, no need for converting to id-object
// }).then((todo)=>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo) return console.log('Id not found');
//     console.log('Todo By Id', todo);
// }).catch((e)=>console.log(e));

