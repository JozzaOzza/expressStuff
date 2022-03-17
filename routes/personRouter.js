const router = require("express").Router()
const Person = require("../db")

let names = ["Jamie", "Bobby", "Gary", "Sarah"]

router.post('/create', (req, res, next) => {
    
    const person = req.body

    new Person(person).save().then(() => {
        console.log("Doc created")
        res.status(201).send("Done")
    }).catch(err => {
        console.log("Error creating doc")
        next({status: 400, message: err.message});
    })
        
        // if (err) {
        //     console.log("Was not able to create document")
        //     return next({status: 400, message: "Was not able to create document"})
        // }
        // else {
        //     console.log("Document created")
        //     return res.status(201).send("Document created")
        // }
    
})

router.get('/getAll', (req, res, next) => {
    Person.find((err, people) => {
        if (err) {
            console.log("Was not able to list people")
            return next({status: err.status, message: err.message})
        }
        else {
            console.log("People listed")
            return res.status(200).json(people)
        }
    })
})

router.get('/getById/:id', (req, res, next) => {
    
    const id = req.params.id

    Person.find((err, people) => {
        if (err) {
            return next({status: err.status, message: err.message})
        }
        else {
            return res.json(people[id])
        }
    })
})

router.put('/put/:id', (req, res, next) => {
    let id = req.params.id
    let newQuery = req.query
    names.splice(id, 1, newQuery)
    res.status(202).json(names[id])
})

router.delete('/DeleteById/:id', (req, res) => {
    let id = req.params.id
    names.splice(id - 1, 1)
    res.send(names)

})

module.exports = router