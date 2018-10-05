const {ObjectId} = require('mongodb');

const {mangoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');


// Todo.remove({}).then((r)=>{
// Todo.deleteMany({}).then((r)=>{    
//     console.log(r);
// });

// Todo.findOneAndRemove({}).then(r)
Todo.findByIdAndDelete('5bb6a147b5b7a3e8c3a137e3').then((todo)=>{
    console.log('Deleted todo: ', todo)
})

// Todo.findByIdAndDelete('5bb69fd9b5b7a3e8c3a13758').then((todo)=>{  // findByIdAndRemove
//     console.log(todo);
// });