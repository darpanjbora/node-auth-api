'use strict'

var app = require('../app')
var request = require('supertest')
var superagent = require('superagent')
var agent = superagent.agent()
var mocha = require('mocha')
var jwt = require('jsonwebtoken')
var expect = require('chai').expect
var describe = mocha.describe
var it = mocha.it

describe('home', function () {
  it('Should show the home page', function (done) {
    request(app)
            .get('/')
            .expect(200)
            .expect(/Welcome\sto\sSocialCops/, done)
  })
})

describe('login', function () {
  it('Generates token for user for any username and password', function (done) {
    request(app)
            .post('/login')
            .send({ username: 'root', password: 'root' })
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property('Token')
              jwt.verify(res.body.Token, 'secretKey', (err, decoded) => {
                expect(err).to.not.be.ok // eslint-disable-line no-unused-expressions
                expect(decoded.user.username).to.equal('root')
                agent.saveCookies(res)
                done()
              })
            })
            .catch(done)
  })
})

describe('login', function () {
  it('Reject request if username and password is not available', function (done) {
    request(app)
            .post('/login')
            .expect(403)
            .expect(/Forbidden/, done)
  })
})

describe('login', function () {
  it('Reject request if only username is available', function (done) {
    request(app)
            .post('/login')
            .send({ username: 'root' })
            .expect(403)
            .expect(/Forbidden/, done)
  })
})

describe('login', function () {
  it('Reject request if only password is available', function (done) {
    request(app)
            .post('/login')
            .send({ password: 'root' })
            .expect(403)
            .expect(/Forbidden/, done)
  })
})

describe('patch', function () {
  it('Rejects patch request if the token is not passed', function (done) {
    request(app)
            .post('/patch')
            .send({ doc: { 'baz': 'qux', 'foo': 'bar' }, thePatch: [{ 'op': 'replace', 'path': '/baz', 'value': 'boo' }] })
            .expect(403, done)
  })
})

describe('patch', function () {
  it('Rejects unauthorised patch request if both the doc and the patch are not passed', function (done) {
    request(app)
            .post('/patch')
            .expect(403, done)
  })
})

describe('thumbnail', function () {
  it('Reject thumbnail request if the token is not passed', function (done) {
    request(app)
            .post('/thumbnail')
            .send({ uri: 'https://s7d2.scene7.com/is/image/PetSmart/PB1201_STORY_CARO-Authority-HealthyOutside-DOG-20160818?$PB1201$' })
            .expect(403, done)
  })
})

describe('thumbnail', function () {
  it('Reject unauthorised thumbnail request if uri is not passed', function (done) {
    request(app)
            .post('/thumbnail')
            .expect(403, done)
  })
})
