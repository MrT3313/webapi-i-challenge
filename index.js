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
            console.log('/api/users get()')
            // console.log('THIS IS THE REQ',req)
            // console.log('THIS IS THE RES',res)
            
            db.find()
                .then(users => {
                    // console.log(res)
                    res.send(users)
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
            .then(user => {
                if( user ) {
                    res.json(user)
                } else {
                    res.status(404).json({
                        message: "the user with the specified ID does not exist"
                    })
                }
            })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The users information could not be retrieved" });
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

    // - PUT
    server.put('/api/users/:id', (req,res) => {
        const { id } = req.params;
            console.log(id)

        console.log('REQ.BODY',req.body)
        const updatedUser = req.body;
            console.log('UPDATED USER', updatedUser)

        if (updatedUser.name && updatedUser.bio) {
            console.log('INSIDE IF STATEMENT')
            db.update(id, updatedUser)
                .then(user => {
                    if( user ) {
                        res.json(user)
                    } else {
                        res.status(404).json({
                            message: "the user with the specified ID does not exist"
                        })
                    }
                })
                .catch( err => {
                    res
                        .status(500)
                        .json({ error: "The user info could not be modified"})
                })
        }
    })

    // - DELETE
    server.delete('/api/users/:id', (req,res) => {
        const { id } = req.params;
        db.remove(id)
            .then( removedUser => {
                if (removedUser) {
                    res.json(removedUser)
                } else {
                    res .status(404)
                    .json({message: "the user with specified ID does not exist"})
                }
            })
            .catch(err => {
                res.statusCode(500).json({err: "The user could not be removed"})
            })
    })
    


// LISTENING 
server.listen(5432, () => {
    console.log('Server running on http://localhost:5432')
})