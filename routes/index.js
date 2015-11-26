var express = require('express');
var router = express.Router();
var indx = express();
var cookieParser = require('cookie-parser');

indx.use(cookieParser());


/* GET home page. */
router.get('/', function(req, res) {
  res.cookie('name', 'Vadim', {});
  var nm = req.cookies.name;
  res.render('index', {title: 'Express', name: nm});
});

module.exports = router;
