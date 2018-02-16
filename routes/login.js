var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/', function(req, res, next) {

    if (req.body.username !== undefined && req.body.password !== undefined) {
        const user = {
            username: req.body.username,
            password: req.body.password,
        }

        let token = jwt.sign({ user }, 'secretKey', {
            expiresIn: 60 * 60
        });

        res.cookie('authToken', token);
        res.json({
            'message': 'Permission Granted',
            'Token': token
        });

    } else {
        res.sendStatus(403);
    }
});

module.exports = router;