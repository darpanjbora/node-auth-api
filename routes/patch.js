var express = require('express')
var jwt = require('jsonwebtoken')
var jsonpatch = require('jsonpatch')

var router = express.Router()

/**
 * POST route to get the patched JSON
 * pass the JSON object and thePatch JSON object in request body
 * returns the patch JSON to user
 */

router.post('/', (req, res) => {
    /* Verify the token saved in cookies */
  jwt.verify(req.cookies.authToken, 'secretKey', (err, authData) => {
    if (err) {
            /* Failed verification of the token results in 403 status code */
      res.sendStatus(403)
    } else {
            /* Checks for non-empty JSON object and thePatch JSON object from the request body */
      if (req.body.doc !== undefined && req.body.thePatch !== undefined) {
        var myDoc = JSON.parse(req.body.doc)
        var thePatch = JSON.parse(req.body.thePatch)

                /**
                 * Used the JsonPatch.js library for the patching the JSON object.
                 * jsonpatch.js is an implementation of the JSONPatch (RFC 6902) and
                 * JSONPointer (RFC 6901) IETF specifications which supports Node.JS and
                 * use in the Browser.
                 */
        let patchedDoc = jsonpatch.apply_patch(myDoc, thePatch)

                /* Send the patched JSON object to the user */
        res.send(patchedDoc)
      } else {
                /* Empty JSON object and thePatch JSON object results in 400 status code */
        res.sendStatus(400)
      }
    }
  })
})

module.exports = router
