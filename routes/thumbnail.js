var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');
var fs = require('fs');
var path = require('path');
var Jimp = require('jimp');


var router = express.Router();

/**
 * POST route to download an image
 * from the public url provided in the request body.
 * Returns a thumbnail of the same image by resizing it to 50x50 pixels.
 */
router.post('/', (req, res) => {

    /* Verification of the token saved in cookies */
    jwt.verify(req.cookies.authToken, 'secretKey', (err, authData) => {
        if (err) {

            /* Failed verification results in 403 status code*/
            res.sendStatus(403);

        } else {

            /* Checks for non-empty uri from the request body*/
            if (req.body.uri !== undefined) {

                var response = res;
                uri = req.body.uri;

                /* Downloading the image from the public URL using request module and saving it as image.png*/
                request.head(uri, function(err, res, body) {
                    request(uri).pipe(fs.createWriteStream('image.png')).on('close', () => {

                        /** On successful downloading of the image Jimp library is used to resize it
                         * JIMP - An image processing library for Node written entirely in JavaScript, 
                         * with zero native dependencies.
                         */
                        Jimp.read("image.png", function(err, image) {

                            /*In case of error, returns 400 status code*/
                            if (err) {
                                res.sendStatus(400);
                            }

                            /*Otherwise image resizing takes place and the resized image is saved as image-small.png*/
                            image.resize(256, 256) // resize
                                .quality(60) // set JPEG quality
                                .write("image-small.png") // save

                            /* Return the resized image */
                            response.sendFile(path.join(__dirname, '../', 'image-small.png'))

                        });
                    });
                });
            } else {
                /* Empty uri in the request body results in 400 status code */
                res.sendStatus(400);
            }
        }
    })
})

module.exports = router;