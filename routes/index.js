var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var api={
        api:"success"
    };
    res.send(api);
});

module.exports = router;
