var express = require('express');
var jwt = require('jsonwebtoken');
var jsonpatch = require('jsonpatch');

var router = express.Router();

/* GET patched JSON. */

router.post('/', (req, res) => {

    jwt.verify(req.cookies.authToken, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            if (req.body.doc !== undefined && req.body.thePatch !== undefined) {

                var myDoc = JSON.parse(req.body.doc);
                var thePatch = JSON.parse(req.body.thePatch);
                let patchedDoc = jsonpatch.apply_patch(myDoc, thePatch);
                res.send(patchedDoc);

            } else {
                res.sendStatus(400);
            }

        }
    })
})

module.exports = router;