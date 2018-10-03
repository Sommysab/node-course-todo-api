const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    // db.db().collection('Todos').find({
    //     _id: new ObjectID('5bb50153f78bf513a06c8a5d') // like "WHERE" effect
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2)); // undefined => filter functions
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // }); 

    // db.db().collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count: ${count}`);        
    // }, (err)=>{
    //     console.log('Unable to fetch todos count', err);
    // }); 

    // db.db().collection('Users').find({name: 'Sommy Sab'}).toArray().then((docs)=>{  
    //     console.log(JSON.stringify(docs, undefined, 2)); 
    // }, (err)=>{ 
    //     console.log('Unable to fetch users', err);  
    // }); 

    // db.close();  
});