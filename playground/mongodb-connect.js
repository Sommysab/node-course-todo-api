// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',  { useNewUrlParser: true }, (err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
        
    // //     const db = database.db('Todos');   
    // //     db.collection('theCollectionIwantToAccess');
    // db.db().collection('Todos').insertOne({ // db.db() => db itself; db =>db client
    //     text: 'Something to do',
    //     completed: false
    // },
    // // db.collection('Todos').insertOne({
    // //     text: 'Something to do',
    // //     completed: false
    // // },
    // (err, result)=>{  // callback function
    //     if(err){
    //         return console.log('Unable to Insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2)); // ops = store all doc inserted
    // });

    // db.db().collection('Users').insertOne({
    //     name: 'Chuchu Sab',
    //     age: 27,
    //     location: 'Enugu'
    // }, 
    // (err, result)=>{ 
    //     if(err){ 
    //         return console.log('Unable to Insert todo', err); 
    //     } 
    //     console.log(JSON.stringify(result.ops, undefined, 2)); 
    // });

    db.close();
});