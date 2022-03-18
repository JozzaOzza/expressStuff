const router = require("express").Router()
const Person = require("../db")



router.post('/create', (req, res, next) => {
    
    const person = req.body

    new Person(person).save().then(() => {
        console.log("Doc created")
        res.status(201).send("Doc created")
    }).catch(err => {
        console.log("Error creating doc")
        next({status: 400, message: "Error creating doc"});
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
            return next({status: 400, message: err.message})
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
            return next({status: 400, message: err.message})
        }
        else {
            return res.json(people[id])
        }
    })
})

router.put('/update/:id', (req, res, next) => {
    
    const id = req.params.id
    const person = req.body
    
    Person.findByIdAndUpdate(id, person, (err, replaced) => {
        if (err) {
            console.log("Was not able to update doc")
            return next({status: 400, message: err.message})
        } else {
            console.log("Doc updated")
            return res.status(202).json(replaced)
        }
    })  
})

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id
    Person.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log("Was not able to delete doc")
            return next({status: 400, message: err.message})
        } else {
            console.log("Doc deleted")
            return res.status(204).send("Doc deleted")
        }
    })

})

module.exports = router