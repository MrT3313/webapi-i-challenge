// implement your API here

// REQUIRE EXPRESS
const express = require('express'); // common js module import

// -- ?? -- IMPORTING METHODS? -- ?? -- // 
const db = require('./data/db')

// CALL EXPRESS
const server = express();

// ROUTING
    // - GET -
        server.get('/', (req, res) => {
            console.log('/ get()')
            // console.log(req, res)
            res.send('Why hello - welcome to my struggles :) -- Happy Servering')
            
            
        });
        server.get('/api/users', (req,res) => {
            console.log('/awpi/users get()')
            console.log('THIS IS THE REQ',req)
            console.log('THIS IS THE RES',res)
            
            db.find()
                .then(db => {
                    // console.log(res)
                    res.json(db)
                })
                .catch(err => {
                    // console.log(err)
                })
        })
        server.get('/api/users/:id', (req,res) => {
            console.log('/api/users/:id get()')
            console.log(db)

// THIS IS A CARD CODED VALUE
/// change to pull klj
            const userID = req.params.id

            db.findById(userID)
                .then(db => {
                    res.json(db)
                })
                .catch(err => {
                    // console.log(err)
                })

        })
    // - POST - 
        server.post('/api/users', (req, res) => {
            console.log('/api/users post()')
            // console.log(req, res)

            // req.body()

            db.insert()
                .then()
                .catch(err => {
                    // console.log(err)
                })
        })
    








// LISTENING 
server.listen(5432, () => {
    console.log('Server running on http://localhost:5432')
})