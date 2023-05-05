const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDB: (callback) => {
        MongoClient.connect('mongodb://localhost:3000/users')
        .then((client) => {
            dbConnection = client.db()
            return callback()
        })
        .catch(err => {
            console.log(err)
            return callback(err)
        })
    },
    getDB: () => dbConnection
}




/*
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

const accounts = new mongoose.Schema({
    username: String,
})

async function main() {
  await mongoose.connect('http://localhost:3000/');
  


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
*/