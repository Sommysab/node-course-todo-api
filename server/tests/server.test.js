const expect = require('expect');
const supertest_request = require('supertest');

const {app} = require('./../server'); // access server.js
const{Todo} = require('./../models/todo'); // access todo.js

// before each testing
beforeEach((done)=>{
    Todo.remove({}).then(()=> done()); // remove everything in the db Async (One after another)?
});

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        supertest_request(app)
            .post('/todos')
            .send({text}) // User Input Send => to db
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
                Todo.find().then((todos)=>{
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e)=>done(e) ); 
            });
    });
});


