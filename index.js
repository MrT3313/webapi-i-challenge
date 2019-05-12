// implement your API here

// REQUIRE EXPRESS
const express = require('express'); // common js module import

// -- ?? -- IMPORTING METHODS? -- ?? -- // 
const db = require('./data/db')

// CALL EXPRESS
const server = express();
server.use(express.json())

// ROUTING
    // - GET -
        server.get('/', (req, res) => {
            console.log('/ get()')
            // console.log(req, res)
            res.send('Why hello - welcome to my struggles :) -- Happy Servering')
        });
        server.get('/api/users', (req,res) => {
            console.log('/awpi/users get()')
            // console.log('THIS IS THE REQ',req)
            // console.log('THIS IS THE RES',res)
            
            db.find()
                .then(db => {
                    // console.log(res)
                    res.json(db)
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The users information could not be retrieved" });
                })
        })
        server.get('/api/users/:id', (req,res) => {
            console.log('/api/users/:id get()')
            console.log(db)

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
    server.post("/api/users", (req, res) => {
        
        // console.log('THIS IS THE REQ', req)
        const newUser = req.body;
        console.log('THIS IS THE NEW USER', newUser);

        if (newUser.name && newUser.bio) {
            db.insert(newUser)
            .then(addedUser => {
                res.status(201).json(addedUser);
            })
            .catch(err => {
                res.status(500).json({
                    error: "There was an error while saving the user to the database"
                });
            });
        } else {
            res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user." });
        }
    });
    








// LISTENING 
server.listen(5432, () => {
    console.log('Server running on http://localhost:5432')
})