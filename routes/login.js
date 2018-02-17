var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()

/* POST route to generate the JWT for any username and password */
router.post('/', function (req, res, next) {
    /* Check for non-empty username and password from the request body */
  if (req.body.username !== undefined && req.body.password !== undefined) {
    const user = {
      username: req.body.username,
      password: req.body.password
    }

        /* Generating a token with a lifetime of 1 hour for the username and password provided. */
    let token = jwt.sign({ user }, 'secretKey', {
      expiresIn: 60 * 60
    })

        /* Saving the token in cookies to validate future request. */
    res.cookie('authToken', token)

        /* Sending the token generated with a message to the frontend. */
    res.json({
      'message': 'Permission Granted',
      'Token': token
    })
  } else {
        /* Empty username and password results in 400 status code */
    res.sendStatus(403)
  }
})

module.exports = router
