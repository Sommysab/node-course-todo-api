var env = process.env.NODE_ENV || 'development';

if(env==='development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp3';

// USING DIFF DB FOR TEST
}else if(env==='test'){ // Mocha test env
    process.env.PORT =3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp2Test';
} 
