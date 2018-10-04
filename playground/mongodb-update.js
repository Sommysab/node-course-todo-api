const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.db().collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bb5441989e65ee0dab1bf4e')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    });

    db.db().collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bb52b7f89e65ee0dab1bb75')
    }, {
        $set: {
            name: 'Sommy Sab'
        },
        $inc: {
            age: +2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    });
    
    // db.close();  
});

