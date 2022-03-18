const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const expect = chai.expect

const server = require("../index")
const Person = require("../db")

describe("CRUD tests", () => {

    let testPerson
    
    beforeEach((done) => {
        Person.deleteMany((err) => {
          if (!err) {
            Person.create({
              'name': 'Bob'
            }, (error, created) => {
              if (!error) {
                testPerson = created;
              }
              return done();
            });
          }
        });
      });
    
    it("Should create", (done) => {

        chai.request(server).post('/person/create').send({
            'name': 'Jamie'
        }).end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res).to.haveOwnProperty("text", "Doc created")
            return done()
        })

    })

    it("Should NOT create", (done) => {

        chai.request(server).post('/person/create').send()
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            // expect(res).to.haveOwnProperty("text", "Error creating doc")
            return done()
        })

    })

    it("Should get all", (done) => {

        chai.request(server).get('/person/getAll')
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("array")
            expect(res.body.length).to.equal(1)
            return done()
        })
    })

    it("Should NOT get all", (done) => {

        chai.request(server).post('/person/getAll')
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            return done()
        })
    })

})