const express = require("express")
const app = express()
const server = app.listen(8080, () => {
    console.log(`Server started successfully on port: ${server.address().port}`)
})

const personRouter = require("./routes/personRouter.js")

const parser = require("body-parser")
app.use(parser.json())

app.use((req, res, next) => {
    console.log(new Date())
    return next()
})

// let names = ["Jamie", "Bobby", "Gary", "Sarah"]

app.use((err, req, res, next) => {
    console.log(err.stack)
    return next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message)
})

app.use('/person', personRouter)

module.exports = server;