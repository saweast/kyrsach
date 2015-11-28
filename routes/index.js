var express = require('express');
var router = express.Router();
var indx = express();
var cookieParser = require('cookie-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'VLtest'
});
connection.connect();

indx.use(cookieParser());


/* GET home page. */
router.get('/', function(req, res) {
  console.log('load main page: ' + req.cookies.isLogged);
  res.render('index', {title: 'Express', isLogged: req.cookies.isLogged});
});
router.post('/', function(req, res) {
  var login = req.body.login;
  var password = req.body.password;
  connection.query('SELECT * FROM `user`', function(err, rows) {
    if (err) throw err;
    for (key in rows) {
      if (rows[key].login == login) {
        if (rows[key].pwd == password) {
          res.cookie('isLogged', 1, {});
          console.log('set cookie when authorised ' +req.cookies.isLogged);
          res.render('index', {title: 'Express', isLogged: req.cookies.isLogged});
        }
      }
    }
  });
});
router.post('/logout', function(req, res) {
  res.cookie('isLogged', 0, {});
  console.log('logout cookie: ' + req.cookies.isLogged);
  res.render('index', {title: 'Express', isLogged: req.cookies.isLogged});
});

module.exports = router;
