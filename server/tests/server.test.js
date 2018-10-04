const expect = require('expect');
const supertest_request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server'); // access server.js
const{Todo} = require('./../models/todo'); // access todo.js


const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];


// before each testing
beforeEach((done)=>{
    // Todo.remove({}).then(()=> {
    Todo.deleteMany({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(()=> done()); 
});
// // before each testing
// beforeEach((done)=>{
//     Todo.remove({}).then(()=> done()); // remove everything in the db Async (One after another)?
// });

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        supertest_request(app)
            .post('/todos')
            .send({text: text}) // User Input Send => to db
            // .send({text})
            .expect(200)
            .expect((res)=>{
                // body: ''
                expect(res.body.text).toBe(text);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                // db check
                // Todo.find().then((todos)=>{
                Todo.find({text}).then((todos)=>{  // find result widh text
                    expect(todos.length).toBe(1); // db document/row = 1
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>{
                    done(e);
                })
            })            
    });

    it('should not create todo with invalid body data', (done)=>{
        supertest_request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    // expect(todos.length).toBe(0);
                    expect(todos.length).toBe(2); // new addition
                    done();
                }).catch((e)=>done(e) ); 
            });
    });
});

describe('GET /todos', ()=>{
    it('should get all todos', (done)=>{
        // request(app)
        supertest_request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
}); 

describe('GET /todos/:id', ()=>{
    it('should return todo doc', (done)=>{
        supertest_request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        supertest_request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids', (done)=>{
        supertest_request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    })
})
