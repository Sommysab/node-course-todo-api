const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        console.log(hash);
    })
}); // number of rounds, 

var hashedPassword = '$2a$10$5KXLdJVKRwzp5Ll4unADsuTh3mxTJBgWi1QsymtXXm7waFTDM7kju';
 
bcrypt.compare(password, hashedPassword, (err, res)=>{
    console.log(res); // true|false
})


// var data ={
//     id:10
// }

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// var msg = 'I am user number 3';
// var hash = SHA256(msg).toString();

// console.log(`Messag: ${msg}`);
// console.log(`Hash: ${hash}`);

// var data ={
//     id: 4
// };
// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if(resultHash === token.hash){ 
//     console.log('Data not changed'); 
// }else{ 
//     console.log('Data changed. Do not trust'); 
// }