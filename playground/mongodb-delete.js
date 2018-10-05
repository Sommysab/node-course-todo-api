const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.db().collection('Users').deleteMany({name: 'Sommy Sab'});

    db.db().collection('Users').findOneAndDelete({
        _id: new ObjectID('5bb52c8589e65ee0dab1bbc9')
    }).then((result)=>{ // then => premise
        console.log(JSON.stringify(result, undefined, 2));
    });

    // deleteMany    
    // db.db().collection('Todos').deleteMany({text: 'Eat launch'}).then((result)=>{
    //     console.log(result);
    // });
    // deleteOne  //Walk in the park
    // db.db().collection('Todos').deleteOne({text: 'Walk in the park'}).then((result)=>{
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.db().collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
    //     console.log(result);
    // });
    // db.close();  
});

