var request = require('supertest');
var app = require('../app');
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

describe("login", function() {
    it("Generates token for user for any username and password", function(done) {
        request(app)
            .post("/login")
            .send({ username: "root", password: "root" })
            .expect(200, done)
    })
})

describe("login", function() {
    it("Reject request if username and password is not available", function(done) {
        request(app)
            .post("/login")
            .expect(403)
            .expect(/Forbidden/, done)
    })
})

describe("login", function() {
    it("Reject request if only username is available", function(done) {
        request(app)
            .post("/login")
            .send({ username: "root" })
            .expect(403)
            .expect(/Forbidden/, done)
    })
})

describe("login", function() {
    it("Reject request if only password is available", function(done) {
        request(app)
            .post("/login")
            .send({ password: "root" })
            .expect(403)
            .expect(/Forbidden/, done)
    })
})

describe("patch", function() {
    it("Rejects patch request if the token is not passed", function(done) {
        request(app)
            .post("/patch")
            .send({ doc: { "baz": "qux", "foo": "bar" }, thePatch: [{ "op": "replace", "path": "/baz", "value": "boo" }] })
            .expect(403, done)
    })
})

// describe("patch", function() {
//     it("Accepts patch request if the authorization token is valid", function(done) {
//         request(app)
//             .post("/patch")
//             .set('Cookie', ['authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZGFycGFuTmV3IiwicGFzc3dvcmQiOiJkYXJwYW5OZXcifSwiaWF0IjoxNTE4NzgxMTYyLCJleHAiOjE1MTg3ODQ3NjJ9.sMsfyCrKiQ0OPdN9DyNkZIX5bpMqeCFpVBuxpAQU1Ec'])
//             .send({ doc: { "baz": "qux", "foo": "bar" }, thePatch: [{ "op": "replace", "path": "/baz", "value": "boo" }] })
//             .expect(200, done)
//     })
// })

describe("thumbnail", function() {
    it("Reject thumbnail request if the token is not passed", function(done) {
        request(app)
            .post("/thumbnail")
            .send({ uri: "https://s7d2.scene7.com/is/image/PetSmart/PB1201_STORY_CARO-Authority-HealthyOutside-DOG-20160818?$PB1201$" })
            .expect(403, done)
    })
})