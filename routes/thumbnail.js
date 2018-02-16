var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');
var fs = require('fs');
var path = require('path');
var Jimp = require('jimp');


var router = express.Router();

/* Download an image from URL and resize it. */

router.post('/', (req, res) => {

    jwt.verify(req.cookies.authToken, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (req.body.uri !== undefined) {

                var response = res;
                uri = req.body.uri;

                request.head(uri, function(err, res, body) {
                    request(uri).pipe(fs.createWriteStream('image.png')).on('close', () => {
                        Jimp.read("image.png", function(err, image) {
                            console.log("First");
                            if (err) throw err;
                            image.resize(256, 256) // resize
                                .quality(60) // set JPEG quality
                                .write("image-small.png") // save
                            console.log("Sending file..");
                            response.sendFile(path.join(__dirname, '../', 'image-small.png'))

                        });
                    });
                });
            } else {
                res.sendStatus(400);
            }
        }
    })
})

module.exports = router;